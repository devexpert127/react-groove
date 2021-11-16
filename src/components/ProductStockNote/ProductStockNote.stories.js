import React from 'react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'

import ProductStockNote from './'

export default {
  title: 'Product / Product Stock Note',
  component: ProductStockNote,
  decorators: [withKnobs],
}

export const productStockNote = () => (
  <ProductStockNote availableForSale={boolean('Avaliable', true)} />
)
