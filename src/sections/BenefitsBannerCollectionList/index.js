import React from 'react'
import BenefitsBanner from 'Components/BenefitsBanner'

import './styles.css'

/*
This is the wrapper for FeatureBlocks that draws from the Benefits and Benefit Images
content groups, which are linked to collection lists.
*/
const BenefitsBannerCollectionList = ({ collectionList, noTopPadding, noBottomPadding }) => {
  if (collectionList && collectionList !== undefined) {
    return (
      <BenefitsBanner
        benefits={collectionList.benefits}
        benefitImages={collectionList.benefitImages}
        noTopPadding={noTopPadding}
        noBottomPadding={noBottomPadding}
      />
    )
  } else {
    return null
  }
}

export default BenefitsBannerCollectionList
