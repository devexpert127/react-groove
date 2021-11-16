import React from 'react'
import { withKnobs, text, files, boolean } from '@storybook/addon-knobs'
import FeaturedArticle from './'

export default {
  title: 'Blog / Featured Article',
  component: FeaturedArticle,
  decorators: [withKnobs],
}

export const featuredArticle = () => {
  const article = {
    featureImage: {
      src: files(
        'Image',
        ['.jpg, .png'],
        'https://assets.frontend.shogun.dev/fd2457b9-8575-4d6b-a4c9-74952788eb2f/',
      ),
      alt: 'Image alt',
    },
    name: text('Title', 'Katie Van Slyke Shatters Stereotypes'),
    featureImageHasText: boolean('Hide Title', false),
  }

  return <FeaturedArticle article={article} />
}
