import React from 'react'
import cx from 'classnames'
import TextContent from 'Components/TextContent'

import './styles.css'

const ProductDescription = ({ title, content }) => {
  return (
    <TextContent
      title={title}
      content={content}
      textAlign={{ name: 'Center', value: 'center' }}
      className="ProductDescription"
    />
  )
}

export default ProductDescription
