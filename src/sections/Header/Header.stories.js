import React from 'react'
import { withKnobs, text, object } from '@storybook/addon-knobs'

import Header from './'
import Image from '../../static/nav-image.png'
import SliderImage from '../../static/nav-slider-image.png'

export default {
  title: 'Header',
  component: Header,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}

const menu = {
  navigationLinks: [
    {
      _id: '0ff8508f-4cf1-4765-9afe-6a0a4e8915f4',
      childLinks: [
        {
          _id: 'e822d67c-03e6-44c7-86a4-46c7357668d2',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/ccf070a0-023d-4db6-88ae-b85a0030051a/',
            storageID: 'ccf070a0-023d-4db6-88ae-b85a0030051a',
          },
          link: '/collections/new-mens-watch-bands',
          title: 'Watch Bands',
        },
        {
          _id: '1c167b67-2827-44f6-b26f-d44659a3c095',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/6584a0a4-db8d-4794-b4a8-77abecbeb4ce/',
            storageID: '6584a0a4-db8d-4794-b4a8-77abecbeb4ce',
          },
          link: '/collections/camo-kryptek-combined',
          title: 'Camo ',
        },
        {
          _id: '62d6d630-0c8f-469a-abb0-efa8e391ff98',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/eff92f5a-544d-4910-9068-ee8a804a4213/',
            storageID: 'eff92f5a-544d-4910-9068-ee8a804a4213',
          },
          link: '/collections/edge-collection',
          title: 'Edge',
        },
        {
          _id: '4ef8706d-ea1d-4b04-bb44-8bbf4d4d47a9',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/c63aa571-9b9d-46c6-96ac-49e439337204/',
            storageID: 'c63aa571-9b9d-46c6-96ac-49e439337204',
          },
          link: '/collections/groove-nfl-silicone-rings',
          title: 'NFL',
        },
        {
          _id: '5f813bea-1f8a-4352-b10c-faa49662c54c',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/c8f84d98-e8f2-4230-9b89-41457c08db27/',
            storageID: 'c8f84d98-e8f2-4230-9b89-41457c08db27',
          },
          link: '/collections/nomad',
          title: 'Nomad',
        },
        {
          _id: '95289726-2aa7-4b5e-8184-1d63fce38835',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/a860d74e-15a3-47f0-9124-edaf3607bd74/',
            storageID: 'a860d74e-15a3-47f0-9124-edaf3607bd74',
          },
          link: '/pages/zeus-ring',
          title: 'Zeus Anti-Stretch',
        },
        {
          _id: '3b3214b5-bf7d-46f3-ab2e-6846f7b01a2f',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/0be5b9b5-9148-4768-acf1-df95c6a9df7f/',
            storageID: '0be5b9b5-9148-4768-acf1-df95c6a9df7f',
          },
          link: '/collections/custom-engraved-silicone-rings',
          title: 'Custom',
        },
        {
          _id: '27c73bfe-9862-4656-b85c-ec44a2e8aaab',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/34f622e4-4dfb-4d9d-ada7-49927293aa94/',
            storageID: '34f622e4-4dfb-4d9d-ada7-49927293aa94',
          },
          link: '/collections/groove-university-college-silicone-rings',
          title: 'NCAA',
        },
        {
          _id: 'e3c8e5b6-5335-4421-bdf3-bf5e7dc3fc3c',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/7998d786-e378-4bd7-882d-a3c77f980310/',
            storageID: '7998d786-e378-4bd7-882d-a3c77f980310',
          },
          link: '/collections/groove-hero-patriotic-silicone-rings',
          title: 'Hero',
        },
        {
          _id: '6c9dc5f8-11c9-4697-a413-3048fcf33dab',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/ddce0dc3-2643-4309-92b1-8c5902942a61/',
            storageID: 'ddce0dc3-2643-4309-92b1-8c5902942a61',
          },
          link: '/collections/new-mens-dimension',
          title: 'Dimension Engraved',
        },
        {
          _id: '0e5f7fa8-356e-4a6c-9b66-2931ed57d8cb',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/806ab61e-5608-4942-987b-909b3ab698aa/',
            storageID: '806ab61e-5608-4942-987b-909b3ab698aa',
          },
          link: '/collections/new-mens-solid',
          title: 'Solid',
        },
        {
          _id: '7766e8a2-8d14-45c2-893b-aaabe0ba5f6b',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/9b821b35-bebf-4f8d-9afc-a616f8c7060e/',
            storageID: '9b821b35-bebf-4f8d-9afc-a616f8c7060e',
          },
          link: '/collections/groove-exclusive-silicone-rings',
          title: 'Exclusive',
        },
      ],
      link: '/pages/shop-men',
      title: 'Shop Men',
    },
    {
      _id: '57c75fe7-3cca-4d0d-bfde-fb7ed655ddc0',
      childLinks: [
        {
          _id: 'f9194264-c76d-4324-890d-92af1c34c679',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/03626930-004a-41a0-94e3-17561dec012b/',
            storageID: '03626930-004a-41a0-94e3-17561dec012b',
          },
          link: '/collections/new-womens-watch-bands',
          title: 'Watch Bands',
        },
        {
          _id: 'a072bdab-b6ab-4274-a992-0351af64ad6f',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/8182ebde-e21b-46e6-a9a8-e7d8e18d90c2/',
            storageID: '8182ebde-e21b-46e6-a9a8-e7d8e18d90c2',
          },
          link:
            '/collections/best-selling-womens-rings?utm_source=SITE&utm_medium=NAV&utm_campaign=BEST-SELLING-WOMEN-TILE',
          title: 'Best Sellers ',
        },
        {
          _id: '4a9c12e4-d88f-4fc6-ab2d-2e329411af1e',
          childLinks: [],
          image: {
            _type: 'image',
            alt: '',
            height: 504,
            mimeType: 'image/jpeg',
            name: 'Womens_New_NavBlock.jpg',
            size: 47866,
            src: 'https://ucarecdn.com/14cf3cfc-f62e-4132-b399-c25a5d0516e5/',
            storageID: '14cf3cfc-f62e-4132-b399-c25a5d0516e5',
            thumbnail: 'https://ucarecdn.com/14cf3cfc-f62e-4132-b399-c25a5d0516e5/-/resize/x70/',
            uuid: '60a4c15e-b399-4854-b30e-efc64d6b5668',
            width: 576,
          },
          link:
            '/collections/new-womens-new?utm_source=SITE&utm_medium=NAV&utm_campaign=NEW-WOMEN-TILE',
          title: '',
        },
        {
          _id: 'f1aa8b15-4aa4-4aaf-8a85-d11d28b04f04',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/4e79e62c-3073-4d82-b174-c8f9bbc97da8/',
            storageID: '4e79e62c-3073-4d82-b174-c8f9bbc97da8',
          },
          link: '/pages/zeus-ring',
          title: 'Zeus Thin ',
        },
        {
          _id: '881309b3-9685-4230-b0dd-e15164f19a40',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/cf86798a-8228-4d08-be0b-c9f6f9f3b7bb/',
            storageID: 'cf86798a-8228-4d08-be0b-c9f6f9f3b7bb',
          },
          link: '/collections/men-and-womens-patterned-silicone-wedding-rings',
          title: 'Aspire',
        },
        {
          _id: 'e01f3b49-86a9-422f-b60c-47f1a6756798',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/536fc492-3639-4421-a4a5-bfb4d0ff79e8/',
            storageID: '536fc492-3639-4421-a4a5-bfb4d0ff79e8',
          },
          link: '/collections/new-womens-solid',
          title: 'Solid',
        },
        {
          _id: 'f90f043b-7d90-4cf8-bbd0-e315fefaa65c',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/7650d128-d48a-437d-af13-38ea255830bf/',
            storageID: '7650d128-d48a-437d-af13-38ea255830bf',
          },
          link: '/collections/air-womens-stackable-rings',
          title: 'Air Stackables',
        },
        {
          _id: 'f677b653-b787-42fb-9b1a-31267700dff5',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/0c9514ca-5a6d-4cef-bf7a-5649cde6d65b/',
            storageID: '0c9514ca-5a6d-4cef-bf7a-5649cde6d65b',
          },
          link: '/collections/custom-engraved-silicone-rings',
          title: 'Custom',
        },
        {
          _id: '6a235d24-9d70-422c-b979-6f29d075e8d7',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/e930473e-423e-4a40-a0fa-4245035bb56c/',
            storageID: 'e930473e-423e-4a40-a0fa-4245035bb56c',
          },
          link: '/collections/groove-nfl-silicone-rings',
          title: 'NFL',
        },
        {
          _id: 'fe31e0bc-f70c-42c5-a25c-91b838e95781',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/291031de-8972-42e7-8021-b00faf420eda/',
            storageID: '291031de-8972-42e7-8021-b00faf420eda',
          },
          link: '/collections/groove-university-college-silicone-rings',
          title: 'NCAA',
        },
        {
          _id: '553a6258-fe7c-4801-883f-36450dde3aeb',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/bab1c8e0-4015-4c92-b5d4-a197af016d03/',
            storageID: 'bab1c8e0-4015-4c92-b5d4-a197af016d03',
          },
          link: '/collections/camo-kryptek-combined',
          title: 'Camo',
        },
        {
          _id: 'ee2c980b-b626-4707-84e6-a1fdf00b2ba7',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/960dec3a-6e69-4d13-96ff-b5d2851fe0b4/',
            storageID: '960dec3a-6e69-4d13-96ff-b5d2851fe0b4',
          },
          link: '/collections/new-womens-hero',
          title: 'Hero',
        },
      ],
      link: '/pages/shop-women',
      title: 'Shop Women',
    },
    {
      _id: 'f19a9816-bfe7-4ffe-9e9d-05b52262abb3',
      childLinks: [
        {
          _id: 'b7cc1bea-46fb-429e-91e8-fd9e1c6792b0',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/35e44212-ae7f-47fe-9933-9090a91646b7/',
            storageID: '35e44212-ae7f-47fe-9933-9090a91646b7',
          },
          link: '/collections/groove-apple-watchband',
          title: 'Apple',
        },
        {
          _id: 'd9abfa3c-25fd-4c8e-b7f1-0b1fe6b9ec54',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/385ff0e0-4106-4f0b-8887-f19f1a5e82ea/',
            storageID: '385ff0e0-4106-4f0b-8887-f19f1a5e82ea',
          },
          link: '/collections/groove-fitbit-watch-bands',
          title: 'Fitbit',
        },
        {
          _id: 'c8de96bc-48bc-4b5d-a4fe-5a1634fc4969',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/4d2b72cc-e0d0-4dd3-a38a-0a6eb8790023/',
            storageID: '4d2b72cc-e0d0-4dd3-a38a-0a6eb8790023',
          },
          link: '/collections/groove-samsung-watch-bands',
          title: 'Samsung',
        },
        {
          _id: 'c8de96bc-48bc-4b5d-a4fe-5a1634fc4969',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/4d2b72cc-e0d0-4dd3-a38a-0a6eb8790023/',
            storageID: '4d2b72cc-e0d0-4dd3-a38a-0a6eb8790023',
          },
          link: '/collections/groove-samsung-watch-bands',
          title: 'Samsung',
        },
        {
          _id: 'c8de96bc-48bc-4b5d-a4fe-5a1634fc4969',
          childLinks: [],
          image: {
            _type: 'image',
            src: 'https://ucarecdn.com/4d2b72cc-e0d0-4dd3-a38a-0a6eb8790023/',
            storageID: '4d2b72cc-e0d0-4dd3-a38a-0a6eb8790023',
          },
          link: '/collections/groove-samsung-watch-bands',
          title: 'Samsung',
        },
        // {
        //   "_id": "c8de96bc-48bc-4b5d-a4fe-5a1634fc4969",
        //   "childLinks": [],
        //   "image": {
        //     "_type": "image",
        //     "src": "https://ucarecdn.com/4d2b72cc-e0d0-4dd3-a38a-0a6eb8790023/",
        //     "storageID": "4d2b72cc-e0d0-4dd3-a38a-0a6eb8790023"
        //   },
        //   "link": "/collections/groove-samsung-watch-bands",
        //   "title": "Samsung"
        // }
      ],
      link: '/pages/groove-watchband-apple-fitbit-samsung-garmin',
      title: 'Watch Bands',
    },
    {
      _id: 'a179d93d-e02b-40d4-93ca-09fa7db126ef',
      childLinks: [],
      link: '/pages/groove-belt',
      title: 'Belts',
    },
    {
      _id: '3459848c-25ac-4833-b4bc-afe724c060cc',
      childLinks: [
        {
          _id: '6cfcd687-50ce-428a-bbe5-e17424a1ab90',
          childLinks: [
            {
              _id: 'fbacd520-20f8-41b2-95a3-394257a57151',
              link: 'https://groovelife.com/pages/about-us',
              title: 'What We Stand For',
            },
            {
              _id: '1a38e090-b5d7-4710-a630-d67f3a3ee5de',
              link: '/pages/warranty',
              title: 'Our 94-Year Warranty',
            },
            {
              _id: '6f0d9513-3a28-4f48-9381-0a92e27e885c',
              link: '/pages/reviews',
              title: 'Customer Reviews',
            },
            {
              _id: '2a13cea7-6fd9-4177-bf5f-3ef4d7fa819b',
              link: '/pages/who-wears-groove',
              title: 'Who Wears Groove',
            },
            {
              _id: '791d2407-1e0a-4ecb-9d6c-37a84c2b79c4',
              link: '/pages/the-groove-life-team',
              title: 'The Team',
            },
            {
              _id: '1b5d998a-c407-4f44-a962-7f5eddefadc1',
              link: '/blog',
              title: 'The Adventure Blog',
            },
            {
              _id: '7278b19d-2ba5-499c-9a7e-1175c88fc056',
              link: '/pages/work-at-groove',
              title: 'Work At Groove',
            },
          ],
          link: '/pages/about-us',
          title: 'About',
        },
        {
          _id: '7777727d-4c90-4ae9-95e0-89286994ba1a',
          childLinks: [
            {
              _id: '7025b708-2088-4fa2-ac58-d0be1137e5b6',
              link: '/pages/order-lookup',
              title: 'Order Status',
            },
            {
              _id: '0b761c89-1f4d-488d-9452-39808bf0e72d',
              link: '/pages/customer-service',
              title: 'Returns & Exchanges',
            },
            {
              _id: '485f5b24-2121-4e0d-99c1-8f748d268e1b',
              link: '/pages/faq',
              title: 'FAQ',
            },
            {
              _id: 'd33a1c1a-f807-4847-a425-219e802623a1',
              link: '/pages/customer-service',
              title: 'Contact Us',
            },
            {
              _id: 'e1486901-daea-4cd1-a960-00e907b2b980',
              link: '/pages/store-locator',
              title: 'Store Locator',
            },
          ],
          link: '/pages/customer-service',
          title: 'Customer Support',
        },
      ],
      link: '/pages/about-us',
      title: 'The Groove Life',
    },
    {
      _id: '94e927a4-4ada-45d5-954f-26b7a29e103b',
      childLinks: [],
      link: '/pages/silicone-ring-sizing-guide',
      title: 'Sizing',
    },
  ],
}

