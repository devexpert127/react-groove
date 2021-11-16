import React from 'react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import VideoPeel from './'

export default {
  title: 'Integration / Video Peel',
  component: VideoPeel,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
    notes: `<script type="text/javascript" id="videoPeelPlugin" data-plugin="0eb7f7d4-e310-4fcb-965d-53b35a37c748" cust-id="6d196640-417d-11ea-ac75-99063c45e562" tag="" src="https://plugin.videopeel.com/plugin.js"></script><div id="embed-widget-container"></div>`,
  },
}

export const videoPeel = () => {
  const title = text('Title', `Don't just take our word for it`)
  const customerID = text('Customer ID', `6d196640-417d-11ea-ac75-99063c45e562`)
  const dataID = text('Data ID', `0eb7f7d4-e310-4fcb-965d-53b35a37c748`)

  return (
    <>
      <VideoPeel title={title} customerID={customerID} dataID={dataID} />
    </>
  )
}
