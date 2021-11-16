import React from 'react'
import { withKnobs, text, object } from '@storybook/addon-knobs'
import SvgImage from '.'

export default {
  title: 'SvgImage',
  component: SvgImage,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}
const media = {
  alt: "Printer",
  mimeType: "image/svg+xml",
  name: "icon_printer.svg",
  posterStorageID: null,
  posterUrl: "https://f.shgcdn.com/%!s(<nil>)/",
  size: 1846,
  src: "https://f.shgcdn.com/88e0aaf1-b288-4a40-bec7-9bdad13038ef/",
  storageID: "88e0aaf1-b288-4a40-bec7-9bdad13038ef",
  uuid: "0f12b90e-6271-4a02-9192-b7179cd1f249",
  _type: "video",
}
export const example = () => {
  return (
    <SvgImage {...media} />
  )
}
