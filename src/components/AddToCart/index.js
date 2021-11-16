import React from 'react'
import { useCartState, useCartActions } from 'frontend-checkout'
import cx from 'classnames'
import Button from 'Components/Button'
import LoadingSpinner from 'Components/LoadingSpinner'
import { BUTTON_STATES } from 'Components/CartShared'
import './styles.css'

const AddToCart = ({
  children,
  disabled = false,
  className = '',
  buttonState = BUTTON_STATES.IDLE,
  onClick = null,
}) => {
  const baseClass = 'AddToCart'
  let buttonProps = {
    as: 'button',
    className: cx(baseClass, className),
    style: 'primary',
    type: 'button',
    onClick: onClick,
  }
  let buttonContent = children
  switch (buttonState) {
    case BUTTON_STATES.ERROR:
      buttonContent = 'Adding failed'
      buttonProps = {
        ...buttonProps,
      }
      break
    case BUTTON_STATES.LOADING:
      buttonContent = <LoadingSpinner />
      buttonProps = {
        ...buttonProps,
        onClick: null,
      }
      break
    case BUTTON_STATES.SOLD_OUT:
      buttonContent = 'Sold out'
      buttonProps = {
        ...buttonProps,
        className: `${buttonProps.className} ${baseClass}--sold`,
        disabled: true,
      }
      break
    default:
      buttonProps = {
        ...buttonProps,
        disabled: disabled,
      }
      break
  }

  return <Button {...buttonProps}>{buttonContent}</Button>
}

export default AddToCart
