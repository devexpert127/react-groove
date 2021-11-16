import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import BannerBase from '.'
import BannerContent from 'Components/BannerContent'

export default {
  title: 'Banner / Banner Base',
  component: BannerBase,
  decorators: [withKnobs],
}

const ALIGNMENT = {
  Left: { value: 'left' },
  Center: { value: 'center' },
  Right: { value: 'right' },
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

const template = args => {
  return (
    <React.Fragment>
      <p>This is the base Banner component it handles the positioning, this example is a div with a background colour but is more likely an image</p>
      <div
        style={{
          backgroundColor: '#000',
          color: '#FFF',
        }}
      >
        <BannerBase {...args} />
      </div>
    </React.Fragment>
  )
}
// --------------
// Most simple exampe
// --------------
export const UsingBanner = template.bind({})
UsingBanner.args = {
  className: null,
  // foreground: <BannerContent style={{ backgroundColor: "#dc0000", color: "#FFF", }}>{"Content"}</BannerContent>,
  foreground: (
    <BannerContent
      title="Title"
      supertitle="SuperTitle, red banner"
      subtitle="Sub title"
      buttonText="Click me"
      link="/go-somewhere"
    />
  ),
  background: <div style={{ backgroundColor: '#dc0000', height: '400px' }}></div>,
  textPosition: POSITION.TopLeft,
  link: null,
  linkTitleText: null,
  pageWidth: false,
}

export const UsingBannerWithContent = template.bind({})
UsingBannerWithContent.args = {
  ...UsingBanner.args,
  foreground: (
    <BannerContent>
      <h1>Random</h1>
      <p>Some html content that does not fit the prop provided content</p>
      <h2>lorem</h2>
      <ul>
        <li>one</li>
        <li>two</li>
      </ul>
      <p>
        This is pretty flexiable, event better if we were to make it element be passed in and it can
        get the BannerContent classes applied
      </p>
    </BannerContent>
  ),
}

// --------------
// Most simple exampe
// --------------
export const TransparentOrSlowLoadingImage = template.bind({})
TransparentOrSlowLoadingImage.args = {
  ...UsingBanner.args,
  background: <div style={{ height: '400px' }}></div>,
}

export const TopLeft = template.bind({})
TopLeft.args = {
  ...UsingBanner.args,
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
// --------------
// Most simple exampe
// --------------
export const NoForegroundSupplied = template.bind({})
NoForegroundSupplied.args = {
  ...TopLeft.args,
  foregroundComponent: null,
}
// --------------
// Most simple exampe
// --------------
export const NoBackgroundSupplied = template.bind({})
NoBackgroundSupplied.args = {
  ...TopLeft.args,
  backgroundComponent: null,
}

// --------------
// Most simple exampe
// --------------
export const linked = template.bind({})
linked.args = {
  ...TopLeft.args,
  link: '/test',
  linkTitleText: 'testing <b>title</b>',
}
// --------------
// Most simple exampe
// --------------
export const pageWidth = template.bind({})
pageWidth.args = {
  ...TopLeft.args,
  pageWidth: true,
}

export const stringForeground = template.bind({})
stringForeground.args = {
  ...TopLeft.args,
  forground: 'Not allowed, will not position correct',
}

export const divForeground = template.bind({})
divForeground.args = {
  ...TopLeft.args,
  foreground: <div className="asdf">Not allowed, will not position correct - div element</div>,
}

export const fragmentForeground = template.bind({})
fragmentForeground.args = {
  ...TopLeft.args,
  foreground: (
    <React.Fragment>
      <div>Not allowed, will not position correct</div>
      <div>div element </div>
    </React.Fragment>
  ),
}
