import React from 'react'
import { withKnobs, text, boolean, select, files, object } from '@storybook/addon-knobs'
import DontKnowYourRingSize from './'
import productsData from '../../static/products.json'

export default {
  title: "Text / Don't Know Your Ring Size?",
  component: DontKnowYourRingSize,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}

export const dontKnowYourRingSize = () => {
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
      <DontKnowYourRingSize
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
        product={productsData[0]}
      />
    </>
  )
}
