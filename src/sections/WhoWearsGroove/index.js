import React from 'react'
import VisualBlocks from 'Components/VisualBlocks'

import './styles.css'

// mediaType and superimposeText are set explicitly but included this way so they can be refactored if needed
const WhoWearsGroove = ({ blocks, superimposeText = true, mediaType = 'image' }) => {
  if (blocks && blocks !== undefined && blocks.length > 0) {
    return <VisualBlocks blocks={blocks} superimposeText={superimposeText} mediaType={mediaType} />
  } else {
    return null
  }
}

export default WhoWearsGroove
