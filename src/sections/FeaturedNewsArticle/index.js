import React from 'react'
import FeaturedArticle from 'Components/FeaturedArticle'

import './styles.css'

const FeaturedNewsArticle = ({ article }) => {
  if (article && article !== undefined) {
    return <FeaturedArticle article={article} group="news" />
  } else {
    return null
  }
}

export default FeaturedNewsArticle
