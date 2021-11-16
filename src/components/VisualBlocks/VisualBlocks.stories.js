import React from 'react'
import { withKnobs, files, text, boolean } from '@storybook/addon-knobs'
import VisualBlocks from './'
import Video from '../../static/visual-block-video.mp4'

export default {
  title: 'Visual Blocks',
  component: VisualBlocks,
  decorators: [withKnobs],
}

export const visualBlocks = () => {
  const media = 'https://assets.frontend.shogun.dev/aa3d1190-148e-4c00-b3a2-bf14d1dee4f4/'

  return (
    <>
      <VisualBlocks
        superimposeText={boolean('Superimpose Text?', false, 'VisualBlocks-1')}
        mediaType={text('Media type', 'video', 'VisualBlocks-1')}
        blocks={[
          {
            media: {
              src: files('Video', ['.mp4'], Video, 'Block-1'),
            },
            name: text('Title', 'Mike Adcock', 'Block-1'),
            description: text(
              'Description',
              'Need to return or exchange your order? Our Automated system makes it fast and easy! Click the button btn below to begin the process.',
              'Block-1',
            ),
          },
          {
            media: {
              src: files('Video', ['.mp4'], Video, 'Block-2'),
            },
            name: text('Title', 'Kevin Beasley', 'Block-2'),
            description: text(
              'Description',
              'Kevin is responsible for molding Groove’s company culture, keeping our vision on track, and helping produce This Week at Groove. Kevin has been a business owner, a pastor, and is a dad to four, about to be five, kids!',
              'Block-2',
            ),
          },
          {
            media: {
              src: files('Video', ['.mp4'], Video, 'Block-3'),
            },
            name: text('Title', 'Allison Bloom', 'Block-3'),
            description: text(
              'Description',
              'Allison manages our e-com platforms and is a mom to 3 little girls. She is constantly looking for ways to improve and grow our online presence. Allison is a hardcore Packers fan (aren’t they all?) and can conduct entire conversations in movie quotes.',
              'Block-3',
            ),
          },
          {
            media: {
              src: files('Video', ['.mp4'], Video, 'Block-4'),
            },
            name: text('Title', 'George Brooks', 'Block-4'),
            description: text(
              'Description',
              'As Groove Life’s Creative Director and resident foreigner, who is still sore about the American Revolution (step down, DHS, he’s a US Citizen), George spends most of his time saying things in multiple different ways so that people understand him. He is a fan of craft beer, death metal, and designing cool things. On a good day, you’ll find George annoying Matt with loud music. On a bad day, he may be attempting to lick his own elbow.',
              'Block-4',
            ),
          },
        ]}
      />
      <VisualBlocks
        superimposeText={boolean('Superimpose Text?', true, 'VisualBlocks-2')}
        mediaType={text('Media type', 'image', 'VisualBlocks-2')}
        blocks={[
          {
            media: {
              scr: files('Image', ['.jpg, .png'], media, 'Block-5'),
            },
            name: text('Title', 'Philip Rivers', 'Block-5'),
            description: text('Description', 'Pro Football Player', 'Block-5'),
          },
          {
            media: {
              src: files('Image', ['.jpg, .png'], media, 'Block-6'),
            },
            name: text('Title', 'Rich Froning', 'Block-6'),
            description: text('Description', 'Crossfit Athlete @richfroning', 'Block-6'),
          },
          {
            media: {
              src: files('Image', ['.jpg, .png'], media, 'Block-7'),
            },
            name: text('Title', 'Michael Waddell', 'Block-7'),
            description: text(
              'Description',
              'The Bone Collector @officialbonecollector',
              'Block-7',
            ),
          },
          {
            media: {
              src: files('Image', ['.jpg, .png'], media, 'Block-8'),
            },
            name: text('Title', 'JB Mauney', 'Block-8'),
            description: text('Description', '2x PBR World Champion | @jbmauneyxv', 'Block-8'),
          },
        ]}
      />
    </>
  )
}
