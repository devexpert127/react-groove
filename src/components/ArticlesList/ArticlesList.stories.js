import React from 'react'
import { withKnobs, text, files, boolean } from '@storybook/addon-knobs'
import ArticlesList from './'

export default {
  title: 'Blog / Article List',
  component: ArticlesList,
  decorators: [withKnobs],
}

export const articlesList = () => {
  const articleImageOne = {
      src: files(
        'Image',
        ['.jpg, .png'],
        'https://assets.frontend.shogun.dev/b881f45b-a943-4945-b0c3-5dd5e161eb11/',
        'Article 1',
      ),
    },
    articleImageTwo = {
      src: files(
        'Image',
        ['.jpg, .png'],
        'https://assets.frontend.shogun.dev/59bef5dd-c18e-4b81-8a3d-a78cf38138f4/',
        'Article 2',
      ),
    },
    articleImageThree = {
      src: files(
        'Image',
        ['.jpg, .png'],
        'https://assets.frontend.shogun.dev/36720d2a-cddf-4855-b459-3b9430223853/',
        'Article 3',
      ),
    },
    articleImageFour = {
      src: files(
        'Image',
        ['.jpg, .png'],
        'https://assets.frontend.shogun.dev/331401a0-9002-4e1a-97b5-b3ea481f2861/',
        'Article 4',
      ),
    },
    articleImageFive = {
      src: files(
        'Image',
        ['.jpg, .png'],
        'https://assets.frontend.shogun.dev/b881f45b-a943-4945-b0c3-5dd5e161eb11/',
        'Article 5',
      ),
    },
    articleImageSix = {
      src: files(
        'Image',
        ['.jpg, .png'],
        'https://assets.frontend.shogun.dev/59bef5dd-c18e-4b81-8a3d-a78cf38138f4/',
        'Article 6',
      ),
    },
    articleImageSeven = {
      src: files(
        'Image',
        ['.jpg, .png'],
        'https://assets.frontend.shogun.dev/36720d2a-cddf-4855-b459-3b9430223853/',
        'Article 7',
      ),
    },
    articleImageEight = {
      src: files(
        'Image',
        ['.jpg, .png'],
        'https://assets.frontend.shogun.dev/331401a0-9002-4e1a-97b5-b3ea481f2861/',
        'Article 8',
      ),
    }
  const articles = [
    {
      featureImage: articleImageOne,
      name: text('Title', 'Influencer Spotlight: Meet André Crews', 'Article 1'),
      featureImageHasText: boolean('Hide Title', true, 'Article 1'),
    },
    {
      featureImage: articleImageTwo,
      name: text('Title', 'Can you engrave a silicone ring?', 'Article 2'),
      featureImageHasText: boolean('Hide Title', true, 'Article 2'),
    },
    {
      featureImage: articleImageThree,
      name: text(
        'Title',
        'Groove Life + Duck Commander = The Partnership of the Century',
        'Article 3',
      ),
      featureImageHasText: boolean('Hide Title', true, 'Article 3'),
    },
    {
      featureImage: articleImageFour,
      name: text('Title', 'Influencer Spotlight: Meet André Crews', 'Article 4'),
      featureImageHasText: boolean('Hide Title', true, 'Article 4'),
    },
    {
      featureImage: articleImageFive,
      name: text('Title', 'Influencer Spotlight: Meet André Crews', 'Article 5'),
      featureImageHasText: boolean('Hide Title', true, 'Article 5'),
    },
    {
      featureImage: articleImageSix,
      name: text('Title', 'Can you engrave a silicone ring?', 'Article 6'),
      featureImageHasText: boolean('Hide Title', true, 'Article 6'),
    },
    {
      featureImage: articleImageSeven,
      name: text(
        'Title',
        'Groove Life + Duck Commander = The Partnership of the Century',
        'Article 7',
      ),
      featureImageHasText: boolean('Hide Title', true, 'Article 7'),
    },
    {
      featureImage: articleImageEight,
      name: text('Title', 'Influencer Spotlight: Meet André Crews', 'Article 8'),
      featureImageHasText: boolean('Hide Title', true, 'Article 8'),
    },
  ]

  return <ArticlesList articles={articles} />
}
