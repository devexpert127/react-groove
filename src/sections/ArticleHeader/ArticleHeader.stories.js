import React from 'react'
import { withKnobs, text, files, boolean, object } from '@storybook/addon-knobs'
import ArticleHeader from './'

export default {
  title: 'Blog / ArticleHeader',
  component: ArticleHeader,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}

export const articleHeader = () => {
  const article = {
    name: text('Title', 'Why Groove has the most comfortable watch band'),
    author: text('Author', 'Taylor Northcutt'),
    date: text('Date', 'April 16, 2019'),
  }

  return <ArticleHeader article={article} />
}