const mobileSliderMenu = {
  name: 'Slider Navigation',
  navigationLinks: [
    {
      name: '<strong>New</strong> Nomad',
      link: '/',
      image: {
        src: SliderImage,
      },
    },
    {
      name: 'Watch Bands',
      link: '/',
      image: {
        src: SliderImage,
      },
    },
    {
      name: 'Collection Link',
      link: '/',
      image: {
        src: SliderImage,
      },
    },
    {
      name: 'Collection Link',
      link: '/',
      image: {
        src: SliderImage,
      },
    },
    {
      name: 'Collection Link',
      link: '/',
      image: {
        src: SliderImage,
      },
    },
    {
      name: 'Collection Link',
      link: '/',
      image: {
        src: SliderImage,
      },
    },
    {
      name: 'Collection Link',
      link: '/',
      image: {
        src: SliderImage,
      },
    },
    {
      name: 'Collection Link',
      link: '/',
      image: {
        src: SliderImage,
      },
    },
    {
      name: 'Collection Link',
      link: '/',
      image: {
        src: SliderImage,
      },
    },
    {
      name: 'Collection Link',
      link: '/',
      image: {
        src: SliderImage,
      },
    },
    {
      name: 'Collection Link',
      link: '/',
      image: {
        src: SliderImage,
      },
    },
    {
      name: 'Collection Link',
      link: '/',
      image: {
        src: SliderImage,
      },
    },
  ],
}

