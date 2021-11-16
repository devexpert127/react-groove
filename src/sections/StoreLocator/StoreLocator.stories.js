import React from 'react'
import { boolean, text, withKnobs } from '@storybook/addon-knobs'
import StoreLocator from './'

export default {
  title: 'Integration / Store Locator',
  component: StoreLocator,
  decorators: [withKnobs],
  parameters: {},
}

export const storeLocator = () => {
  const account = 'Y287q7G4AP'
  const location = text('location', '')
  const filters = text('filters', '')
  const tracking = boolean('tracking', true)
  const title = [
    {
      children: [
        {
          text: 'Find a store near you to pick up a Groove Life product for your next adventure.',
          bold: true,
        },
      ],
      type: 'paragraph',
    },
  ]

  return (
    <StoreLocator
      title={title}
      account={account}
      location={location}
      filters={filters}
      tracking={tracking}
    />
  )
}
