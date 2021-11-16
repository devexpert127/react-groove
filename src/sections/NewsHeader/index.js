import React from 'react'
import cx from 'classnames'
import ArticleHeader from 'Components/ArticleHeader'

import './styles.css'

const NewsHeader = ({ article }) => {
  if (article && article.name) {
    return <ArticleHeader article={article} />
  }

  return null
}

export default NewsHeader
