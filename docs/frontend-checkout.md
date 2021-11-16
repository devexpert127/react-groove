# frontend-checkout hooks

Frontend checkout hooks that makes easy to fetching products, adding/removing products to cart and retrieving checkout url.

## Installing and importing

`frontend-checkout` is already preinstalled on every Shogun Frontend site. To use it, you only need to import hook in a component.

```js
import { useCartState, useCartActions } from 'frontend-checkout'
```

## API reference

- `useCartState` hook - current state of user's cart.

```ts
const cart = useCartState()

// Cart
{
  id: string // ID of current cart.
  items: Items[] // Array of items currently in cart.
  inventory: {
    products: Record<productId, {
      availableForSale: boolean  // Indicates should you allow purchasing of a product, e.g. out of stock.
      minOrder?: number // Minimum order constraint, adjustable in Shogun CMS - Product Content Group.
      maxOrder?: number // Maximum order constraint.
    }
    productVariants: Record<variantId, {
      availableForSale: boolean
      minOrder?: number
      maxOrder?: number
    }
    status: 'loading' | 'loaded' | 'error' // Status of loading products from CMS
  }
  subtotalPrice: number // Total price of all items in cart, before shipping, taxes, and discounts.
  currencyCode: string // Cart currency code, e.g. "USD".
  isCartShown: boolean // Flag for managing should cart modal or drawer be shown to a user.
  checkoutUrl: string // Url to redirect users when they press `Checkout` link/button.
}
```

- `useCartActions` hook - actions available for manipulating cart.

```ts
/**
 * Fetch single product by ID.
 * fetchProduct: (id: string) => Promise<Product>
 */
const { fetchProductById } = useCartActions()
const product = await fetchProduct(id)

/**
 * Add items to cart.
 * addItems: (items: Item | Item[]) => Promise<Cart>
 * Item: {
 *  id: string
 *  quantity: number
 * }
 */
const { addItems } = useCartActions()

const item = {
  id: '123', // variant id
  quantity: 1,
}

addItems(item)

// Adding array of items
addItems([item, item2])

/**
 * Update items in cart.
 * updateItems: (items: Item | Item[]) => Promise<Cart>
 * Item: {
 *  id: string
 *  quantity: number
 * }
 */
const { updateItems } = useCartActions()

const item = {
  id: '123',
  quantity: 2, // Change quantity to 2.
}

updateItems(item)

/**
 * Remove items from cart.
 * removeItems: (itemIds: string | string[]) => Promise<Cart>
 */
const { removeItems } = useCartActions()

const itemId = '123'

removeItems(itemId)

/**
 * Show cart
 * showCart: () => void
 */
const { showCart } = useCartActions()
shortCart() // 'isCartShown' will become true

/**
 * Hide cart
 * hideCart: () => void
 */
const { hideCart } = useCartActions()
hideCart() // 'isCartShown' will become false.
```

## Examples

a) Creating add to cart button component.

```js
import React from 'react'
import { useCartState, useCartActions } from 'frontend-checkout'
import LoadingSpinner from 'Components/LoadingSpinner'

import './styles.css'

// Button states
const IDLE = 'idle'
const LOADING = 'loading'
const SOLD_OUT = 'sold out'
const ERROR = 'error'

// Error message duration
const THREE_SECONDS = 3 * 1000

const AddToCart = ({ id, children }) => {
  const [buttonState, setButtonState] = React.useState(IDLE)

  const { inventory } = useCartState()
  const { addItems } = useCartActions()

  React.useEffect(
    function setSoldOutStateIfItemIsNotAvailable() {
      if (inventory.status === LOADING || inventory.status === ERROR) return

      if (!inventory.productVariants[variantId].availableForSale) setButtonState(SOLD_OUT)
    },
    [inventory.status],
  )

  function clearError() {
    setButtonState(IDLE)
  }

  async function handleAddItemToCart() {
    setButtonState(LOADING)
    try {
      await addItems({ id, quantity: 1 })
      setButtonState(IDLE)
    } catch (e) {
      setButtonState(ERROR)
      setTimeout(clearError, THREE_SECONDS) // Remove error message after 3 seconds.
    }
  }

  if (buttonState === LOADING)
    return (
      <button className="AddToCart">
        <LoadingSpinner />
      </button>
    )

  if (buttonState === SOLD_OUT)
    return (
      <button className="AddToCart AddToCart--sold" disabled>
        Sold out
      </button>
    )

  if (buttonState === ERROR)
    return (
      <button className="AddToCart" onClick={clearError}>
        Adding failed
      </button>
    )

  return (
    <button className="AddToCart" onClick={handleAddItemToCart}>
      {children}
    </button>
  )
}

export default AddToCart
```

b) Creating checkout link/button component

```js
import React from 'react'
import { useCartState } from 'frontend-checkout'

import './styles.css'

const CheckoutLink = ({ children }) => {
  const { checkoutUrl } = useCartState()

  return (
    <a className="CheckoutLink" href={checkoutUrl}>
      {children}
    </a>
  )
}

export default CheckoutLink
```

c) Creating component for changing item quantity

```js
import React from 'react'
import { useCartActions } from 'frontend-checkout'

import './styles.css'

const IDLE = 'idle'
const LOADING = 'loading'

const ItemQuantity = ({ id, variantId, initialQuantity = 0 }) => {
  const [inputStatus, setInputStatus] = React.useState(IDLE)
  const { updateItems, removeItems } = useCartActions()

  async function handleItemQuantityChange(requestedQtyChange) {
    const newQuantity = quantity + requestedQtyChange

    if (newQuantity === quantity) return

    setInputState(LOADING)
    try {
      if (newQuantity <= 0) {
        await removeItems(id)
      } else {
        await updateItems({ id, quantity: requestedQtyChange })
        setInputState(IDLE)
      }
    } catch (e) {
      setInputValue(quantity)
      setInputState(IDLE)
      // Show error message
    }
  }

  return (
    <React.Fragment>
      <button
        className="ItemQuantityInput-btn--minus"
        disabled={inputStatus === LOADING}
        onClick={() => handleItemQuantityChange(-1)}
      >
        Reduce item quantity by one
      </button>
      <label htmlFor="itemQty">Item quantity</label>
      <input
        id="itemQty"
        className="ItemQuantityInput-input"
        type="number"
        min={0}
        disabled={inputStatus === LOADING}
        onBlur={e =>
          handleItemQuantityChange(
            Number(e.target.value) - quantity /* difference between new and current qunatity */,
          )
        }
      />
      <button
        className="ItemQuantityInput-btn--plus"
        disabled={inputStatus === LOADING}
        onClick={() => handleItemQuantityChange(1)}
      >
        Increase item quantity by one
      </button>
    </React.Fragment>
  )
}

export default ItemQuantity
```
