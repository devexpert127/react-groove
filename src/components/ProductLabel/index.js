import React from 'react'
import cx from 'classnames'
import './styles.css'

const ProductLabel = ({ label, className }) => {
  let labelText = null
  const baseClass = 'ProductLabel'
  switch (label) {
    case 'tag-new':
      labelText = 'NEW!'
      break
    case 'tag-best-seller':
      labelText = 'Best Seller'
      break
    case 'tag-limited-edition':
      labelText = 'Limited Edition'
      break
    case 'tag-sale':
      labelText = 'SALE!'
      break
    case 'tag-bundle-savings':
      labelText = 'Bundle Savings'
      break
    case 'tag-sold-out':
      labelText = 'Sold Out'
      break
    case 'tag-back-in-stock':
      labelText = 'Back In Stock'
      break
    case 'tag-widethin':
      labelText = <React.Fragment>Thin &amp; Wide</React.Fragment>
      break
    default:
      null
  }
  const labelModifierClass = label.replace('tag-', '')
  if (labelText === null) return null
  return (
    <div className={cx(baseClass, `${baseClass}--${labelModifierClass}`, className)}>
      {labelText}
    </div>
  )
}

export default ProductLabel
