import React from 'react'
import OkendoReviews from './'
import App from '../../components/App'
import productData from '../../static/products.json'

export default {
  title: 'Integration / OkendoReviews',
  component: OkendoReviews
}

const template = args => {
  return (
    <App>
      <OkendoReviews {...args} />
    </App>
  )
}

export const okendoReviews = template.bind({})
okendoReviews.args = {
  product: productData[0] // debug: '604889939995'
}
