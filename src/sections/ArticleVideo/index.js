import React from 'react'
import cx from 'classnames'
import PageWidth from 'Components/PageWidth'

import './styles.css'

const ArticleVideo = ({ video, pageWidth = true }) => {
  if (video) {
    if (pageWidth) {
      return (
        <section className="Article-video">
          <PageWidth>
            <div className="Article-body">
              <div className="Article-video-content" dangerouslySetInnerHTML={{ __html: video }} />
            </div>
          </PageWidth>
        </section>
      )
    } else {
      return (
        <section className="Article-video">
          <div className="Article-body">
            <div className="Article-video-content" dangerouslySetInnerHTML={{ __html: video }} />
          </div>
        </section>
      )
    }
  }

  return null
}

export default ArticleVideo
