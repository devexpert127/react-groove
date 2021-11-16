import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import ArticlesList from 'Components/ArticlesList'

import './styles.css'

const BlogArticles = ({ articles }) => {
  if (articles && articles !== undefined) {
    return <ArticlesList articles={articles} />
  } else {
    return null
  }
}

export default BlogArticles
