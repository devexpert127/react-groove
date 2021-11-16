import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'
import ArticleVideo from './'

export default {
  title: 'Blog / ArticleVideo',
  component: ArticleVideo,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}

export const articleVideo = () => {
  return (
    <ArticleVideo
      video={text(
        'Video embed',
        `<iframe src="https://player.vimeo.com/video/416083266" frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>`,
      )}
    />
  )
}
