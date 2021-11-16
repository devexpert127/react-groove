import React, { useEffect, useRef, useState } from 'react'
import PageWidth from 'Components/PageWidth'
import './styles.css'

const WarrantyRegistration = ({
  documentDomain,
  iframeInitialHeight = '720px',
  iframeSrc = 'https://groovelife.com/apps/product-registration',
  iframeTitle = 'Warranty Registration'
}) => {
  const [height, setHeight] = useState(iframeInitialHeight)

  const iframeRef = useRef(null)

  useEffect(() => {
    if (isBrowser) {
      // Both the embedded document and the embedding document must have the same
      // document.domain to share resources via the same-origin policy. Set the
      // same in the embedded document (e.g. 'groovelife.com') and ensure it is
      // set before the iframe load event fires.
      if (documentDomain) {
        document.domain = documentDomain
      }

      iframeRef.current.addEventListener('load', () => {
        setHeight(getHeight(iframeRef.current))

        // Catch DOM changes such as form validation errors.
        const observer = new ResizeObserver(() => {
          setHeight(getHeight(iframeRef.current))
        })
        observer.observe(iframeRef.current.contentWindow.document.body)
      })
    }
  }, [])

  return (
    <section className="WarrantyRegistration">
      <PageWidth>
        <iframe height={height} ref={iframeRef} src={iframeSrc} title={iframeTitle} />
      </PageWidth>
    </section>
  )
}

function getHeight(iframe) {
  const height = iframe.contentWindow.document.body.scrollHeight

  return `${height}px`
}

const isBrowser = typeof document !== 'undefined'

export default WarrantyRegistration
