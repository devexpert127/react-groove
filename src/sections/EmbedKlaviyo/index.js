import React, { useEffect } from 'react'
import PageWidth from 'Components/PageWidth'

import './styles.css'

const EmbedKlaviyo = ({ title, embed, pageWidth }) => {
  useEffect(() => {
    const klaviyoScript = document.createElement('script')
    klaviyoScript.src = 'https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=MZ4zYi'
    klaviyoScript.async = true
    klaviyoScript.type = 'text/javascript'

    document.head.append(klaviyoScript)
  }, [])

  const content = (
    <div className="EmbedKlaviyo-content">
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: embed }} />
    </div>
  )

  return (
    <section className="EmbedKlaviyo">
      {pageWidth ? <PageWidth>{content}</PageWidth> : content}
    </section>
  )
}

export default EmbedKlaviyo
