import React from 'react'
import FeaturedArticles from 'Components/FeaturedArticles'

import './styles.css'

const FeaturedNewsArticles = ({ articles }) => {
  if (articles && articles !== undefined) {
    return <FeaturedArticles articles={articles} group="news" />
  } else {
    return null
  }
}

export default FeaturedNewsArticles
