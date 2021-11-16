import React from 'react'
import VisualBlocks from 'Components/VisualBlocks'

import './styles.css'

// mediaType and superimposeText are set explicitly but included this way so they can be refactored if needed
const GrooveLifeTeam = ({ blocks, superimposeText = false, mediaType = 'video' }) => {
  if (blocks && blocks !== undefined && blocks.length > 0) {
    return <VisualBlocks blocks={blocks} superimposeText={superimposeText} mediaType={mediaType} />
  } else {
    return null
  }
}

export default GrooveLifeTeam
