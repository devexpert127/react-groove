import React from 'react'
import { withKnobs, text, files, select } from '@storybook/addon-knobs'
import ProductVideoBanner from './'

export default {
  title: 'Banner / Product Video Banner',
  component: ProductVideoBanner,
  decorators: [withKnobs],
}

export const productVideoBanner = () => {
  return (
    <>
      <ProductVideoBanner
        typeCollection={{
          productVideoId: text('Video ID', '416083266'),
        }}
      />
    </>
  )
}
