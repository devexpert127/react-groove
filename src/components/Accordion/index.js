import React, { useState, useRef, useEffect } from 'react'
import cx from 'classnames'
import UIIcon from 'Components/UIIcon'

import './styles.css'

const Accordion = ({ expandOnLarge, icon = UIIcon.Icons.Arrow, isGrid, items, style = 'default' }) => {
  const [activeItem, setActiveItem] = useState(null)
  let largeScreen = false

  if (expandOnLarge) {
    largeScreen = useCheckMedia('(min-width: 1200px)')
  } else {
    largeScreen = false
  }

  return (
    <ul className={cx(`Accordion Accordion--${style}`, { 'Accordion--grid': isGrid })}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          isLargeScreen={largeScreen ? true : false}
          active={activeItem === item}
          item={item}
          onClick={() => setActiveItem(activeItem === item ? null : item)}
          icon={icon}
        />
      ))}
    </ul>
  )
}

const AccordionItem = ({
  active,
  icon,
  isLargeScreen,
  item: { name, content, isGrid },
  onClick,
}) => {
  const contentRef = useRef()
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const accordionItemBody = contentRef.current

    /**
     * prevent images inside of accordions from lazyloading, so the height will
     * be properly calculated
     */
    const accordionItemBodyImages = accordionItemBody.querySelectorAll('img')
    if (accordionItemBodyImages.length > 0) {
      accordionItemBodyImages.forEach(image => (image.loading = 'eager'))
    }

    const height = isLargeScreen
      ? '100%'
      : active
      ? (accordionItemBody || { clientHeight: 0 }).clientHeight
      : 0

    setHeight(height)
  })

  return (
    <li
      className={cx('AccordionItem', {
        'AccordionItem--active': active,
        'AccordionItem--grid': isGrid,
      })}
    >
      <h3
        className={cx('AccordionItem-heading', { 'AccordionItem-heading--grid': isGrid })}
      >
        <button  onClick={onClick}>{active}
          <span className="AccordionItem-headingText">{name}</span>
          <UIIcon icon={icon} className={`AccordionItem-icon AccordionItem-icon--${icon.name}`} isSpan hideChildren>{active ? 'Collapse' : 'Expand'} ${name}</UIIcon>
        </button>
      </h3>
      <div className={cx('AccordionItem-content')} style={{ height }}>
        <div ref={contentRef} className="AccordionItem-body">
          {content}
        </div>
      </div>
    </li>
  )
}

// Adapted from https://codesandbox.io/s/kxe4w
function useCheckMedia(query) {
  if (typeof window === 'undefined') return

  const [matches, setMatches] = useState(window.matchMedia(query).matches)

  useEffect(() => {
    let media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    let listener = () => setMatches(media.matches)
    media.addListener(listener)

    return () => media.removeListener(listener)
  }, [query])

  return matches
}

export default Accordion
