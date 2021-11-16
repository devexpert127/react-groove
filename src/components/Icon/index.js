import React from 'react'
import cx from 'classnames'
import slugify from 'Components/Slugify'

import './styles.css'

const Icon = ({ icon, className }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: (icon || []).svg }}
      className={cx('Icon Icon--' + slugify((icon || []).name), className)}
    />
  )
}

export default Icon
