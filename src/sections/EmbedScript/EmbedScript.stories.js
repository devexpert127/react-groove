import React from 'react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import EmbedScript from './'

export default {
  title: 'Embed / Embed Script',
  component: EmbedScript,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
  notes:
    'Embeds that uses script tags only. If the embed uses an iFrame use the `<EmbedIframe>` component instead.',
}

export const embedScript = () => {
  const title = text('Title', `Don't just take our word for it`)
  const scriptSource = text(
    'Script source',
    `//newton.newtonsoftware.com/career/iframe.action?clientId=8a7883d06fb6ed51016ff35e353b31ec`,
  )

  return (
    <>
      <EmbedScript
        title={title}
        scriptSource={scriptSource}
        pageWidth={boolean('Page Width?', true)}
        nested={boolean('Nested in another section?', false)}
      />
    </>
  )
}
