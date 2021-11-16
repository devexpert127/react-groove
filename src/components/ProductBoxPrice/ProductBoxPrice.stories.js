import React from 'react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import productData from '../../static/products.json'

import ProductBoxPrice from './'

export default {
  title: 'Product / Product Box Price',
  component: ProductBoxPrice,
  decorators: [withKnobs],
}

export const productBoxPrice = () => <React.Fragment>See the Product Box story</React.Fragment>
