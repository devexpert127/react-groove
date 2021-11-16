import React from 'react'
import { withKnobs, text, files, select } from '@storybook/addon-knobs'
import App from '../../components/App'
import VideoBannerVimeo from './'

export default {
  title: 'Banner / Video Banner Vimeo',
  component: VideoBannerVimeo,
  decorators: [withKnobs],
}

const template = args => (
  <App>
    <div style={{ backgroundColor: '#ecf', height: '40px' }} />
    <VideoBannerVimeo {...args} />
    <div style={{ backgroundColor: '#abc', height: '100px' }} />
  </App>
)
// ------------------------------------------
// 16 x 9 ratio video - props example
// ------------------------------------------
export const videoBannerVimeo = template.bind({})
videoBannerVimeo.args = {
  videoId: text('Video ID', '416083266'),
}
videoBannerVimeo.storyName = '16:9 video'
// ------------------------------------------
// 17 x 9 ratio video
// ------------------------------------------
export const ratio17x9 = template.bind({})
ratio17x9.args = {
  ...videoBannerVimeo.args,
  videoId: '458180982',
}
ratio17x9.storyName = '17:9 video'

// ------------------------------------------
// videoId is invalid
// ------------------------------------------
export const invalidVideoID = template.bind({})
invalidVideoID.args = {
  ...videoBannerVimeo.args,
  videoId: 'Not a valid id, this is a garbage videoId bro!',
}
// ------------------------------------------
// videoId is null / not supplied
// ------------------------------------------
export const noVideoId = template.bind({})
noVideoId.args = {
  ...videoBannerVimeo.args,
  videoId: null,
}
// ------------------------------------------
// videoId is an empty string
// ------------------------------------------
export const emptyStringVideoId = template.bind({})
emptyStringVideoId.args = {
  ...videoBannerVimeo.args,
  videoId: '',
}
