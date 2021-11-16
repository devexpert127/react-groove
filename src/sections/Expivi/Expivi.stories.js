import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import Expivi from './'
import { CartProvider } from 'frontend-checkout'

export default {
  title: 'Integration / Expivi',
  component: Expivi,
  decorators: [withKnobs],
}

export const expivi = () => {
  return (
    <CartProvider
      platform="shopify"
      storeConfig={{
        storeId: process.env.STORYBOOK_SITE_ID,
        platformApiType: process.env.STORYBOOK_PLATFORM_API_TYPE,
        sharedCheckoutDomains: [],
        storeName: process.env.STORYBOOK_STORE_NAME,
        storeDomain: process.env.STORYBOOK_PLATFORM_PUBLIC_DOMAIN,
        storeToken: process.env.STORYBOOK_STORE_TOKEN,
      }}
    >
      <Expivi />
    </CartProvider>
  )
}
