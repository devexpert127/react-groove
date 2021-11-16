import React, { useState } from 'react'
import { button, text, withKnobs } from '@storybook/addon-knobs'
import SearchDrawer from './'
import { useSearch } from '../../sections/Search/useSearch'
import Button from 'Components/Button'

export default { title: 'Search / Search Drawer', component: SearchDrawer, decorators: [withKnobs] }

export const searchDrawer = () => {
  const [isOpen, setIsOpen] = useState(true)

  button('Toggle open', () => {
    setIsOpen(!isOpen)
  })

  return (
    <>
      <Button
        as="button"
        onClick={() => {setIsOpen(!isOpen)}}
      >
        Open Seach bar
      </Button>

      {/* Tall element for testing scroll lock. */}
      <div
        style={{
          backgroundImage: 'linear-gradient(#f00, #00f)',
          height: '200vh',
          marginTop: '1rem',
          width: '50vw',
        }}
      ></div>

      <SearchDrawer
        hooks={{ useSearch }}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placeholderText={text('Placeholder', 'Search')}
      />
    </>
  )
}

document.body.style.padding = '0'

searchDrawer.parameters = {
  backgrounds: {
    values: [
      { name: 'dark', value: '#191818' },
      { name: 'default', value: '#e7e9ea', default: true },
      { name: 'white', value: '#fff' },
    ]
  },
}
