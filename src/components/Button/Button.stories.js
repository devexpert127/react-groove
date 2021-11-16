import React from 'react'
import { withKnobs, radios, text, boolean } from '@storybook/addon-knobs'

import Button from './'

export default {
  title: 'Utility / Button',
  component: Button,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
    notes:
      'Link is a valid type for a button but requires a `to` parameter. In Storybook this give an error because we are passing a string in not a real Link component.',
  },
}

export const button = () => {
  // Content structured from rich text field
  const content = text('content', 'Shop <strong>Now</strong>')

  // // Basic text content
  // const content = text('content', 'Shop<strong>Now</strong> <em>test</em>');

  // // Content as JSX
  // const content = (<> Shop<strong>Now</strong> </>);

  return (
    <>
      <Button
        style={radios('style', ['default', 'primary', 'basic', 'unstyled'], 'default')}
        as={radios('as', ['button', 'a', 'Link'], 'button')}
        disabled={boolean('disabled?', false)}
        onClick={() => console.log('CLICK')}
      >
        {content}
      </Button>
    </>
  )
}
