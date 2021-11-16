import React from 'react'
import { text, object, boolean, withKnobs } from '@storybook/addon-knobs'
import FaqAccordion from './'

export default {
  title: 'Accordion / FAQ Accordion',
  component: FaqAccordion,
  decorators: [withKnobs],
}

export const faqAccordion = () => {
  const items = [
    {
      name: text('Name', 'One', 'Item 1'),
      content: object(
        'Content',
        [
          {
            children: [{ text: 'Item one ', bold: true }, { text: 'Item one' }],
            type: 'paragraph',
          },
        ],
        'Item 1',
      ),
    },
    {
      name: text('Name', 'Two', 'Item 2'),
      content: object(
        'Content',
        [
          {
            children: [{ text: 'Item two ', bold: true }, { text: 'Item two' }],
            type: 'paragraph',
          },
        ],
        'Item 2',
      ),
    },
    {
      name: text('Name', 'I bought a ring/watch band, and the order shows confirmed and shipped but the tracking doesn’t show movement. What the heck?', 'Item 3'),
      content: object(
        'Content',
        [
          {
            children: [{ text: 'Item three ', bold: true }, { text: 'Item three' }],
            type: 'paragraph',
          },
        ],
        'Item 3',
      ),
    },
  ]

  return (
    <FaqAccordion
      items={items}
      title={text('Title', 'Example')}
      noTopPadding={boolean('Remove top padding?', true)}
      noBottomPadding={boolean('Remove bottom padding?', true)}
    />
  )
}
