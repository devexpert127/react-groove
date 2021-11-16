import React from 'react'
import BenefitsBanner from 'Components/BenefitsBanner'

import './styles.css'

/*
This is the wrapper for FeatureBlocks that draws from the Benefits and Benefit Images
content groups, which are linked to collections. If used on a product page, map to the
benefits and benefitImages in the typeCollection field on the current product's content
group. If used on a collection page, map directly to the current collection's benefits
and benefitImages.
*/
const BenefitsBannerProductCollection = ({ collection, noTopPadding, noBottomPadding }) => {
  if (
    collection &&
    typeof collection !== 'undefined' &&
    (typeof collection.hideMasterPageSections === 'undefined' || !collection.hideMasterPageSections)
  ) {
    return (
      <BenefitsBanner
        benefits={collection.benefits}
        benefitImages={collection.benefitImages}
        noTopPadding={noTopPadding}
        noBottomPadding={noBottomPadding}
      />
    )
  }
  return null
}

export default BenefitsBannerProductCollection
