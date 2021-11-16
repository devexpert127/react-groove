import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'

import FloatingForm from './'

export default {
  title: 'Product / Floating Form',
  component: FloatingForm,
  decorators: [withKnobs],
}

export const stickyForm = () => (
  <React.Fragment>
    <div
      style={{
        height: '900px',
      }}
    >
      <p> This is best seen on the Product Box story</p>
      <FloatingForm>
        <form
          style={{
            height: '200px',
          }}
        >
          See the Product Box story
        </form>
      </FloatingForm>
    </div>
  </React.Fragment>
)
