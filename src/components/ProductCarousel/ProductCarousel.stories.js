import React from 'react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import productData from '../../static/products.json'

import ProductCarousel from './'

export default {
  title: 'Product / Product Carousel',
  component: ProductCarousel,
  decorators: [withKnobs],
}
const product = productData[9]

export const productCarousel = () => {
  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      <ProductCarousel media={product.media}/>
    </div>
  )
}
