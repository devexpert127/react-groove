import React from 'react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import TypeForm from './'

export default {
  title: 'Integration / Type Form',
  component: TypeForm,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
  notes: 'Special Embed for TypeForm',
}

export const typeForm = () => {
  return (
    <>
      <TypeForm
        id={text('ID', 'rbKrAN')}
        pageWidth={boolean('Page Width?', true)}
        styleDark={boolean('Page Width?', true)}
      />
    </>
  )
}
