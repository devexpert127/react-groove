import React from 'react'
import { withKnobs, number, object, text, boolean } from '@storybook/addon-knobs'

import WhitelistAnnouncementBar from './'

export default {
  title: 'Whitelist / Announcement Bar',
  component: WhitelistAnnouncementBar,
  decorators: [withKnobs],
}

export const whitelistAnnouncementBar = () => {
  const blockContent = object('blockContent', [
    {
      children: [{ text: '🌺 ' }, { text: 'Announcement Block 1 ', bold: true }, { text: '🌺' }],
      type: 'paragraph',
    },
  ])

  return (
    <>
      <WhitelistAnnouncementBar
        block={blockContent}
        autoplaySpeed={number('Autoplay speed', 3)}
        backgroundColor={text('Background Color', '#bada55')}
        showCloseButton={boolean('Show Close Button', true)}
      />
    </>
  )
}
