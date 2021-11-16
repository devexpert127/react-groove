import React, { useState, useRef, useEffect } from 'react'
import { useCartActions } from 'frontend-checkout'
import ResponsiveImage from 'frontend-ui/ResponsiveImage'
import Button from 'Components/Button'
import UIIcon from 'Components/UIIcon'
import slugify from 'Components/Slugify'
import ProductSubmitButton from 'Components/ProductSubmitButton'
import { BUTTON_STATES, ERROR_MSG_DURATION } from 'Components/CartShared'

import { formatMoney } from 'Components/ProductShared'
import './styles.css'

const UpsellPopup = ({
  upsell = null,
  visible = true,
  addToCartText = 'Select Size',
  dismissButtonText = 'No thanks.<br/>Continue to cart',
  iconClose,
}) => {
  const { discount, messaging, product } = upsell || {}

  if (!product) return null

  const { hideCart, showCart } = useCartActions()
  const [isVisible, setIsVisible] = useState(visible)

  const closeUpSell = () => {
    setIsVisible(false)
  }

  if (!product) return null

  const onAddClose = () => {
    closeUpSell()
  }
  const onDismissClose = () => {
    closeUpSell()
    showCart()
  }

  if (isVisible) {
    return (
      <div className="UpsellPopup">
        <div className="UpsellPopup-content" role="dialog" aria-labelledby="UpsellPopup-title">
          <div className="UpsellPopup-header">
            <h3 className="UpsellPopup-title" id="UpsellPopup-title">
              {messaging}
            </h3>

            <Button
              as="button"
              className="UpsellPopup-close"
              onClick={onDismissClose}
              style="unstyled"
            >
              <UIIcon className="UpsellPopup-close-icon" icon={UIIcon.Icons.Close} />
              <span className="UpsellPopup-icon-text">
                Close upsell popup and continue to cart.
              </span>
            </Button>
          </div>

          <div className="UpsellPopup-product-image">
            {!!product && product.media.length > 0 && (
              <ResponsiveImage
                className="ProductBox-linkedProductsImage"
                src={product.media[0].details.src}
                alt={product.media[0].details.alt}
                sizes="(min-width: 960px) 50vw, 90vw"
              />
            )}
          </div>
          <ProductForm
            id="ProductUpsellForm"
            product={product}
            discount={discount}
            onAddClose={onAddClose}
            onDismissClose={onDismissClose}
            addToCartText={addToCartText}
            dismissButtonText={dismissButtonText}
          />
        </div>
      </div>
    )
  }

  return null
}

