import React from 'react'
import { withKnobs, text, files, radios, number } from '@storybook/addon-knobs'
import RelatedProducts from './'

export default {
  title: 'Product / Related Products',
  component: RelatedProducts,
  decorators: [withKnobs],
}

const image = 'https://assets.frontend.shogun.dev/aab7baf5-ca20-437c-9914-113fac7eb1f5/'

export const relatedProducts = () => (
  <RelatedProducts
    title={text('Title', 'How About These?')}
    parentProduct={{
      externalId: 2129138548803,
    }}
    excludedProducts={[
      {
        name: "Mystery Ring Only $14.95 (Save $15)",
        slug: "mystery-ring-1",
        _id: "928e1449-95b5-40ca-a6ce-8f2c3ca0c438"
      },
      {
        name: "eGift Card",
        slug: "gift-card",
        _id: "1ffabaf4-fa42-4807-8b48-f9cf56f81767"
      },
      {
        name: "Zeus Step Flat Earth/Black",
        slug: "groove-zeus-step-flat-earth-black",
        _id: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzIxMjkxNDE2OTQ1MzE="
      }
    ]}
    limit={number('Products to show', 4)}
  />
)
