import React from 'react'
import { withKnobs, text, files, select, number, boolean } from '@storybook/addon-knobs'
import BannerBlocks from './'

export default {
  title: 'Banner / Banner Blocks',
  component: BannerBlocks,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}

export const bannerBlocks = () => {
  const banners = []
  for (let i = 0; i < number('Block amount', 3); i++) {
    banners.push({
      title: text('Title', 'This is a really long-titled <b>banner</b>', `Banner-${i}`),
      image: {
        src: files(
          'Image',
          ['.jpg, .png'],
          'https://assets.frontend.shogun.dev/f2abe051-037c-43d0-bb8b-8184a5324aff/',
          `Banner-${i}`,
        ),
      },
      link: text('Link', '/to-go-nowhere', `Banner-${i}`),
      buttonText: text('Button Text', 'Shop Now', `Banner-${i}`),
    })
  }

  const textPosition = select('Position', {
    TopLeft: { name: 'Top Left', value: 'top-left' },
    TopCenter: { name: 'Top Center', value: 'top-center' },
    TopRight: { name: 'Top Right', value: 'top-right' },
    CenterLeft: { name: 'Center Left', value: 'center-left' },
    CenterCenter: { name: 'Center Center', value: 'center-center' },
    CenterRight: { name: 'Center Right', value: 'center-right' },
    BottomLeft: { name: 'Bottom Left', value: 'bottom-left' },
    BottomCenter: { name: 'Bottom Center', value: 'bottom-center' },
    BottomRight: { name: 'Bottom Right', value: 'bottom-right' },
  })

  const eagerLoading=boolean('Eager load image', false)

  return (
    <>
      <BannerBlocks textPosition={textPosition} banners={banners} eagerLoading={eagerLoading}/>
    </>
  )
}
