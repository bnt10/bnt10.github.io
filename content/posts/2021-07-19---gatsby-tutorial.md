---
title: Gatsby 설치
date: "2021-09-18"
template: "post"
draft: false
slug: "react-gatsby-toturial"
category: 
  "gatsby"
tags:
  - "react"
  - "gatsby"
description: "Gatsby Tutorial"
socialImage: "/media/gatsby_icon.png"
---



## 목차

```toc
exclude: Table of Contents
from-heading: 3
to-heading: 6
```

### 1. NPM, Nodejs 설치
[NPM, Nodejs](https://nodejs.org/ko/download/)는 설치되어 있는 환경 필요
### 2. gatsby-cli를 설치
```javascript{}
npm install -g gatsby-cli
```
### 3. 설치 디렉토리 생성 ‘hello-world’
```javascript{}
mkdir hello-world
cd hello-world
```
### 4. lumen 테마로 Gatsby 설치
```javascript{}
gatsby new hello-world https://github.com/GatsbyCentral/gatsby-v2-starter-lumen
```
 * [Name] 생성할 블로그 명  
  [Thema-path]  사용할 테마 주소
```javascript{}
gatsby new [Name] [Thema-path]
```

### 5. 실행
```javascript{}
cd hello-world 
npm run develop
```

---
