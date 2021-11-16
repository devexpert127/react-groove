import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'
import NewsVideo from './'

export default {
  title: 'Blog / NewsVideo',
  component: NewsVideo,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}

export const newsVideo = () => {
  return (
    <NewsVideo
      video={text(
        'Video embed',
        `<iframe src="https://player.vimeo.com/video/416083266" frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>`,
      )}
    />
  )
}
