import React, { useState, useRef, useEffect } from 'react'
import Slider from 'Components/Slider'
import cx from 'classnames'
import ResponsiveImage from 'frontend-ui/ResponsiveImage'
import Video from 'frontend-ui/Video'
import { updateSlides } from 'Components/SliderShared'

import './styles.css'

function CarouselThumb({ details, loading }) {
  const src = details._type === 'video' ? details.posterUrl : details.src
  return (
    <ResponsiveImage
      src={src}
      width="60"
      height="60"
      sizes="60px"
      alt={details.alt}
      loading={loading}
    />
  )
}

const CAROUSEL_IMAGE_WIDTH = 720
const CAROUSEL_IMAGE_HEIGHT = 480

function CarouselMediaItem({ details, loading }) {
  if (details._type === 'video') {
    return (
      <Video autoPlay loop muted playsInline>
        <source src={details.src} type="video/mp4" />
      </Video>
    )
  } else {
    return (
      <ResponsiveImage
        className="ProductCarousel-image"
        src={details.src}
        sizes={'(min-width: 960px) 33vw, (min-width: 720px) 85vw, 80vw'}
        width={details.width || CAROUSEL_IMAGE_WIDTH}
        height={details.height || CAROUSEL_IMAGE_HEIGHT}
        alt={details.alt}
        loading={loading}
      />
    )
  }
}

const ProductCarousel = ({ className = '', media = [], showThumbnails, slideIndex = 0 }) => {
  const [activeSlide, setActiveSlide] = useState(slideIndex)
  const sliderRef = useRef(null)

  useEffect(() => {
    if (sliderRef && sliderRef.current) {
      updateSlides(sliderRef.current)
    }
  }, [activeSlide])
  const mainCarouselRef = useRef(null)
  const navCarouselRef = useRef(null)
  const carouselClass = 'ProductCarousel'

  function goToSlide(index) {
    const event = new CustomEvent('updateSlide', { detail: { slideIndex: index } })

    if (mainCarouselRef && mainCarouselRef.current) {
      mainCarouselRef.current.dispatchEvent(event)
    }
    if (navCarouselRef && navCarouselRef.current) {
      mainCarouselRef.current.dispatchEvent(event)
    }
  }

  useEffect(() => {
    goToSlide(slideIndex)
  }, [slideIndex])

  if ((media || []).length > 0) {
    return (
      <div className={cx(carouselClass, className)} ref={sliderRef}>
        <Slider
          className={`${carouselClass}-main ${carouselClass}-main--product`}
          ref={mainCarouselRef}
          arrows={!showThumbnails}
          beforeChange={(_, next) => setActiveSlide(next)}
          responsive={[
            {
              breakpoint: 1200,
              settings: {
                arrows: true,
              },
            },
          ]}
        >
          {media.map(({ details }, i) => {
            return (
              <Slider.Slot key={i}>
                <CarouselMediaItem
                  hidden={activeSlide !== i ? true : undefined}
                  details={details}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </Slider.Slot>
            )
          })}
        </Slider>
        {media.length > 1 && showThumbnails && (
          <Slider
            className={`${carouselClass}-nav`}
            ref={navCarouselRef}
            slidesToShow={Math.min(5, media.length)}
            arrows={false}
            focusOnSelect={true}
            beforeChange={(_, next) => setActiveSlide(next)}
          >
            {media.map(({ details }, i) => {
              return (
                <Slider.Slot key={i}>
                  <CarouselThumb
                    hidden={activeSlide !== i ? true : undefined}
                    details={details}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </Slider.Slot>
              )
            })}
          </Slider>
        )}
      </div>
    )
  }
  return null
}

export default ProductCarousel
