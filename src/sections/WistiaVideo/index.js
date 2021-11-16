import React, { useEffect } from 'react'
import cx from 'classnames'
import PageWidth from 'Components/PageWidth'

import './styles.css'

const WistiaVideo = ({ videoId, videoTitle = "", videoHighlightColor = 'F38732' }) => {
  if (!!videoId) {
    return (
      <section className="Wistia">
        <div className="Wistia-wrapper">
          <div className="Wistia-video">
            <iframe
              src={`//fast.wistia.net/embed/iframe/${videoId}?videoFoam=true&playerColor=${videoHighlightColor}`}
              allowtransparency="true"
              frameBorder="0"
              scrolling="no"
              className="Wistia-embed"
              name="wistia_embed"
              allowFullScreen={true}
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
              oallowfullscreen="true"
              msallowfullscreen="true"
              width="640"
              height="360"
              title={videoTitle}
            ></iframe>
            <script src="//fast.wistia.net/assets/external/E-v1.js" async></script>
          </div>
        </div>
      </section>
    )
  }

  return null
}

export default WistiaVideo
