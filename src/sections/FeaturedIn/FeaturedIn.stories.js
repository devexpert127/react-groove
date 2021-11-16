import React from 'react'
import { withKnobs, text, files } from '@storybook/addon-knobs'
import FeaturedIn from './'

import Logo1 from '../../static/BrandLogosBlock1.mp4'
import Logo2 from '../../static/BrandLogosBlock2.mp4'
import Logo3 from '../../static/BrandLogosBlock3.mp4'
import Logo4 from '../../static/BrandLogosBlock4.mp4'

export default {
  title: 'Featured In',
  component: FeaturedIn,
  decorators: [withKnobs],
  parameters: {
    notes:
      'Wrapper component for TextColumns takes an array of images and turns them into the correct block structure.',
  },
}

export const featuredIn = () => (
  <>
    <FeaturedIn
      title={text('Title', 'This is a title')}
      images={[
        {
          src: files('Image', ['.mp4'], Logo1, 'Block-1'),
        },
        {
          src: files('Image', ['.mp4'], Logo2, 'Block-2'),
        },
        {
          src: files('Image', ['.mp4'], Logo3, 'Block-3'),
        },
        {
          src: files('Image', ['.mp4'], Logo4, 'Block-4'),
        },
      ]}
    />
  </>
)
