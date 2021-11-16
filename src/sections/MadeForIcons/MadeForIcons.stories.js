import React from 'react'
import { withKnobs, text, files } from '@storybook/addon-knobs'
import MadeForIcons from './'

export default {
  title: 'Made For Icons',
  component: MadeForIcons,
  decorators: [withKnobs],
  parameters: {
    notes: '',
    knobs: {
      escapeHTML: false,
    },
  },
}

export const madeForIcons = () => {
  const madeForIcons = [
    {
      _id: '17314f9a-83a3-4f79-a6c5-424a947db070',
      icon: {
        name: 'kicking-ass',
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
      name: 'Kicking Ass',
    },
    {
      _id: '02ce3347-1fec-4350-8e6e-ea53c0ddbe91',
      icon: {
        name: 'guitar',
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
      name: 'Rocking Out',
    },
    {
      _id: '0dd2c4c6-c687-45de-9b8d-ee154f7950f0',
      icon: {
        name: 'mountain',
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
      name: 'Adventuring',
    },
    {
      _id: 'a7a23536-e7aa-437b-800c-837b17626cf8',
      icon: {
        name: 'dirty-diapers',
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
      name: 'Dirty Diapers',
    },
    {
      _id: 'fb280e67-49f1-4d96-83fe-769e02dc464a',
      icon: {
        name: 'football',
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
      name: 'Sports',
    },
    {
      _id: 'c20b5cd0-8d39-4120-b7d7-2b0a24cd6b02',
      icon: {
        name: 'durable',
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
      name: 'Working Out',
    },
  ]

  const typeCollection = {
    madeForIcons: madeForIcons,
  }

  return (
    <>
      <MadeForIcons title={text('Title', 'Made For')} typeCollection={typeCollection} />
    </>
  )
}
