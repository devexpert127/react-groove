import React from 'react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'

import ProductPrice from './'

export default {
  title: 'Product / Product Price',
  component: ProductPrice,
  decorators: [withKnobs],
}

const template = args => (
  <ProductPrice
    className={text('Product price class', '')}
    priceClassName={text('priceClass', '')}
    comparePriceClassName={text('regularClassName', '')}
    {...args}
  />
)
export const priceOnly = template.bind({})
priceOnly.args = {
  price: 34.95,
  comparePrice: null,
}
priceOnly.storyName = 'Price'
//----------------------
// eg 1
// ---------------------
export const priceFrom = template.bind({})
priceFrom.args = {
  ...priceOnly.args,
  price: 29.95,
  comparePrice: null,
  usePriceFrom: true,
}
priceFrom.storyName = 'From price'
//----------------------
// eg 1
// ---------------------
export const priceFromSale = template.bind({})
priceFromSale.args = {
  ...priceOnly.args,
  price: 29.95,
  comparePrice: 39.95,
  usePriceFrom: true,
  priceText: null,
}
priceFromSale.storyName = 'From price sale'
//----------------------
// eg 1
// ---------------------
export const discountPriceFrom = template.bind({})
discountPriceFrom.args = {
  price: 19.95,
  comparePrice: 29.95,
  priceText: null,
}
discountPriceFrom.storyName = 'Discount price'
//----------------------
// eg 1
// ---------------------
export const scriptDiscount = template.bind({})
scriptDiscount.args = {
  price: 19.95,
  comparePrice: 59.95,
  usePriceText: true,
  priceText: 'Buy two for $30',
}
scriptDiscount.storyName = 'Price using text'
//----------------------
// eg 1
// ---------------------
export const scriptDiscountPercent = template.bind({})
scriptDiscountPercent.args = {
  price: 34.95,
  comparePrice: 44.95,
  priceText: '15% off!',
}
scriptDiscountPercent.storyName = 'Script price % text'
//----------------------
// eg 1
// ---------------------
export const scriptDiscountDollar = template.bind({})
scriptDiscountDollar.args = {
  price: 34.95,
  comparePrice: 44.95,
  priceText: '$10 off!',
}
scriptDiscountDollar.storyName = 'Script price $ text'
