import React from 'react'
import cx from 'classnames'
import ArticleVideo from 'Components/ArticleVideo'

import './styles.css'

const NewsVideo = ({ video }) => {
  if (video) {
    return <ArticleVideo video={video} />
  }

  return null
}

export default NewsVideo
