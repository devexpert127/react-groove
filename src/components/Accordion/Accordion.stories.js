import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'

import Accordion from './'
import UIIcon from 'Components/UIIcon'
import './styles.css'

export default { title: 'Accordion', component: Accordion, decorators: [withKnobs] }

export const accordion = () => {

  return (
    <>
      <Accordion
        items={[
          {
            name: 'Return & Exchange',
            content: 'Return & Exchange',
          },
          {
            name: 'Warranty',
            content: 'Warranty',
          },
          {
            name: 'International Orders',
            content: 'International Orders',
          },
          {
            name: 'FAQ',
            content: 'FAQ',
          },
          {
            name: 'Contact',
            content: 'Contact',
          },
        ]}
        icon={UIIcon.Icons.PlusMinus}
      />
    </>
  )
}
