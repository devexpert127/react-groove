import React from 'react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import AddToCart from './'

export default {
  title: 'Product / Add to Cart',
  component: AddToCart,
  decorators: [withKnobs],
}

export const addToCartButton = () => {
  const items = [
    {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNDQwMTQ3NzI3OTgxMQ==',
      quantity: 1,
      availableForSale: true,
    },
    // {
    //   customAttributes: [
    //     {
    //       key: 'Fill Color',
    //       value: fillColor,
    //     },
    //   ],
    //   id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNDQwMTQ3NzMxMjU3OQ==",
    //   quantity: 2,
    //   availableForSale: false
    // }
  ]

  return (
    <AddToCart
      items={items}
      disabled={boolean('Disabled?', false)}
      onClick={() => console.log('CLICK')}
    >
      Add to Cart
    </AddToCart>
  )
}
