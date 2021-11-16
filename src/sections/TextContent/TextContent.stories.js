import React from 'react'
import { withKnobs, text, select, boolean, object } from '@storybook/addon-knobs'

import TextContent from './'

export default {
  title: 'Text / Text Content',
  component: TextContent,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}

export const textContent = () => {
  const title = text('Title', 'This is a title')
  const content = object('Content', [
    {
      children: [
        { bold: true, text: 'Lorem ipsum' },
        { text: ' ' },
        { italic: true, text: 'dolor sit amet' },
        { text: ', ' },
        {
          children: [{ text: 'consectetur adipisicing' }],
          external: true,
          type: 'link',
          url: 'https://google.com',
        },
        { text: ' elit. ' },
      ],
      type: 'paragraph',
    },
    {
      children: [
        {
          text:
            'Nesciunt odit iste, nostrum beatae quis, dignissimos voluptates quibusdam id accusantium ut officiis nam assumenda quos nobis nemo ex sint accusamus cumque.',
        },
      ],
      type: 'paragraph',
    },
  ])

  return (
    <>
      <TextContent
        title={title}
        content={content}
        textAlign={select('Position', {
          Left: { name: 'Left', value: 'left' },
          Center: { name: 'Center', value: 'center' },
          Right: { name: 'Right', value: 'right' },
        })}
        pageWidth={boolean('Page Width', true)}
        readingLength={boolean('Reading Length', false)}
      />
    </>
  )
}
