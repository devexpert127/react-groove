import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'
import WistiaVideo from './'

export default {
  title: 'Whitelist / WistiaVideo',
  component: WistiaVideo,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}

export const wistiaVideo = () => {
  return <WistiaVideo videoId={text('Video ID', 'w5oyqxo7cd')} />
}