const ProductForm = ({
  product,
  discount,
  onAddClose,
  onDismissClose,
  addToCartText,
  dismissButtonText,
  id = 'ProductUpsellForm'
}) => {
  const [items, setItems] = useState([]),
    [isSelected, setIsSelected] = useState(false),
    [currentSelections, setCurrentSelections] = useState([]),
    [currentVariant, setCurrentVariant] = useState(product.variants[0]),
    [currentDiscount, setCurrentDiscount] = useState(getCurrentDiscount(discount, currentVariant))

  const onChange = (e, optionRef) => {
    // collect the selected options
    let selections = [...currentSelections]
    if (!currentSelections.includes(optionRef)) {
      selections = [...currentSelections, optionRef]
      setCurrentSelections(selections)
    }

    // get current variant from selections
    setCurrentVariant(getCurrentVariant(product.variants, selections))
  }

  useEffect(() => {
    setIsSelected(isOptionsSelected(currentSelections, currentVariant, product))
    setItems([
      {
        properties: [
          {
            key: '_upsell',
            value: discount,
          },
        ],
        id: currentVariant.externalId,
        quantity: 1,
      },
    ])
  }, [currentSelections, currentVariant])

  const [buttonState, setButtonState] = useState(BUTTON_STATES.IDLE)
  const { addItems } = useCartActions()

  function clearError() {
    setButtonState(BUTTON_STATES.IDLE)
  }

  async function addItemsToCart() {
    console.debug('Adding items to cart:', items)
    setButtonState(BUTTON_STATES.LOADING)
    try {
      await addItems(items)
      setButtonState(BUTTON_STATES.IDLE)
      onAddClose()
    } catch (e) {
      console.debug('Error Adding items to cart:', e)
      setButtonState(BUTTON_STATES.ERROR)
      setTimeout(clearError, ERROR_MSG_DURATION) // Remove error message after 3 seconds.
    }
  }

  return (
    <div id={id} className="UpsellPopup-product-form">
      <div className="UpsellPopup-options" data-options={product.options.length}>
        {product.options.map((option, i) => (
          <ProductOption formId={id} option={option} onChange={onChange} key={i} />
        ))}
      </div>

      <dl className="UpsellPopup-price">
        <dt>Sale price</dt>
        <dd className="UpsellPopup-price-sale">{currentDiscount}</dd>

        <dt>Regular price</dt>
        <dd className="UpsellPopup-price-regular">
          {!!currentVariant && formatMoney(currentVariant.price)}
        </dd>
      </dl>

      <ProductSubmitButton
        className="UpsellPopup-add-button"
        selectSizeText={addToCartText}
        addToCartText={addToCartText}
        items={items}
        needsInfo={!isSelected}
        outOfStock={false}
        productAvailable={true}
        buttonState={buttonState}
        onClick={addItemsToCart}
        outOfStock={null}
      />

      <Button
        className="UpsellPopup-dismiss-button"
        style="default"
        as="button"
        onClick={onDismissClose}
      >
        {dismissButtonText}
      </Button>
    </div>
  )
}

const ProductOption = ({ formId, option, onChange }) => {
  const optionRef = useRef()
  const inputId = `${formId}_${slugify(option.position)}`
  return (
    <div className="UpsellPopup-option">
      <label htmlFor={inputId}>{option.name}</label>
      <div className="UpsellPopup-select-wrapper">
        <select
          className="UpsellPopup-select"
          id={inputId}
          onChange={e => {
            onChange(e, optionRef)
          }}
          defaultValue="select"
          data-name={option.name}
          data-position={option.position}
          ref={optionRef}
        >
          <option disabled hidden value="select">
            Select
          </option>
          {option.values.map((value, i) => (
            <option value={value.value} key={i}>
              {value.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

function isOptionsSelected(currentSelections, currentVariant, product) {
  return (
    currentSelections.length === product.options.length && typeof currentVariant !== 'undefined'
  )
}

function getCurrentVariant(variants, selections) {
  return variants.find(variant => {
    if (variant.selectedOptions) {
      return variant.selectedOptions.reduce((result, { name, value }) => {
        if (result) {
          const optionSelector = selections.find(option => option.current.dataset.name === name)
          return optionSelector.current.value === value
        } else {
          return false
        }
      }, true)
    } else {
      return false
    }
  })
}

function getCurrentDiscount(discount, currentVariant) {
  if (typeof currentVariant === 'undefined') return
  try {
    const { discountType, discountAmount } = getDiscountParts(discount)
    switch (discountType) {
      case '$':
        return getDiscountFlateRate(discountAmount, currentVariant.price)
        break
      default:
        // %
        return getDiscountPrecent(discountAmount, currentVariant.price)
    }
  } catch (e) {
    console.error('UpsellPopup.getCurrentDiscount error:', e)
    return `${discount} off`
  }
}

function getDiscountParts(discount) {
  const discountType = /\$|%/.exec(discount) // Find either a $ or %
  const discountAmount = /\d+\.*\d*/.exec(discount) // get any digits followed by . and more digits i.e. 15.50

  return {
    discountType: !!discountType ? discountType[0] : '', // if no type is found don't error so percent is returned from getCurrentDiscount()
    discountAmount: parseFloat(discountAmount[0]), // needs to be number
  }
}

function getDiscountFlateRate(discount, price) {
  return formatMoney(price - discount)
}

function getDiscountPrecent(discount, price) {
  return formatMoney((price - price * (discount / 100)).toFixed(2))
}

export default UpsellPopup
