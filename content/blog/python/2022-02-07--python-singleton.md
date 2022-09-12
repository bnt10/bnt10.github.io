---
title: Python - Singleton class
date: '2022-02-07'
template: 'post'
draft: true
slug: 'Python-Singleton class'
category: 'python'
tags:
  - 'python'
description: 'Python singleton class 만들기'
socialImage: '/media/gatsby_icon.png'
---

### 1. Singleton

현재 실행중인 프로세스에서 하나의 인스터스를 메모리에 할당하여 유일한 단일객체로서 사용하는 디자인패턴을 말한다.

### 2. 공부한 이유

현재 개발중인 게이트웨이로서의 Proxy서버에 대해서 다수의 node서버 접속시 사용할 전역 Proxy서버 객체 및
공유된 리소스에 대한 말단 노드간의 동시성 제어가 필요했습니다.

### 3. Python에서 Singleton 구현 방식 및 예시

생각보다 python에서 싱글턴을 구현하는 방식들이 다양합니다.
제가 이번에 구현한 방식은 type 통한 metaclass 생성을 통해서 싱글톤을 구현 해보겠습니다.

```javascript
class Singleton(type):
    # 인스턴스가 저장될 속성
    __instances = {}
    # __call__ 클래스에서 생성된 인스턴스를 호출할때 동작
    def __call__(cls, *args, **kwargs):
        # 인스턴스 생성 여부 확인
        if cls not in cls.__instances:
            # 인스턴스 미생성 경우 인스턴스 생성하여 저장
            cls.__instances[cls] = super().__call__(*args, **kwargs)
        #인스턴스가 존재하는경우 기존 생성 인스턴스 전달
        return cls.__instances[cls]

# 메타클래스로 Singleton으로 생성
class Singleton(type):
    # 인스턴스가 저장될 속성
    __instances = {}
    # __call__ 클래스에서 생성된 인스턴스를 호출할때 동작
    def __call__(cls, *args, **kwargs):
        # 인스턴스 생성 여부 확인
        if cls not in cls.__instances:
            # 인스턴스 미생성 경우 인스턴스 생성하여 저장
            cls.__instances[cls] = super().__call__(*args, **kwargs)
        #인스턴스가 존재하는경우 기존 생성 인스턴스 전달
        return cls.__instances[cls]
    def clear(cls):
        try:
            cls.__instances = {}
        except KeyError:
            print("Error:", KeyError)

# 메타클래스로 Singleton으로 생성
class Proxy(metaclass=Singleton):
    def __init__(self, server):
        self.server = server

    def close(self):

        self.__class__.clear()
        del self
    def get_server(self):

        return self.server
    #...

sshNode = Proxy('ssh')
telnetNode = Proxy('telnet')

#초기화 값 확인
print(sshNode.get_server(), telnetNode.get_server())

#동일 인스턴스 확인
print('Is it the same instance?', sshNode is telnetNode)

#인스턴스 초기화'
sshNode.close()
sshNode = Proxy('new ssh')
print(sshNode.get_server())

```
