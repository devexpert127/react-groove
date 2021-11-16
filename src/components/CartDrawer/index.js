import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'frontend-router'
import { useCartActions, useCartState } from 'frontend-checkout'
import cx from 'classnames'
import Link from 'frontend-link'
import Button from 'Components/Button'
import DrawerContainer from 'Components/DrawerContainer'
import MysteryRing from 'Components/MysteryRing'
import ProductPrice from 'Components/ProductPrice'
import UIIcon from 'Components/UIIcon'
import {
  getStoredDiscountCode,
  removeStoredDiscountCode,
  getCartFlashMessage,
  unsetCartFlashMessage,
  cartFlashMessageWasViewed,
} from 'Components/DiscountCodeURLShared'
import {
  getDiscountParts,
  getDiscountFlateRate,
  getDiscountPrecent,
  formatMoney,
} from 'Components/ProductShared'
import './styles.css'

let groupedProducts = {}

let debugHooks = false
const getCartActions = () => (debugHooks ? debugHooks.useCartActions() : useCartActions())
const getCartState = () => (debugHooks ? debugHooks.useCartState() : useCartState())

const CartDrawer = ({
  hooks = {},
  mysteryRingInfoText = null,
  mysteryRingProduct = null,
  title = 'My Cart',
  emptyStateText = 'Your cart is lonely...',
  emptyStateLinks = [],
  globalDiscount = null,
  onCartClose = () => {},
}) => {
  if (
    hooks.useCartActions &&
    typeof hooks.useCartActions === 'function' &&
    hooks.useCartState &&
    typeof hooks.useCartState === 'function'
  ) {
    // only used in Storybook were we don't have access to the real hooks
    debugHooks = hooks
  }

  const { hideCart } = getCartActions()
  const { isCartShown, items } = getCartState()
  const [loaded, setLoaded] = useState(false)
  const containerRef = useRef(null)

  const actionHideCart = () => {
    hideCart()
    if (typeof onCartClose === 'function') {
      onCartClose()
    }
  }

  useEffect(() => {
    if (!containerRef?.current) return

    function onAnimationEnds() {
      setLoaded(true)

      containerRef.current.removeEventListener('animationend', onAnimationEnds)
    }

    containerRef.current.addEventListener('animationend', onAnimationEnds)
  }, [isCartShown])

  return (
    <DrawerContainer isOpen={isCartShown} onClickOut={actionHideCart}>
      <div ref={containerRef} className={cx('CartDrawer', { loaded })}>
        <div className="CartDrawer-header">
          <UIIcon icon={UIIcon.Icons.Cart} className="CartDrawer-cartIcon" />
          <h2 className="CartDrawer-title">{title}</h2>
          <Button
            as="button"
            className="CartDrawer-close"
            onClick={actionHideCart}
            style="unstyled"
            {...(!isCartShown && { tabIndex: -1 })}
          >
            <UIIcon className="CartDrawer-closeButton" icon={UIIcon.Icons.Close} />
            <span className="CartDrawer-icon-text">Close cart</span>
          </Button>
        </div>
        <div
          className={cx('CartDrawer-container', {
            ['CartDrawer-container--has-items']: items.length > 0,
          })}
        >
          <CartFlashMessage isCartShown={isCartShown} />
          {items.length > 0 ? (
            <List
              mysteryRingInfoText={mysteryRingInfoText}
              mysteryRingProduct={mysteryRingProduct}
              globalDiscount={globalDiscount}
              isCartShown={isCartShown}
              actionHideCart={actionHideCart}
            />
          ) : (
            <EmptyList
              emptyStateText={emptyStateText}
              emptyStateLinks={emptyStateLinks}
              isCartShown={isCartShown}
              actionHideCart={actionHideCart}
            />
          )}
        </div>
      </div>
    </DrawerContainer>
  )
}

