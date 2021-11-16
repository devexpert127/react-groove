import React, { useEffect, useState } from 'react'
import useStore from 'frontend-store'
import smoothscroll from "smoothscroll-polyfill";
import StarRating from 'Components/StarRating'

import './styles.css'

const getAPIUrl = ({ subscriberId, productId }) =>
  `https://api.okendo.io/v1/stores/${subscriberId}/products/shopify-${productId}/review_aggregate`

const SCROLL_TIME = 1000
const HEADER_SIZE = 190

const reviewLevels = [3, 4, 5]

export async function fetchReviewStats({ subscriberId, productId }) {
  try {
    const res = await fetch(getAPIUrl({ subscriberId, productId }))

    if (!res.ok) throw res

    const {
      reviewAggregate: { reviewCount, ratingAndReviewCountByLevel },
    } = await res.json()

    return {
      error: false,
      count: reviewCount,
      rating: reviewLevels
        .filter(level => !!ratingAndReviewCountByLevel[`level${level}Count`])
        .map(level => (ratingAndReviewCountByLevel[`level${level}Count`] * level) / reviewCount)
        .reduce((avg, x) => {
          return avg + x
        }, 0),
    }
  } catch (e) {
    return { error: true, count: 0, rating: 0 }
  }
}

const OkendoStarRating = ({ subscriberId = '9a389bb7-f28c-4b43-990a-7ec42d72623b', productId }) => {
  const [store, setStore] = useStore()
  const [isMobileAppleDevice, setIsMobileAppleDevice] = useState(false)

  const scrollToReviewsSection = () => {
    if (isMobileAppleDevice) {
      document && document.querySelector('.OkendoReviews').scrollIntoView({
        behavior: "smooth"
      })
    } else {
      let currentTime = 0
      const element = document.querySelector('.OkendoReviews')

      if (!element) return

      const { top } = element.getBoundingClientRect()
      const elementTop = top - HEADER_SIZE

      while (currentTime <= SCROLL_TIME) {
        setTimeout(() => window.scrollBy(0, elementTop / 100), currentTime)
        currentTime += SCROLL_TIME / 100;
      }
    }
  }

  useEffect(() => {
    fetchReviewStats({ subscriberId, productId }).then(data => setStore({ okendoReviews: data }))

    return () => setStore({ okendoReviews: null })
  }, [])

  useEffect(() => {
    const ios = ['iPad', 'iPhone', 'iPod'].includes(navigator.platform) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    setIsMobileAppleDevice(ios)

    isMobileAppleDevice && smoothscroll.polyfill();
  })

  switch (true) {
    case store.okendoReviews === null:
    case (store.okendoReviews || {}).error:
    case (store.okendoReviews || {}).count < 3:
      return <div className="OkendoStarRating-empty" />
    default: {
      const { count, rating } = store.okendoReviews || {}
      return (
        <div className="OkendoStarRating">
          {count && typeof rating === 'number' &&
            <button
              className="OkendoStarRating-button"
              onClick={scrollToReviewsSection}
              aria-label={`Rated ${rating.toFixed(1)} out of 5 stars. Read reviews`}
            >
              <StarRating rate={rating} />
              <p className="OkendoStarRating-count">{count} Reviews</p>
              <span className="OkendoStarRating-a11yText">Click to go to reviews</span>
            </button>
          }
        </div>
      )
    }
  }
}

export default OkendoStarRating
