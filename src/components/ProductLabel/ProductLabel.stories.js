import React from 'react'
import { withKnobs, radios } from '@storybook/addon-knobs'

import ProductLabel from './'

export default {
  title: 'Product / Product Label',
  component: ProductLabel,
  decorators: [withKnobs],
}

export const productLabel = () => (
  <>
    <ProductLabel
      label={radios(
        'Label',
        [
          'tag-best-seller',
          'tag-limited-edition',
          'tag-new',
          'tag-sale',
          'tag-bundle-savings',
          'tag-sold-out',
          'tag-back-in-stock',
          'tag-widethin',
        ],
        'tag-new',
      )}
    />
  </>
)
