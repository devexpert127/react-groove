import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'

import ImageSlider from './'

export default {
  title: 'Image Slider',
  component: ImageSlider,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}

const template = args => <ImageSlider {...args} />
// -------
// Basic example
// -------
export const example = template.bind({})
example.args = {
  images: [
    {
      _type: 'image',
      alt: 'Spider man',
      height: 307,
      mimeType: 'image/jpeg',
      name: 'IMAGE_1.jpg',
      size: 44932,
      src: 'https://f.shgcdn.com/2c27de05-e1fd-48bb-a41e-1138ef75a50a/',
      storageID: '57ebdc40-05b6-4ec3-aa24-2576f318d335',
      thumbnail: 'https://ucarecdn.com/57ebdc40-05b6-4ec3-aa24-2576f318d335/-/resize/x70/',
      uuid: '722730dd-b192-4744-9eaf-e673663923fc-C',
      width: 1440,
    },
    {
      _type: 'image',
      alt: 'Captin America',
      height: 307,
      mimeType: 'image/jpeg',
      name: 'IMAGE_2.jpg',
      size: 44932,
      src: 'https://f.shgcdn.com/a8291e9e-5180-4a7d-91b7-8c9d948fec48/',
      storageID: '57ebdc40-05b6-4ec3-aa24-2576f318d335',
      thumbnail: 'https://ucarecdn.com/57ebdc40-05b6-4ec3-aa24-2576f318d335/-/resize/x70/',
      uuid: '722730dd-b192-4744-9eaf-e673663923fc-B',
      width: 1440,
    },
    {
      _type: 'image',
      alt: '',
      height: 307,
      mimeType: 'image/jpeg',
      name: 'IMAGE_3.jpg',
      size: 44932,
      src: 'https://f.shgcdn.com/aa3dd74a-1587-46f3-94cc-e7214229b349/',
      storageID: '57ebdc40-05b6-4ec3-aa24-2576f318d335',
      thumbnail: 'https://ucarecdn.com/57ebdc40-05b6-4ec3-aa24-2576f318d335/-/resize/x70/',
      uuid: '722730dd-b192-4744-9eaf-e673663923fc-A',
      width: 1440,
    },
  ],
}
example.storyName = 'Image Slider'
