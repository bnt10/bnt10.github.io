import React, { useEffect, useRef, useState } from 'react'

import useTocIntersectionObserver from '../../hooks/useTocIntersectionObserver'
import './index.scss'
interface Props {
  content: string
}
export const Toc = ({ content }: Props) => {
  const [activeId, setActiveId] = useState('')
  const tocRef = useRef<any>({})

  useTocIntersectionObserver(setActiveId, content)
  useEffect(() => {
    const actvieToc = tocRef.current.querySelectorAll('a')
    actvieToc.forEach((el: HTMLAnchorElement) => {
      el.textContent?.toLowerCase() == activeId.toLowerCase()
        ? el.classList.add('active')
        : el.classList.remove('active')
    })
  }, [activeId])
  return (
    <div className="toc-wrap">
      <div
        className="toc-content"
        ref={tocRef}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  )
}
