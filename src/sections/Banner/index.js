import React from 'react'
import cx from 'classnames'
import BackgroundImage from 'Components/BackgroundImage'
import Image from 'Components/Image'
import BannerContent from 'Components/BannerContent'
import BannerBase from 'Components/BannerBase'

import './styles.css'

function hideContent(title, contentHidden) {
  return (typeof contentHidden !== 'undefined' && contentHidden) || !title
}

const Banner = ({
  title,
  link,
  image,
  mobileImage,
  textAlignment = null,
  textPosition = { name: 'Center Center', value: 'center-center' },
  contentHidden,
  limitHeight = false,
  overlay = false,
  eagerLoading = false
}) => {
  if (!mobileImage || mobileImage === undefined) {
    mobileImage = image
  }
  const canHideContent = hideContent(title, contentHidden)
  const content =
    title && title != '' ? (
      <BannerContent maxWidth={false} hidden={canHideContent}>
        <h2 className="Banner-title" dangerouslySetInnerHTML={{ __html: title }} />
      </BannerContent>
    ) : null

  let bgContent = null
  if (image && image !== undefined) {
    bgContent = canHideContent ? (
      <Image
        className={cx({ ['Banner-image--overlay']: !!overlay })}
        image={image}
        mobileImage={mobileImage}
        noTopPadding={true}
        noBottomPadding={true}
        loading={eagerLoading ? 'eager' : 'lazy'}
        nested={true}
      />
    ) : (
      <BackgroundImage
        className={cx('Banner-image', { ['Banner-image--overlay']: !!overlay })}
        imageSrc={image.src}
        mobileImageSrc={mobileImage.src}
        imgRatio={{ small: '25x23', large: '3x1' }}
        loading={eagerLoading ? 'eager' : 'lazy'}
      />
    )
  }

  return (
    <BannerBase
      className={cx({ ['Banner--limit-height']: !!limitHeight })}
      foreground={content}
      background={bgContent}
      link={link}
      linkTitleText={title}
      textAlignment={textAlignment}
      textPosition={textPosition}
    />
  )
}

export default Banner
