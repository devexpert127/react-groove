import React, { useState } from 'react'
import cx from 'classnames'
import AnnouncementBar from 'Components/AnnouncementBar'

const WhitelistAnnouncementBar = ({ block = [], backgroundColor }) => {
  return (
    <AnnouncementBar
      blocks={[
        {
          content: block,
        },
      ]}
      backgroundColor={backgroundColor}
      showCloseButton={false}
    />
  )
}

export default WhitelistAnnouncementBar
