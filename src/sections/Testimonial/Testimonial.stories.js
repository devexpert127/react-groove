import React from 'react'
import { withKnobs, boolean, object } from '@storybook/addon-knobs'

import Testimonial from './'

export default {
  title: 'Text / Testimonial',
  component: Testimonial,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}

export const testimonial = () => {
  const content = object('Content', [
    {
      children: [
        {
          text:
            '"I hate corporate cultures and strive to make Groove a place of endless autonomous creation. We are on a mission to serve our fans and build a culture of curiosity, adventurous risk taking, and outstanding results."',
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '- Peter Goodwin, Founder' }], type: 'paragraph' },
    { children: [{ text: '' }], type: 'paragraph' },
    { children: [{ text: '' }], type: 'paragraph' },
  ])

  return <Testimonial content={content} readingLength={boolean('Reading Length', true)} />
}
