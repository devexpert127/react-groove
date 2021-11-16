import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Link from 'frontend-link'
import ResponsiveImage from 'frontend-ui/ResponsiveImage'
import getResponsiveImageSrc from 'frontend-ui/getResponsiveImageSrc'
import PageWidth from 'Components/PageWidth'

import './styles.css'

const imagesrcset = (image) => {
  const imgSizes = [180,360,720,900,1080,1600]
  return imgSizes.map(size => `${getResponsiveImageSrc(image.src, {width: size})} ${size}w`).join(',')
}

const Image = ({
  image,
  mobileImage,
  pageWidth,
  noTopPadding,
  noBottomPadding,
  link,
  className,
  height,
  width,
  loading = 'lazy',
  nested = false,
}) => {
  if (!image && !mobileImage) return null

  const hasDuelImages = !!image && !!mobileImage
  const primaryImage = hasDuelImages ? mobileImage : (mobileImage || image)
  const Component = nested ? 'div' : 'section'

  return (
    <Component
      className={cx(
        'Image',
        { ['Image--noTopPadding']: !!noTopPadding },
        { ['Image--noBottomPadding']: !!noBottomPadding },
        className,
      )}
    >
      <ImageContent
        pageWidth={pageWidth}
        link={link}
        hasDuelImages={hasDuelImages}
        primaryImage={primaryImage}
        image={image}
        mobileImage={mobileImage}
        height={height}
        width={width}
        loading={loading}
      />
    </Component>
  )
}

function Picture({ image, mobileImage, className, height, width, loading }) {
  return (
    <picture>
      <source
        media="(min-width: 75em)"
        srcSet={imagesrcset(image)}
      />
      <ResponsiveImage
        className={className}
        src={mobileImage.src}
        alt={mobileImage.alt || ''}
        height={mobileImage.height || height}
        width={mobileImage.width || width}
        loading={loading}
        sizes="(max-width: 360px) 70vw" // force browsers to load smaller images on mobile devices
      />
    </picture>
  )
}

function Img({ image, className, height, width, loading }) {
  const srcset = loading === 'eager' ? imagesrcset(image) : ''

  return (
    <React.Fragment>
      {loading === 'eager' &&
        <link
          rel="preload"
          as="image"
          href={image.src}
          imagesrcset={srcset}
        />
      }
      <ResponsiveImage
        className={className}
        src={image.src}
        alt={image.alt || ''}
        height={image.height || height}
        width={image.width || width}
        loading={loading}
      />
    </React.Fragment>
  )
}

function Images({ hasDuelImages, primaryImage, image, mobileImage, height, width, loading }) {
  const className = 'Image-image'

  if (hasDuelImages) {
    return (
      <Picture
        image={image}
        mobileImage={mobileImage}
        className={className}
        height={height}
        width={width}
        loading={loading}
      />
    )
  }

  return (
    <Img
      image={primaryImage}
      className={className}
      height={height}
      width={width}
      loading={loading}
    />
  )
}

function ImageContent({ pageWidth, link, hasDuelImages, primaryImage, image, mobileImage, height, width, loading }) {
  const content = link ? (
    <Link className="Image-link" to={link}>
      <Images
        hasDuelImages={hasDuelImages}
        primaryImage={primaryImage}
        image={image}
        mobileImage={mobileImage}
        height={height}
        width={width}
        loading={loading}
      />
    </Link>
  ) : (
    <Images
      hasDuelImages={hasDuelImages}
      primaryImage={primaryImage}
      image={image}
      mobileImage={mobileImage}
      height={height}
      width={width}
      loading={loading}
    />
  )

  if (pageWidth) {
    return <PageWidth>{content}</PageWidth>
  }

  return content
}

export default Image
