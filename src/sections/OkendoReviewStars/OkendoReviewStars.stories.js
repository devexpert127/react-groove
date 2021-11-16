import React from 'react'
import OkendoReviewStars from './'
import App from '../../components/App'
import productData from '../../static/products.json'

export default {
  title: 'Integration / OkendoReviewStars',
  component: OkendoReviewStars
}

const template = args => {
  return (
    <App>
      <OkendoReviewStars {...args} />
    </App>
  )
}

export const okendoReviewStars = template.bind({})
okendoReviewStars.args = {
  productId: productData[0].externalId // debug: '604889939995'
}
