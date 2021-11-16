import React from 'react'
import cx from 'classnames'
import ArticleCard from 'Components/ArticleCard'

import './styles.css'

const FeaturedArticle = ({ article, group = 'blog' }) => {
  if (article && article !== undefined) {
    return (
      <section className="FeaturedArticle">
        <ArticleCard article={article} eagerLoading="true" group={group} />
      </section>
    )
  } else {
    return null
  }
}

export default FeaturedArticle
