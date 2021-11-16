import React from 'react'
import { withKnobs, text, files, boolean } from '@storybook/addon-knobs'
import BenefitsBanner from './'

export default {
  title: 'Banner / Benefits Banner',
  component: BenefitsBanner,
  decorators: [withKnobs],
  parameters: {
    notes: '',
    knobs: {
      escapeHTML: false,
    },
  },
}

export const benefitsBanner = () => {
  const benefits = [
    {
      description: text(
        'Benefit One Description',
        'Our patented design allows air to flow in and moisture to flow out. Simple as that. No more sweaty finger.',
        'Benefit One',
      ),
      icon: {
        name: text('Benefit One Icon Name', 'breathable', 'Benefit One'),
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
      name: text('Benefit One Icon Name', 'Breathable Grooves', 'Benefit One'),
    },
    {
      description: text(
        'Benefit One Description',
        'Our patented design allows air to flow in and moisture to flow out. Simple as that. No more sweaty finger.',
        'Benefit One',
      ),
      icon: {
        name: text('Benefit One Icon Name', 'breathable', 'Benefit One'),
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
      name: text('Benefit One Icon Name', 'Breathable Grooves', 'Benefit One'),
    },
    {
      description: text(
        'Benefit One Description',
        'Our patented design allows air to flow in and moisture to flow out. Simple as that. No more sweaty finger.',
        'Benefit One',
      ),
      icon: {
        name: text('Benefit One Icon Name', 'breathable', 'Benefit One'),
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
      name: text('Benefit One Icon Name', 'Breathable Grooves', 'Benefit One'),
    },
    {
      description: text(
        'Benefit One Description',
        'Our patented design allows air to flow in and moisture to flow out. Simple as that. No more sweaty finger.',
        'Benefit One',
      ),
      icon: {
        name: text('Benefit One Icon Name', 'breathable', 'Benefit One'),
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
      name: text('Benefit One Icon Name', 'Breathable Grooves', 'Benefit One'),
    },
  ]

  const benefitImages = {
    desktopImage: {
      src: files(
        'Desktop Image',
        ['.jpg, .png'],
        'https://assets.frontend.shogun.dev/673bbda2-43cb-4140-8f63-ed9492bfcec1/',
        'Images',
      ),
    },
    mobileImageOne: {
      src: files(
        'Mobile Image 1',
        ['.jpg, .png'],
        'https://assets.frontend.shogun.dev/b886dca9-b7a2-4be6-a30e-11c7e20db5ac/',
        'Images',
      ),
    },
    mobileImageTwo: {
      src: files(
        'Mobile Image 2',
        ['.jpg, .png'],
        'https://assets.frontend.shogun.dev/638f8578-fc3e-4f3c-bdd5-4a4b554d5dc2/',
        'Images',
      ),
    },
    imageHasText: boolean('Image Has Text?', false, 'Images'),
  }

  return <BenefitsBanner benefits={benefits} benefitImages={benefitImages} />
}
