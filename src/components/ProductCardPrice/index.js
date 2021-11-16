import React from 'react'
import cx from 'classnames'
import {
  getDiscountParts,
  getDiscountFlateRate,
  getDiscountPrecent,
  formatMoney,
  getProductMinPrice,
  getProductMaxPrice,
  getCompareAtPrice,
  getProductVariants,
  hasDiscount,
  hasCompareAtDiscount,
  hasScriptDiscount,
  getSalePrice,
  getNonSalePrice,
  getDiscountMessage,
  getScriptSalePrice,
} from 'Components/ProductShared'

const ProductCardPrice = ({ product }) => {
  if (product && product !== undefined) {
    // check for storefront properties first
    const productMinPrice = getProductMinPrice(product),
      productMaxPrice = getProductMaxPrice(product),
      [isOnSale, discountType] = hasDiscount(product)
    let salePrice, regularPrice, discountMessage
    if (isOnSale) {
      salePrice = getSalePrice(product.discount, discountType, productMinPrice)
      regularPrice = getNonSalePrice(product, discountType)
      discountMessage = getDiscountMessage(product, discountType)
    }

    return (
      <dl className={cx('ProductCard-price', { ['ProductCard-price--on-sale']: isOnSale })}>
        {isOnSale && (
          <React.Fragment>
            <dt>Sale price</dt>
            <dd className="ProductCard-sale-price">
              {discountType === 'compareAtDiscount' && productMaxPrice > productMinPrice && (
                <span>On sale from</span>
              )}
              {discountType === 'scriptDiscount' && !!discountMessage && (
                <span>{discountMessage}</span>
              )}
              {!!salePrice && <span>{formatMoney(salePrice)}</span>}
            </dd>
            <dt>Regular price was</dt>
            <dd className="ProductCard-regular-price">{formatMoney(regularPrice)}</dd>
          </React.Fragment>
        )}

        {!isOnSale && (
          <React.Fragment>
            <dt>Regular price</dt>
            <dd className="ProductCard-regular-price">
              {productMaxPrice > productMinPrice && <span>From </span>}
              {formatMoney(productMinPrice)}
            </dd>
          </React.Fragment>
        )}
      </dl>
    )
  }
  return null
}

export default ProductCardPrice
