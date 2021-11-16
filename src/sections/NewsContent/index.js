import React from 'react'
import cx from 'classnames'
import ArticleContent from 'Components/ArticleContent'

import './styles.css'

const NewsContent = ({ content }) => {
  if (content && content.length) {
    return <ArticleContent content={content} />
  }

  return null
}

export default NewsContent
