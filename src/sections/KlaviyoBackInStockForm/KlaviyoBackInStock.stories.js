import React from 'react'
import { text, withKnobs } from '@storybook/addon-knobs'
import KlaviyoBackInStockForm from './'

export default {
  title: 'Integration / Klaviyo Back In Stock Form',
  component: KlaviyoBackInStockForm,
  decorators: [withKnobs],
}

export const klaviyoBackInStockForm = () => {
  return (
    <KlaviyoBackInStockForm
      title={text('Title', 'Notify Me')}
      subtitle={text(
        'Subtitle',
        'Register to receive a notification when this item comes back in stock.',
      )}
      currentProductId={text('Product ID', '3930761134122')}
      currentVariantId={text('Variant ID', '29412671750186')}
    />
  )
}
