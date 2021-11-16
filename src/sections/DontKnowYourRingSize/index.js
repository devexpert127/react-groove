import React from 'react'
import cx from 'classnames'
import RichTextContent from 'Components/RichTextContent'
import { hideRingSizingOptions } from 'Components/ProductShared'

import './styles.css'

const DontKnowYourRingSize = ({
  content,
  buttonText,
  buttonLink,
  image,
  textAlign,
  readingLength,
  styleDark,
  styleGrey,
  styleCutaway,
  buttonStyleDefault,
  noTopPadding,
  noBottomPadding,
  restrictImageWidths = false,
  product
}) => {
  if (!!product && !hideRingSizingOptions(product)) {
    return (
      <RichTextContent
        content={content}
        buttonText={buttonText}
        buttonLink={buttonLink}
        image={image}
        textAlign={textAlign}
        readingLength={readingLength}
        styleDark={styleDark}
        styleGrey={styleGrey}
        styleCutaway={styleCutaway}
        buttonStyleDefault={buttonStyleDefault}
        noTopPadding={noTopPadding}
        noBottomPadding={noBottomPadding}
        restrictImageWidths={restrictImageWidths}
      />
    )
  }

  return null
}

export default DontKnowYourRingSize