const announcements = [
  {
    content: object(
      'block1Content',
      [
        {
          children: [
            { text: '🌺 ' },
            { text: 'Announcement Block 1 ', bold: true },
            { text: '🌺' },
          ],
          type: 'paragraph',
        },
      ],
      'announcements',
    ),
  },
  {
    content: object(
      'block2Content',
      [
        {
          children: [
            { text: '📦 ' },
            { text: 'Announcement Block 2 ', bold: true },
            { text: '📦' },
          ],
          type: 'paragraph',
        },
      ],
      'announcements',
    ),
  },
  {
    content: object(
      'block3Content',
      [
        {
          children: [{ text: 'Announcement Block 3', bold: true }],
          type: 'paragraph',
        },
      ],
      'announcements',
    ),
  },
  {
    content: object(
      'block4Content',
      [
        {
          children: [{ text: 'Announcement Block 4', bold: true }],
          type: 'paragraph',
        },
      ],
      'announcements',
    ),
  },
]

const cartDrawerLinks = [
  {
    link: '/shop-men',
    title: 'Shop Men',
  },
  {
    link: '/shop-women',
    title: 'Shop Women',
  },
  {
    link: '/collections/new-for-him-new-for-her',
    title: 'Shop New',
  },
  {
    link: '/collections/best-sellers',
    title: 'Shop Best Sellers',
  },
]

export const header = () => {
  document.body.style.padding = '0' // Remove padding from storybook preview

  return (
    <Header
      menu={object('Menu', menu, 'Menu')}
      mobileSliderMenu={object('Mobile slider menu', mobileSliderMenu, 'Menu')}
      announcements={announcements}
      cartDrawerLinks={cartDrawerLinks}
    />
  )
}
