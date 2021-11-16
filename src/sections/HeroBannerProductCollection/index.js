import React from 'react'
import HeroBanner from 'Components/HeroBanner'

import './styles.css'

const BANNER_HEIGHT = 472
const BANNER_WIDTH = 1452

const HeroBannerProductCollection = ({ collection, hoverEffects }) => {
  const { name, image, hideMasterPageSections, showTitleOnHeroBanner } = collection || {}

  if (!image && !hideMasterPageSections) return null

  return (
    <HeroBanner
      image={image}
      title={name}
      contentHidden={!showTitleOnHeroBanner}
      hoverEffects={hoverEffects}
      height={BANNER_HEIGHT}
      width={BANNER_WIDTH}
    />
  )
}

export default HeroBannerProductCollection
