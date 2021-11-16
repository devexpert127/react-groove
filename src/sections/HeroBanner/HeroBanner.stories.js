import React from 'react'
import { withKnobs, text, files, boolean } from '@storybook/addon-knobs'
import HeroBanner from './'

export default {
  title: 'Banner / Hero Banner',
  component: HeroBanner,
  decorators: [withKnobs],
}

const template = args => {
  const content = {
      title: text('Title', 'A Title'),
      supertitle: text('Supertitle', 'A Super title'),
      subtitle: text('Subtitle', 'A sub title'),
      buttonText: text('Button Text', 'Click this button!'),
      link: text('Link', '/to-go-nowhere'),
    },
    contentHidden = boolean('Text hidden?', false),
    hoverEffects = boolean('Show hover effects?', true)

  let image = {
    src: 'https://assets.frontend.shogun.dev/f2abe051-037c-43d0-bb8b-8184a5324aff/',
  }
  let mobileImage = {
    src: 'https://assets.frontend.shogun.dev/df754d65-8972-4acb-9fda-33f96702d6e6/',
  }

  if (contentHidden || (!content.title && !content.buttonText)) {
    image = {
      src: 'https://assets.frontend.shogun.dev/9e27f25e-0876-4d8d-ae24-0caa0262f665/',
    }
    mobileImage = {
      src: 'https://assets.frontend.shogun.dev/4e1cfdfd-7fc4-4e45-954d-fda157addb82/',
    }
  }

  return (
    <HeroBanner
      image={image}
      mobileImage={boolean('Show mobile image?', true) ? mobileImage : undefined}
      supertitle={content.supertitle}
      title={content.title}
      subtitle={content.subtitle}
      buttonText={content.buttonText}
      link={content.link}
      contentHidden={contentHidden}
      hoverEffects={hoverEffects}
      eagerLoading={boolean('Eager load image', false)}
      {...args}
    />
  )
}

const ALIGNMENT = {
  Left: { alue: 'left' },
  Center: { alue: 'center' },
  Right: { alue: 'right' },
}

const POSITION = {
  TopLeft: { value: 'top-left' },
  TopCenter: { value: 'top-center' },
  TopRight: { value: 'top-right' },
  CenterLeft: { value: 'center-left' },
  CenterCenter: { value: 'center-center' },
  CenterRight: { value: 'center-right' },
  BottomLeft: { value: 'bottom-left' },
  BottomCenter: { value: 'bottom-center' },
  BottomRight: { value: 'bottom-right' },
}

export const heroBanner = template.bind({})

export const noButtonText = template.bind({})
noButtonText.args = {
  ...heroBanner.args,
  buttonText: null,
}

export const noSuperTitle = template.bind({})
noSuperTitle.args = {
  ...heroBanner.args,
  supertitle: null,
}

export const noSubTitle = template.bind({})
noSubTitle.args = {
  ...heroBanner.args,
  subtitle: null,
}

export const noTitle = template.bind({})
noTitle.args = {
  ...heroBanner.args,
  title: null,
}

export const defaultButtonStyle = template.bind({})
defaultButtonStyle.args = {
  ...heroBanner.args,
  buttonStyleDefault: true,
}


export const TopLeft = template.bind({})
TopLeft.args = {
  ...heroBanner.args,
  textAlignment: ALIGNMENT.Left,
  textPosition: POSITION.TopLeft,
}

// --------------
// Most simple exampe
// --------------
export const TopCenter = template.bind({})
TopCenter.args = {
  ...TopLeft.args,
  textAlignment: ALIGNMENT.Left,
  textPosition: POSITION.TopCenter,
}
// --------------
// Most simple exampe
// --------------
export const topRight = template.bind({})
topRight.args = {
  ...TopLeft.args,
  textAlignment: ALIGNMENT.Left,
  textPosition: POSITION.TopRight,
}
// --------------
// Most simple exampe
// --------------
export const centerLeft = template.bind({})
centerLeft.args = {
  ...TopLeft.args,
  textAlignment: ALIGNMENT.Left,
  textPosition: POSITION.CenterLeft,
}
// --------------
// Most simple exampe
// --------------
export const CenterCenter = template.bind({})
CenterCenter.args = {
  ...TopLeft.args,
  textAlignment: ALIGNMENT.Left,
  textPosition: POSITION.CenterCenter,
}
// --------------
// Most simple exampe
// --------------
export const CenterRight = template.bind({})
CenterRight.args = {
  ...TopLeft.args,
  textAlignment: ALIGNMENT.Left,
  textPosition: POSITION.CenterRight,
}
// --------------
// Most simple exampe
// --------------
export const BottomLeft = template.bind({})
BottomLeft.args = {
  ...TopLeft.args,
  textAlignment: ALIGNMENT.Left,
  textPosition: POSITION.BottomLeft,
}
// --------------
// Most simple exampe
// --------------
export const BottomCenter = template.bind({})
BottomCenter.args = {
  ...TopLeft.args,
  textAlignment: ALIGNMENT.Left,
  textPosition: POSITION.BottomCenter,
}
// --------------
// Most simple exampe
// --------------
export const BottomRight = template.bind({})
BottomRight.args = {
  ...TopLeft.args,
  textAlignment: ALIGNMENT.Left,
  textPosition: POSITION.BottomRight,
}
