import React from 'react'

const PlusMinus = () => (
  <React.Fragment>
    <svg
      className="Icon Icon--utility Icon--minus"
      aria-hidden="true"
      focusable="false"
      role="presentation"
      viewBox="0 0 298.667 298.667"
    >
      <rect y="128" width="298.667" height="42.667" />
    </svg>
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      className="Icon Icon--utility Icon--plus"
      viewBox="0 0 298.667 298.667"
    >
      <polygon points="170.667,128 170.667,0 128,0 128,128 0,128 0,170.667 128,170.667 128,298.667 170.667,298.667 170.667,170.667     298.667,170.667 298.667,128   " />
    </svg>
  </React.Fragment>
)

export default PlusMinus
