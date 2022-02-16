---
title: gatsby research
date: "2022-02-05"
template: "post"
draft: false
slug: "gatsby 공부"
category: 
  "gatsby"
tags:
  - "react"
description: "gatsby 공부 파일구조"
socialImage: "/media/gatsby_icon.png"
---

#### content Folder
현재 사용하고 있는 [Lumen 테마](https://github.com/alxshelepenok/gatsby-starter-lumen)에 대한 커스텀을 하기 위해서 공부를 시작하였습니다.     
먼저 content 폴더를 살펴 보았습니다.
```javascript
contnet
└─pages
└─posts
```
pages 폴더와 posts 폴더로 구성되어 있습니다.
page와 posts의 차이는 구성 컴포넌트의 차이만 존재합니다.
page와 post를 생성하는 방식을 정리해보기로 하였다.
* 대부분 코드는 개인적으로 중요하다 생각하는 일부만 기록하였습니다.  

제일 먼저 찾은것은 **gatbsy** 폴더에서 **create-pages.js** 에서 pages와 posts를 구분하는  
코드를 살펴 보겠습니다.  


```javascript
  const { edges } = result.data.allMarkdownRemark;  
  _.each(edges, (edge) => {
    if (_.get(edge, 'node.frontmatter.template') === 'page') {
       createPage({
        path: edge.node.fields.slug,
        component: path.resolve('./src/templates/page-template.js'),
        context: { slug: edge.node.fields.slug }
      });
    } else if (_.get(edge, 'node.frontmatter.template') === 'post') {
      ...
    }
  });
```
md 파일의 frontmatter 속성중 template 기준으로 page 와 post를 구분해주고 있었다.
'**./src/templates/page-template.js**'를 이동

```javasciprt
  return (
    <Layout title={`${pageTitle} - ${siteTitle}`} description={metaDescription} socialImage={socialImageUrl} >
      <Sidebar />
      <Page title={pageTitle}>
        <div dangerouslySetInnerHTML={{ __html: pageBody }} />
      </Page>
    </Layout>
  );
```
page component를 Layout으로 감싸고 있는 형태였습니다.
* 참고 :
```<div dangerouslySetInnerHTML={{ __html: pageBody }} />```
dangerouslySetInnerHTML React에서 InnerHTML을 사용하기 위한 방식

다음으로 `<Page>` Component를 살펴 봅니다.
```javascript
  return (
    <div ref={pageRef} className={styles['page']}>
      <div className={styles['page__inner']}>
        { title && <h1 className={styles['page__title']}>{title}</h1>}
        <div className={styles['page__body']}>
          {children}
        </div>
      </div>
    </div>
  );
```
특별하다고 할만한거는 보이지 않았다 Post도 동일한 방식이기 떄문에 Post component를 살펴보았다
```javascript
<div className={styles['post']}>
      <Link className={styles['post__home-button']} to="/">전체</Link>

      <div className={styles['post__content']}>
        <Content body={html} title={title} />
      </div>

      <div className={styles['post__footer']}>
        <Meta date={date} />
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
        <Author />
      </div>

      <div className={styles['post__comments']}>
        <Comments postSlug={slug} postTitle={post.frontmatter.title} />
      </div>
    </div>
```
page 와 post를 수정할때는 두 Component를 수정하면 됩니다.
