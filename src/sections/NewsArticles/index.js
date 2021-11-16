import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import ArticlesList from 'Components/ArticlesList'

import './styles.css'

const NewsArticles = ({ articles }) => {
  if (articles && articles !== undefined) {
    return <ArticlesList articles={articles} group="news" />
  } else {
    return null
  }
}

export default NewsArticles
