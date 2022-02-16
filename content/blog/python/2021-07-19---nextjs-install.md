---
title: nextJs 설치
date: "2021-09-22"
template: "post"
draft: false
slug: "react-nextjs-install"
category: 
  "nextjs"
tags:
  - "react"
  - "nextjs"
description: "nextJs install"
socialImage: "/media/gatsby_icon.png"
---

### 1. 시스템 요구사항
Node.js 12.0 이상
MacOS, Linux Windows (including WSL)

### 2. create-next-app 통한 설치
npx create-next-app [project_name]
* [project_name] 생성할 프로젝트 폴더명
```javascript{}
npx create-next-app hello_next
```

### 3. create-next-app 통한 설치(TypeScript)
```javascript{}
npx create-next-app --typescript
```
### 4. 메뉴얼 설치(create-next-app 미사용)
```javascript{}
npm install next react react-dom
npm install --save-dev typescript @types/react
```
설치 후 package.json에 아래 내용 추가
```javascript 
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}

```
프로젝트 폴더를 기준으로 아래와 같은 폴더 구조로 index.jxs도 추가하여야 한다.
```javascript
pages
└─ index.tsx
package.json
tsconfig.json
```
tsconfig.json 설정 정보
```javascript
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "baseUrl": ".",
    "checkJs": true,
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    "**/*.css",
    "src/**/*.ts",
    "src/**/*.css",
  ],
  "exclude": [
    "node_modules"
  ],
}
```

index.tsx에 간단한 내용을 추가해보자
```javascript
function HelloNext() {
  return <div>Hello Next.js!</div>
}

export default HelloNext
```
페이지 실행을 확인해보자
```javascript
npm run dev
```

---
