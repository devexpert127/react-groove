import React from 'react'
import { withKnobs, text, files } from '@storybook/addon-knobs'

import TextColumns from './'

export default {
  title: 'Text / Text Columns',
  component: TextColumns,
  decorators: [withKnobs],
}

const textBlocks = [
  {
    title: text('Title', 'Block 1', 'Block-1'),
    media: null,
    description: text(
      'Description',
      'This is a text description full of words and such.',
      'Block-1',
    ),
  },
  {
    title: text('Title', 'Block 2', 'Block-2'),
    media: null,
    description: text(
      'Description',
      'This is a text description full of words and such.',
      'Block-2',
    ),
  },
  {
    title: text('Title', 'Block 3', 'Block-3'),
    media: null,
    description: text(
      'Description',
      'This is a text description full of words and such.',
      'Block-3',
    ),
  },
  {
    title: text('Title', 'Block 4', 'Block-4'),
    media: null,
    description: text(
      'Description',
      'This is a text description full of words and such.',
      'Block-4',
    ),
  },
]

const imageBlocks = [
  {
    ...textBlocks[0],
    media: {
      src: text(
        'Image',
        'https://assets.frontend.shogun.dev/38951db0-f2e2-4070-a006-41236d0ec6e5/',
        'Block-2',
      ),
    },
  },
  {
    ...textBlocks[1],
    media: {
      src: text(
        'Image',
        'https://assets.frontend.shogun.dev/38951db0-f2e2-4070-a006-41236d0ec6e5/',
        'Block-2',
      ),
    },
  },
  {
    ...textBlocks[2],
    media: {
      src: text(
        'Image',
        'https://assets.frontend.shogun.dev/38951db0-f2e2-4070-a006-41236d0ec6e5/',
        'Block-3',
      ),
    },
  },
  {
    ...textBlocks[3],
    media: {
      src: text(
        'Image',
        'https://assets.frontend.shogun.dev/38951db0-f2e2-4070-a006-41236d0ec6e5/',
        'Block-4',
      ),
    },
  },
]
import Logo1 from '../../static/BrandLogosBlock1.mp4'
import Logo2 from '../../static/BrandLogosBlock2.mp4'
import Logo3 from '../../static/BrandLogosBlock3.mp4'
import Logo4 from '../../static/BrandLogosBlock4.mp4'


const Icon = {
  name: 'durable',
  svg:
    '<svg aria-hidden="true" focusable="false" role="presentation" viewBox="0 0 45.4 45.4"><path d="M45.3 20.9h-3.7v-5.7h-3.5v5.7h-2.2v-7.1h-3.6v7.1H13v-7.1H9.5v7.1H7.3v-5.7H3.7v5.7H.1v3.6h3.6v5.7h3.6v-5.7h2.2v7H13v-7h19.3v7l3.6.1v-7.1h2.2v5.7h3.5v-5.7h3.7z"/></svg>',
  icon: {
    alt: "Printer",
    mimeType: "image/svg+xml",
    name: "icon_printer.svg",
    posterStorageID: null,
    posterUrl: "https://f.shgcdn.com/%!s(<nil>)/",
    size: 1846,
    src: "https://f.shgcdn.com/88e0aaf1-b288-4a40-bec7-9bdad13038ef/",
    storageID: "88e0aaf1-b288-4a40-bec7-9bdad13038ef",
    uuid: "0f12b90e-6271-4a02-9192-b7179cd1f249",
    _type: "video",
  },
}
const iconBlocks = [
  {
    ...textBlocks[0],
    media: Icon.icon

  },
  {
    ...textBlocks[1],
    media: Icon.icon
  },
  {
    ...textBlocks[2],
    media: Icon.icon
  },
  {
    ...textBlocks[3],
    media: Icon.icon
  },
];

const videoBlocks = [
  {
    ...textBlocks[0],
    media: {
      src: files('Image', ['.mp4'], Logo1, 'Block-1')
    }
  },
  {
    ...textBlocks[1],
    media: {
      src: files('Image', ['.mp4'], Logo2, 'Block-2')
    }
  },
  {
    ...textBlocks[2],
    media: {
      src: files('Image', ['.mp4'], Logo3, 'Block-3')
    }
  },
  {
    ...textBlocks[3],
    media: {
      src: files('Image', ['.mp4'], Logo4, 'Block-4')
    }
  }
];

const template = args => {
  return (
    <TextColumns
      title={text('Title', 'This is a title')}
      mediaType={"image"}
      {...args}
    />
  )
}

export const textColumns = template.bind({})
textColumns.args = { blocks: textBlocks }

export const mediaTypeImage = template.bind({})
mediaTypeImage.args = { blocks: imageBlocks }

export const mediaTypeIcon = template.bind({})
mediaTypeIcon.args = { mediaType: 'icon',  blocks: iconBlocks }

export const mediaTypeVideo = template.bind({})
mediaTypeVideo.args = { mediaType: 'video',  blocks: videoBlocks }
