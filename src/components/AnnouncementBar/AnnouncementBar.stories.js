import React from 'react'
import { withKnobs, number, object, text, boolean } from '@storybook/addon-knobs'

import AnnouncementBar from './'

export default {
  title: 'Header / Announcement Bar',
  component: AnnouncementBar,
  decorators: [withKnobs],
}

export const announcementBar = () => {
  const block1Content = object('block1Content', [
    {
      children: [{ text: '🌺 ' }, { text: 'Announcement Block 1 ', bold: true }, { text: '🌺' }],
      type: 'paragraph',
    },
  ])

  const block2Content = object('block2Content', [
    {
      children: [{ text: '📦 ' }, { text: 'Announcement Block 2 ', bold: true }, { text: '📦' }],
      type: 'paragraph',
    },
  ])

  const block3Content = object('block3Content', [
    {
      children: [{ text: 'Announcement Block 3', bold: true }],
      type: 'paragraph',
    },
  ])

  const block4Content = object('block4Content', [
    {
      children: [{ text: 'Announcement Block 4', bold: true }],
      type: 'paragraph',
    },
  ])

  return (
    <>
      <AnnouncementBar
        blocks={[
          {
            content: block1Content,
          },
          {
            content: block2Content,
          },
          {
            content: block3Content,
          },
          {
            content: block4Content,
          },
        ]}
        autoplaySpeed={number('Autoplay speed', 3)}
        backgroundColor={text('Background Color', '#bada55')}
        showCloseButton={boolean('Show Close Button', true)}
      />
    </>
  )
}

export const realData = () => (
  <AnnouncementBar
    showCloseButton
    blocks={[
      {
        _id: '88ee7d89-d9d1-4fc0-8e2f-9bf6000034d9',
        content: [
          {
            children: [
              {
                bold: true,
                text: "IT'S YOUR TURN | ",
              },
              {
                children: [
                  {
                    bold: true,
                    text: 'SHOP MILES MORALES',
                  },
                ],
                props: { tabIndex: -1 },
                external: false,
                type: 'link',
                url: '/marvel',
              },
              {
                text: '',
              },
            ],
            type: 'paragraph',
          },
        ],
        name: 'Miles Morales Announcement',
      },
      {
        _id: 'a80af353-9ac2-4dc4-b9d6-2474e22fc982',
        content: [
          {
            children: [
              {
                bold: true,
                text: '',
              },
              {
                children: [
                  {
                    bold: true,
                    text: '',
                  },
                ],
                tabIndex: -1,
                external: false,
                type: 'link',
                url: '/collections/best-sellers',
              },
              {
                bold: true,
                text: 'THE BEST BELT IN THE WORLD | ',
              },
              {
                children: [
                  {
                    bold: true,
                    text: 'SHOP NOW',
                  },
                ],
                external: false,
                type: 'link',
                url: '/groove-belt',
              },
              {
                text: '',
              },
            ],
            type: 'paragraph',
          },
        ],
        name: 'Best Belt in the World  Announcement',
      },
      {
        _id: '5a46778c-4b61-4f79-9b3a-dfdf02e95ab8',
        content: [
          {
            children: [
              {
                bold: true,
                text: 'NEW, KATIE VAN SLYKE | ',
              },
              {
                children: [
                  {
                    bold: true,
                    text: 'SHOP NOW',
                  },
                ],
                external: false,
                tabIndex: -1,
                type: 'link',
                url: '/collections/katie-van-slyke',
              },
              {
                text: '',
              },
            ],
            type: 'paragraph',
          },
        ],
        name: 'KVS Announcement',
      },
    ]}
  />
)
