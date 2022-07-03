import { useEffect, useRef } from 'react'

const useTocIntersectionObserver = (
  setActiveId: React.Dispatch<React.SetStateAction<string>>,
  content: string
) => {
  const headingElementsRef = useRef<any>({})
  useEffect(() => {
    headingElementsRef.current = {}
    const callback: IntersectionObserverCallback = headings => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        if (headingElement.target.id) {
          map[headingElement.target.id] = headingElement
        }
        return map
      }, headingElementsRef.current)

      const visibleHeadings: IntersectionObserverEntry[] = []
      Object.keys(headingElementsRef.current).forEach(key => {
        const headingElement = headingElementsRef.current[key]

        if (headingElement.isIntersecting) visibleHeadings.push(headingElement)
      })

      const getIndexFromId = (id: string) =>
        headingElements.findIndex(heading => heading.id === id)

      if (visibleHeadings.length === 1) {
        if (visibleHeadings[0].target.textContent) {
          setActiveId(visibleHeadings[0].target.textContent)
        }
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
        )
        if (sortedVisibleHeadings[0].target.textContent) {
          setActiveId(sortedVisibleHeadings[0].target.textContent)
        }
      }
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-0px 0px -45% 0px',
    })

    const headingElements = Array.from(
      document.querySelectorAll('h1, h2, h3, h4')
    )

    headingElements.forEach(element => observer.observe(element))

    return () => observer.disconnect()
  }, [content])
}

export default useTocIntersectionObserver
