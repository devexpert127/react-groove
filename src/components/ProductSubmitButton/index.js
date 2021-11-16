import React from 'react'
import AddToCart from 'Components/AddToCart'
import { PURCHASE_STATE } from '../CartShared'

import './styles.css'

const ProductSubmitButton = ({
  className = '',
  addToCartText,
  available = true,
  isValid = false,
  items = [],
  outOfStock = false,
  outOfStockComponent = null,
  selectSizeText,
  onClick,
  buttonState,
}) => {
  let purchaseState = PURCHASE_STATE.NEEDSMOREINFO
  let buttonText = selectSizeText
  let addToCartProps = {
    disabled: true,
    items: items,
    className: className,
  }
  if (isValid) {
    purchaseState = PURCHASE_STATE.AVALIABLE
    buttonText = addToCartText
    addToCartProps = {
      ...addToCartProps,
      disabled: false,
      buttonState: buttonState,
      onClick: onClick,
    }
  }
  if (outOfStock) {
    buttonText = 'Out of Stock'
    purchaseState = PURCHASE_STATE.OUTOFSTOCK
    addToCartProps = {
      ...addToCartProps,
      disabled: true,
      onClick: null,
    }
  }
  if (!available) {
    buttonText = 'Unavailable'
    purchaseState = PURCHASE_STATE.UNAVALIABLE
    addToCartProps = {
      ...addToCartProps,
      disabled: true,
      onClick: null,
    }
  }

  switch (purchaseState) {
    case PURCHASE_STATE.OUTOFSTOCK:
      return (
        <React.Fragment>
          {outOfStockComponent ? (
            outOfStockComponent
          ) : (
            <AddToCart {...addToCartProps}>{buttonText}</AddToCart>
          )}
        </React.Fragment>
      )
      break

    default:
      return (
        <React.Fragment>
          <AddToCart {...addToCartProps}>{buttonText}</AddToCart>
        </React.Fragment>
      )
  }
}

export default ProductSubmitButton
