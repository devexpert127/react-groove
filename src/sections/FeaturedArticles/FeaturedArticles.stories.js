import React from 'react'
import { withKnobs, text, files, boolean } from '@storybook/addon-knobs'
import FeaturedArticles from './'

export default {
  title: 'Blog / Featured Articles',
  component: FeaturedArticles,
  decorators: [withKnobs],
}

export const featuredArticles = () => {
  const articles = [
    {
      featureImage: {
        src: files(
          'Image',
          ['.jpg, .png'],
          'https://assets.frontend.shogun.dev/fd2457b9-8575-4d6b-a4c9-74952788eb2f/',
          'Article 1',
        ),
        alt: 'Image 1 alt',
      },
      name: text('Title', 'Katie Van Slyke Shatters Stereotypes', 'Article 1'),
      featureImageHasText: boolean('Hide Title', false, 'Article 1'),
    },
    {
      featureImage: {
        src: files(
          'Image',
          ['.jpg, .png'],
          'https://assets.frontend.shogun.dev/59bef5dd-c18e-4b81-8a3d-a78cf38138f4/',
          'Article 2',
        ),
        alt: '',
      },
      name: text('Title', 'More to Groove', 'Article 2'),
      featureImageHasText: boolean('Hide Title', true, 'Article 2'),
    },
    {
      featureImage: {
        src: files(
          'Image',
          ['.jpg, .png'],
          'https://assets.frontend.shogun.dev/fd2457b9-8575-4d6b-a4c9-74952788eb2f/',
          'Article 3',
        ),
      },
      name: text('Title', 'What Should I Do About My Smelly Watch Band?', 'Article 3'),
      featureImageHasText: boolean('Hide Title', false, 'Article 3'),
    },
    // {
    //   featureImage: {
    //     src: files('Image', ['.jpg, .png'], 'https://assets.frontend.shogun.dev/331401a0-9002-4e1a-97b5-b3ea481f2861/', 'Article 4')
    //   },
    //   name: text('Title', 'What Should I Do About My Smelly Watch Band?', 'Article 4'),
    //   featureImageHasText: boolean('Hide Title', true, 'Article 4')
    // }
  ]

  return <FeaturedArticles articles={articles} />
}
