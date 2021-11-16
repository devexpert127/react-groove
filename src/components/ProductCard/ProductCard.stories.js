import React from 'react'
import { withKnobs, files, radios, number, text } from '@storybook/addon-knobs'
import ProductCard from './'
import productData from '../../static/products.json'
import App from '../../components/App'

export default {
  title: 'Product / Product Card',
  component: ProductCard,
  decorators: [withKnobs],
}

const template = args => {
  return (
    <App>
      <ProductCard {...args} />
    </App>
  )
}

export const productData0 = template.bind({})
productData0.args = { product: productData[0] }
productData0.storyName = 'Product Card - 0'

export const productData1 = template.bind({})
productData1.args = { product: productData[1] }
productData1.storyName = 'Product Card - 1'

export const productData2 = template.bind({})
productData2.args = { product: productData[2] }
productData2.storyName = 'Product Card - 2'

export const productData3 = template.bind({})
productData3.args = { product: productData[3] }
productData3.storyName = 'Product Card - 3'

export const productData4 = template.bind({})
productData4.args = { product: productData[4] }
productData4.storyName = 'Product Card - 4'

export const productData5 = template.bind({})
productData5.args = { product: productData[5] }
productData5.storyName = 'Product Card - 5'

export const productData6 = template.bind({})
productData6.args = { product: productData[6] }
productData6.storyName = 'Product Card - 6'

export const productData7 = template.bind({})
productData7.args = { product: productData[7] }
productData7.storyName = 'Product Card - 7'

export const productData8 = template.bind({})
productData8.args = { product: productData[8] }
productData8.storyName = 'Product Card - 8'
