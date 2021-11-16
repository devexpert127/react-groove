import React from 'react'
import { withKnobs, object, radios, text, boolean } from '@storybook/addon-knobs'

import Footer from './'

export default {
  title: 'Footer',
  component: Footer,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
    notes: 'This is the site footer.',
  },
}

const menus = [
  {
    name: 'Menu',
    navigationLinks: [
      {
        name: 'About Groove',
        title: 'About Groove',
        link: '/#',
      },
      {
        name: 'Our No BS Warranty',
        title: 'Our No BS Warranty',
        link: '/#',
      },
      {
        name: 'Adventure Guides',
        title: 'Adventure Guides',
        link: '/#',
      },
      {
        name: 'Store Finder',
        title: 'Store Finder',
        link: '/#',
      },
      {
        name: 'Affiliate',
        title: 'Affiliate',
        link: '/#',
      },
      {
        name: 'Shipping',
        title: 'Shipping',
        link: '/#',
      },
      {
        name: 'Terms',
        title: 'Terms',
        link: '/#',
      },
      {
        name: 'Wholesale',
        title: 'Wholesale',
        link: '/#',
      },
      {
        name: 'Blog',
        title: 'Blog',
        link: '/#',
      },
      {
        name: 'Work At Groove',
        title: 'Work At Groove',
        link: '/#',
      },
      {
        name: 'Safety',
        title: 'Safety',
        link: '/#',
      },
    ],
  },
  {
    name: 'Customer Service',
    navigationLinks: [
      {
        name: 'My Account',
        title: 'My Account',
        link: '/#',
      },
      {
        name: 'Returns and Exchanges',
        title: 'Returns and Exchanges',
        link: '/#',
      },
      {
        name: 'FAQ',
        title: 'FAQ',
        link: '/#',
      },
      {
        name: 'Warranty',
        title: 'Warranty',
        link: '/#',
      },
      {
        name: 'Order Status',
        title: 'Order Status',
        link: '/#',
      },
      {
        name: 'Sizing Guide',
        title: 'Sizing Guide',
        link: '/#',
      },
      {
        name: 'Contact Us',
        title: 'Contact Us',
        link: '/#',
      },
      {
        name: 'Privacy Policy',
        title: 'Privacy Policy',
        link: '/#',
      },
    ],
  },
]

