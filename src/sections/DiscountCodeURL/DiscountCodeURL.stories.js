import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import DiscountCodeURL from './'

export default {
  title: 'DiscountCodeURL',
  component: DiscountCodeURL,
  decorators: [withKnobs]
}

const template = args => {
  return <DiscountCodeURL {...args} />
}

export const discountCodeURL = template.bind({})
discountCodeURL.args = {
  debugCode: 'CODE10',
  debugBlockRedirect: true
}
