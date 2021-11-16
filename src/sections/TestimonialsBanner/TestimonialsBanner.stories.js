import React from 'react'
import { withKnobs, text, boolean, files } from '@storybook/addon-knobs'
import TestimonialsBanner from './'

export default {
  title: 'Banner / Testimonials Banner',
  component: TestimonialsBanner,
  decorators: [withKnobs],
}

export const testimonialsBanner = () => {
  const image = {
    src: files(
      'Image',
      ['.jpg, .png'],
      'https://assets.frontend.shogun.dev/d9a3883b-8c34-4243-b420-9132614e9efd/',
    ),
  }

  return (
    <TestimonialsBanner
      quote={text(
        'Quote',
        'Really have been happy with my rings. This belt is something I was looking for. Way to find a problem and create the solution!',
      )}
      name={text('Name', 'Sean Skinner')}
      title={text('Title', 'Backer')}
      image={image}
      mobileImage={image}
      styleDark={boolean('Style dark?', true)}
      smallText={boolean('Small text?', false)}
      hideContent={boolean('Hide text?', false)}
      noTopPadding={boolean('Remove top padding from section', false)}
      noBottomPadding={boolean('Remove bottom padding from section', false)}
      eagerLoading={boolean('Eager load image', false)}
    />
  )
}
