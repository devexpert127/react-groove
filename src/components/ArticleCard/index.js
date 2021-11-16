import React from 'react'
import cx from 'classnames'
import Link from 'frontend-link'
import Button from 'Components/Button'
import BackgroundImage from 'Components/BackgroundImage'
import slugify from 'Components/Slugify'
import Image from 'Components/Image'

import './styles.css'

const ArticleCard = ({
  article,
  eagerLoading = false,
  fullWidth = true,
  group = 'blog'
}) => {
  let articleUrl

  if (
    article &&
    article !== undefined &&
    article.featureImage &&
    article.featureImage !== undefined &&
    article.featureImage.src &&
    article.featureImage.src !== undefined
  ) {
    if (article.slug && article.slug !== undefined) {
      articleUrl = `/${group}/${article.slug}`
    } else {
      articleUrl = `/${group}/${slugify(article.name)}`
    }

    if (!!article.featureImageHasText) {
      return (
        <div className="ArticleCard">
          <Image image={article.featureImage} noTopPadding={true} noBottomPadding={true} nested={true} />
          <ArticleCardContent article={article} articleUrl={articleUrl} fullWidth={fullWidth} />
        </div>
      )
    } else {
      return (
        <BackgroundImage className="ArticleCard" imageSrc={article.featureImage.src} loading={eagerLoading ? 'eager' : 'lazy'}>
          <ArticleCardContent article={article} articleUrl={articleUrl} fullWidth={fullWidth} />
        </BackgroundImage>
      )
    }
  }
  return null
}

function ArticleCardContent({ article, articleUrl, fullWidth }) {
  return (
    <div
      className={cx(
        'ArticleCard-content',
        { ['ArticleCard-content--hidden']: !!article.featureImageHasText },
        { ['ArticleCard-content--full-width']: !!fullWidth },
      )}
    >
      <h1 className="ArticleCard-title">{article.name}</h1>
      {article.name && (
        <Button className="ArticleCard-button" style="default" as={Link} to={articleUrl}>
          View Article
        </Button>
      )}
    </div>
  )
}

export default ArticleCard
