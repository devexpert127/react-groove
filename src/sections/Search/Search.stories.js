import React from 'react'
import { button, number, text, withKnobs } from '@storybook/addon-knobs'
import { useSearch } from './useSearch'
import Search from './'

export default { title: 'Search', component: Search, decorators: [withKnobs] }

export const search = () => {
  return (
    <Search
      hitsPerPage={number('Hits per page', 20)}
      hooks={{ useSearch }}
      initialQuery={text('Query', 'apple')}
      placeholderText={text('Placeholder', 'Search')}
    />
  )
}
