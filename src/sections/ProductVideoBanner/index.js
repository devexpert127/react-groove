import React from 'react'
import VideoBannerVimeo from 'Components/VideoBannerVimeo'
import './styles.css'

const ProductVideoBanner = ({ typeCollection }) => {
  if (
    typeCollection &&
    typeCollection.productVideoId &&
    typeCollection.productVideoId !== 'Product Video ID'
  ) {
    return <VideoBannerVimeo videoId={typeCollection.productVideoId} />
  }
  return null
}

export default ProductVideoBanner
