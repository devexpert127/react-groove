import React from 'react'
import { withKnobs, files, boolean, text } from '@storybook/addon-knobs'
import Image from './'

export default {
  title: 'Image / Image',
  component: Image,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}

export const image = () => {
  const imageProp = {
    src: files(
      'Image',
      ['.jpg, .png'],
      'https://assets.frontend.shogun.dev/f2abe051-037c-43d0-bb8b-8184a5324aff/',
    ),
    alt: 'Alt test',
  }

  const mobileImage = {
    src: files(
      'Mobile Image',
      ['.jpg, .png'],
      'https://assets.frontend.shogun.dev/d9a3883b-8c34-4243-b420-9132614e9efd/',
    ),
    alt: 'Alt test',
  }

  const pageWidth = boolean('Page Width?', true)

  const link = text('Link', '/to-go-nowhere')

  const noTopPadding = boolean('No top padding?', false)

  const noBottomPadding = boolean('No bottom padding?', false)

  const loading = text('Loading', 'lazy')
  return (
    <>
      <Image
        image={imageProp}
        mobileImage={mobileImage}
        pageWidth={pageWidth}
        link={link}
        noTopPadding={noTopPadding}
        noBottomPadding={noBottomPadding}
        loading={loading}
        nested={true}
      />
    </>
  )
}

export const realData = () => (
  <Image
    mobileImage={null}
    pageWidth={false}
    link={null}
    noTopPadding={false}
    noBottomPadding={false}
    image={{
      _type: 'image',
      alt: '',
      height: 307,
      mimeType: 'image/jpeg',
      name: 'NFL_Lander_Copy_block_Desktop_2020_update.jpg',
      size: 44932,
      src: 'https://f.shgcdn.com/57ebdc40-05b6-4ec3-aa24-2576f318d335/',
      storageID: '57ebdc40-05b6-4ec3-aa24-2576f318d335',
      thumbnail: 'https://ucarecdn.com/57ebdc40-05b6-4ec3-aa24-2576f318d335/-/resize/x70/',
      uuid: '722730dd-b192-4744-9eaf-e673663923fc',
      width: 1440,
    }}
    loading="eager"
  />
)
