import React from 'react'
import { withKnobs, number, text, select } from '@storybook/addon-knobs'
import Video from '../../static/groove-belt.mp4'
import VideoGif from './'

export default {
  title: 'Banner / Video (GIF Replacement)',
  component: VideoGif,
  decorators: [withKnobs],
}

export const videoGif = () => {
  const video = {
    mimeType: 'video/mp4',
    name: 'video.mp4',
    size: 978562,
    src: text('Video Source (MP4)', Video),
    storageID: '8477eeaa-f790-4b1a-bf65-0aca322629e6',
    uuid: '1b91b52e-f73f-44bf-96b4-093003ee0a84',
    _type: 'video',
  }

  return (
    <VideoGif
      video={video}
      maxWidth={number('Max-width (in pixels)', 200)}
      alignment={select('Position', {
        Left: { name: 'Left', value: 'left' },
        Center: { name: 'Center', value: 'center' },
        Right: { name: 'Right', value: 'right' },
      })}
    />
  )
}
