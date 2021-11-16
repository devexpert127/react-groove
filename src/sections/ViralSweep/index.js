import React from 'react'
import cx from 'classnames'
import EmbedScript from 'Components/EmbedScript'

import './styles.css'

const ViralSweep = ({ title, id, scriptSource, pageWidth = true }) => {
  return (
    <section className="ViralSweepEmbed">
      <EmbedScript title={title} scriptSource={scriptSource} pageWidth={pageWidth}>
        <div id={id} />
      </EmbedScript>
    </section>
  )
}

export default ViralSweep
