import React from 'react'
import cx from 'classnames'
import Link from 'frontend-link'
import BackgroundImage from 'Components/BackgroundImage'
import Button from 'Components/Button'

import './styles.css'

const BannerBlocks = ({
  banners = [],
  textPosition,
  eagerLoading = false
}) => {
  const position = textPosition && textPosition.value ? textPosition.value : 'center-center'

  const renderBanner = (banner, i) => {
    let content
    if (banner.image && banner.image !== undefined) {
      // image widths in px [smWidth, mdWidth, lgWidth, xlWidth]
      const defaultImageWidths = [600, 600, 800, 512]
      const imageWidths = {
        '1': [600, 1200, 1600, 2048],
        '2': [600, 600, 800, 1024],
        '3': [600, 600, 800, 680],
      }

      content = (
        <BackgroundImage
          imageSrc={banner.image.src}
          imgRatio={{ small: '5x4', large: '5x4' }}
          widths={imageWidths[banners.length] || defaultImageWidths}
          loading={eagerLoading ? 'eager' : 'lazy'}
        >
          <div
            className={cx('BannerBlock-content', {
              [`BannerBlock-content--${position}`]: !!position,
            })}
          >
            <h2 className="BannerBlock-title" dangerouslySetInnerHTML={{ __html: banner.title }} />

            {banner.link && banner.buttonText && (
              <div>
                <Button style="primary" as="button" to={banner.link}>
                  {banner.buttonText}
                </Button>
              </div>
            )}
          </div>
        </BackgroundImage>
      )
    }

    if (!!banner.link) {
      return (
        <div className="BannerBlock" key={i}>
          <Link className="BannerBlock-link" to={banner.link}>
            {content}
          </Link>
        </div>
      )
    }

    return (
      <div className="BannerBlock" key={i}>
        {content}
      </div>
    )
  }

  return (
    <section className="BannerBlocks" data-banners={banners.length}>
      {banners.map((banner, i) => renderBanner(banner, i))}
    </section>
  )
}

export default BannerBlocks
