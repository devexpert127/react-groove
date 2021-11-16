import React, { createElement, Fragment } from 'react'
import cx from 'classnames'
import './styles.css'
import { formatMoney } from 'Components/ProductShared'

const isBrowser = typeof document !== 'undefined'

const ProductPriceDetail = ({ term, definition, className }) => {
  return (
    <Fragment>
      <dt>{term}</dt>
      <dd className={className}>{definition}</dd>
    </Fragment>
  )
}

const Price = ({ title, value = null, className, isDiscount, valueText = null }) => {
  if (typeof value !== 'number' && !valueText) {
    return null
  }
  const money = formatMoney(value)

  const children = valueText ? `${valueText} ${money}` : money
  let text = null
  if (value && valueText) {
    text = `${valueText} ${money}`
  } else if (!valueText) {
    text = money
  } else if (!value) {
    text = valueText
  }

  const price = createElement(isDiscount ? 's' : 'span', null, text)

  return <ProductPriceDetail className={className} term={title} definition={price} />
}

const ProductPrice = ({
  className = '',
  isOnSale = false,
  comparePrice = null,
  comparePriceClass = null,
  price = null,
  priceClass = '',
  priceText = null,
  prePricesText = null,
  usePriceFrom = false,
  usePriceText = false,
  isProductBox = false,
}) => {
  if (typeof price !== 'number' && !priceText) {
    return null
  }
  const baseClassName = 'ProductPrice'
  const priceContent = (
    <dl className={`${baseClassName}-prices`}>
      {isOnSale && (
        <React.Fragment>
          <Price
            className={cx(
              baseClassName,
              `${baseClassName}-sale ${baseClassName}-sale--discount`,
              priceClass,
            )}
            value={price}
            title="Sale price"
            valueText={usePriceFrom ? 'On sale from' : priceText}
          />
          <Price
            className={cx(
              baseClassName,
              `${baseClassName}-regular ${baseClassName}-regular--discount`,
              comparePriceClass,
            )}
            isDiscount
            value={comparePrice}
            title="Regular price was"
            valueText={null}
          />
        </React.Fragment>
      )}
      {!isOnSale && (
        <React.Fragment>
          <Price
            className={cx(baseClassName, `${baseClassName}-regular`, priceClass)}
            value={price}
            valueText={usePriceFrom && 'From'}
            title="Regular price"
          />
        </React.Fragment>
      )}
    </dl>
  )

  return (
    <div className={cx(baseClassName, className, { ['ProductPrice--onSale']: isOnSale }, { ['ProductPrice--has-pre-text']: prePricesText })}>
      {prePricesText ? (
        <React.Fragment>
          <span className={`${baseClassName}-preText`}>{prePricesText}</span>
          <div className="ProductPrice__pre-text-wrap">
            {priceContent}
          </div>
        </React.Fragment>
      ) : (
        priceContent
      )}
    </div>
  )
}
export default ProductPrice
