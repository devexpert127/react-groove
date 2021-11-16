import React from 'react'
import EmbedScript from 'Components/EmbedScript'

import './styles.css'

const VideoPeel = ({ title, customerID, dataID }) => {
  const scriptAttrs = {
    id: 'videoPeelPlugin',
    'data-plugin': dataID,
    'cust-id': customerID,
  }
  const embedAttrs = {
    id: 'embed-widget-container',
  }

  return (
    <section className="VideoPeel">
      <h2>{title}</h2>
      <EmbedScript
        scriptSource="//plugin.videopeel.com/plugin.js"
        scriptAttrs={scriptAttrs}
        embedAttrs={embedAttrs}
        nested={true}
      />
    </section>
  )
}

export default VideoPeel
