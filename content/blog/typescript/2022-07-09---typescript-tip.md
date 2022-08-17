---
title: typescript 타입설계시 유의점
date: '2022-07-09'
template: 'post'
draft: true
slug: 'To create an effective type'
category: 'typescript'
tags:
  - 'typescript'
  - 'tip'
description: '타입에 관한 유의사항 정리'
socialImage: '/media/gatsby_icon.png'
mdFileName: 2022-07-09---typescript-tip.md
mdFileDirectory: /content/blog/typescript/
---

# 타입설계

## Good Interface

유효한 상태와 무효한 상태를 둘 다 표현하는 타입은 혼란을 초래하기 쉽고
오류를 유발하게 됩니다.

유효한 상태만 표현하는 타입을 지향해야 합니다. 코드가 길어지거나 표현하기 어렵지만 결국은  
시간을 절약하고 고통을 줄일 수 있습니다.

좋은 인터페이스를 설계하기 위해서는 먼저 나쁜 인터페이스에 대해서 생각해봐야 합니다.

아래 간단한 상태 인터페이스와 사용예시를 살펴 봅시다.

```javascript
interface State {
  name: string;
  isLoading: boolean;
  error?: string
}
function LoginPage(state: State) =>{
  if(state.IsLoading){
   	return (<Loding />
  }else if(state.error){
 	return <Error />

 return <UserName name={state.name} />
}
```
