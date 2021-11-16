import React from 'react'
import { withKnobs, text, files, boolean } from '@storybook/addon-knobs'
import WhyGrooveLife from './'

export default {
  title: 'Why Groove Life',
  component: WhyGrooveLife,
  decorators: [withKnobs],
  parameters: {
    notes: '',
    knobs: {
      escapeHTML: false,
    },
  },
}

export const whyGrooveLife = () => {
  const benefits = [
    {
      description: text(
        'Benefit One Description',
        'NO BS LIFETIME WARRANTY. CUT IT, STRETCH IT, LOSE IT. NO PROBLEM. WE REPLACE IT.',
        'Benefit One',
      ),
      icon: {
        name: text('Benefit One Icon Name', 'warranty', 'Benefit One'),
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
      },
      name: text('Benefit One Icon Name', 'Warranty', 'Benefit One'),
    },
    {
      description: text(
        'Benefit Two Description',
        'BREATHABLE GROOVES ALLOW AIR TO CIRCULATE & MOISTURE TO FLOW OUT.',
        'Benefit Two',
      ),
      icon: {
        name: text('Benefit Two Icon Name', 'breathable', 'Benefit Two'),
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
      },
      name: text('Benefit Two Icon Name', 'Breathable', 'Benefit Two'),
    },
    {
      description: text(
        'Benefit Three Description',
        'PERFECT DESIGN PAIRED WITH PREMIUM MATERIALS MAKE GROOVE UNIQUE.',
        'Benefit Three',
      ),
      icon: {
        name: text('Benefit Three Icon Name', 'quality', 'Benefit Three'),
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
      },
      name: text('Benefit Three Icon Name', 'Quality', 'Benefit Three'),
    },
    {
      description: text(
        'Benefit Four Description',
        'FRESH STYLES, COLORS, AND LICENSED DESIGNS. AS UNIQUE AS YOU.',
        'Benefit Four',
      ),
      icon: {
        name: text('Benefit Four Icon Name', 'style', 'Benefit Four'),
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
      },
      name: text('Benefit Four Icon Name', 'Style', 'Benefit Four'),
    },
  ]

  return (
    <>
      <WhyGrooveLife
        title={text('Title', 'Why Groove Life?')}
        benefits={benefits}
        hideMasterPageSection={boolean('Hide master page section?', false)}
      />
    </>
  )
}
