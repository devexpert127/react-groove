import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'

import ProductTitle from './'

export default {
  title: 'Product / Product Title',
  component: ProductTitle,
  decorators: [withKnobs],
}

export const productTitle = () => <ProductTitle productTitle={text('Title', 'This is a title')} />
