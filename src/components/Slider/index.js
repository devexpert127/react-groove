import React, { useEffect, useMemo, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import cx from 'classnames'

import UIIcon from 'Components/UIIcon'

import './styles.css'

const Slider = React.forwardRef(
  (
    {
      children,
      className,
      currentIndex = 0,
      beforeChange = () => {},
      afterChange = () => {},
      PrevArrow = <SliderArrowPrev />,
      NextArrow = <SliderArrowNext />,
      arrows = false,
      autoplay = false,
      autoplaySpeed = 2000,
      responsive = [],
      dots = false,
      appendDots = dots => <ul>{dots}</ul>,
    },
    ref,
  ) => {
    const [activeIndex, setActiveIndex] = useState(currentIndex)
    const [settings, setSettings] = useState({ arrows, dots })
    const numItems = React.Children.count(children)

    const dotItems = useMemo(() => {
      const itemsArray = [...new Array(numItems)]

      return itemsArray.reduce((list, _, index) => {
        return [
          ...list,
          <li key={index} className={activeIndex === index ? 'active' : null}>
            <button onClick={() => updateIndex(index)}>{index}</button>
          </li>,
        ]
      }, [])
    }, [numItems, dots, activeIndex])

    const updateIndex = newIndex => {
      const prevIndex = activeIndex
      const nextIndex = newIndex

      beforeChange(prevIndex, nextIndex)

      if (newIndex < 0) {
        newIndex = numItems - 1
      } else if (newIndex >= numItems) {
        newIndex = 0
      }

      setActiveIndex(newIndex)
      afterChange(prevIndex, nextIndex)
    }

    const handlers = useSwipeable({
      onSwipedLeft: () => updateIndex(activeIndex + 1),
      onSwipedRight: () => updateIndex(activeIndex - 1),
    })

    useEffect(() => {
      if (typeof window === 'undefined') return
      if (responsive?.length === 0) return

      const listeners = []

      responsive.forEach(media => {
        function onWidthChange(event) {
          const lastSettings = settings

          if (event.matches) {
            setSettings(settings => ({ ...settings, ...media.settings }))
          } else {
            setSettings(lastSettings)
          }
        }

        const mq = window.matchMedia(`(min-width: ${media.breakpoint}px)`)
        listeners.push([mq, onWidthChange])
        mq.addListener(onWidthChange)
      })

      return () => listeners.forEach(([mq, onWidthChange]) => mq.removeListener(onWidthChange))
    }, [responsive])

    useEffect(() => {
      if (typeof window === 'undefined') return

      // updateSlide listener
      function updateSlide({ detail }) {
        updateIndex(detail.slideIndex)
      }

      if (ref?.current) ref.current.addEventListener('updateSlide', updateSlide)

      // autoplay
      let interval = null

      if (autoplay) {
        if (interval) clearInterval(interval)

        interval = setInterval(() => {
          updateIndex((activeIndex + 1) % numItems)
        }, autoplaySpeed)
      }

      return () => {
        if (ref?.current) ref.current.removeEventListener('updateSlide', updateSlide)

        if (interval) clearInterval(interval)
      }
    }, [autoplaySpeed, numItems, activeIndex])

    return (
      <div
        className={cx({
          Slider: true,
          [className]: !!className,
        })}
        {...handlers}
      >
        <div className="Slider__wrapper">
          <div
            className="Slider__container"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            ref={ref}
          >
            {React.Children.map(children, (child, index) => {
              return React.cloneElement(child, {
                'aria-hidden': activeIndex !== index,
                tabIndex: '-1',
              })
            })}
          </div>
        </div>
        {settings.arrows ? (
          <div>
            {renderArrow(PrevArrow, {
              onClick: () => updateIndex(activeIndex - 1),
              className: 'Slider__control Slider__control__prev',
            })}
            {renderArrow(NextArrow, {
              onClick: () => updateIndex(activeIndex + 1),
              className: 'Slider__control Slider__control__next',
            })}
          </div>
        ) : null}
        {settings.dots ? appendDots(dotItems) : null}
      </div>
    )
  },
)

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 600

function SliderSlot({ children, ...props }) {
  return (
    <div className="Slider__slot" {...props}>
      {children}
    </div>
  )
}

const getArrowProps = ({ active, parentRef, ...props }) =>
  isMobile()
    ? {
        'aria-hidden': !active,
        tabIndex: !active ? '-1' : '0',
        ref: parentRef,
        ...props,
      }
    : props

const renderArrow = (Component, props) =>
  React.cloneElement(Component, { ...Component.props, ...props })

function SliderArrowPrev(props) {
  const arrowProps = getArrowProps(props)

  return (
    <button {...arrowProps}>
      <UIIcon className="Slider__control__icon" icon={UIIcon.Icons.ChevronLeft} />
      <span className="Slider__control__text">Previous</span>
    </button>
  )
}

function SliderArrowNext(props) {
  const arrowProps = getArrowProps(props)

  return (
    <button {...arrowProps}>
      <UIIcon icon={UIIcon.Icons.ChevronRight} />
      <span className="Slider__control__text">Next</span>
    </button>
  )
}

Slider.displayName = 'Slider'
Slider.Slot = SliderSlot
Slider.Slot.displayName = 'SliderSlot'
Slider.ArrowPrev = SliderArrowPrev
Slider.ArrowNext = SliderArrowNext

export default Slider
