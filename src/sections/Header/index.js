import React, { useState, useRef, useEffect } from 'react'
import cx from 'classnames'
import Link from 'frontend-link'
import lazy from 'frontend-lazy'
import { useCartState, useCartActions } from 'frontend-checkout'
import Logo from 'Components/Logo'
import AnnouncementBar from 'Components/AnnouncementBar'
import Navigation from 'Components/Navigation'
import NavigationSlider from 'Components/NavigationSlider'
import UIIcon from 'Components/UIIcon'
import SkipToContent from 'Components/SkipToContent'

import './styles.css'

const CartDrawer = lazy(() => import('Components/CartDrawer'))
const SearchDrawer = lazy(() => import('Components/SearchDrawer'))

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

const Header = ({
  announcements = [],
  announcementsAutoplaySpeed,
  cartTitle = 'My Cart',
  menu = {},
  mobileSliderMenu = {},
  mysteryRingInfoText = null,
  mysteryRingProduct = null,
  cartDrawerLinks = [],
  globalDiscount = null,
}) => {
  const headerRef = useRef()
  const cartActionRef = useRef()
  const searchActionRef = useRef()
  const searchActionMobileRef = useRef()
  const menuActionRef = useRef()
  const { items, isCartShown } = useCartState()
  const { showCart } = useCartActions()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchLoaded, setSearchLoaded] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(null)
  const [mobileNavHeight, setMobileNavHeight] = useState(null)
  const [navigationHidden, setNavigationHidden] = useState(true)
  const largeScreen = useCheckMedia('(min-width: 37.5em)') // Same as in the css

  const updateCartCount = () => {
    let cartItemsQuantity = 0
    if (items.length) {
      items.forEach(item => {
        cartItemsQuantity += item.quantity
      })
    }
    return cartItemsQuantity
  }

  const updateHeaderHeight = () => {
    if (!headerRef.current) return

    setTimeout(function() {
      // hack so that the height is gotten after the css has finished rendering
      if (!!headerRef.current) {
        // Buy the time the timeout runs we may have lost the ref so check we still have it
        setHeaderHeight(headerRef.current.offsetHeight)
      }
    }, 1)

    if (largeScreen) {
      setMobileNavHeight('')
    } else {
      setMobileNavHeight(`calc(100vh - ${headerRef.current.offsetHeight}px)`)
    }
  }

  const onCartClose = () => {
    if (!!cartActionRef && !!cartActionRef.current) {
      cartActionRef.current.focus()
    }
  }

  const onSearchOpen = () => {
    if (!searchLoaded) setSearchLoaded(true)
    setSearchOpen(true)
  }

  const onSearchClose = () => {
    setSearchOpen(false)
    if (largeScreen) {
      if (!!searchActionRef && !!searchActionRef.current) {
        searchActionRef.current.focus()
      }
    } else {
      if (!!searchActionMobileRef && !!searchActionMobileRef.current) {
        searchActionMobileRef.current.focus()
      }
    }
  }

  useEffect(() => {
    window.addEventListener('resize', updateHeaderHeight)
    updateHeaderHeight()

    return () => window.removeEventListener('resize', updateHeaderHeight)
  })

  useEffect(() => {
    if (largeScreen) {
      setNavigationHidden(false)
    } else {
      setNavigationHidden(!menuOpen)
    }
  }, [menuOpen, largeScreen])

  return (
    <React.Fragment>
      <section className="Header-wrapper" style={{ paddingTop: headerHeight }}>
        <div className={cx('Header', { ['Header-menu--is-open']: menuOpen })} ref={headerRef}>
          <SkipToContent />
          {!!announcements.length && (
            <AnnouncementBar
              blocks={announcements}
              autoplaySpeed={announcementsAutoplaySpeed}
              onClose={() => {
                updateHeaderHeight()
              }}
            />
          )}
          <div className="Header-content-wrapper">
            <div className="Header-content">
              <div className="Header-actions Header-actions--left Header-actions--mobile">
                <button
                  className="Header-action Header-action--menu"
                  onClick={() => {
                    setMenuOpen(!menuOpen)
                  }}
                  ref={menuActionRef}
                >
                  {!menuOpen ? (
                    <span className="Header-menu-button Header-menu-button--open">
                      <UIIcon
                        icon={UIIcon.Icons.Menu}
                        className="Header-action-icon Header-action-icon--menu"
                      />
                      <span>Navigation menu closed. Press to open navigation menu</span>
                    </span>
                  ) : (
                    <span className="Header-menu-button Header-menu-button--close">
                      <UIIcon
                        icon={UIIcon.Icons.Close}
                        className="Header-action-icon Header-action-icon--menu"
                      />
                      <span>Navigation menu opened. Press to close navigation menu</span>
                    </span>
                  )}
                </button>

                <button
                  className="Header-action Header-action--search"
                  onClick={onSearchOpen}
                  ref={searchActionMobileRef}
                >
                  <UIIcon
                    icon={UIIcon.Icons.Search}
                    className="Header-action-icon Header-action-icon--search"
                  />
                  <span>Search the Groove Life site</span>
                </button>
              </div>

              <Link className="Header-logo" to="/">
                <Logo />
                <span className="Header-logo-title">Groove Life homepage</span>
              </Link>

              <div
                className="Header-navigation"
                style={{ height: mobileNavHeight }}
                {...(!largeScreen && { 'aria-modal': true, 'aria-hidden': navigationHidden })}
              >
                <Navigation
                  menu={menu}
                  menuOpen={menuOpen}
                  onMenuClose={() => {
                    setMenuOpen(!menuOpen)
                    if (!!menuActionRef && !!menuActionRef.current) {
                      menuActionRef.current.focus()
                    }
                  }}
                  navigationHidden={navigationHidden}
                />
              </div>

              <div className="Header-actions Header-actions--right">
                <button
                  className="Header-action Header-action--search"
                  onClick={onSearchOpen}
                  ref={searchActionRef}
                >
                  <UIIcon
                    icon={UIIcon.Icons.Search}
                    className="Header-action-icon Header-action-icon--search"
                  />
                  <span>Search the Groove Life site</span>
                </button>

                <button
                  className="Header-action Header-action--cart"
                  aria-label={`Cart with ${updateCartCount()} items`}
                  aria-live="assertive"
                  onClick={() => {
                    showCart()
                  }}
                  ref={cartActionRef}
                >
                  Cart
                  <span className="Header-cart-count" aria-hidden="true">
                    {updateCartCount()}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {mobileSliderMenu &&
          mobileSliderMenu.navigationLinks &&
          mobileSliderMenu.navigationLinks.length && <NavigationSlider menu={mobileSliderMenu} />}
        {isCartShown && (
          <CartDrawer
            mysteryRingInfoText={mysteryRingInfoText}
            mysteryRingProduct={mysteryRingProduct}
            title={cartTitle}
            emptyStateLinks={cartDrawerLinks}
            globalDiscount={globalDiscount}
            onCartClose={onCartClose}
          />
        )}
        {searchLoaded && <SearchDrawer isOpen={searchOpen} onClose={onSearchClose} />}
      </section>
      <a className="Header-mainContentAnchor" id="main">
        Main content begins below
      </a>
    </React.Fragment>
  )
}

export default Header
