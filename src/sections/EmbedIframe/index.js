import React from 'react'
import cx from 'classnames'
import PageWidth from 'Components/PageWidth'

import './styles.css'

const EmbedIframe = ({ title, embed, pageWidth }) => {
  const content = (
    <React.Fragment>
      <h4 className="EmbedIframe-title">{title}</h4>
      <div className="EmbedIframe-content" dangerouslySetInnerHTML={{ __html: embed }} />
    </React.Fragment>
  )

  if (pageWidth) {
    return (
      <section className="EmbedIframe">
        <PageWidth>{content}</PageWidth>
      </section>
    )
  }

  return <section className="EmbedIframe">{content}</section>
}

export default EmbedIframe
