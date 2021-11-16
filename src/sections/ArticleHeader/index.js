import React from 'react'
import cx from 'classnames'
import PageWidth from 'Components/PageWidth'

import './styles.css'

const ArticleHeader = ({ article }) => {
  if (article && article.name) {
    return (
      <section className="Article-header">
        <PageWidth>
          <header className="Article-header-content">
            <h1 className="Article-title">{article.name}</h1>
            <hr className="Article-rule" />
            <dl className="Article-meta">
              {article.author && <dt>Author</dt>}
              {article.author && <dd>Posted by {article.author}</dd>}
              {article.date && <dt>Date</dt>}
              {article.date && <dd>on {article.date}</dd>}
            </dl>
          </header>
        </PageWidth>
      </section>
    )
  }

  return null
}

export default ArticleHeader
