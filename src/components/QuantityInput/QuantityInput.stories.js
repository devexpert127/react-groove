import React from 'react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import QuantityInput from './'

export default {
  title: 'Product / Quantity Input',
  component: QuantityInput,
  decorators: [withKnobs],
}

export const quantityInput = () => {
  return (
    <QuantityInput
      type={text('type', 'number')}
      label={text('label', 'Number')}
      isRequired={boolean('isRequired', true)}
    />
  )
}
