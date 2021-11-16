import React, { useRef } from 'react'
import { withKnobs, number, object } from '@storybook/addon-knobs'

import Pagination from './'

export default {
  title: 'Utility / Pagination',
  component: Pagination,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
    notes: '',
  },
}

const pagesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const pagination = args => <Pagination {...args} />
// ------------------------------------------
// Pagination but no scrolling
// ------------------------------------------
export const basic = pagination.bind({})
basic.args = {
  pages: object('Pages', pagesArray),
  onClick: e => {
    alert('paginate')
  },
  currentPage: number('Current Page', 6),
}
basic.storyName = 'Pagination'
// ------------------------------------------
// Scroll to top of page
// ------------------------------------------
export const scrollTop = pagination.bind({})
scrollTop.args = {
  ...basic.args,
  scrollToTop: true,
}
;(scrollTop.decorators = [
  Story => (
    <div style={{ paddingTop: '200px', paddingBottom: '800px' }}>
      <Story />
    </div>
  ),
]),
  (scrollTop.storyName = 'Scroll to top of page')
// ------------------------------------------
// Scroll to Element
// ------------------------------------------
export const scrollToElement = () => {
  const scrollBack = useRef(null)
  return (
    <div style={{ paddingTop: '50px', paddingBottom: '800px' }}>
      <h1 style={{ marginTop: '0', marginBottom: '200px' }}>Scrollback to top of page</h1>
      <h2 ref={scrollBack} style={{ marginTop: '0', marginBottom: '200px' }}>
        Should scroll back to here
      </h2>
      <Pagination {...scrollTop.args} scrollToTop={scrollBack} />
    </div>
  )
}
scrollToElement.storyName = 'Scroll to Element'
// ------------------------------------------
// Scroll to number
// ------------------------------------------
export const scrollToNumber = () => {
  const scrollBack = useRef(null)
  console.dir(scrollBack)
  return (
    <div style={{ paddingTop: '50px', paddingBottom: '800px' }}>
      <h1 style={{ marginTop: '0', marginBottom: '200px' }}>Should scroll back here</h1>
      <Pagination {...scrollTop.args} scrollToTop={0} />
    </div>
  )
}
scrollToNumber.storyName = 'Scroll to x'
