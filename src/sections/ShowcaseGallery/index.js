import React, { useEffect, useRef } from 'react'
import PageWidth from 'Components/PageWidth'
import cx from 'classnames'

import './styles.css'

const ShowcaseGallery = ({ galleryId, productId, filterByProduct, pageWidth, paddingTop, paddingBottom }) => {
  if (!galleryId) return null

  const galleryRef = useRef()

  /*
    The showcase gallery will only initialize itself once the CSS is loaded.
    We need to remove the CSS durring clean up so it will reinitialize the gallery.
  */
  const removeStylesheet = (galleryId) => {
    const assets = document.querySelectorAll(`[href*="${galleryId}"]`)
    assets.forEach((ele) => {
      ele.parentNode.removeChild(ele)
    })
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://showcase.abovemarket.com/embed/gallery/${galleryId}`
    script.async = true
    script.dataset.galleryId = galleryId

    if (filterByProduct && !!productId) {
      script.dataset.productId = productId
    }

    galleryRef.current.appendChild(script)

    return () => {
      if (galleryRef.current) {
        galleryRef.current.removeChild(script)
        removeStylesheet(galleryId)
      }
    }
  })

  const content = (!!pageWidth) ? (
    <PageWidth>
      <div ref={galleryRef} />
    </PageWidth>
  ) : (
    <div ref={galleryRef} />
  )

  return (
    <section className={cx('ShowcaseGallery', { ['ShowcaseGallery--padding-top']: !!paddingTop }, { ['ShowcaseGallery--padding-bottom']: !!paddingBottom })}>
      {content}
    </section>
  )
}

export default ShowcaseGallery
