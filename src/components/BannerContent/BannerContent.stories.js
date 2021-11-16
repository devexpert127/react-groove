import React from 'react'
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs'
import BannerContent from './'

export default {
  title: 'Banner / Banner Content',
  component: BannerContent,
  decorators: [withKnobs],
}

const template = args => {
  return <div style={{
    backgroundColor: '#000',
    color: "#FFF",
    position: "relative",
    height: "400px",
    width: "100%",
  }}>
    <BannerContent {...args} /> 
  </div>
}
// --------------
// Most simple exampe
// --------------
export const example = template.bind({})
example.args = {
    title: 'Title',
    supertitle: 'SuperTitle',
    subtitle: 'Sub title',
    buttonText: 'Click me',
    link: '/go-somewhere'
}
// --------------
// 
// --------------
export const noButtonText = template.bind({})
noButtonText.args = {
    ...example.args,
    buttonText: null,
}
// --------------
// 
// --------------
export const defaultButtonStyle = template.bind({})
noButtonText.args = {
    ...example.args,
    defaultButtonStyle: true,
}
// --------------
// 
// --------------
export const noSuperTitle = template.bind({})
noSuperTitle.args = {
    ...example.args,
    supertitle: null,
}
// --------------
// 
// --------------
export const noLink = template.bind({})
noLink.args = {
    ...example.args,
    link: null,
}

// --------------
// 
// --------------
export const children = args => {
  return <div style={{
    backgroundColor: '#000',
    color: "#FFF",
    position: "relative",
    height: "400px",
    width: "100%",
  }}>
    <BannerContent>Can have complete random html content</BannerContent>
  </div>
}
// --------------
// Use real product data as a base and then add/update the properties as needed.
// --------------
export const className = args => {
  return <div style={{
    backgroundColor: '#000',
    color: "#FFF",
    position: "relative",
    height: "400px",
    width: "100%",
  }}>
    <BannerContent className="test">Hello</BannerContent>
  </div>
}
