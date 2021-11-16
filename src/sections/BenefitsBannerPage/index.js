import React from 'react'
import BenefitsBanner from 'Components/BenefitsBanner'

import './styles.css'

/*
This is the flat structure customizable wrapper for FeatureBlocks, designed
as a workaround for Blocks in Frontend. These parameters map to variables with
individual fields so that a banner can be built on the fly if needed.
*/
const BenefitsBannerPage = ({
  benefitImages,
  benefitOne,
  benefitTwo,
  benefitThree,
  benefitFour,
  noTopPadding,
  noBottomPadding,
}) => {
  const benefits = []

  benefits.push(benefitOne, benefitTwo, benefitThree, benefitFour)

  if (benefits && benefits !== undefined && benefits.length > 0) {
    return (
      <BenefitsBanner
        benefits={benefits}
        benefitImages={benefitImages}
        noTopPadding={noTopPadding}
        noBottomPadding={noBottomPadding}
      />
    )
  } else {
    return null
  }
}

export default BenefitsBannerPage
