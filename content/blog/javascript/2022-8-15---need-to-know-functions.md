---
title: Function Declarations VS. Function Expressionsin Javascript
date: '2022-08-15'
template: 'post'
draft: true
slug: 'How to use various functions(1) '
category: 'javascript'
tags:
  - 'javascript'
description: 'javascript에서 Function Expression 과 Declarations  특징 과 차이점  '
socialImage: '/media/gatsby_icon.png'
mdFileName: 2022-8-15---need-to-know-functions.md
mdFileDirectory: /content/blog/javascript/
---

# 글을 시작하기 전에

Javascript에서 함수 선언(function declaration), 함수 표현식(function expression),
에 대해서 사용법이 아니라 '언제 왜 함수 선언과 표현식 중 어떤 것을 사용해야 해야 할 것인가' 라는
기준에 대해서 정리 하였습니다.

# 특징

## 함수 선언

function declaration(함수 선언)에 대해서 먼저 살펴 보도록 하겠습니다.
함수 선언이 함수 표현식과 다른 주요 특징은 **호이스팅(Hoisting)** 여부에 있습니다.

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

notHoisted() // TypeError: notHoisted is not a function
//함수 표현식으로 생성
var notHoisted = function() {
  console.log('bar')
}
```

## 함수 표현식

함수 표현식이 함수 선언과 다른 주요 **특징은 클로저(Closure)**에 있습니다.

- 클로저(Closure)란?  
  "A closure is the combination of a function and the lexical environment within which that function was declared."  
  클로저는 함수와 그 함수가 선언됐을 때의 렉시컬 환경(Lexical environment)과의 조합이다.
