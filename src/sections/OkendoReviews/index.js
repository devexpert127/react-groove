import React, { useEffect, useRef, useState } from 'react'
import LoadingSpinner from 'Components/LoadingSpinner'
import PageWidth from 'Components/PageWidth'
import Modal from 'Components/Modal'

import './styles.css'

const subscriberId = 'ce368659-4a86-4ae4-b46b-b809043f8999'

const OkendoReviews = ({ product, collection, title = 'Reviews and ratings' }) => {
  /*
    Reviews widget can take:
    - product id for product reviews
    - collection id for reviews of all products in a collection
    - no id for reviews from the whole site
  */
  const productId = (!!product && !!product.externalId) ? product.externalId : false
  const collectionId = (!!collection && !!collection.externalId && !productId) ? collection.externalId : false
  const okeIdAttributes = {}
  if (!!productId) {
    okeIdAttributes['data-oke-reviews-product-id'] = `shopify-${productId}`
  }
  if (!!collectionId) {
    okeIdAttributes['data-oke-reviews-collection-id'] = `shopify-${collectionId}`
  }
  const reviewsHolderRef = useRef(false)
  const reviewsWidgetRef = useRef(false)
  const qandaWidgetRef = useRef(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [uniqueId,] = useState(Math.random().toString(36).substring(6))

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.okendoInitApi) {
        window.okendoInitApi.initWidgetHolder(reviewsHolderRef.current)
        window.okendoInitApi.initReviewsWidget(reviewsWidgetRef.current)
        window.okendoInitApi.initQandaWidget(qandaWidgetRef.current)
      }
    }
  }, [])

  return (
    <section className="OkendoReviews" id={`OkendoReviews-${uniqueId}`}>
      <PageWidth>
        <h2 className="OkendoReviews__title">{title}</h2>
        <div
          className="OkendoReviews__widget"
          data-oke-reviews-widget-holder
          {...okeIdAttributes}
          ref={reviewsHolderRef}
          >
            <div data-oke-reviews-nav-bar></div>
            {!!productId &&
              <div className="OkendoReviews__modal">
                <Modal buttonText="Write a review" buttonStyle={'primary'} onOpen={() => setModalOpen(true)}>
                  {!iframeLoaded &&
                    <LoadingSpinner dark={true} />
                  }
                  {modalOpen &&
                    <iframe src={`https://reviews.okendo.io/stores/${subscriberId}/review?productId=shopify-${productId}`} onLoad={() => setIframeLoaded(true)}></iframe>
                  }
                </Modal>
              </div>
            }
            <div data-oke-reviews-widget ref={reviewsWidgetRef}></div>
            <div data-oke-reviews-qanda ref={qandaWidgetRef}></div>
        </div>
      </PageWidth>
    </section>
  )
}

export default OkendoReviews
