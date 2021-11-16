import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'
import Modal from './'

export default {
  title: 'Modal',
  component: Modal,
  decorators: [withKnobs],
}

export const modal = () => {
  return (
    <Modal buttonText={text('Button Text', 'Notify Me When Back in Stock')}>
      <h3>test</h3>
    </Modal>
  )
}
