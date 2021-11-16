import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'

import ProductBundleOptionSelectors from '.'

export default {
  title: 'Product / Product Bundle Option Selectors',
  component: ProductBundleOptionSelectors,
  decorators: [withKnobs],
}

export const productBundleOptionSelectors = () => (
  <React.Fragment>See the Product Box &gt; Bundle story</React.Fragment>
)
