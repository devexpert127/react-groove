import React from 'react'
import ArticleCard from 'Components/ArticleCard'

import './styles.css'

const FeaturedArticles = ({ articles, group = 'blog' }) => {
  if (articles && articles !== undefined) {
    return (
      <section className="FeaturedArticles">
        {articles.map((article, i) => (
          <ArticleCard article={article} key={i} eagerLoading="true" fullWidth={false} group={group} />
        ))}
      </section>
    )
  } else {
    return null
  }
}

export default FeaturedArticles
