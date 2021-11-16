import React from 'react'
import cx from 'classnames'

import './styles.css'

const ProductStockNote = ({ availableForSale = false, availableVariantOptions = true, className = '' }) => {
  let content = availableForSale ? 'In Stock' : 'Out of Stock'
  if (!availableVariantOptions) {
    content = 'This combination of options is not available. Please select a different option.'
  }

  return (
    <p className={cx('ProductStockNote', className)}>
      {content}
    </p>
  )
}

export default ProductStockNote
