import React from 'react'
import { withKnobs, boolean, object } from '@storybook/addon-knobs'
import productData from '../../static/products.json'
import Modal from 'Components/Modal'
import KlaviyoBackInStockForm from 'Components/KlaviyoBackInStockForm'
import ProductSubmitButton from './'

export default {
  title: 'Product / Product Submit Button',
  component: ProductSubmitButton,
  decorators: [withKnobs],
}

const product = object('Product', productData[2])
const variant = object('Variant', product.variants[1])

const template = args => <ProductSubmitButton {...args} />

export const productSubmitButton = template.bind({})
productSubmitButton.args = {
  onClick: () => console.log('CLICK'),
  addToCartText: 'Add to cart',
  selectSizeText: 'Select size',
  productAvailable: true,
  needsInfo: false,
  items: [
    {
      id: variant.externalId,
      quantity: 1,
    },
  ],
  outOfStockComponent: (
    <Modal buttonText={<React.Fragment>Notify Me<span className="Button__hidden"> When Back in Stock</span></React.Fragment>}>
      <KlaviyoBackInStockForm
        title={`${product.name} (${variant.name})`}
        subtitle={'Register to receive a notification when this item comes back in stock.'}
        currentProductId={product.externalId}
        currentVariantId={variant.externalId}
      />
    </Modal>
  ),
}
productSubmitButton.storyName = 'Can purchase'

export const needsInfo = template.bind({})
needsInfo.args = {
  ...productSubmitButton.args,
  needsInfo: true,
}
needsInfo.storyName = 'Needs Info'

export const outofStock = template.bind({})
outofStock.args = {
  ...productSubmitButton.args,
  canPurchase: true,
  needsInfo: false,
  outOfStock: true,
  outOfStockComponent: null,
}
outofStock.storyName = 'Out of Stock'

export const outofStockCustom = template.bind({})
outofStockCustom.args = {
  ...productSubmitButton.args,
  needsInfo: false,
  outOfStock: true,
  outOfStockCustom: true,
}
outofStockCustom.storyName = 'Custom Out of Stock'
