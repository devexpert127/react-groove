import React from 'react'
import cx from 'classnames'
import PageWidth from 'Components/PageWidth'
import RichText from 'frontend-ui/RichText'

import './styles.css'

const ArticleContent = ({ content }) => {
  if (content && content.length) {
    return (
      <section className="Article-content">
        <PageWidth>
          <div className="Article-body">
            <RichText source={content} />
          </div>
        </PageWidth>
      </section>
    )
  }

  return null
}

export default ArticleContent