const socialLinks = [
  {
    name: "Facebook",
    link: text('Facebook URL', 'https://www.facebook.com/groovelife.co'),
    icon: {
      name: 'facebook',
      svg:
        '<svg aria-hidden="true" viewBox="0 0 20 20"><path d="M18.05.811q.439 0 .744.305t.305.744v16.637q0 .439-.305.744t-.744.305h-4.732v-7.221h2.415l.342-2.854h-2.757v-1.83q0-.659.293-1t1.073-.342h1.488V3.762q-.976-.098-2.171-.098-1.634 0-2.635.964t-1 2.72V9.47H7.951v2.854h2.415v7.221H1.413q-.439 0-.744-.305t-.305-.744V1.859q0-.439.305-.744T1.413.81H18.05z" /></svg>',
    },
  },
  {
    name: "Instagram",
    link: text('Instagram URL', 'https://www.instagram.com/groovelife/'),
    icon: {
      name: 'instagram',
      svg:
        '<svg aria-hidden="true" viewBox="0 0 512 512"><path d="M256 49.5c67.3 0 75.2.3 101.8 1.5 24.6 1.1 37.9 5.2 46.8 8.7 11.8 4.6 20.2 10 29 18.8s14.3 17.2 18.8 29c3.4 8.9 7.6 22.2 8.7 46.8 1.2 26.6 1.5 34.5 1.5 101.8s-.3 75.2-1.5 101.8c-1.1 24.6-5.2 37.9-8.7 46.8-4.6 11.8-10 20.2-18.8 29s-17.2 14.3-29 18.8c-8.9 3.4-22.2 7.6-46.8 8.7-26.6 1.2-34.5 1.5-101.8 1.5s-75.2-.3-101.8-1.5c-24.6-1.1-37.9-5.2-46.8-8.7-11.8-4.6-20.2-10-29-18.8s-14.3-17.2-18.8-29c-3.4-8.9-7.6-22.2-8.7-46.8-1.2-26.6-1.5-34.5-1.5-101.8s.3-75.2 1.5-101.8c1.1-24.6 5.2-37.9 8.7-46.8 4.6-11.8 10-20.2 18.8-29s17.2-14.3 29-18.8c8.9-3.4 22.2-7.6 46.8-8.7 26.6-1.3 34.5-1.5 101.8-1.5m0-45.4c-68.4 0-77 .3-103.9 1.5C125.3 6.8 107 11.1 91 17.3c-16.6 6.4-30.6 15.1-44.6 29.1-14 14-22.6 28.1-29.1 44.6-6.2 16-10.5 34.3-11.7 61.2C4.4 179 4.1 187.6 4.1 256s.3 77 1.5 103.9c1.2 26.8 5.5 45.1 11.7 61.2 6.4 16.6 15.1 30.6 29.1 44.6 14 14 28.1 22.6 44.6 29.1 16 6.2 34.3 10.5 61.2 11.7 26.9 1.2 35.4 1.5 103.9 1.5s77-.3 103.9-1.5c26.8-1.2 45.1-5.5 61.2-11.7 16.6-6.4 30.6-15.1 44.6-29.1 14-14 22.6-28.1 29.1-44.6 6.2-16 10.5-34.3 11.7-61.2 1.2-26.9 1.5-35.4 1.5-103.9s-.3-77-1.5-103.9c-1.2-26.8-5.5-45.1-11.7-61.2-6.4-16.6-15.1-30.6-29.1-44.6-14-14-28.1-22.6-44.6-29.1-16-6.2-34.3-10.5-61.2-11.7-27-1.1-35.6-1.4-104-1.4z" /><path d="M256 126.6c-71.4 0-129.4 57.9-129.4 129.4s58 129.4 129.4 129.4 129.4-58 129.4-129.4-58-129.4-129.4-129.4zm0 213.4c-46.4 0-84-37.6-84-84s37.6-84 84-84 84 37.6 84 84-37.6 84-84 84z" /><circle cx="390.5" cy="121.5" r="30.2" /></svg>',
    },
  },
  {
    name: "Youtube",
    link: text('YouTube URL', 'https://www.youtube.com/channel/UCJmCr41eOvPY4LjG3MQeGUA'),
    icon: {
      name: 'youtube',
      svg:
        '<svg aria-hidden="true" viewBox="0 0 21 20"><path d="M-.196 15.803q0 1.23.812 2.092t1.977.861h14.946q1.165 0 1.977-.861t.812-2.092V3.909q0-1.23-.82-2.116T17.539.907H2.593q-1.148 0-1.969.886t-.82 2.116v11.894zm7.465-2.149V6.058q0-.115.066-.18.049-.016.082-.016l.082.016 7.153 3.806q.066.066.066.164 0 .066-.066.131l-7.153 3.806q-.033.033-.066.033-.066 0-.098-.033-.066-.066-.066-.131z" /></svg>',
    },
  },
]

export const footer = () => (
  <>
    <Footer
      menus={object('Menu', menus)}
      socialLinks={socialLinks}
      klaviyoId={text('Klaviyo ID', 'MZ4zYi')}
      siteCredits={{
        html: text(
          'Site credits',
          '© 2020, Groove Life Corp | All Rights Reserved | 1220 School Street #25, Spring Hill, Tennessee, United States',
        ),
      }}
      siteCredits={object('Site credits', [
        {
          children: [
            {
              text:
                '© 2020, Groove Life Corp | All Rights Reserved | 1220 School Street #25, Spring Hill, Tennessee, United States',
            },
          ],
          type: 'paragraph',
        },
      ])}
      newsletterHeader={text('Newsletter header', 'News and Updates')}
      inputPlaceholder={text('Input placeholder', 'Enter your email address here ...')}
      buttonText={text('Button text', 'Sign Up')}
    />
  </>
)
