import React from 'react'
import cx from 'classnames'
import PageWidth from 'Components/PageWidth'
import BackgroundImage from 'Components/BackgroundImage'
import Image from 'Components/Image'

import './styles.css'

const TestimonialsBanner = ({
  image,
  mobileImage,
  quote,
  name,
  title,
  styleDark,
  smallText,
  hideContent,
  noTopPadding,
  noBottomPadding,
  eagerLoading = false
}) => {
  if (!mobileImage || mobileImage === undefined) {
    mobileImage = image
  }

  if (image && image !== undefined) {
    return (
      <section
        className={cx(
          'TestimonialsBanner',
          { ['TestimonialsBanner--dark']: !!styleDark },
          { ['TestimonialsBanner--noTopPadding']: !!noTopPadding },
          { ['TestimonialsBanner--noBottomPadding']: !!noBottomPadding },
        )}
      >
        {!hideContent && (
          <BackgroundImage imageSrc={image.src} mobileImageSrc={mobileImage.src} loading={eagerLoading ? 'eager' : 'lazy'}>
            <div className="TestimonialsBanner-container">
              <TestimonialContent
                hideContent={hideContent}
                smallText={smallText}
                quote={quote}
                name={name}
                title={title}
              />
            </div>
          </BackgroundImage>
        )}
        {!!hideContent && (
          <React.Fragment>
            <Image image={image} mobileImage={mobileImage} nested={true} />
            <TestimonialContent
              hideContent={hideContent}
              smallText={smallText}
              quote={quote}
              name={name}
              title={title}
            />
          </React.Fragment>
        )}
      </section>
    )
  }

  return null
}

function TestimonialContent({ hideContent, smallText, quote, name, title }) {
  if (quote && quote !== undefined && name && name !== undefined && title && title !== undefined) {
    return (
      <PageWidth>
        <div
          className={cx('TestimonialsBanner-content', {
            ['TestimonialsBanner-content--hidden']: !!hideContent,
          })}
        >
          <blockquote
            className={cx('TestimonialsBanner-quote', {
              ['TestimonialsBanner-quote--smallText']: !!smallText,
            })}
          >
            <span className="TestimonialsBanner-quote__open">&ldquo;</span>
            {quote}
            <span className="TestimonialsBanner-quote__close">&rdquo;</span>
          </blockquote>
          <cite className="TestimonialsBanner-attribution">
            &mdash;&nbsp;{name},&nbsp;<em>{title}</em>
          </cite>
        </div>
      </PageWidth>
    )
  }
  return null
}

export default TestimonialsBanner
