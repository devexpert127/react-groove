import React, { useState, useRef, useEffect } from 'react'
import cx from 'classnames'
import Link from 'frontend-link'
import UIIcon from 'Components/UIIcon'
import ResponsiveImage from 'frontend-ui/ResponsiveImage'
import { focusTrap } from 'Components/FocusTrap'
import './styles.css'

const maxNavLevels = 3
const dropdownLevel = 2

const LinkList = ({
  navigationLink,
  navigationHidden,
  levelCount,
  active,
  largeScreen,
  onClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onFocusChild,
  parentLinks = []
}) => {
  levelCount++
  let childLinks = false
  const contentRef = useRef()
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(null)
  const [originalHeight, setOriginalHeight] = useState(null)
  const [originalWidth, setOriginalWidth] = useState(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    let timeoutID = false

    if (contentRef.current) {
      const bounds = contentRef.current.getBoundingClientRect()
      if (!originalWidth) {
        setOriginalWidth(bounds.width)
      }
      if (!originalHeight) {
        setOriginalHeight(bounds.height)
      }

      if (!largeScreen) {
        const newHeight = active ? bounds.height : 0

        setHeight(newHeight)
        setWidth(null)
      } else {
        const newHeight = active
          ? bounds.height + bounds.y > window.innerHeight
            ? `calc(${window.innerHeight - bounds.y}px - 1.5em)`
            : bounds.height
          : 0
        const newWidth =
          originalWidth + bounds.x > window.innerWidth
            ? `calc(${window.innerWidth - bounds.x}px - 1.5em)`
            : originalWidth

        if (newWidth !== originalWidth) {
          setWidth(newWidth)
        } else {
          setWidth(originalWidth)
        }

        if (newHeight == 0) {
          timeoutID = setTimeout(() => {
            setHeight(newHeight)
          }, 500) // after animation has completed
        } else {
          setHeight(newHeight)
        }
      }
    }

    return function cleanup() {
      if (timeoutID) {
        clearTimeout(timeoutID)
      }
    }
  })

  const childrenHaveImages = () => {
    // Collect all the child links that have images
    // return true if we have any and the amount is the same as all the child links
    const images = navigationLink.childLinks.filter(childLink => {
      return (
        childLink.image &&
        childLink.image.src !== '' &&
        (typeof childLink.childLinks === 'undefined' || !childLink.childLinks.length)
      )
    })
    return !!images.length && images.length === navigationLink.childLinks.length
  }

  // Standard child links snippet
  if (navigationLink.childLinks && navigationLink.childLinks.length && levelCount <= maxNavLevels) {
    childLinks = (
      <ul
        className={cx('Navigation-list', `Navigation-list--level-${levelCount}`)}
        data-links={navigationLink.childLinks.length}
      >
        {navigationLink.childLinks.map((childLink, i) => (
          <LinkList
            navigationLink={childLink}
            navigationHidden={navigationHidden}
            levelCount={levelCount}
            key={i}
            onFocusChild={onFocusChild}
            parentLinks={[...parentLinks, navigationLink]}
          />
        ))}
      </ul>
    )
  }

  // Nav item with wrapper for dropdowns
  // Only happens when we have child links and on the dropdownLevel
  if (
    navigationLink.childLinks &&
    navigationLink.childLinks.length &&
    levelCount == dropdownLevel
  ) {
    return (
      <li
        className={cx('Navigation-item', `Navigation-item--level-${levelCount - 1}`)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Link
          to={navigationLink.link}
          className={cx(
            'Navigation-item-link',
            { ['Navigation-item-link--active']: !!active },
            `Navigation-item-link--level-${levelCount - 1}`,
          )}
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          {...(!!navigationHidden &&
            {'tabIndex': -1}
          )}
        >
          {navigationLink.title}
          {!!navigationLink.accessibleTitle && (
            <span className="Navigation-item--accessible-title">, {navigationLink.accessibleTitle}</span>
          )}
          <UIIcon icon={UIIcon.Icons.Arrow} className="Navigation-item-link-arrow" />
        </Link>
        <div
          className={cx('Navigation-dropdown', {
            ['Navigation-dropdown--has-images']: childrenHaveImages(),
          })}
          style={{ height, width }}
        >
          <div className="Navigation-dropdown-content" ref={contentRef}>
            {childrenHaveImages() && (
              <div className="Navigation-subheader">
                {navigationLink.title}
              </div>
            )}
            {childLinks}
          </div>
        </div>
      </li>
    )
  }

  // Nav item with image
  // Has no child links
  if (
    navigationLink.image &&
    navigationLink.image.src !== '' &&
    (typeof navigationLink.childLinks === 'undefined' || !navigationLink.childLinks.length)
  ) {
    const IMAGE_WIDTH = 720
    const IMAGE_HEIGHT = 630
    return (
      <li
        className={cx(
          'Navigation-item',
          'Navigation-item--image',
          `Navigation-item--level-${levelCount - 1}`,
        )}
      >
        <Link
          to={navigationLink.link}
          className={cx(
            'Navigation-item-link',
            'Navigation-item-link--block',
            `Navigation-item-link--level-${levelCount - 1}`,
          )}
          onFocus={onFocusChild}
          {...(!!navigationHidden &&
            {'tabIndex': -1}
          )}
        >
          <ResponsiveImage
            className="Navigation-item--image-image"
            src={navigationLink.image.src}
            alt={navigationLink.image.alt || navigationLink.title}
            sizes={'(min-width: 64em) 15em, 50vw'}
            height={navigationLink.image.height || IMAGE_HEIGHT}
            width={navigationLink.image.width || IMAGE_WIDTH}
            loading="lazy-polyfill"
          />
          <div className="Navigation-item-image-content">
            <span className="Navigation-item-title">
              {navigationLink.title}
              <span className="Navigation-item--accessible-title">, {navigationLink.accessibleTitle || parentLinks.map((parentLink, i) => (
                <React.Fragment key={i}>{(i === 0)? '':', '}{parentLink.title}</React.Fragment>
              ))}</span>
            </span>
          </div>
        </Link>
      </li>
    )
  }

  // Standard navigation item
  return (
    <li className={cx('Navigation-item', `Navigation-item--level-${levelCount - 1}`)}>
      <Link
        to={navigationLink.link}
        className={cx('Navigation-item-link', `Navigation-item-link--level-${levelCount - 1}`)}
        onFocus={onFocusChild}
        {...(!!navigationHidden &&
          {'tabIndex': -1}
        )}
      >
        {navigationLink.title}
        {!!navigationLink.accessibleTitle && (
          <span className="Navigation-item--accessible-title">, {navigationLink.accessibleTitle}</span>
        )}
      </Link>
      {childLinks}
    </li>
  )
}

