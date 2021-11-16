import React from 'react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import EmbedKlaviyo from './'

export default {
  title: 'Embed / Embed Klaviyo',
  component: EmbedKlaviyo,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
  notes: '',
}

export const embedKlaviyo = () => {
  const title = text('Title', `Klaviyo embed title`)
  const embed = text('Embed', `<div class="klaviyo-form-SbVXgw"></div>`)

  return (
    <>
      <EmbedKlaviyo title={title} embed={embed} pageWidth={boolean('Page Width?', true)} />
    </>
  )
}
