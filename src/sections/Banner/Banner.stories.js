import React from 'react'
import { withKnobs, text, files, select, boolean } from '@storybook/addon-knobs'
import Banner from './'

export default {
  title: 'Banner / Banner',
  component: Banner,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
    notes: '',
  },
}

const template = args => (
  <Banner
    {...args}
  />
)

export const banner = () => {
  const title = text('title', 'This is a <strong>banner</strong>')

  const image = {
    src: files(
      'Image',
      ['.jpg, .png'],
      'https://assets.frontend.shogun.dev/f2abe051-037c-43d0-bb8b-8184a5324aff/',
    ),
  }

  const textPosition = select('Position', {
    TopLeft: { name: 'Top Left', value: 'top-left' },
    TopCenter: { name: 'Top Center', value: 'top-center' },
    TopRight: { name: 'Top Right', value: 'top-right' },
    CenterLeft: { name: 'Center Left', value: 'center-left' },
    CenterCenter: { name: 'Center Center', value: 'center-center' },
    CenterRight: { name: 'Center Right', value: 'center-right' },
    BottomLeft: { name: 'Bottom Left', value: 'bottom-left' },
    BottomCenter: { name: 'Bottom Center', value: 'bottom-center' },
    BottomRight: { name: 'Bottom Right', value: 'bottom-right' },
  })

  return (
    <>
      <Banner
        title={title}
        link={text('Link', '/to-go-nowhere')}
        image={image}
        textPosition={textPosition}
        contentHidden={boolean('Text hidden?', false)}
        limitHeight={boolean('Limit height?', false)}
        overlay={boolean('Overlay?', false)}
        eagerLoading={boolean('Eager load image', false)}
      />
    </>
  )
}

// -------
// Real data - about us page WITHOUT a mobile image
// -------

export const AboutUsExample = template.bind({})
AboutUsExample.args = {
  link: null,
  textPosition: { name: 'Center Center', value: 'center-center' },
  contentHidden: false,
  limitHeight: false,
  overlay: false,
  loading: null,
  title: "WHAT WE'RE ABOUT",
  image: {
    _type:"image",
    alt:"What We're About, Black background with grey topographical lines through it",
    name:"Generic_Hero4.jpg",
    size:159765,
    src:"https://f.shgcdn.com/02e6a03a-9b1f-4bc4-9744-00a326c77368/",
    storageID:"02e6a03a-9b1f-4bc4-9744-00a326c77368",
    uuid:"6487b74f-1304-46dd-b458-7e6e00070a56"
  },
}


// -------
// Real data - about us page WITH a mobile image
// -------
export const AboutUsExampleMobileImage = template.bind({})
AboutUsExampleMobileImage.args = {
  ...AboutUsExample.args,
  mobileImage: {
    _type: "image",
    alt: "What We're About, Black background with grey topographical lines through it",
    height: 812,
    mimeType: "image/jpeg",
    name: "Generic_Hero4mobile.jpg",
    size: 214889,
    src: "https://f.shgcdn.com/37c1cf12-b5ee-4455-adf5-976c6c63f3e8/",
    storageID: "37c1cf12-b5ee-4455-adf5-976c6c63f3e8",
    uuid: "a40fe6d6-4626-4ebd-938c-f164d3c62950",
    width: 873
    },
}
