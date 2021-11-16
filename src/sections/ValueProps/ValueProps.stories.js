import React from 'react'
import { withKnobs, text, files, boolean } from '@storybook/addon-knobs'
import productData from '../../static/products.json'
import ValueProps from './'

export default {
  title: 'Value Props',
  component: ValueProps,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
    notes: '',
  },
}

export const valueProps = () => {
  const shippingTimeframe = text('Shipping Timeframe', '48 Hours', 'Shipping Timeframe'),
    valuePropOneTitle = text('Value Prop One Title', 'Fast Like a Cheetah', 'Value Prop One'),
    valuePropOneSubtitle = text(
      'Value Prop One Subtitle',
      'Ready to ship in {shippingTimeframe}',
      'Value Prop One',
    ),
    valuePropOneIcon = {
      name: text('Value Prop One Icon Name', 'breathable', 'Value Prop One'),
      icon: {
        "alt": "Some alt text",
        "mimeType": "image/svg+xml",
        "name": "icon_fast-shipping.svg",
        "posterStorageID": null,
        "posterUrl": "https://f.shgcdn.com/%!s(<nil>)/",
        "size": 615,
        "src": "https://f.shgcdn.com/3280a324-6780-45bd-a81b-85d67a9f94ca/",
        "storageID": "3280a324-6780-45bd-a81b-85d67a9f94ca",
        "uuid": "1a92e23e-505d-4953-b09a-54a756103f7f",
        "_type": "video",
      }
    },
    valuePropTwoTitle = text('Value Prop Two Title', 'No BS for real', 'Value Prop Two'),
    valuePropTwoSubtitle = text('Value Prop Two Subtitle', '94 Year Warranty', 'Value Prop Two'),
    valuePropTwoIcon = {
      name: text('Value Prop Two Icon Name', 'no-bs', 'Value Prop Two'),
      icon: {
        "alt": "Some alt text",
        "mimeType": "image/svg+xml",
        "name": "icon_no-bs.svg",
        "posterStorageID": null,
        "posterUrl": "https://f.shgcdn.com/%!s(<nil>)/",
        "size": 615,
        "src": "https://f.shgcdn.com/11e3ec32-99a7-40d9-88e8-7a89419a20b8/",
        "storageID": "3280a324-6780-45bd-a81b-85d67a9f94ca",
        "uuid": "1a92e23e-505d-4953-b09a-54a756103f7f",
        "_type": "video",
      }
    },
    valuePropThreeTitle = text('Value Prop Three Title', 'Safer than Ft Knox', 'Value Prop Three'),
    valuePropThreeSubtitle = text(
      'Value Prop Three Subtitle',
      'Secure Global Checkout',
      'Value Prop Three',
    ),
    valuePropThreeIcon = {
      name: text('Value Prop Three Icon Name', 'lock', 'Value Prop Three'),
      icon: {
        "alt": "Some alt text",
        "mimeType": "image/svg+xml",
        "name": "icon_fast-shipping.svg",
        "posterStorageID": null,
        "posterUrl": "https://f.shgcdn.com/%!s(<nil>)/",
        "size": 615,
        "src": "https://f.shgcdn.com/fb147339-0f21-48b1-a44f-c383cf3dce92/",
        "storageID": "3280a324-6780-45bd-a81b-85d67a9f94ca",
        "uuid": "1a92e23e-505d-4953-b09a-54a756103f7f",
        "_type": "video",
      }
    },
    noTopPadding = boolean('Remove top padding?', false),
    noBottomPadding = boolean('Remove bottom padding?', false)

  return (
    <ValueProps
      valuePropOneTitle={valuePropOneTitle}
      valuePropOneSubtitle={valuePropOneSubtitle}
      valuePropOneIcon={valuePropOneIcon}
      valuePropTwoTitle={valuePropTwoTitle}
      valuePropTwoSubtitle={valuePropTwoSubtitle}
      valuePropTwoIcon={valuePropTwoIcon}
      valuePropThreeTitle={valuePropThreeTitle}
      valuePropThreeSubtitle={valuePropThreeSubtitle}
      valuePropThreeIcon={valuePropThreeIcon}
      shippingTimeframe={shippingTimeframe}
      noTopPadding={noTopPadding}
      noBottomPadding={noBottomPadding}
      productTags={productData[0].tags}
    />
  )
}
