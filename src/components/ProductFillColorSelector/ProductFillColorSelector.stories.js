import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'

import ProductFillColorSelector from './'

export default {
  title: 'Product / Product Fill Color Selector',
  component: ProductFillColorSelector,
  decorators: [withKnobs],
}

export const productFillColorSelector = () => (
  <React.Fragment>See the Product Box story</React.Fragment>
)
