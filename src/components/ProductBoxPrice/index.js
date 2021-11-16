import React, { useRef, useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import ProductPrice from 'Components/ProductPrice'
import { getPriceProperties } from 'Components/ProductShared'

import './styles.css'

const ProductBoxPrice = ({ bundle, className = '', product, variant, variantSelected = false }) => {
  const priceProps = getPriceProperties(bundle, product, variant.selectedVariant, variantSelected)
  return <ProductPrice className={cx(className)} isProductBox={true} {...priceProps} />
}

export default ProductBoxPrice
