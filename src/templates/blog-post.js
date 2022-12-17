import React, { useEffect, useMemo } from 'react'
import { graphql } from 'gatsby'

import * as Elements from '../components/elements'
import { Layout } from '../layout'
import { Head } from '../components/head'
import { PostTitle } from '../components/post-title'
import { PostDate } from '../components/post-date'
import { PostContainer } from '../components/post-container'
import { SocialShare } from '../components/social-share'
import { SponsorButton } from '../components/sponsor-button'
import { Bio } from '../components/bio'
import { PostNavigator } from '../components/post-navigator'
import { Disqus } from '../components/disqus'
import { Toc } from '../components/toc'
import { ThemeSwitch } from '../components/theme-switch'
import { Utterances } from '../components/utterances'
import * as ScrollManager from '../utils/scroll'
import '../styles/code.scss'
import './index.scss'
import 'katex/dist/katex.min.css'
import { isMobile } from 'react-device-detect'
import { Word } from '../components/word'
import { globalHistory } from '@reach/router/lib/history'
import { navigate } from '@reach/router'

export default ({ data, pageContext, location }) => {
  useEffect(() => {
    console.log(data)
    globalHistory.listen(e => {
      if (e.action == 'POP') {
        navigate(`/`, { replace: true })
      }
    })
    ScrollManager.init()

    return () => ScrollManager.destroy()
  }, [])

  const post = data.markdownRemark
  const metaData = data.site.siteMetadata
  const { title, comment, siteUrl, author, sponsor } = metaData
  const { disqusShortName, utterances } = comment
  const { title: postTitle, date } = post.frontmatter

  return (
    <>
      <div className="post-content-wrap">
        <div className="post-content">
          <Layout
            location={location}
            title={title}
            siteUrl={siteUrl}
            author={author}
          >
            <div className="home-header-wrap">
              <Head title={postTitle} description={post.excerpt} />
              <PostTitle title={postTitle} />
              <ThemeSwitch />
            </div>
            <PostDate date={date} />
            <PostContainer html={post.html} />
            {/* <SocialShare title={postTitle} author={author} /> */}

            <Elements.Hr />
            <Bio />
            <PostNavigator pageContext={pageContext} />
          </Layout>
        </div>
        {!isMobile && post.tableOfContents && (
          <Toc content={post.tableOfContents} />
        )}
      </div>
    </>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
        comment {
          disqusShortName
          utterances
        }
        sponsor {
          buyMeACoffeeId
        }
      }
    }

    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 280)
      html
      tableOfContents
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
