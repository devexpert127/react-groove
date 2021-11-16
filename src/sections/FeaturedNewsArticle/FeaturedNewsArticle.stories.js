import React from 'react'
import { withKnobs, text, files, boolean } from '@storybook/addon-knobs'
import FeaturedNewsArticle from './'

export default {
  title: 'Blog / Featured News Article',
  component: FeaturedNewsArticle,
  decorators: [withKnobs],
}

export const featuredNewsArticle = () => {
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

  return <FeaturedNewsArticle article={article} />
}
