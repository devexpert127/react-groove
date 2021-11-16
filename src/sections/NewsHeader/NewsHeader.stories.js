import React from 'react'
import { withKnobs, text, files, boolean, object } from '@storybook/addon-knobs'
import NewsHeader from './'

export default {
  title: 'Blog / NewsHeader',
  component: NewsHeader,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}

export const newsHeader = () => {
  const article = {
    name: text('Title', 'Why Groove has the most comfortable watch band'),
    author: text('Author', 'Taylor Northcutt'),
    date: text('Date', 'April 16, 2019'),
  }

  return <NewsHeader article={article} />
}
