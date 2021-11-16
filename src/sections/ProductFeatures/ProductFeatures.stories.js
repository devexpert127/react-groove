import React from 'react'
import { withKnobs, files, text, object } from '@storybook/addon-knobs'
import ProductFeatures from './'

export default {
  title: 'Product / Product Features',
  component: ProductFeatures,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}

export const productFeatures = () => {
  const typeCollection = {
    productFeaturesTitle: text(
      'Title',
      'No Stretch,<br>No Shrivel,<br>No Compromise',
      'Page Content',
    ),
    productFeaturesImageOne: {
      src: files(
        'Image 1 Src',
        ['.jpg, .png'],
        'https://assets.frontend.shogun.dev/42ce34ef-1be0-4fb8-a766-52a27308abb0/',
        'Images',
      ),
      alt: text('Image 1 Alt', 'Image Alt Text', 'Images'),
    },
    productFeaturesImageTwo: {
      src: files(
        'Image 2 Src',
        ['.jpg, .png'],
        'https://assets.frontend.shogun.dev/42ce34ef-1be0-4fb8-a766-52a27308abb0/',
        'Images',
      ),
      alt: text('Image 2 Alt', 'Image Alt Text', 'Images'),
    },
    productFeatures: [
      {
        title: text('Title', 'Anti-Stretch Tech', 'Accordion Item 1'),
        description: object(
          'Content',
          [
            {
              children: [{ text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' }],
              type: 'paragraph',
            },
          ],
          'Accordion Item 1',
        ),
      },
      {
        title: text('Title', 'Max Breathability', 'Accordion Item 2'),
        description: object(
          'Content',
          [
            {
              children: [
                { text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
              ],
              type: 'paragraph',
            },
          ],
          'Accordion Item 2',
        ),
      },
      {
        title: text('Title', 'Premium Materials', 'Accordion Item 3'),
        description: object(
          'Content',
          [
            {
              children: [
                {
                  text:
                    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                },
              ],
              type: 'paragraph',
            },
          ],
          'Accordion Item 3',
        ),
      },
      {
        title: text('Title', 'Anti-Hipster', 'Accordion Item 4'),
        description: object(
          'Content',
          [
            {
              children: [
                {
                  text:
                    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                },
              ],
              type: 'paragraph',
            },
          ],
          'Accordion Item 4',
        ),
      },
    ],
  }

  const icon = {
    name: 'plus-minus',
    svg:
      '<svg class="Icon--minus" aria-hidden="true" focusable="false" role="presentation" viewBox="0 0 298.667 298.667"><rect y="128" width="298.667" height="42.667"/></svg><svg class="Icon--plus" aria-hidden="true" focusable="false" role="presentation" viewBox="0 0 298.667 298.667"><polygon points="170.667,128 170.667,0 128,0 128,128 0,128 0,170.667 128,170.667 128,298.667 170.667,298.667 170.667,170.667     298.667,170.667 298.667,128   "/></svg>',
  }

  return (
    <>
      <ProductFeatures typeCollection={typeCollection} icon={icon} />
    </>
  )
}

export const realData = () => (
  <ProductFeatures
    typeCollection={{
      name: 'black-panther',
      productFeatures: [
        {
          _id: 'd66afcab-bc51-48cd-9416-fd9172eeaf9c',
          description: [
            {
              children: [{ text: 'Officially licensed MARVEL Black Panther design.' }],
              type: 'paragraph',
            },
          ],
          name: 'Super Hero Approved - Black Panther',
          title: 'Super Hero Approved',
        },
        {
          _id: 'b88d7d7f-8f55-4084-b05c-b8dc566521da',
          description: [
            {
              children: [
                {
                  text:
                    'Inner Grooves allow air in and moisture out with a specially designed contour to give you maximum breathability and performance.',
                },
              ],
              type: 'paragraph',
            },
          ],
          name: 'Max Breathability - Rings',
          title: 'Max Breathability',
        },
        {
          _id: '7ef54971-650f-4a2a-b291-7dbca44ec573',
          description: [
            {
              children: [
                {
                  text:
                    'Perfect Design with unique medical-grade materials for undeniable quality beyond any silicone ring that came before. In a class of its own.',
                },
              ],
              type: 'paragraph',
            },
            { children: [{ text: 'Width: 8mm or 5/16"' }], type: 'paragraph' },
            { children: [{ text: 'Thickness: 2mm or 3/32"' }], type: 'paragraph' },
          ],
          name: 'Premium Materials - Marvel',
          title: 'Premium Materials',
        },
        {
          _id: '157845f4-dccc-49b8-8b7d-5ce05eef9e7e',
          description: [
            {
              children: [{ text: 'Go to another world the moment you put it on!' }],
              type: 'paragraph',
            },
          ],
          name: 'Exotic',
          title: 'Exotic',
        },
      ],
      productFeaturesImageOne: {
        _type: 'image',
        alt: '',
        height: 528,
        mimeType: 'image/png',
        name: 'Marvel_PDP.png',
        size: 176106,
        src: 'https://f.shgcdn.com/9146d0a6-63e5-4641-859f-cfeda19ab7b5/',
        storageID: '9146d0a6-63e5-4641-859f-cfeda19ab7b5',
        uuid: '9da141d9-230c-46de-b419-1c6e0f310d78',
        width: 791,
      },
      productFeaturesTitle: 'Officially Licensed Marvel Designs',
    }}
  />
)
