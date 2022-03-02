import React from 'react'

import './index.scss'

export const Footer = ({ siteUrl, author }) => (
  <footer className="footer">
    ©<a href={siteUrl}>{author}</a>, Built with{' '}
    <a href="https://github.com/JaeYeopHan/gatsby-starter-bee">
      Gatsby-starter-bee
    </a>
  </footer>
)
