import React from 'react'
import cx from 'classnames'
import Link from 'frontend-link'

import './styles.css'

const Button = ({ children, as = Link, style, className, onClick, parentRef, ...restProps }) => {
  const Component = as
  const rawString = typeof children === 'string' // accepts raw HTML content

  if (rawString) {
    restProps.dangerouslySetInnerHTML = {
      __html: children,
    }
  }

  return (
    <Component
      className={cx('Button', className, { [`Button--${style}`]: !!style })}
      onClick={onClick}
      ref={parentRef}
      {...restProps}
    >
      {rawString ? null : children}
    </Component>
  )
}

export default Button
