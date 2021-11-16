import React from 'react'
import Link from 'frontend-link'
import ResponsiveImage from 'frontend-ui/ResponsiveImage'

import './styles.css'

const ProductSwitcher = ({ products = null, title = 'Select your color' }) => {
  // console.log('ProductSwitcher', { products }, { title }) // DEBUG
  // console.log('ProductSwitcher', JSON.stringify({ products }), title) // DEBUG in XM, copy paster data as string
  if (products && products.length > 0) {
    return (
      <div className="ProductSwitcher-wrapper">
        <div className="ProductSwitcher-title">
          {title !== '' || title !== ' ' || title !== null || title !== undefined
            ? title
            : 'Select your color'}
          :
        </div>
        <div className="ProductSwitcher" data-products={products.length}>
          {products.map((product, i) => (
            <ProductSwitcherLink product={product} key={i} />
          ))}
        </div>
      </div>
    )
  }
  return null
}

const href = product => {
  return `/products/${product.slug}`
}

const ProductSwitcherLink = ({ product = null }) => {
  if (product && product.media && product.media.length > 0) {
    return (
      <Link className="ProductSwitcher-link" key={product.slug} to={href(product)}>
        <ResponsiveImage
          className="ProductSwitcher-image"
          src={product.media[0].details.src}
          alt={product.media[0].details.alt}
          sizes="(min-width: 960px) 20vw, 50vw"
        />
        <span className="ProductSwitcher-name">{product.name}</span>
      </Link>
    )
  }
  return null
}

export default ProductSwitcher