function List({
  mysteryRingInfoText,
  mysteryRingProduct,
  globalDiscount,
  isCartShown,
  actionHideCart,
}) {
  const { checkoutUrl, items } = getCartState()
  const [scrollVisible, setScrollVisible] = useState(false)
  const itemsContainer = useRef()
  const cartItems = items.filter(item => (!!item.variant ? item : false))
  const brokenItems = items.filter(item => (!item.variant ? item : false))
  const [bundles, unbundledItems] = groupBundledItems(cartItems)
  const themeID = useQuery().get('preview_theme_id')
  const goToCheckout = e => {
    if (typeof window !== 'undefined') {
      e.preventDefault()
      const checkoutURL = getCheckoutUrl(checkoutUrl, globalDiscount, themeID)
      removeStoredDiscountCode()
      window.location = checkoutURL
    }
  }

  const toggleScrollMessage = debounce(() => {
    if (!!itemsContainer.current) {
      const scrollTop = itemsContainer.current.scrollTop
      const scrollHeight = itemsContainer.current.scrollHeight
      const offsetHeight = itemsContainer.current.offsetHeight
      const heightDiff = scrollHeight - offsetHeight
      const heightDiffBuffed = heightDiff - 5 // have the scroll message dismiss 5px before the end to get around rounding issues
      setScrollVisible(heightDiff > 0 && heightDiffBuffed > scrollTop)
    }
  })

  if (isCartShown) {
    if (window.dataLayer && window.dataLayer !== undefined) {
      const cartItems = items.map(function(item, idx) {
        if (!item.variant) {
          return item
        }
        return {
          position: idx,
          id: item.sku,
          productId: item.id,
          variantId: item.variant.id,
          name: item.product_title.replace("'", ''),
          quantity: item.quantity,
          price: item.final_price,
          variant: item.title,
        }
      })

      const cartImpressionsGtmData = {
        ecommerce: {
          actionField: { list: 'Shopping Cart' },
          impressions: cartItems,
        },
      }

      window.dataLayer.push(cartImpressionsGtmData)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      toggleScrollMessage()
      window.addEventListener('resize', toggleScrollMessage)
      if (!!itemsContainer.current)
        itemsContainer.current.addEventListener('scroll', toggleScrollMessage)
      return () => {
        window.removeEventListener('resize', toggleScrollMessage)
        if (!!itemsContainer.current)
          itemsContainer.current.removeEventListener('scroll', toggleScrollMessage)
      }
    }
  })

  return (
    <React.Fragment>
      <Button
        as="button"
        className="CartDrawer-continueShopping"
        onClick={actionHideCart}
        style="unstyled"
        {...(!isCartShown && { tabIndex: -1 })}
      >
        Continue shopping
      </Button>
      <div className="CartDrawer-items" ref={itemsContainer}>
        {!!brokenItems.length && <ItemWarnings items={brokenItems} isCartShown={isCartShown} />}
        {unbundledItems.map((item, i) => (
          <Item item={item} key={i} globalDiscount={globalDiscount} isCartShown={isCartShown} />
        ))}
        {Object.values(bundles).map((bundle, i) => (
          <Bundle bundle={bundle} key={`${i}-bundle`} isCartShown={isCartShown} />
        ))}
        {mysteryRingProduct && (
          <MysteryRing
            infoText={mysteryRingInfoText}
            product={mysteryRingProduct}
            isCartShown={isCartShown}
          />
        )}
      </div>
      <div className="CartDrawer-footer">
        <div className={cx('CartDrawer-scroll', { ['CartDrawer-scroll--visible']: scrollVisible })}>
          <div className="CartDrawer-scroll-button">
            <p className="CartDrawer-scroll-message">
              Scroll for more items
              <svg
                aria-hidden="true"
                focusable="false"
                role="presentation"
                className="icon icon-arrow-down"
                viewBox="0 0 512 640"
              >
                <path d="M256 42.5c-9.4 0-17 7.6-17 17v352.1l-72.4-71.9c-6.7-6.6-17.4-6.6-24 .1-6.6 6.7-6.6 17.4.1 24L244 464.5c3.3 3.3 7.6 4.9 12 4.9s8.7-1.6 12-4.9l101.4-100.7c6.7-6.6 6.7-17.4.1-24-6.6-6.7-17.4-6.7-24-.1L273 411.6V59.5c0-9.3-7.6-17-17-17z" />
              </svg>
            </p>
          </div>
        </div>

        <div className="CartDrawer-subtotal">
          <span>Subtotal</span>
          <span>
            {formatMoney(
              convertPriceDollars(calculateSubtotal(bundles, unbundledItems, globalDiscount)),
            )}
          </span>
        </div>
        {cartHasDiscount(items, globalDiscount) && (
          <div className="CartDrawer-totalDiscount">
            You&apos;re saving{' '}
            <span>
              {formatMoney(
                convertPriceDollars(getDiscountTotal(bundles, unbundledItems, globalDiscount)),
              )}
            </span>
          </div>
        )}
        <Button
          className="CartDrawer-checkoutButton"
          as="button"
          style="primary"
          onClick={goToCheckout}
          {...(!isCartShown && { tabIndex: -1 })}
        >
          Check out
        </Button>
      </div>
    </React.Fragment>
  )
}

