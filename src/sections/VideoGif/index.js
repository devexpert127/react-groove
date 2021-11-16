import React from 'react'
import Video from 'frontend-ui/Video'
import PageWidth from 'Components/PageWidth'

import './styles.css'

const VideoGif = ({ video, maxWidth, alignment }) => {
  if (!video || !video.src) return null

  const videoGifStyle = {
    maxWidth: maxWidth,
  }

  return (
    <section className="VideoGif">
      <PageWidth>
        <div
          className={
            !!alignment
              ? `VideoGif-content VideoGif--align-${alignment.value}`
              : 'VideoGif-content VideoGif--align-left'
          }
        >
          <Video autoPlay loop muted playsInline style={videoGifStyle}>
            <source src={video.src} type="video/mp4" />
            Your browser does not support the video tag.
          </Video>
        </div>
      </PageWidth>
    </section>
  )
}

export default VideoGif
