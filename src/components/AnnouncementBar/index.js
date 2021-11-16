import React, { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import Slider from 'Components/Slider'
import PageWidth from 'Components/PageWidth'
import UIIcon from 'Components/UIIcon'
import RichText from 'frontend-ui/RichText'
import { updateSlides } from 'Components/SliderShared'

import './styles.css'

const AnnouncementBar = ({
  blocks = [],
  autoplaySpeed = 5,
  onClose = null,
  backgroundColor,
  showCloseButton = true,
}) => {
  if (!blocks.length) return null

  const [hidden, setHidden] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const sliderRef = useRef(null)
  useEffect(() => {
    if (sliderRef && sliderRef.current) {
      updateSlides(sliderRef.current)
    }
  }, [activeSlide])

  const onCloseClick = () => {
    setHidden(true)
    if (onClose) {
      onClose()
    }
  }

  // override announcement bar background color
  let announcementBarStyles = {}
  if (!!backgroundColor || backgroundColor !== undefined) {
    announcementBarStyles = {
      backgroundColor: backgroundColor,
    }
  }

  return (
    <div
      className={cx('AnnouncementBar', { ['AnnouncementBar--hidden']: hidden })}
      style={announcementBarStyles}
      ref={sliderRef}
    >
      <PageWidth>
        <Slider
          className="AnnouncementBar-slider"
          arrows={false}
          autoplay={true}
          autoplaySpeed={autoplaySpeed * 1000}
          beforeChange={(_, next) => setActiveSlide(next)}
        >
          {blocks.map((block, i) => {
            return (
              <Slider.Slot key={i}>
                <div className="AnnouncementBar-item" hidden={activeSlide !== i ? true : undefined}>
                  <RichText source={block.content} />
                </div>
              </Slider.Slot>
            )
          })}
        </Slider>
      </PageWidth>
      {showCloseButton && (
        <button
          className="AnnouncementBar-close"
          onClick={() => {
            onCloseClick()
          }}
        >
          <UIIcon icon={UIIcon.Icons.Close} />
          <span className="AnnouncementBar-closeText">close</span>
        </button>
      )}
    </div>
  )
}

export default AnnouncementBar
