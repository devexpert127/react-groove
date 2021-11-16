import React from 'react'
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs'
import Video from '../../static/groove-belt.mp4'
import VideoBannerHTML5 from './'

export default {
  title: 'Banner / Video Banner HTML5',
  component: VideoBannerHTML5,
  decorators: [withKnobs],
}


const videoDetails = {
  mimeType: 'video/mp4',
  name: 'video.mp4',
  size: 978562,
  src: text('Video Source (MP4)', Video),
  storageID: '8477eeaa-f790-4b1a-bf65-0aca322629e6',
  uuid: '1b91b52e-f73f-44bf-96b4-093003ee0a84',
  _type: 'video',
}

const ALIGNMENT = {
  Left: { alue: 'left' },
  Center: { alue: 'center' },
  Right: { alue: 'right' },
}

const POSITION = {
  TopLeft: { value: 'top-left' },
  TopCenter: { value: 'top-center' },
  TopRight: { value: 'top-right' },
  CenterLeft: { value: 'center-left' },
  CenterCenter: { value: 'center-center' },
  CenterRight: { value: 'center-right' },
  BottomLeft: { value: 'bottom-left' },
  BottomCenter: { value: 'bottom-center' },
  BottomRight: { value: 'bottom-right' },
}

const template = args => {
  return <VideoBannerHTML5 {...args} />
}
// --------------
// Most simple exampe
// --------------
export const video = template.bind({})
video.args = {
    video: videoDetails,
}
// --------------
// Most simple exampe
// --------------
export const videoLink = template.bind({})
videoLink.args = {
   ...video.args,
    link: '/to-go-nowhere',
}

// --------------
// Most simple exampe
// --------------
export const overlay = template.bind({})
overlay.args = {
    ...videoLink.args,
    title: 'Title',
    supertitle: 'SuperTitle',
    subtitle: 'Sub title',
    buttonText: 'Click me',
}
// --------------
// Use real product data as a base and then add/update the properties as needed.
// --------------
export const overlayNoButtonText = template.bind({})
overlayNoButtonText.args = {
    ...overlay.args,
    buttonText: null,
}
// --------------
// Use real product data as a base and then add/update the properties as needed.
// --------------
export const overlayButtonStyle = template.bind({})
overlayButtonStyle.args = {
    ...overlay.args,
    buttonStyleDefault: true,
}
// --------------
// Use real product data as a base and then add/update the properties as needed.
// --------------
export const overlayNoLink = template.bind({})
overlayNoLink.args = {
    ...overlay.args,
    link: null,
}
// --------------
// PAGE WIDTH 
// --------------

export const videoPageWidth = template.bind({})
videoPageWidth.args = {
  ...video.args,
  pageWidth: true,
}

export const overlayPageWidth = template.bind({})
overlayPageWidth.args = {
  ...videoPageWidth.args,
  ...overlay.args,
}

export const overlayNoButtonTextPageWidth = template.bind({})
overlayNoButtonTextPageWidth.args = {
  ...videoPageWidth.args,
  ...overlayNoButtonText.args,
}

export const overlayNoLinkPageWidth = template.bind({})
overlayNoLinkPageWidth.args = {
  ...videoPageWidth.args,
  ...overlayNoLink.args,
}




export const TopLeft = template.bind({})
TopLeft.args = {
  ...overlay.args,
  textAlignment: ALIGNMENT.Left,
  textPosition: POSITION.TopLeft,
}

// --------------
// Most simple exampe
// --------------
export const TopCenter = template.bind({})
TopCenter.args = {
  ...TopLeft.args,
  textAlignment: ALIGNMENT.Left,
  textPosition: POSITION.TopCenter,
}
// --------------
// Most simple exampe
// --------------
export const topRight = template.bind({})
topRight.args = {
  ...TopLeft.args,
  textAlignment: ALIGNMENT.Left,
  textPosition: POSITION.TopRight,
}
// --------------
// Most simple exampe
// --------------
export const centerLeft = template.bind({})
centerLeft.args = {
  ...TopLeft.args,
  textAlignment: ALIGNMENT.Left,
  textPosition: POSITION.CenterLeft,
}
// --------------
// Most simple exampe
// --------------
export const CenterCenter = template.bind({})
CenterCenter.args = {
  ...TopLeft.args,
  textAlignment: ALIGNMENT.Left,
  textPosition: POSITION.CenterCenter,
}
// --------------
// Most simple exampe
// --------------
export const CenterRight = template.bind({})
CenterRight.args = {
  ...TopLeft.args,
  textAlignment: ALIGNMENT.Left,
  textPosition: POSITION.CenterRight,
}
// --------------
// Most simple exampe
// --------------
export const BottomLeft = template.bind({})
BottomLeft.args = {
  ...TopLeft.args,
  textAlignment: ALIGNMENT.Left,
  textPosition: POSITION.BottomLeft,
}
// --------------
// Most simple exampe
// --------------
export const BottomCenter = template.bind({})
BottomCenter.args = {
  ...TopLeft.args,
  textAlignment: ALIGNMENT.Left,
  textPosition: POSITION.BottomCenter,
}
// --------------
// Most simple exampe
// --------------
export const BottomRight = template.bind({})
BottomRight.args = {
  ...TopLeft.args,
  textAlignment: ALIGNMENT.Left,
  textPosition: POSITION.BottomRight,
}
