import React from 'react'
import cx from 'classnames'

import './styles.css'

const LoadingSpinner = ({ dark }) => {
  return (
    <div className="LoadingSpinner-container">
      <span className="LoadingSpinner-alt-text">Content loading</span>
      <div className={cx('LoadingSpinner-ring', { 'LoadingSpinner-ring--dark': dark })}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default LoadingSpinner
