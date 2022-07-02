import React from 'react'
import { Link } from 'gatsby'
import { GitHubIcon } from '../social-share/github-icon'
import './index.scss'
export const Toc = ({ toc }) => {
  console.log(toc.id, toc.tableOfContents)
  return (
    <div className="toc-wrap">
      <div
        className="toc-content"
        dangerouslySetInnerHTML={{ __html: toc.tableOfContents }}
      ></div>
    </div>
  )
}
