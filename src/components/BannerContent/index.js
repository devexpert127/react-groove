import React from 'react'
import cx from 'classnames'
import Button from 'Components/Button'
import PageWidth from 'Components/PageWidth'

import './styles.css'

const BannerContent = ({
  children = null,
  supertitle = null,
  title = null,
  subtitle = null,
  link,
  buttonText = null,
  textAlignment = null,
  textPosition = { name: 'Center Center', value: 'center-center' },
  className = '',
  buttonStyleDefault = false,
  pageWidth = false,
  maxWidth = false,
  hidden = false,
}) => {
  if (!children && !(supertitle || title || subtitle || buttonText)) return null

  const componentName = 'Banner-content'

  let contentTextPosition = 'center-center'
  if (textPosition && textPosition.value) {
    contentTextPosition = textPosition.value
  }

  let contentTextAlignment = ''
  if (textAlignment && textAlignment.value) {
    contentTextAlignment = textAlignment.value
  }
  // const { value: contentTextAlignment } = textAlignment
  // const { value: contentTextPosition } = textPosition

  const positionClassName = `${componentName}--${contentTextPosition}`,
    alignmentClassName =
      contentTextAlignment === '' ? `${componentName}--${contentTextAlignment}` : '',
    contentMaxWidthClass = `${componentName}--maxWidth`,
    contentHiddenClass = `${componentName}--hidden`

  let childrenContent = children || (
    <React.Fragment>
      <h1 className={`${componentName}-title`}>
        {supertitle && <span className={`${componentName}-suptitle`}>{supertitle}</span>}
        {title}
      </h1>
      {subtitle && <h2 className={`${componentName}-subtitle`}>{subtitle}</h2>}
      {link && buttonText && (
        <Button style={buttonStyleDefault ? 'default' : 'primary'} as="button" to={link}>
          {buttonText}
        </Button>
      )}
    </React.Fragment>
  )
  if (pageWidth) {
    childrenContent = <PageWidth>{childrenContent}</PageWidth>
  }
  return (
    <div
      className={cx(
        cx(
          componentName,
          positionClassName,
          { [alignmentClassName]: textAlignment && contentTextAlignment !== '' },
          { [contentMaxWidthClass]: maxWidth },
          { [contentHiddenClass]: hidden },
          className,
        ),
      )}
    >
      {childrenContent}
    </div>
  )
}

export default BannerContent
