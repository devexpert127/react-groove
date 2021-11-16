import React from 'react'
import { withKnobs, text, boolean, select, files, object } from '@storybook/addon-knobs'

import RichTextContent from './'

export default {
  title: 'Text / Rich Text Content',
  component: RichTextContent,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}

export const richTextContent = () => {
  const content = object('Content', [
    { children: [{ bold: true, text: 'Warranty' }, { text: ' for life' }], type: 'h1' },
    { children: [{ text: '' }], type: 'paragraph' },
    { children: [{ text: 'Break it, Lose it, We Replace it' }], type: 'h2' },
    { children: [{ text: '' }], type: 'paragraph' },
    {
      children: [
        {
          text:
            "Whether you're free-climbing \"El Cap\" or washing dishes at home, we've got you covered. If your Groove product ever rips, tears, or stretches, we will happily replace it. If you lose it or just don't like the color, you're still covered. Whatever happens, we're here to help.",
        },
      ],
      type: 'paragraph',
    },
    { children: [{ text: '' }], type: 'paragraph' },
    { children: [{ text: "That's our amazing warranty." }], type: 'paragraph' },
  ])

  return (
    <>
      <RichTextContent
        content={content}
        buttonText={text('Button Text', 'Click this <strong>button!</strong>')}
        buttonLink={text('Link', '/to-go-nowhere')}
        image={files(
          'Image',
          ['.jpg, .png'],
          'https://assets.frontend.shogun.dev/bd711c85-bd7f-4fae-8d71-e258fba23b65/',
        )}
        textAlign={select('Position', {
          Left: { name: 'Left', value: 'left' },
          Center: { name: 'Center', value: 'center' },
          Right: { name: 'Right', value: 'right' },
        })}
        readingLength={boolean('Reading Length', true)}
        styleDark={boolean('Style dark?', false)}
        styleGrey={boolean('Grey background?', true)}
        styleCutaway={boolean('Add top cutaway', true)}
        buttonStyleDefault={boolean('Use default button style?', true)}
        noTopPadding={boolean('Remove top padding', false)}
        noBottomPadding={boolean('Remove bottom padding', false)}
        restrictImageWidths={boolean('Restrict image widths', false)}
      />
    </>
  )
}

export const realData = () => (
  <RichTextContent
    {...{
      content: [
        { children: [{ bold: true, text: 'GROOVE WEDDING RINGS' }], type: 'h3' },
        {
          children: [
            {
              text:
                'The Big Day is here and you still need one thing (no, the fiance should already be there…). You need the perfect ring!',
            },
          ],
          type: 'paragraph',
        },
        { children: [{ text: '' }], type: 'paragraph' },
        {
          children: [
            {
              text:
                'A sweaty finger can ruin the fun of the cake face smash, or the first dance, but Groove Life breathable wedding rings are the perfect way to show the sign of your new commitment worry-free!',
            },
          ],
          type: 'paragraph',
        },
        { children: [{ text: '' }], type: 'paragraph' },
        {
          children: [
            {
              text:
                'So tell Mom to grab the tissues, tell your Maid of Honor to grab your train, and relax because you’ll be cool, comfortable, and happy on the best day of your life! #tooblessedtosweat',
            },
          ],
          type: 'paragraph',
        },
      ],
      buttonText: '',
      buttonLink: '',
      image: {
        _type: 'image',
        alt: 'Joe Rogan',
        height: 450,
        mimeType: 'image/jpeg',
        name: 'joerogan.jpg',
        size: 203913,
        src: 'https://f.shgcdn.com/eb5db036-7790-4deb-a336-33fe7b6b3e5e/',
        storageID: 'eb5db036-7790-4deb-a336-33fe7b6b3e5e',
        uuid: '83a198e1-62d5-4481-9e60-1702494f4e2d',
        width: 540,
      },
      textAlign: { name: 'Center', value: 'center' },
      readingLength: false,
      styleDark: false,
      styleGrey: false,
      styleCutaway: false,
      buttonStyleDefault: false,
      noTopPadding: false,
      noBottomPadding: false,
      restrictImageWidths: false,
    }}
  />
)
