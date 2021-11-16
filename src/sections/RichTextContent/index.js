import React from 'react'
import cx from 'classnames'
import Link from 'frontend-link'
import ResponsiveImage from 'frontend-ui/ResponsiveImage'
import RichText from 'frontend-ui/RichText'
import PageWidth from 'Components/PageWidth'
import Button from 'Components/Button'

import './styles.css'

const RichTextContent = ({
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
}) => {
  const richTextAlignment = !!textAlign
      ? `RichText--align-${textAlign.value}`
      : 'RichText--align-left',
    buttonStyle = !!buttonStyleDefault ? 'default' : 'primary'

  return (
    <section
      className={cx(
        'RichTextContent',
        { ['RichTextContent--dark']: !!styleDark },
        { ['RichTextContent--grey']: !!styleGrey },
        { ['RichTextContent--cutaway']: !!styleCutaway },
        { ['RichTextContent--noTopPadding']: !!noTopPadding },
        { ['RichTextContent--noBottomPadding']: !!noBottomPadding },
        { ['RichTextContent--restrictImageWidths']: !!restrictImageWidths },
        richTextAlignment,
      )}
    >
      <PageWidth>
        <div className="RichTextContent-content">
          {image && (
            <ResponsiveImage
              className="RichTextContent-image"
              sizes="200px"
              width="200"
              height="200"
              src={image.src}
              alt={image.alt || ''}
            />
          )}

          <div className={cx({ ['RichTextContent-content--reading-length']: !!readingLength })}>
            <RichText source={content} />
          </div>
          {buttonLink && buttonText && (
            <Button style={buttonStyle} as={Link} to={buttonLink}>
              {buttonText}
            </Button>
          )}
        </div>
      </PageWidth>
    </section>
  )
}

export default RichTextContent