const useCheckMedia = query => {
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

const Navigation = ({ menu, menuOpen, onMenuClose, navigationHidden }) => {
  let levelCount = 1
  let largeScreen = useCheckMedia('(min-width: 64em)') // Same as in the css
  const [activeDropdown, setActiveDropdown] = useState(null)

  const navRef = useRef()
  const [focus, focusCleanUp] = focusTrap(navRef)
  useEffect(() => {
    const exitMenuOnEsc = (e) => {
      if (e.which == 27) {
        if (typeof onMenuClose === 'function') {
          onMenuClose()
        }
      }
    }

    if (menuOpen && !largeScreen) {
      focus()
      if (!!navRef && !!navRef.current) {
        navRef.current.addEventListener('keydown', exitMenuOnEsc)
      }
    }

    return () => {
      if (!!navRef && !!navRef.current) {
        navRef.current.removeEventListener('keydown', exitMenuOnEsc)
      }
      focusCleanUp()
    }
  }, [menuOpen])

  const isChildFocused = navigationLink => {
    let childIsFocused = false
    const parentList = document.activeElement.closest(`.Navigation-item--level-${levelCount}`)
    if (parentList) {
      const focusedParentLink = parentList.querySelector(
        `.Navigation-item-link--level-${levelCount}`,
      )
      const focusedParentLinkHrefParts = focusedParentLink.href.replace('//', '').split('/')
      focusedParentLinkHrefParts.shift()
      const focusedParentLinkHref = `/${focusedParentLinkHrefParts.join('/')}`
      if (focusedParentLink && focusedParentLinkHref === navigationLink.link) {
        childIsFocused = true
      }
    }
    return childIsFocused
  }

  const onClick = (e, navigationLink) => {
    if (largeScreen) return
    e.preventDefault()
    setActiveDropdown(activeDropdown === navigationLink ? null : navigationLink)

    // TODO: make mobile dropdowns able to have multiple links open at once?
    // if (Array.isArray(activeDropdown)) {
    //   if (activeDropdown.includes(navigationLink)) {
    //     // already open so close
    //   } else {
    //     const tempArr = JSON.parse(JSON.stringify(activeDropdown));
    //     console.log('activeDropdown 1', tempArr);
    //
    //     setActiveDropdown(tempArr.push(navigationLink));
    //
    //     console.log('activeDropdown 2', activeDropdown);
    //   }
    // } else {
    //   setActiveDropdown([activeDropdown]);
    // }
    //
    // // Add to component
    // // active={activeDropdown === navigationLink || (Array.isArray(activeDropdown) && activeDropdown.includes(navigationLink))}
  }
  const onMouseEnter = (e, navigationLink) => {
    if (!largeScreen) return
    setActiveDropdown(navigationLink)
  }
  const onMouseLeave = (e, navigationLink) => {
    if (!largeScreen) return
    setActiveDropdown(null)
  }
  const onFocus = (e, navigationLink) => {
    if (!largeScreen) return
    setActiveDropdown(navigationLink)
  }
  const onBlur = (e, navigationLink) => {
    if (!largeScreen) return

    // Blur will set document.activeElement to the body before seting it to the next focused element
    // Use a setTimeout to make sure we are getting the next element and not the body
    setTimeout(() => {
      if (!isChildFocused(navigationLink)) {
        setActiveDropdown(null)
      }
    }, 0)
  }
  const onFocusChild = (e, navigationLink) => {
    setTimeout(() => {
      if (isChildFocused(navigationLink)) {
        setActiveDropdown(navigationLink)
      }
    }, 0)
  }

  return (
    <nav className="Navigation" ref={navRef}>
      {menuOpen &&
        <button
          className="Header-action Header-action--menu Header-action--menu-in-nav"
          onClick={() => {
            if (typeof onMenuClose === 'function') {
              onMenuClose()
            }
          }}
        >
          <span className="Header-menu-button Header-menu-button--close">
            <UIIcon icon={UIIcon.Icons.Close} className="Header-action-icon Header-action-icon--menu" />
            <span>Navigation menu opened. Press to close navigation menu</span>
          </span>
        </button>
      }

      {menu && menu.navigationLinks && menu.navigationLinks.length && (
        <ul className={cx('Navigation-list', `Navigation-list--level-${levelCount}`)}>
          {menu.navigationLinks.map((navigationLink, i) => (
            <LinkList
              navigationLink={navigationLink}
              navigationHidden={navigationHidden}
              key={i}
              levelCount={levelCount}
              active={activeDropdown === navigationLink}
              largeScreen={largeScreen}
              onClick={e => {
                onClick(e, navigationLink)
              }}
              onFocus={e => {
                onFocus(e, navigationLink)
              }}
              onBlur={e => {
                onBlur(e, navigationLink)
              }}
              onMouseEnter={e => {
                onMouseEnter(e, navigationLink)
              }}
              onMouseLeave={e => {
                onMouseLeave(e, navigationLink)
              }}
              onFocusChild={e => {
                onFocusChild(e, navigationLink)
              }}
            />
          ))}
        </ul>
      )}
    </nav>
  )
}

export default Navigation
