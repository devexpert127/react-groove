import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import productData from '../../static/products.json'
import ProductSwitcher from './'

export default {
  title: 'Product / Product Switcher',
  component: ProductSwitcher,
  decorators: [withKnobs],
}

const exampleProducts = [
  productData[10],
  productData[25],
  productData[26],
  productData[12],
  productData[32],
]

const template = args => {
  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      <ProductSwitcher {...args} />
    </div>
  )
}

export const productSwitcher = template.bind({})
productSwitcher.args = {
  products: exampleProducts,
  title: 'Select a variation',
}

export const noTitleSupplied = template.bind({})
noTitleSupplied.args = {
  ...productSwitcher.args,
  title: undefined,
}

export const noProducts = template.bind({})
noProducts.args = {
  ...productSwitcher.args,
  products: undefined,
}
