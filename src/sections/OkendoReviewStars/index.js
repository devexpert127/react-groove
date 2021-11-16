import { useIntersection } from 'frontend-ui'
import React, { useEffect, useRef, useMemo } from 'react'
import './styles.css'

const OkendoReviewStars = ({ productId }) => {
  const starsRef = useRef(false)
  const uniqueId = useMemo(
    () =>
      Math.random()
        .toString(36)
        .substring(6),
    [],
  )

  const [visible] = useIntersection(starsRef)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.okendoInitApi && starsRef?.current && visible) {
      window.okendoInitApi.initStarRatingSummary(starsRef.current)
    }
  }, [visible])

  if (!productId) return null

  return (
    <div
      className="OkendoReviewStars"
      id={`oke-starSnippet-${uniqueId}`}
      data-oke-reviews-product-listing-rating
      data-oke-reviews-product-id={`shopify-${productId}`}
      ref={starsRef}
    ></div>
  )
}

export default OkendoReviewStars
