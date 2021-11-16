import React from 'react'
import cx from 'classnames'

import './styles.css'

const PageWidth = ({ children, className, ...restProps }) => {
  return (
    <div {...restProps} className={cx('PageWidth', className)}>
      {children}
    </div>
  )
}

export default PageWidth
