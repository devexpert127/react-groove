import React, { createContext, useContext, useState, useRef } from 'react'
import { button, boolean, text, withKnobs } from '@storybook/addon-knobs'
import cx from 'classnames'
import {
  add,
  find,
  flip,
  includes,
  lensProp,
  map,
  pipe,
  propEq,
  range,
  reject,
  set,
  toString,
} from 'ramda'
import Button from 'Components/Button'
import CartDrawer from './'
import MysteryProductImage from '../../static/mystery-ring.jpg'
import cart from '../../static/cartItems'
export default { title: 'Cart / Cart Drawer', component: CartDrawer, decorators: [withKnobs] }

// NOTE: We use an image from the Shopify CDN in order to test the imageSrc
//       function in index.js.
const shopifyImageSrc =
  'https://cdn.shopify.com/s/files/1/1011/1278/products/mens_silicone_rings_deep_stone_grey.jpg?v=1571438836'

export const cartDrawer = () => {
  const [isCartShown, setIsCartShown] = useState(true)
  // See: https://shopify.dev/docs/storefront-api/reference/object/orderlineitem
  const [items, setItems] = useState(cart.items)

  const mysteryRingProduct = {
    media: [
      {
        details: {
          alt: '',
          src: MysteryProductImage,
        },
      },
    ],
    name: 'Mystery Ring only $14.95 (save $15)',
    slug: 'mystery-ring',
    variants: map(
      n => ({
        availableForSale: true,
        name: toString(n),
        externalId: toString(n + 10),
      }),
      range(4, 14),
    ),
  }

  button('Toggle open', () => {
    setIsCartShown(!isCartShown)
  })

  const mysteryRingInfoText = [
    {
      children: [
        {
          text: 'Based on the rings you bought, our team selects a ring you might also like. ',
        },
        {
          bold: true,
          text: 'Note:',
        },
        {
          text: ' Exchangeable for another mystery ',
        },
        {
          text: 'size only',
          underline: true,
        },
        {
          text: ' but not warrantied.',
        },
      ],
      type: 'paragraph',
    },
  ]

  const emptyStateLinks = [
    {
      link: '/shop-men',
      title: 'Shop Men',
    },
    {
      link: '/shop-women',
      title: 'Shop Women',
    },
    {
      link: '/collections/new-for-him-new-for-her',
      title: 'Shop New',
    },
    {
      link: '/collections/best-sellers',
      title: 'Shop Best Sellers',
    },
  ]

  let globalDiscount
  if (boolean('Apply global discount?', true)) {
    globalDiscount = {
      enabled: true,
      displayMessage: '20% off everything',
      discountAmount: '20%',
      priceChange: 0,
      discountCode: 'TEST',
      excludeBelts: boolean('Exclude belts from global discount?', true),
    }
  }

  const openButtonRef = useRef()
  const onCartClose = () => {
    if (!!openButtonRef && !!openButtonRef.current) {
      openButtonRef.current.focus()
    }
  }

  return (
    <div className="Page" style={{ padding: '1rem' }}>
      <Button as="button" onClick={() => setIsCartShown(true)} parentRef={openButtonRef}>
        Open cart
      </Button>
      {/* Tall element for testing scroll lock. */}
      <div
        style={{
          backgroundImage: 'linear-gradient(#f00, #00f)',
          height: '200vh',
          marginTop: '1rem',
          width: '50vw',
        }}
      ></div>
      <CartContext.Provider
        value={{
          isCartShown,
          items,
          setIsCartShown,
          setItems,
        }}
      >
        <CartDrawer
          hooks={{ useCartActions, useCartState }}
          mysteryRingInfoText={mysteryRingInfoText}
          mysteryRingProduct={mysteryRingProduct}
          title={text('Title', 'My Cart')}
          emptyStateLinks={emptyStateLinks}
          globalDiscount={globalDiscount}
          onCartClose={onCartClose}
        />
      </CartContext.Provider>
    </div>
  )
}

const CartContext = createContext()

function useCartActions() {
  const cart = useContext(CartContext)

  return {
    addItems: ({ id, quantity }) => {
      return new Promise(resolve => {
        // Simulate API call delay.
        setTimeout(() => {
          // NOTE: Unimplemented (too complex; requires API calls).

          resolve()
        }, 300)
      })
    },
    hideCart: () => cart.setIsCartShown(false),
    removeItems: ids => {
      if (!Array.isArray(ids)) {
        ids = [ids]
      }
      return new Promise(resolve => {
        // Simulate API call delay.
        setTimeout(() => {
          const toRemove = item => {
            return includes(item.id, ids)
          }
          cart.setItems(reject(toRemove, cart.items))

          resolve()
        }, 300)
      })
    },
    showCart: () => cart.setIsCartShown(true),
    updateItems: items => {
      if (!Array.isArray(items)) {
        items = [items]
      }

      return new Promise(resolve => {
        // Simulate API call delay.
        setTimeout(() => {
          const updateItem = item => {
            const matchingItem = find(propEq('id', item.id), items)
            if (matchingItem) {
              return set(lensProp('quantity'), matchingItem.quantity, item)
            } else {
              return item
            }
          }
          cart.setItems(map(updateItem, cart.items))

          resolve()
        }, 300)
      })
    },
  }
}

function useCartState() {
  const { isCartShown, items } = useContext(CartContext)

  return {
    checkoutUrl:
      'https://groove-rings.myshopify.com/10111278/checkouts/72a0dc34b853969a515e1849e6280700?key=3d80bc43849f7b881d465c187a736e87',
    isCartShown,
    items: boolean('Empty cart?', false) ? [] : items,
  }
}

document.body.style.padding = '0'

cartDrawer.parameters = {
  backgrounds: {
    values: [
      { name: 'dark', value: '#191818' },
      { name: 'default', value: '#e7e9ea', default: true },
      { name: 'white', value: '#fff' },
    ],
  },
}
