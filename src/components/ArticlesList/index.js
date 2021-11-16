import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import PageWidth from 'Components/PageWidth'
import Button from 'Components/Button'
import ArticleCard from 'Components/ArticleCard'

import './styles.css'

const ArticlesList = ({ articles, group = 'blog' }) => {
  const [showMore, setShowMore] = useState(true)
  const [visibleArticles, setVisibleArticles] = useState(3)

  function showMoreArticles() {
    setShowMore(false)
    if (visibleArticles < articles.length) {
      setVisibleArticles(visibleArticles + 3)
    }
  }

  if (typeof IntersectionObserver !== 'undefined') {
    var intersectionObserver = new IntersectionObserver(function(entries) {
      // If intersectionRatio is 0, the target is out of view
      // and we do not need to do anything.
      if (entries[0].intersectionRatio <= 0) return

      showMoreArticles()
      this.unobserve(entries[0].target)
    })

    useEffect(() => {
      if (articles.length <= visibleArticles) {
        setShowMore(false)
      }

      if (!showMore) {
        var elements = document.querySelectorAll('.ArticleCard')
        var element = elements[elements.length - 1]
        if (element) {
          intersectionObserver.observe(element)
        }
      }
    })
  }

  if (articles && articles !== undefined) {
    return (
      <section className="ArticlesList">
        <PageWidth>
          {articles.slice(0, visibleArticles).map((article, i) => (
            <ArticleCard article={article} eagerLoading={i<3 ? true : false} group={group} key={i} />
          ))}
          {showMore && (
            <Button
              className="ArticlesList-button"
              style="primary"
              as="button"
              onClick={() => showMoreArticles()}
            >
              Show More Articles
            </Button>
          )}
        </PageWidth>
      </section>
    )
  } else {
    return null
  }
}

export default ArticlesList
