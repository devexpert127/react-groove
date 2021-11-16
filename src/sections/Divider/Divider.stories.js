import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'

import Divider from './'

export default {
  title: 'Utility / Divider',
  component: Divider,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
    notes: '',
  },
}

export const divider = () => {
  return (
    <>
      <Divider />
    </>
  )
}
