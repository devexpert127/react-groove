import React, { useEffect, useRef } from 'react'
import ShowcaseGallery from 'Components/ShowcaseGallery'

const ShowcaseGalleryProduct = ({ galleryId, product, filterByProduct, pageWidth, paddingTop, paddingBottom }) => {
  if (!product) return null

  const productGalleryId = (!!product && !!product.typeCollection && !!product.typeCollection.showcaseGalleryId) ? product.typeCollection.showcaseGalleryId : galleryId

  return (
    <ShowcaseGallery
      galleryId={productGalleryId}
      productId={product.externalId}
      filterByProduct={filterByProduct}
      pageWidth={pageWidth}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
    />
  )
}

export default ShowcaseGalleryProduct
