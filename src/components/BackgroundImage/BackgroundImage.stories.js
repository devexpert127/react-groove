import React from 'react'
import { withKnobs, files, radios, array, text } from '@storybook/addon-knobs'
import BackgroundImage from './'

export default {
  title: 'Image / BackgroundImage',
  component: BackgroundImage,
  decorators: [withKnobs],
  parameters: {
    notes:
      '`<BackgroundImage>` uses the `<ResponsiveBackgroundImage>` component internally. This wraps the component so we can handle the styles consistantly across all the sections that use a background image and so that we can handle passing it children elements correctly.',
  },
}

export const backgroundImage = () => {
  const image = {
    src: files(
      'Image',
      ['.jpg, .png'],
      'https://assets.frontend.shogun.dev/c8d06822-8536-4ac7-8105-654e638080df/',
    ),
    alt: '',
  }
  const mobileImage = {
    src: files(
      'Mobile Image',
      ['.jpg, .png'],
      'https://assets.frontend.shogun.dev/875e54dc-1959-4cd8-ba5c-94ea00061c8a/',
    ),
    alt: '',
  }
  const imgRatio = {
    small: radios(
      'Aspect ratio small screen',
      ['1x1', '25x23', '4x3', '16x9', '2x1', '3x1'],
      '25x23',
    ),
    large: radios(
      'Aspect ratio large screen',
      ['1x1', '25x23', '4x3', '16x9', '2x1', '3x1'],
      '3x1',
    ),
  }

  const widths = array('Widths', [600, 1200, 1600, 2048]) // [smWidth, mdWidth, lgWidth, xlWidth]

  const loading = text('Loading', 'lazy')

  return (
    <>
      <BackgroundImage
        imageSrc={image.src}
        mobileImageSrc={mobileImage.src}
        imgRatio={imgRatio}
        widths={widths}
        loading={loading}
      />
    </>
  )
}
