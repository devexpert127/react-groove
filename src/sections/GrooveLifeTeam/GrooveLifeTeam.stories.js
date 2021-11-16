import React from 'react'
import { withKnobs, text, files, boolean } from '@storybook/addon-knobs'
import GrooveLifeTeam from './'
import Video from '../../static/visual-block-video.mp4'

export default {
  title: 'Visual Blocks / Groove Life Team',
  component: GrooveLifeTeam,
  decorators: [withKnobs],
  parameters: {
    notes: '',
    knobs: {
      escapeHTML: false,
    },
  },
}

export const grooveLifeTeam = () => {
  const media = 'https://assets.frontend.shogun.dev/aa3d1190-148e-4c00-b3a2-bf14d1dee4f4/'
  const mediaType = text('Media type', 'video')

  const blocks = [
    {
      media: {
        src: files('Video', ['.mp4'], Video),
      },
      name: text('Title', 'Mike Adcock'),
      description: text(
        'Description',
        'Need to return or exchange your order? Our Automated system makes it fast and easy! Click the button btn below to begin the process.',
      ),
    },
    {
      media: {
        src: files('Video', ['.mp4'], Video),
      },
      name: text('Title', 'Kevin Beasley'),
      description: text(
        'Description',
        'Kevin is responsible for molding Groove’s company culture, keeping our vision on track, and helping produce This Week at Groove. Kevin has been a business owner, a pastor, and is a dad to four, about to be five, kids!',
      ),
    },
    {
      media: {
        src: files('Video', ['.mp4'], Video),
      },
      name: text('Title', 'Allison Bloom'),
      description: text(
        'Description',
        'Allison manages our e-com platforms and is a mom to 3 little girls. She is constantly looking for ways to improve and grow our online presence. Allison is a hardcore Packers fan (aren’t they all?) and can conduct entire conversations in movie quotes.',
      ),
    },
    {
      media: {
        src: files('Video', ['.mp4'], Video),
      },
      name: text('Title', 'George Brooks'),
      description: text(
        'Description',
        'As Groove Life’s Creative Director and resident foreigner, who is still sore about the American Revolution (step down, DHS, he’s a US Citizen), George spends most of his time saying things in multiple different ways so that people understand him. He is a fan of craft beer, death metal, and designing cool things. On a good day, you’ll find George annoying Matt with loud music. On a bad day, he may be attempting to lick his own elbow.',
      ),
    },
  ]

  return <GrooveLifeTeam blocks={blocks} mediaType={mediaType} />
}
