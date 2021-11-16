import React from 'react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import LoadingSpinner from './'

export default {
  title: 'LoadingSpinner',
  component: LoadingSpinner,
  decorators: [withKnobs],
}

const template = () => {
  return (
    <LoadingSpinner dark={boolean('Dark?', true)} />
  )
}

export const okendoReviews = template.bind({})
