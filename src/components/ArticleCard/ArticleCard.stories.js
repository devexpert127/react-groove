import React from 'react'
import { withKnobs, text, files, boolean } from '@storybook/addon-knobs'
import ArticleCard from './'

export default {
  title: 'Blog / Article Card',
  component: ArticleCard,
  decorators: [withKnobs],
}

export const articleCard = () => {
  const article = {
    featureImage: {
      src: files(
        'Image',
        ['.jpg, .png'],
        'https://assets.frontend.shogun.dev/fd2457b9-8575-4d6b-a4c9-74952788eb2f/',
      ),
      alt: 'Image alt',
    },
    name: text('Title', 'Why Groove has the most comfortable watch band'),
    featureImageHasText: boolean('Hide Title', false),
    slug: text('Slug', 'why-groove-has-the-most-comfortable-watch-band')
  }

  const eagerLoading = boolean('Eager load image', false)

  return <ArticleCard article={article} eagerLoading={eagerLoading} />
}
