import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import ProductForm from './'

export default {
  title: 'Product / Product Form',
  component: ProductForm,
  decorators: [withKnobs],
}

export const productOptions = () => <React.Fragment>See the Product Box story</React.Fragment>
