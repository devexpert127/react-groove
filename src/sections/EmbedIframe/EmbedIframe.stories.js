import React from 'react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import EmbedIframe from './'

export default {
  title: 'Embed / Embed Iframe',
  component: EmbedIframe,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
  notes:
    'iframe embeds only. If the embed needs a script tag use the `<EmbedScript>` component instead.',
}

export const embedIframe = () => {
  const title = text('Title', `Don't just take our word for it`)
  const embed = text(
    'Embed',
    `<iframe src="https://player.vimeo.com/video/416083266" frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>`,
  )

  return (
    <>
      <EmbedIframe title={title} embed={embed} pageWidth={boolean('Page Width?', true)} />
    </>
  )
}
