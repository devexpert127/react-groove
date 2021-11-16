import React, { useState } from 'react'
import cx from 'classnames'
import Slider from 'Components/Slider'
import UIIcon from 'Components/UIIcon'
import ResponsiveImage from 'frontend-ui/ResponsiveImage'

import './styles.css'

const ImageSlider = ({ images = [], className = '', autoplaySpeed = 5, loading }) => {
  const componentName = 'ImageSlider'
  const [activeSlide, setActiveSlide] = useState(0)

  const SliderArrow = props => {
    const { direction = 'prev', className = '', style, onClick } = props
    const icon = direction === 'prev' ? UIIcon.Icons.ChevronLeft : UIIcon.Icons.ChevronRight
    const text = direction === 'prev' ? 'Previous' : 'Next'

    return (
      <button
        className={cx(className, `${componentName}-arrow ${componentName}-arrow-${direction}`)}
        style={{ ...style }}
        onClick={onClick}
      >
        <UIIcon icon={icon} className={`${componentName}-arrow-icon`} />
        <span className={`${componentName}-arrow-text`}>{text}</span>
      </button>
    )
  }

  const SliderDots = props => {
    const { dots = null } = props

    return (
      <div className={`${componentName}-dots`}>
        <ol className={`${componentName}-dots-list`}>
          {dots.map((dot, i) => {
            const buttonProps = dot.props.children.props
            return (
              <li key={i} className={cx(`${componentName}-dot`, dot.props.className)}>
                <button key={i} className={`${componentName}-dot-button`} {...buttonProps}>
                  <span className={`${componentName}-dot-text`}>{i + 1}</span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    )
  }

  return (
    <div className={cx('ImageSlider', className)}>
      <Slider
        autoplaySpeed={autoplaySpeed * 1000}
        nextArrow={<SliderArrow direction="next" />}
        prevArrow={<SliderArrow direction="prev" />}
        beforeChange={(_, next) => setActiveSlide(next)}
        arrows
        dots
        appendDots={dots => <SliderDots dots={dots} />}
        autoplay
      >
        {images.map(({ src, alt = null, name = null, width = null, height = null }, i) => (
          <Slider.Slot key={i}>
            <div className={`${componentName}-slide`} hidden={activeSlide !== i ? true : undefined}>
              <ResponsiveImage
                className={`${componentName}-img`}
                src={src}
                alt={alt || name}
                width={width}
                height={height}
                // sizes="5em"
                loading={loading}
              />
            </div>
          </Slider.Slot>
        ))}
      </Slider>
    </div>
  )
}

export default ImageSlider
