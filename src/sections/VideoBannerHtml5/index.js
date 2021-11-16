import React from 'react'
import cx from 'classnames'
import Video from 'frontend-ui/Video'
import BannerContent from 'Components/BannerContent'
import BannerBase from 'Components/BannerBase'

import './styles.css'


const VideoBannerHTML5 = ({
    video = null,
    link = null,
    pageWidth = false,
    supertitle = null,
    title  = null,
    subtitle = null,
    buttonText = null,
    textAlignment = null,
    textPosition = { name: "Center Center", value: 'center-center' },
    buttonStyleDefault = false,
  }) => {
  if (!video || !video.src) return null
  
  const hasOverlayContent = (supertitle || title || subtitle || buttonText),
    componentName = 'VideoBannerHTML5',
    videoClassName = `${componentName}-video`,
    contentClassName = `${componentName}-content`;

  const videoContent = (
    <div className={cx(videoClassName)}>
      <Video autoPlay loop muted playsInline>
        <source src={video.src} type="video/mp4" />
        Your browser does not support the video tag.
      </Video>
    </div>
  )
  
  const bannerContent = hasOverlayContent ? (
    <BannerContent
      supertitle={supertitle}
      title={title}
      subtitle={subtitle}
      buttonText={buttonText}
      link={link}
      buttonStyleDefault={buttonStyleDefault}
      className={cx(contentClassName, 'Banner-content--video')}
    />
  ) : null
  return (
    <BannerBase 
      className={componentName}
      foreground={hasOverlayContent ? bannerContent : null}
      background={videoContent}
      link={link}
      pageWidth={pageWidth}
      linkTitleText={buttonText || title || subtitle}
      textAlignment={textAlignment}
      textPosition={textPosition}
    />
  )
}

export default VideoBannerHTML5
