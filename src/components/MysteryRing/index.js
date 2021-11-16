import React, { useState } from 'react'
import { useCartActions, useCartState } from 'frontend-checkout'
import Link from 'frontend-link'
import ResponsiveImage from 'frontend-ui/ResponsiveImage'
import RichText from 'frontend-ui/RichText'
import Button from 'Components/Button'
import './styles.css'

let debugHooks = false
const getCartActions = () => debugHooks ? debugHooks.useCartActions() : useCartActions()
const getCartState = () => debugHooks ? debugHooks.useCartState() : useCartState()

const MysteryRing = ({
  hooks = {},
  infoText,
  product,
  isCartShown
}) => {
  if (!product || !product.variants || !product.variants.length) return null
  if (hooks.useCartActions && typeof hooks.useCartActions === 'function' && hooks.useCartState && typeof hooks.useCartState === 'function') {
    // only used in Storybook were we don't have access to the real hooks
    debugHooks = hooks
  }

  const variantUnselectedValue = 'Select'
  const [isAdding, setIsAdding] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(variantUnselectedValue)
  const { addItems } = getCartActions()
  const { items } = getCartState()

  const media = product.media[0]

  const onChange = event => {
    setSelectedVariant(event.target.value)
  }
  const onClick = () => {
    setIsAdding(true)

    addItems({
      id: parseInt(selectedVariant),
      quantity: 1,
    }).then(() => {
      setIsAdding(false)
    })
  }

  let addToCartText = 'Add to cart'
  if (isAdding) {
    addToCartText = 'Adding'
  }
  if (selectedVariant === variantUnselectedValue) {
    addToCartText = 'Select'
  }
  if (!isInCart(items, product.variants)) {
    return (
      <div className="MysteryRing CartItem">
        <div className="CartItem-image">
          <Link
            to={href(product)}
            {...(!isCartShown &&
              {'tabIndex': -1}
            )}
          >
            <ResponsiveImage
              alt={media.details.alt || product.name}
              src={media.details.src}
              sizes="(min-width: 37.5em) 20vw, 50vw"
            />
          </Link>
        </div>
        <div className="CartItem-content">
          <div className="CartItem-title">{product.name}</div>
          <div className="MysteryRing-selectSize">
            <label htmlFor="MysteryRing-select">Choose a size:</label>
            <div className="MysteryRing-selectWrapper">
              <select
                id="MysteryRing-select"
                onChange={onChange}
                value={selectedVariant}
                {...(!isCartShown &&
                  {'tabIndex': -1}
                )}
              >
                <option disabled hidden value={variantUnselectedValue}>
                  Select your size
                </option>
                {product.variants.map((variant, i) => (
                  <option key={i} value={variant.externalId}>
                    {variant.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="MysteryRing-addToCart">
            <Button
              as="button"
              disabled={isAdding || selectedVariant === variantUnselectedValue}
              onClick={onClick}
              style="default"
              {...(!isCartShown &&
                {'tabIndex': -1}
              )}
            >
              {addToCartText}
            </Button>
          </div>
          <div className="MysteryRing-info">
            <details {...(!isCartShown && {'tabIndex': -1} )}>
              <summary>What is a Mystery Ring?</summary>
              <RichText source={infoText} />
            </details>
          </div>
        </div>
      </div>
    )
  }
  return null
}

function isInCart(items, variants) {
  const variantIds = variants.map(variant => variant.externalId)
  const itemIds = items.map(item => item.variant ? item.variant.id : false)

  return itemIds.some(id => variantIds.includes(id))
}

function href(product) {
  return `/products/${product.slug}`
}

export default MysteryRing
