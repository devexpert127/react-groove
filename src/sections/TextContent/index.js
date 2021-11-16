import React from 'react'
import cx from 'classnames'
import RichText from 'frontend-ui/RichText'
import PageWidth from 'Components/PageWidth'

import './styles.css'

const TextContent = ({
  title,
  content,
  textAlign,
  pageWidth = true,
  readingLength = false,
  className,
}) => {
  const textAlignment = !!textAlign
    ? `TextContent--align-${textAlign.value}`
    : 'RichText--align-left'

  const Content = () => {
    return (
      <div className={cx({ ['TextContent--reading-length']: !!readingLength }, textAlignment)}>
        <h2 className="TextContent-title">{title}</h2>
        {(() => {
          if (typeof content === 'object') {
            return <RichText source={content} />
          } else {
            return <div dangerouslySetInnerHTML={{ __html: content }} />
          }
        })()}
      </div>
    )
  }

  return (
    <section className={cx('TextContent', className)}>
      {(() => {
        if (pageWidth) {
          return (
            <PageWidth>
              <Content />
            </PageWidth>
          )
        } else {
          return <Content />
        }
      })()}
    </section>
  )
}

export default TextContent
