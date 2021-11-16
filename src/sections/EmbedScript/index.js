import React, { useRef, useEffect } from 'react'
import PageWidth from 'Components/PageWidth'

import './styles.css'

const EmbedScript = ({
  children,
  title,
  scriptSource,
  scriptAttrs,
  embedAttrs,
  nested,
  pageWidth,
}) => {
  const embedRef = useRef()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = scriptSource
    script.async = true

    for (const attr in scriptAttrs) {
      script.setAttribute(attr, scriptAttrs[attr])
    }

    embedRef.current.appendChild(script)

    return () => {
      if (embedRef.current) {
        embedRef.current.removeChild(script)
      }
    }
  }, [])

  const embed = (
    <React.Fragment>
      <div className="EmbedScript-content" ref={embedRef} {...embedAttrs}>
        {children}
      </div>
    </React.Fragment>
  )

  if (nested) {
    return <React.Fragment>{embed}</React.Fragment>
  } else {
    if (pageWidth) {
      return (
        <section className="EmbedScript">
          <PageWidth>
            {title && <h2 className="EmbedScript-title">{title}</h2>}
            {embed}
          </PageWidth>
        </section>
      )
    } else {
      return (
        <section className="EmbedScript">
          {title && <h2 className="EmbedScript-title">{title}</h2>}
          {embed}
        </section>
      )
    }
  }
}

export default EmbedScript
