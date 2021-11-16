import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'

import ProductOptionSelectors from './'

export default {
  title: 'Product / Product Option Selectors',
  component: ProductOptionSelectors,
  decorators: [withKnobs],
}
export const productOptionSelectors = () => (
  <React.Fragment>See the Product Box story</React.Fragment>
)
