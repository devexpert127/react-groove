import React from 'react'
import cx from 'classnames'
import slugify from 'Components/Slugify'
import './styles.css'

const SvgImage = ({
  name = '',
  src = null,
  alt = null,
  className = ''
}) => {
  const componentName = 'SvgImage'
  if (src === null) return null
  return (
    <img
      className={
        cx(
          componentName,
          { [`${componentName}--${slugify(name)}`]: name },
          className
        )}
      {...{src, alt}}
    />
  )
}

export default SvgImage
