import React from 'react'
import cx from 'classnames'
import BackgroundImage from 'Components/BackgroundImage'
import Image from 'Components/Image'
import BannerContent from 'Components/BannerContent'
import BannerBase from 'Components/BannerBase'

import './styles.css'

function hideContent(title, buttonText, contentHidden) {
  return contentHidden || (!title && !buttonText)
}

const HeroBanner = ({
  supertitle,
  title,
  subtitle,
  link,
  image,
  mobileImage,
  buttonText,
  contentHidden,
  height,
  width,
  textAlignment = null,
  textPosition = { name: "Center Center", value: 'center-center' },
  buttonStyleDefault = false,
  eagerLoading = false
}) => {
  const componentName = "HeroBanner";
  const canHideContent = hideContent(title, buttonText, contentHidden),
    imageRatio = {
      small: '25x23',
      large: '3x1',
    }

  if (!image) return null

  if (!mobileImage) {
    mobileImage = image
  }

  return (
      <BannerBase
        className={componentName}
        foreground={
          <BannerContent
            supertitle={supertitle}
            title={title}
            subtitle={subtitle}
            link={link}
            buttonText={buttonText}
            maxWidth={true}
            hidden={canHideContent}
            className={cx('Banner-content--hero')}
            pageWidth={!canHideContent}
            buttonStyleDefault={buttonStyleDefault}
          />
        }
        background={canHideContent ? (
          <Image
            image={image}
            mobileImage={mobileImage}
            noTopPadding={true}
            noBottomPadding={true}
            height={height}
            width={width}
            loading={eagerLoading ? 'eager' : 'lazy'}
            nested={true}
          />
        ) : (
          <BackgroundImage
            imageSrc={image.src}
            mobileImageSrc={mobileImage.src}
            imgRatio={imageRatio}
            className="HeroBanner-image--has-content"
            loading={eagerLoading ? 'eager' : 'lazy'}
          />
        )}
        link={link}
        linkTitleText={buttonText || title || subtitle}
        textAlignment={textAlignment}
        textPosition={textPosition}
    />
  )
}

export default HeroBanner
