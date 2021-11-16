import React from 'react'
import { withKnobs, text, files, boolean } from '@storybook/addon-knobs'
import HeroBannerProductCollection from './'

export default {
  title: 'Banner / Hero Banner Product Collection',
  component: HeroBannerProductCollection,
  decorators: [withKnobs],
}

export const heroBannerProductCollection = () => {
  const collection = {
    image: {
      src: files(
        'Image',
        ['.jpg, .png'],
        'https://assets.frontend.shogun.dev/3b1613fb-b8db-47c3-9b3c-11b11bc8f9c8/',
      ),
    },
    showTitleOnHeroBanner: boolean('Show title on hero banner?', true),
    name: text('Title', 'This is a banner'),
    hideMasterPageSections: boolean('Hide master page section?', false),
  }

  return (
    <HeroBannerProductCollection
      collection={collection}
      hoverEffects={boolean('Show hover effects?', true)}
    />
  )
}
