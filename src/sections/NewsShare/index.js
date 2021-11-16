import React from 'react'
import ArticleShare from 'Components/ArticleShare'

import './styles.css'

const NewsShare = ({ shareIcons, article, blog = 'news' }) => {
  if (shareIcons && shareIcons.length > 0) {
    return <ArticleShare shareIcons={shareIcons} article={article} blog={blog} />
  }

  return null
}

export default NewsShare
