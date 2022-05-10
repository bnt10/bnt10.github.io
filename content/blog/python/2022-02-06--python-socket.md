---
title: Python - socket
date: '2022-02-06'
template: 'post'
draft: false
slug: 'Python-socket'
category: 'python'
tags:
  - 'python'
description: 'Python socket 통신 정리'
socialImage: '/media/gatsby_icon.png'
---

### 1. Socket 정의

소캣이란 네트워크를 경유하는 프로세스 간 통신의 종착점이다
주로 소켓통신이 필요할때는 http 프로토콜 처럼 단방향통신이 아니라 프로세스간 양방향 통신이 필요할때 사용하면 된다.
소켓에서 같은 ip와 port 번호를 가진 서버와 클라이언트는 소켓을 통한 양방향 통신이 가능하기 때문이다.

#### 1 소제

### 2. Python에서 Socket구현

서버와 클라이언트 사이에 통신을 구현해 봅니다.
서버와 클라이언트간의 메시지를 전달할 수 있도록 작성해봅니다.

serverSocket.py 를 먼저 구현해봅니다.

```javascript

import socket
from _thread import *

# 서버에 접속한 클라이언트 목록
client_sockets = []
# 서버 IP 및 열어줄 포트
HOST = '127.0.0.1'
PORT = 9998

# 쓰레드에서 실행되는 코드입니다.
# 접속한 클라이언트마다 새로운 쓰레드가 생성되어 통신을 하게 됩니다.
def threaded(client_socket, addr):
    print('>> Connected by :', addr[0], ':', addr[1])

    # 클라이언트가 접속을 끊을 때 까지 반복합니다.
    while True:
        try:
            # 데이터가 수신되면 클라이언트에 다시 전송합니다.(에코)
            data = client_socket.recv(1024)
            if not data:
                print('>> Disconnected by ' + addr[0], ':', addr[1])
                break

            print('>> Received from ' + addr[0], ':', addr[1], data.decode())

            # 서버에 접속한 클라이언트들에게 채팅 보내기
            # 메세지를 보낸 본인을 제외한 서버에 접속한 클라이언트에게 메세지 보내기
            for client in client_sockets :
                if client != client_socket :
                    client.send(data)

        except ConnectionResetError as e:
            print('>> Disconnected by ' + addr[0], ':', addr[1])
            break

    if client_socket in client_sockets :
        client_sockets.remove(client_socket)
        print('remove client list : ',len(client_sockets))

    client_socket.close()

#socket server start
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_socket:

    server_socket.bind((HOST, PORT))
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server_socket.listen()

    try:
        while True:
            print('connet wait')
            #서버에서 클라이언트의 연결을 받아들입니다.
            client_socket, addr = server_socket.accept()
            #추가된 클라언트 목록을 추가합니다.
            client_sockets.append(client_socket)
            #새로운 스레드로 할당합니다.
            start_new_thread(threaded, (client_socket, addr))
            #현재 연결되 clinet의 수
            print("client count: ", len(client_sockets))

    except Exception as e :
        print ('error: ',e)
    finally:
        server_socket.close()

```

다음으로 클라언트를 clientSocket.py를 작성해봅니다.

```python
from _thread import *
import socket

HOST = '127.0.0.1'
PORT = 9998

def recv_data(client_socket) :
    while True :
        data = client_socket.recv(1024)
        print("recive : ",repr(data.decode()))

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_socket:

    client_socket.connect((HOST, PORT))

    try:
        print('access server!')
        start_new_thread(recv_data, (client_socket,))
        while True:
            message = input('')
            if message == 'quit':
                close_data = message
                break
            client_socket.send(message.encode())

    except Exception as e :
        print ('error: ',e)
    finally:
        client_socket.close()
```

참고
[https://stickode.tistory.com/225](https://stickode.tistory.com/225)
