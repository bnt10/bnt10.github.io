---
title: javascript function 특징 정리
date: '2022-08-15'
template: 'post'
draft: false
slug: 'How to use various functions'
category: 'javascript'
tags:
  - 'javascript'
description: 'javascript에서 function을 사용에 관한 다양한 방법들 정리 '
socialImage: '/media/gatsby_icon.png'
---

# 글을 시작하기 전에

Javascript에서 function을 사용하면서 함수 선언(function declaration), 함수 표현식(function expression), 화살표 함수(arrow function)  
3가지 형태의 함수에 대해서 사용하고 있지만 이 3가지 방법에 대한 특징을 정확히 파악하고 있지 못하여  
주요 정리 방식은 사용법, 다른 사용방법들과 다른 특징과 그 특징을 어떤 상황에서 이용하는지 위주로 정리를 하였습니다.  
Function 생성자 방식은 제외 하였습니다.([참고](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function))

# 사용법

## 함수 선언(function declaration)

```javascript
//함수 선언
function name([param[, param,[..., param]]]) { [statements] }
```

## 함수 표현식(function expression)

```javascript
//함수 표현식
var myFunction = function [name]([param1[, param2[, ..., paramN]]]) { statements };
```

## 화살표 함수(arrow function)

```javascript
//화살표 함수

//기본 구문
(param1, param2, …, paramN) => { statements }
(param1, param2, …, paramN) => expression
// 다음과 동일함:  => { return expression; }

// 매개변수가 하나뿐인 경우 괄호는 선택사항:
(singleParam) => { statements }
singleParam => { statements }

// 매개변수가 없는 함수는 괄호가 필요:
() => { statements }

//고급 구문
// 객체 리터럴 표현을 반환하기 위해서는 함수 본문(body)을 괄호 속에 넣음:
params => ({foo: bar})

// 나머지 매개변수 및 기본 매개변수를 지원함
(param1, param2, ...rest) => { statements }
(param1 = defaultValue1, param2, …, paramN = defaultValueN) => { statements }

// 매개변수 목록 내 구조분해할당도 지원됨
var f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
f();  // 6
```

# 특징

## 함수 선언

function declaration(함수 선언)에 대해서 먼저 살펴 보도록 하겠습니다.
함수 선언이 다른 생성 방법과의 다른 주요 특징은 **호이스팅(Hoisting)** 여부에 있습니다.

- 호이스팅 이란?  
  var 로 선언한 표현식(let과 const로는 불가)나 function declaration(함수 선언)을 실행 단계에서 해당 Scope의 맨 위로 옮기는 것을 말합니다.  
  함수는 해당 Scope 에서 참조, 호출이 가능하다.  
  var 는 해당 Scope 에서 참조, 할당이 가능하다.

```javascript
//호이스팅 예시
hoisted() // logs "foo"

function hoisted() {
  console.log('foo')
}
```

## 함수 선언 vs 화살표 함수

function declaration(함수 선언)과 arrow function(화살표 함수)의 차이에 대해서 알아 보겠습니다.

- this나 super에 대한 바인딩이 없고, methods 로 사용될 수 없습니다.
- new.target키워드가 없습니다.
- 일반적으로 스코프를 지정할 때 사용하는 call, apply, bind methods를 이용할 수 없습니다.
- 생성자(Constructor)로 사용할 수 없습니다.
- yield를 화살표 함수 내부에서 사용할 수 없습니다.
