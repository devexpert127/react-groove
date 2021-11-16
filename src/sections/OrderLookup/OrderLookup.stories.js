import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import App from '../../components/App'
import OrderLookup from './'

export default {
  title: 'Integration / Order Lookup',
  component: OrderLookup,
  decorators: [withKnobs],
}

export const orderLookup = () => {
  return <App><OrderLookup /></App>
}
