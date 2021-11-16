import React from 'react'
import { withKnobs, text, files, select, object } from '@storybook/addon-knobs'

import RingSizingOptions from './'

export default {
  title: 'Ring Sizing Options',
  component: RingSizingOptions,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}

export const ringSizingOptions = () => {
  const title = text('Section title', '3 Easy Options to Find Your Size:')

  return (
    <>
      <RingSizingOptions
        title={title}
        options={[
          {
            name: text('Title', 'Quiz', 'Option-1'),
            icon: object(
              'Icon',
              {
                name: 'return',
                svg:
                  '<svg aria-hidden="true" focusable="false" role="presentation" class="Icon Icon--utility" viewBox="0 0 490 490"><path d="M108 23.5H21.5A21.4 21.4 0 0 0 0 45v86.6c0 11.8 9.6 21.5 21.4 21.5h86.7c11.8 0 21.4-9.7 21.4-21.5V45c0-11.9-9.6-21.5-21.4-21.5zM14 45c0-4.2 3.3-7.5 7.4-7.5h86.7c4.1 0 7.5 3.3 7.5 7.5v86.6c0 4.1-3.4 7.5-7.5 7.5H21.4a7.5 7.5 0 0 1-7.4-7.5V45zM183.7 60.3H483a7 7 0 0 0 0-14H183.7a7 7 0 0 0 0 14zM183.7 95.3h236.5a7 7 0 0 0 0-14H183.7a7 7 0 0 0 0 14zM483 116.3H183.7a7 7 0 0 0 0 14H483a7 7 0 0 0 0-14zM483 203H183.7a7 7 0 0 0 0 14H483a7 7 0 0 0 0-14zM183.7 252h236.5a7 7 0 0 0 0-14H183.7a7 7 0 0 0 0 14zM483 273H183.7a7 7 0 0 0 0 14H483a7 7 0 0 0 0-14zM483 359.8H183.7a7 7 0 0 0 0 14H483a7 7 0 0 0 0-14zM183.7 408.7h236.5a7 7 0 0 0 0-14H183.7a7 7 0 0 0 0 14zM483 429.7H183.7a7 7 0 0 0 0 14H483a7 7 0 0 0 0-14z"></path><path d="M28 118a7 7 0 0 0 7 7 7 7 0 0 0 5-2L64.7 98 89.6 123a7 7 0 0 0 9.8 0 7 7 0 0 0 0-9.8L74.6 88.3l24.8-24.8a7 7 0 0 0-9.8-9.9L64.8 78.4 39.9 53.6a7 7 0 0 0-9.8 0 7 7 0 0 0 0 10l24.8 24.7L30 113a7 7 0 0 0-2 4.9zM28 431.4a7 7 0 0 0 7 7 7 7 0 0 0 5-2l24.8-24.8 24.8 24.8a7 7 0 0 0 9.8 0 7 7 0 0 0 0-10l-24.8-24.7L99.4 377a7 7 0 0 0 0-9.8 7 7 0 0 0-9.8 0l-24.8 24.8L39.9 367a7 7 0 0 0-9.8 0 7 7 0 0 0 0 9.8l24.8 24.8L30 426.5a7 7 0 0 0-2 5zM108 180.2H21.5A21.4 21.4 0 0 0 0 201.7v86.6c0 11.8 9.6 21.5 21.4 21.5h86.7c11.8 0 21.4-9.7 21.4-21.5v-86.6c0-11.8-9.6-21.5-21.4-21.5zm-94 21.5c0-4.2 3.3-7.5 7.4-7.5h86.7c4.1 0 7.5 3.3 7.5 7.5v86.6c0 4.2-3.4 7.5-7.5 7.5H21.4a7.5 7.5 0 0 1-7.4-7.5v-86.6z"></path><path d="M108 337H21.5A21.4 21.4 0 0 0 0 358.4V445c0 11.9 9.6 21.5 21.4 21.5h86.7c11.8 0 21.4-9.6 21.4-21.5v-86.6c0-11.8-9.6-21.4-21.4-21.4zm-94 21.4c0-4.1 3.3-7.5 7.4-7.5h86.7c4.1 0 7.5 3.4 7.5 7.5V445c0 4.2-3.4 7.5-7.5 7.5H21.4A7.5 7.5 0 0 1 14 445v-86.6zM47.5 280a7 7 0 0 0 11-.6l41.9-61a7 7 0 0 0-1.8-9.6 7 7 0 0 0-9.7 1.8l-36.7 53.5-12-14a7 7 0 0 0-10.6 9.2l18 20.7z"></path></svg>',
                icon: {
                  alt: 'Printer',
                  mimeType: 'image/svg+xml',
                  name: 'icon_printer.svg',
                  posterStorageID: null,
                  posterUrl: 'https://f.shgcdn.com/%!s(<nil>)/',
                  size: 1846,
                  src: 'https://f.shgcdn.com/88e0aaf1-b288-4a40-bec7-9bdad13038ef/',
                  storageID: '88e0aaf1-b288-4a40-bec7-9bdad13038ef',
                  uuid: '0f12b90e-6271-4a02-9192-b7179cd1f249',
                  _type: 'video',
                },
              },
              'Option-1',
            ),
            buttonText: text('Button Text', 'Take the Quiz', 'Option-1'),
            buttonLink: text('Button Link', '/pages/warranty-new', 'Option-1'),
            description: object(
              'Description',
              [
                {
                  children: [{ text: 'I don’t have a ring & I don’t have a clue on my sizing.' }],
                  type: 'paragraph',
                },
                {
                  children: [{ text: '(Most fun, somewhat accurate, 30 second commitment)' }],
                  type: 'paragraph',
                },
              ],
              'Option-1',
            ),
          },
          {
            name: text('Title', 'App', 'Option-2'),
            icon: object(
              'Icon',
              {
                name: 'warranty',
                svg:
                  '<svg aria-hidden="true" focusable="false" role="presentation" class="Icon Icon--utility" viewBox="0 0 93.169 93.169"><path d="M64.902 0H28.265c-3.711 0-6.72 3.009-6.72 6.72v79.729c0 3.712 3.008 6.72 6.72 6.72h36.637c3.713 0 6.722-3.008 6.722-6.72V6.72C71.623 3.009 68.615 0 64.902 0zM42.088 3.973h8.991c.323 0 .586.263.586.587 0 .323-.263.586-.586.586h-8.991c-.324 0-.586-.263-.586-.586 0-.324.263-.587.586-.587zm-8.962-1.41c.518 0 .938.42.938.938s-.419.938-.938.938-.938-.42-.938-.938.42-.938.938-.938zm-4.25-.562c.829 0 1.5.672 1.5 1.5s-.671 1.5-1.5 1.5-1.5-.672-1.5-1.5.671-1.5 1.5-1.5zM48.93 89.758h-4.691c-1.488 0-2.693-1.205-2.693-2.691 0-1.487 1.205-2.692 2.693-2.692h4.691c1.488 0 2.693 1.205 2.693 2.692 0 1.486-1.205 2.691-2.693 2.691zm19.847-7.51H24.391V10.92h44.386v71.328z"></path></svg>',
                icon: {
                  alt: 'Printer',
                  mimeType: 'image/svg+xml',
                  name: 'icon_printer.svg',
                  posterStorageID: null,
                  posterUrl: 'https://f.shgcdn.com/%!s(<nil>)/',
                  size: 1846,
                  src: 'https://f.shgcdn.com/88e0aaf1-b288-4a40-bec7-9bdad13038ef/',
                  storageID: '88e0aaf1-b288-4a40-bec7-9bdad13038ef',
                  uuid: '0f12b90e-6271-4a02-9192-b7179cd1f249',
                  _type: 'video',
                },
              },
              'Option-2',
            ),
            buttonText: text('Button Text', 'Use App', 'Option-2'),
            buttonLink: text('Button Link', '/pages/warranty', 'Option-2'),
            description: object(
              'Description',
              [
                {
                  children: [{ text: "I have a ring but I'm OCD and I need to make sure." }],
                  type: 'paragraph',
                },
                { children: [{ text: '(Easy, accurate, 2 min commitment)' }], type: 'paragraph' },
              ],
              'Option-2',
            ),
          },
          {
            name: text('Title', 'Print', 'Option-3'),
            icon: object(
              'Icon',
              {
                name: 'order',
                svg:
                  '<svg aria-hidden="true" focusable="false" role="presentation" class="Icon Icon--utility" viewBox="0 0 470 484.8"><path d="M375.4,484.8H94.6l8.9-107h263L375.4,484.8z M102.2,477.8h265.6l-7.7-93H109.9L102.2,477.8z M125,464.8 c-2.1,0-4-0.7-5.6-2.1c-1.7-1.5-2.7-3.6-2.9-5.8c-0.3-4.7,3.2-8.8,7.9-9.1l0.1,2.1v-2.1h135.8c4.7,0,8.5,3.8,8.5,8.5 s-3.8,8.5-8.5,8.5H125.5C125.3,464.8,125.2,464.8,125,464.8z M124.9,454.8c-0.8,0.1-1.4,0.8 1.3,1.6c0,0.5,0.3,0.9,0.5,1 c0.2,0.2,0.6,0.4,1.1,0.4l0.2,0h135c0.8,0,1.5-0.7,1.5-1.5s-0.7-1.5-1.5-1.5H124.9z M126.9,439.8c-2.1,0-4-0.7-5.6-2.1 c-1.7-1.5-2.7-3.6-2.9-5.8c-0.2-2.3,0.6-4.5,2.1-6.2c1.5-1.7,3.6-2.7,5.8-2.9l0.2,0h213.7c4.7,0,8.5,3.8,8.5,8.5s-3.8,8.5-8.5,8.5 H127.4C127.2,439.8,127.1,439.8,126.9,439.8z M126.8,429.8c-0.5,0.1-0.8,0.3-0.9,0.5c-0.2,0.2-0.4,0.6-0.4,1.1c0,0.5,0.3,0.9,0.5,1 s0.6,0.4,1.1,0.4l0.2,0h213c0.8,0,1.5-0.7,1.5-1.5s-0.7-1.5-1.5-1.5H126.8z M129,414.8c-2.1,0-4-0.7-5.6-2.1 c-1.7-1.5-2.7-3.6-2.9-5.8c-0.3-4.7,3.2-8.8,7.9-9.1l0.2,0h170.7c4.7,0,8.5,3.8,8.5,8.5s-3.8,8.5-8.5,8.5H129.5 C129.3,414.8,129.2,414.8,129,414.8z M128.9,404.8c-0.8,0.1-1.4,0.8-1.3,1.6c0,0.5,0.3,0.9,0.5,1c0.2,0.2,0.6,0.4,1.1,0.4l0.2,0h170 c0.8,0,1.5-0.7,1.5-1.5s-0.7-1.5-1.5-1.5H128.9z"></path><path d="M85,116.2v60H25c-4.4,0-8.4,2.9-9.6,7.2l-15,50c-0.3,0.9-0.4,1.9-0.4,2.8v160c0.1,2.7,1.1,5.2,3,7.1c1.9,1.8,4.4,2.9,7,3 h74.5l3-35.5v-49.6c0-1.3,0.6-2.6,1.5-3.5l5-5c0.8-0.8,1.9-1.4,3-1.5h275.5c1.3,0,2.6,0.6,3.5,1.5l5,5c0.9,0.9,1.5,2.2,1.5,3.5v49.6 l3,35.4H460c5.5,0,10-4.5,10-10v-70h-50v-20h50v-70c0-0.9-0.1-1.9-0.4-2.8l-15-50c-1.2-4.3-5.2-7.2-9.6-7.2h-60v-60h-15v67.5 c0,2.7-1.1,5.2-3,7.1l-10,10c-1.9,1.9-4.4,3-7,3H120c-2.6,0-5.1-1.1-7-3l-10-10c-1.9-1.9-3-4.4-3-7v-67.6L85,116.2z M99.6,321.2 l-2.1,2.1v38h275v-38l-2-2L99.6,321.2z"></path><path d="M353.5,197h-237V0h237V197z M123.5,190h223V7h-223V190z"></path></svg>',
                icon: {
                  alt: 'Printer',
                  mimeType: 'image/svg+xml',
                  name: 'icon_printer.svg',
                  posterStorageID: null,
                  posterUrl: 'https://f.shgcdn.com/%!s(<nil>)/',
                  size: 1846,
                  src: 'https://f.shgcdn.com/88e0aaf1-b288-4a40-bec7-9bdad13038ef/',
                  storageID: '88e0aaf1-b288-4a40-bec7-9bdad13038ef',
                  uuid: '0f12b90e-6271-4a02-9192-b7179cd1f249',
                  _type: 'video',
                },
              },
              'Option-3',
            ),
            buttonText: text('Track Your Order', 'Print Sizer', 'Option-3'),
            buttonLink: text('Button Link', '/pages/order-lookup', 'Option-3'),
            description: object(
              'Description',
              [
                {
                  children: [{ text: "I don't have a ring and I have lots of spare time." }],
                  type: 'paragraph',
                },
                {
                  children: [{ text: '(Boring, slow, extremely accurate (need a printer))' }],
                  type: 'paragraph',
                },
              ],
              'Option-3',
            ),
          },
        ]}
        modalButtonText="Click me to view ring sizing options"
      />
    </>
  )
}