function groupBundledItems(items) {
  return items.reduce(
    ([bundles, unbundledItems], item) => {
      const bundledBy = customAttribute(item, 'bundledBy')
      const bundleId = customAttribute(item, 'bundleId')

      if (bundledBy) {
        bundles[bundledBy] = bundles[bundledBy] || {}
        bundles[bundledBy].children = bundles[bundledBy].children || []
        bundles[bundledBy].children.push(item)
      }
      if (bundleId) {
        bundles[bundleId] = bundles[bundleId] || {}
        bundles[bundleId].master = item
      }
      if (!bundledBy && !bundleId) {
        unbundledItems.push(item)
      }

      return [bundles, unbundledItems]
    },
    [{}, []],
  )
}

function customAttribute(item, keyName) {
  const attribute = item.properties[keyName] ? item.properties[keyName] : false
  if (attribute) {
    return attribute
  } else {
    return null
  }
}

function EmptyList({ emptyStateText = null, emptyStateLinks, isCartShown, actionHideCart }) {
  return (
    <div className="CartDrawer-items--empty">
      {emptyStateText && <p className="CartDrawer-empty-text">{emptyStateText}</p>}
      {typeof emptyStateLinks !== 'undefined' && !!emptyStateLinks.length && (
        <ul className="CartDrawer-empty-links">
          {emptyStateLinks.map((emptyStateLink, i) => (
            <li key={i}>
              <Button
                style="default"
                as={Link}
                to={emptyStateLink.link}
                onClick={() => {
                  actionHideCart()
                }}
                {...(!isCartShown && { tabIndex: -1 })}
              >
                {emptyStateLink.title}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function CartFlashMessage({ isCartShown }) {
  const flashIDs = ['discountCode']
  const flashes = []
  const unvewiedFlashes = []

  const { showCart } = getCartActions()
  const [openCart, setOpenCart] = useState(false)
  const [flashCount, setFlashCount] = useState(0) // used to force rerender on click

  const onDismissFlash = id => {
    unsetCartFlashMessage(id)
    setFlashCount(count => count + 1)
  }

  useEffect(() => {
    if (openCart) {
      showCart()
    }
  }, [openCart])

  flashIDs.forEach(id => {
    const flash = getCartFlashMessage(id)
    if (!!flash) {
      if (!flash.vewied) {
        unvewiedFlashes.push(id)
        cartFlashMessageWasViewed(id)
      }
      flashes.push(flash)
    }
  })

  if (!!flashes.length && !!unvewiedFlashes.length) {
    setOpenCart(true)
  }

  return (
    <div className={cx('CartFlash', { ['CartFlash--empty']: !flashes.length })} aria-live="polite">
      {!!flashes.length &&
        flashes.map((flash, i) => (
          <div className="CartFlash-item" id={`CartFlash-${flash.id}`} key={i}>
            <p dangerouslySetInnerHTML={{ __html: flash.message }} />
            <Button
              as="button"
              className="CartFlash-close"
              onClick={() => {
                onDismissFlash(flash.id)
              }}
              style="unstyled"
              {...(!isCartShown && { tabIndex: -1 })}
            >
              <UIIcon className="CartFlash-closeButton" icon={UIIcon.Icons.Close} />
              <span className="CartFlash-icon-text">Dismiss message</span>
            </Button>
          </div>
        ))}
    </div>
  )
}

function ItemWarnings({ items, isCartShown }) {
  const { removeItems } = getCartActions()
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div className="CartWarning">
      <h3 className="CartWarning-title">
        <span className="CartWarning-title-highlight">Warning:</span> The following items in your
        cart are no longer available.
      </h3>
      <ul>
        {items.map((item, i) => (
          <li className="CartWarning-item" key={i}>
            <div>
              <strong>{item.product_title}</strong>
              <Button
                as="button"
                className="CartItem-remove"
                disabled={isLoading}
                onClick={() => {
                  setIsLoading(true)
                  removeItems(item.id).then(
                    () => {
                      trackRemoveItems(item)
                      setIsLoading(false)
                    },
                    () => {
                      setIsLoading(false)
                    },
                  )
                }}
                style="unstyled"
                {...(!isCartShown && { tabIndex: -1 })}
              >
                <span>Remove</span>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Item({ item, globalDiscount, isCartShown }) {
  const { removeItems, updateItems } = getCartActions()
  const [isLoading, setIsLoading] = useState(false)
  const hasDiscount = itemHasDiscount(item, globalDiscount)

  if (!item.variant) {
    return null
  }

  let priceProps = {
    price: convertPriceDollars(item.final_price * item.quantity),
  }
  if (hasDiscount) {
    priceProps = {
      ...priceProps,
      isOnSale: true,
      price: convertPriceDollars(getDiscountedPrice(item, globalDiscount)),
      priceClassName: 'CartItem-price--sale',
      comparePrice: convertPriceDollars(getCompareAtLineTotal(item)),
      comparePriceClassName: 'CartItem-compareAtPrice',
    }
  }
  item.priceProps = priceProps
  let prePricesText = `${item.variant_title} –`
  if (
    !item.variant_title ||
    item.variant_title.toLowerCase() === 'default' ||
    item.variant_title.toLowerCase() === 'default title'
  ) {
    prePricesText = ''
  }
  let customThumbnailImg = undefined
  let customLinkedProduct = undefined
  // ToDo:
  // 1. Look up property directly rather than looping through keys.
  // const customThumbnailImg = item.properties && item.properties['custom-link-id'] ? item.properties['custom-link-id'] : undefined;
  // 2. set customLinkedProduct in the same way
  Object.entries(item.properties).map(([key, value]) => {
    if (key.indexOf('custom-link-id') === 0) {
      customThumbnailImg = value
    }
  })
  return (
    <div className="CartItem">
      <div className="CartItem-image">
        <Link to={href(item)} {...(!isCartShown && { tabIndex: -1 })}>
          <img
            alt={item.featured_image.alt}
            src={
              customThumbnailImg ? customThumbnailImg : imageSrc(item.featured_image.url, '300x300')
            }
          />
        </Link>
      </div>
      <div className="CartItem-content">
        <div className="CartItem-title">
          <Link to={href(item)} {...(!isCartShown && { tabIndex: -1 })}>
            {item.product_title}
          </Link>
        </div>
        <ProductPrice
          className="CartItem-details"
          prePricesText={prePricesText}
          priceClassName="CartItem-price"
          {...priceProps}
        />
        {item.properties && item.properties !== {} ? (
          <ul className="CartItem-attributes">
            {Object.entries(item.properties).map(([key, value], i) => {
              // ToDo:
              // 1. see previous ToDo
              // 2. we can look this up and set in same place we set customThumbnailImg
              // const customLinkedProduct = item.properties && item.properties['link-id'] ? item.properties['link-id'] : undefined;
              if (key === 'link-id') {
                customLinkedProduct = value
              }
              // ToDo:
              // 1. Assuming we were looking up _custom-link-id
              //    based on this code we could lookup _custom-link-id or _*custom-link-id
              // 2. Look up property directly rather than looping through keys.
              // const customLinkedId = item.properties && item.properties['_custom-link-id'] ? item.properties['_custom-link-id'] : undefined;
              //
              if (key.indexOf('_') !== 0 && key.indexOf('custom-link-id') !== 0) {
                return <li key={i}>{`${key}: ${value}`}</li>
              }
            })}
            {customLinkedProduct
              ? // add/create reference for products to be removed in batch
                (addItemToGroupedProducts(customLinkedProduct, item.id),
                (
                  <li>{`Note: If you delete this product, you will remove your other linked items from your cart as well!`}</li>
                ))
              : ''}
          </ul>
        ) : null}
        <Button
          as="button"
          className="CartItem-remove"
          disabled={isLoading}
          onClick={() => {
            setIsLoading(true)

            // accomodate for needing to remove a group of products w/ a single product
            let itemID = item.id

            if (customLinkedProduct && groupedProducts[customLinkedProduct] !== undefined) {
              itemID = groupedProducts[customLinkedProduct]
            }

            removeItems(itemID).then(
              () => {
                trackRemoveItems(item)
                setIsLoading(false)
              },
              () => {
                setIsLoading(false)
              },
            )
          }}
          style="unstyled"
          {...(!isCartShown && { tabIndex: -1 })}
        >
          <span>Delete</span>
        </Button>
        {customLinkedProduct ? (
          <div className="CartItem-qtyNum">{item.quantity}</div>
        ) : (
          <div className="CartItem-qty">
            <Button
              as="button"
              className="CartItem-qtyDec"
              disabled={isLoading || item.quantity <= 1}
              onClick={() => {
                setIsLoading(true)
                updateItems({ id: item.id, quantity: Math.max(1, item.quantity - 1) }).then(
                  () => {
                    trackRemoveItems(item)
                    setIsLoading(false)
                  },
                  () => {
                    setIsLoading(false)
                  },
                )
              }}
              style="unstyled"
              {...(!isCartShown && { tabIndex: -1 })}
            >
              <UIIcon icon={UIIcon.Icons.Minus} />
              <span>Remove 1 {item.product_title}</span>
            </Button>
            <div className="CartItem-qtyNum">{item.quantity}</div>
            <Button
              as="button"
              className="CartItem-qtyInc"
              disabled={isLoading}
              onClick={() => {
                setIsLoading(true)
                updateItems({ id: item.id, quantity: item.quantity + 1 }).then(
                  () => {
                    trackAddItems(item)
                    setIsLoading(false)
                  },
                  () => {
                    setIsLoading(false)
                  },
                )
              }}
              style="unstyled"
              {...(!isCartShown && { tabIndex: -1 })}
            >
              <UIIcon icon={UIIcon.Icons.Plus} />
              <span>Add 1 {item.product_title}</span>
            </Button>
          </div>
        )}
        {hasDiscount && (
          <ul className="CartItem-discounts">
            {item.line_level_discount_allocations.map((discountAllocation, i) => {
              return (
                <li key={i}>
                  <small>
                    {discountAllocation.discount_application.description ||
                      discountAllocation.discount_application.title}
                  </small>
                </li>
              )
            })}
            {cartHasGlobalDiscount(globalDiscount) && itemHasGlobalDiscount(item, globalDiscount) && (
              <li>
                <small>{globalDiscount.displayMessage}</small>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

function Bundle({ bundle, isCartShown }) {
  const { removeItems, updateItems } = getCartActions()
  const [isLoading, setIsLoading] = useState(false)
  const { master, children } = bundle

  // NOTE: Ignore inconsistent bundles (leave handling to checkout scripts).
  if (!master || typeof children === 'undefined' || children.length === 0) {
    return null
  }

  master.priceProps = {
    price: convertPriceDollars(calculateBundlePrice(bundle)),
    comparePrice: convertPriceDollars(calculateBundleOriginalPrice(bundle)),
  }

  return (
    <div className="CartItem CartItem--bundle">
      <div className="CartItem-image">
        <Link to={href(master)} {...(!isCartShown && { tabIndex: -1 })}>
          <img
            alt={master.featured_image.alt}
            src={imageSrc(master.featured_image.url, '300x300')}
          />
        </Link>
      </div>
      <div className="CartItem-content">
        <div className="CartItem-title">
          <Link to={href(master)} {...(!isCartShown && { tabIndex: -1 })}>
            {master.product_title}
          </Link>
        </div>
        <div className="CartItem-bundledProducts">
          {children.map((item, i) => (
            <div className="BundledItem-title" key={i}>
              {item.product_title}: {item.variant_title}
            </div>
          ))}
        </div>
        <ProductPrice
          className="CartItem-details"
          isOnSale={true}
          comparePrice={master.priceProps.comparePrice}
          price={master.priceProps.price}
        />
        {/*
          <div className="CartItem-percentDiscount">
            {percentDiscount(master)}% discount!
          </div>
          */}
        <Button
          as="button"
          className="CartItem-remove"
          disabled={isLoading}
          onClick={() => {
            const items = [master.variant.id, ...children.map(item => item.id)]
            setIsLoading(true)
            removeItems(items).then(
              () => {
                trackRemoveItems(items)
                setIsLoading(false)
              },
              () => {
                setIsLoading(false)
              },
            )
          }}
          style="unstyled"
          {...(!isCartShown && { tabIndex: -1 })}
        >
          <span>Delete</span>
        </Button>
        <div className="CartItem-qty">
          <Button
            as="button"
            className="CartItem-qtyDec"
            disabled={isLoading || master.quantity <= 1}
            onClick={() => {
              const items = [master, ...children].map(item => ({
                id: item.id,
                quantity: Math.max(1, item.quantity - 1),
              }))
              setIsLoading(true)
              updateItems(items).then(
                () => {
                  trackRemoveItems(items)
                  setIsLoading(false)
                },
                () => {
                  setIsLoading(false)
                },
              )
            }}
            style="unstyled"
            {...(!isCartShown && { tabIndex: -1 })}
          >
            <UIIcon icon={UIIcon.Icons.Minus} />
            <span>Remove 1 {master.product_title}</span>
          </Button>
          <div className="CartItem-qtyNum">{master.quantity}</div>
          <Button
            as="button"
            className="CartItem-qtyInc"
            disabled={isLoading}
            onClick={() => {
              const items = [master, ...children].map(item => ({
                id: item.id,
                quantity: item.quantity + 1,
              }))
              setIsLoading(true)
              updateItems(items).then(
                () => {
                  trackAddItems(items)
                  setIsLoading(false)
                },
                () => {
                  setIsLoading(false)
                },
              )
            }}
            style="unstyled"
            {...(!isCartShown && { tabIndex: -1 })}
          >
            <UIIcon icon={UIIcon.Icons.Plus} />
            <span>Add 1 {master.title}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

function href(item) {
  return item.url.split('?')[0]
}

function addItemToGroupedProducts(customLinkedProduct, itemID) {
  if (groupedProducts[customLinkedProduct] != undefined) {
    groupedProducts[customLinkedProduct][groupedProducts[customLinkedProduct].length] = itemID
  } else {
    groupedProducts[customLinkedProduct] = [itemID]
  }
}
function getCompareAtLineTotal(item) {
  if (!item.variant) return 0
  /*
    Discount applied by cart scrpts or by compareAtPrice.
    compareAtPrice already has discount baked fin.
  */
  if (itemHasCompareAtDiscount(item)) {
    return item.original_price * item.quantity
  } else {
    return item.final_price * item.quantity
  }
}

function cartHasDiscount(items, globalDiscount) {
  let hasDiscount = false
  if (cartHasGlobalDiscount(globalDiscount)) {
    hasDiscount = true
  } else {
    for (const item of items) {
      if (itemHasDiscount(item, globalDiscount)) {
        hasDiscount = true
        break
      }
    }
  }
  return hasDiscount
}

function cartHasGlobalDiscount(globalDiscount) {
  return globalDiscount && globalDiscount.enabled && globalDiscount.discountCode !== ''
}

function itemHasDiscount(item, globalDiscount) {
  /*
    Discount applied by cart scrpts, compareAtPrice, or global discount code
  */
  return (
    item.line_level_discount_allocations.length > 0 ||
    itemHasCompareAtDiscount(item) ||
    itemHasGlobalDiscount(item, globalDiscount)
  )
}

function itemHasCompareAtDiscount(item) {
  if (!item.variant) return false
  const compareAtPrice = parseFloat(item.original_price)
  const price = parseFloat(item.final_price)
  return compareAtPrice > price
}

function itemHasGlobalDiscount(item, globalDiscount) {
  /*
    Item is eligable for global discount if:
    - is not mystery ring
    - is not bundle (handled by not including globalDiscount inside bundle functions)
    - is not belt when explictly excluded
  */

  if (!globalDiscount) return

  const regexp = new RegExp(`mystery|bundle|gift card${globalDiscount.excludeBelts ? '|belt' : ''}`)
  return !regexp.test(item.product_title.toLowerCase())
}

function getDiscountedPrice(item, globalDiscount) {
  if (!item.variant) return 0
  /*
    Discount applied by cart scrpts or by compareAtPrice.
    compareAtPrice already has discount baked in.
  */
  let discountedPrice = item.final_line_price

  // Apply global discount on top if eligable
  if (itemHasGlobalDiscount(item, globalDiscount)) {
    discountedPrice = getGlobalDiscountedPrice(discountedPrice, globalDiscount)
  }

  return discountedPrice
}

function getGlobalDiscountedPrice(discountedPrice, globalDiscount) {
  if (globalDiscount.discountAmount !== '') {
    try {
      const { discountType, discountAmount } = getDiscountParts(globalDiscount.discountAmount)
      switch (discountType) {
        case '$':
          return getDiscountFlateRate(discountAmount, discountedPrice)
        default:
          // %
          return getDiscountPrecent(discountAmount, discountedPrice)
      }
    } catch (e) {
      console.error('CartDrawer.getGlobalDiscountedPrice error:', e, globalDiscount)
      return discountedPrice
    }
  }
  return discountedPrice
}

function getDiscountTotal(bundles, unbundledItems, globalDiscount) {
  return (
    calculateOriginalTotal(bundles, unbundledItems) -
    calculateSubtotal(bundles, unbundledItems, globalDiscount)
  )
}

function calculateOriginalTotal(bundles, unbundledItems) {
  return calculateOriginalBundlesTotal(bundles) + calculateOriginalUnbundledTotal(unbundledItems)
}

function calculateOriginalUnbundledTotal(unbundledItems) {
  return unbundledItems.reduce((total, item) => {
    return total + getCompareAtLineTotal(item)
  }, 0)
}

function calculateOriginalBundlesTotal(bundles) {
  return Object.values(bundles).reduce((total, bundle) => {
    return total + calculateBundleOriginalPrice(bundle)
  }, 0)
}

function calculateSubtotal(bundles, unbundledItems, globalDiscount) {
  const n1 = Object.values(bundles).reduce((subtotal, bundle) => {
    return subtotal + calculateBundlePrice(bundle)
  }, 0)

  const n2 = unbundledItems.reduce((subtotal, item) => {
    if (itemHasDiscount(item, globalDiscount)) {
      return subtotal + getDiscountedPrice(item, globalDiscount)
    } else {
      if (!item.variant) return 0
      const amount = parseFloat(item.final_price)
      return subtotal + amount * item.quantity
    }
  }, 0)

  return n1 + n2
}

function calculateBundlePrice({ master, children }) {
  // NOTE: Ignore inconsistent bundles (leave handling to checkout scripts).
  if (!master || typeof children === 'undefined' || children.length === 0) {
    return 0
  }

  const discount = percentDiscount(master)

  return children.reduce((subtotal, item) => {
    const amount = getDiscountPrecent(discount, parseFloat(item.final_price))

    return subtotal + amount * item.quantity
  }, 0)
}

function calculateBundleOriginalPrice({ master, children }) {
  // NOTE: Ignore inconsistent bundles (leave handling to checkout scripts).
  if (!master || typeof children === 'undefined' || children.length === 0) {
    return 0
  }

  return children.reduce((subtotal, item) => {
    const amount = parseFloat(item.final_price)

    return subtotal + amount * item.quantity
  }, 0)
}

function percentDiscount(master) {
  return parseFloat(customAttribute(master, 'bundlePercentDiscount'))
}

const convertPriceDollars = price => price / 100

function useQuery() {
  const router = useRouter()
  const { search } = router.location

  return new URLSearchParams(search)
}

function getCheckoutUrl(checkoutUrl, discount, themeID) {
  const themePreview = !!themeID ? `preview_theme_id=${themeID}` : false
  const urlJoin = /\?/.test(checkoutUrl) ? '&' : '?'

  let discountCode = getStoredDiscountCode() || false
  if (!discountCode && cartHasGlobalDiscount(discount)) {
    discountCode = discount.discountCode
  }

  if (!!discountCode) {
    return `${checkoutUrl}${urlJoin}discount=${discountCode}${
      themePreview ? `&${themePreview}` : ''
    }`
  }
  return `${checkoutUrl}${themePreview ? `${urlJoin}${themePreview}` : ''}`
}

// TODO: Replace this when Frontend comes up with a built-in solution for
//       responsive images for line items.
//
//       This workaround simply applies a size to the Shopify CDN URL.
function imageSrc(originalSrc, size) {
  return originalSrc.replace(/(\.\w{3,4})(\?.+)?$/, (match, p1, p2) => {
    return `_${size}${p1}${p2 || ''}`
  })
}

function debounce(fn, ms = 100) {
  let timer
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  }
}

function trackRemoveItems(items) {
  if (window.dataLayer && window.dataLayer !== undefined) {
    if (typeof items !== 'object' || items.length === undefined) {
      items = [items]
    }

    window.dataLayer.push({
      event: 'removeFromCart',
      ecommerce: {
        remove: {
          products: items.map(item => {
            return {
              name: item.product_title.replace("'", ''),
              id: item.sku || '',
              productId: item.product_id || '',
              variantId: (item.variant && item.variant.id) || '',
              price: (item.priceProps && item.priceProps.price) || '',
              compareAtPrice: (item.priceProps && item.priceProps.compareAtPrice) || '',
              variant: item.variant || '',
              quantity: item.quantity,
            }
          }),
        },
      },
    })
  }
}

function trackAddItems(items) {
  if (window.dataLayer && window.dataLayer !== undefined) {
    if (typeof items !== 'object' || items.length === undefined) {
      items = [items]
    }

    window.dataLayer.push({
      event: 'addToCart',
      ecommerce: {
        add: {
          products: items.map(item => {
            return {
              name: item.product_title.replace("'", ''),
              id: item.sku || '',
              productId: item.product_id || '',
              variantId: (item.variant && item.variant.id) || '',
              price: (item.priceProps && item.priceProps.price) || '',
              compareAtPrice: (item.priceProps && item.priceProps.compareAtPrice) || '',
              variant: item.variant || '',
              quantity: item.quantity,
            }
          }),
        },
      },
    })
  }
}

export default CartDrawer
