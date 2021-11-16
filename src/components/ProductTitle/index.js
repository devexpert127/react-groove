import React from 'react'

import './styles.css'

const ProductTitle = ({ productTitle }) => {
  if (!productTitle) return null

  return <h2 className="ProductTitle">{productTitle}</h2>
}

export default ProductTitle
