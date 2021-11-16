import React from 'react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import productData from '../../static/products.json'
import UpsellPopup from './'

export default {
  title: 'Product / Upsell Popup',
  component: UpsellPopup,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
    notes: 'Discount can be % or flate rate ($)',
  },
}
const product = productData[9]
export const upsellPopup = () => {
  const upsell = {
    product: product,
    discount: text('Discount', '15%'),
    messaging: text('Message', 'Wait... add a Zeus ring for 15% off.'),
  }

  return (
    <UpsellPopup
      upsell={upsell}
      visible={boolean('Show popup?', true)}
      onClose={() => {
        console.log('Close Upsell Popup')
      }}
    />
  )
}
