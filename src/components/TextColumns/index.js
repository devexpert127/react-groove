import React from 'react'
import cx from 'classnames'
import ResponsiveImage from 'frontend-ui/ResponsiveImage'
import Video from 'frontend-ui/Video'
import SvgImage from 'Components/SvgImage'
import PageWidth from 'Components/PageWidth'

import './styles.css'

const IMAGE_SIZE = 200

const TextColumns = ({ title, blocks = [], mediaType, className }) => {
  const renderImage = block => {
    switch (mediaType) {
      case 'video':
        return (
          <Video
            autoPlay
            loop
            muted
            playsInline
            className="TextColumn-image TextColumn-image--video"
          >
            <source src={block.media.src} type="video/mp4" />
          </Video>
        )
      case 'icon':
        return <SvgImage {...block.media} className="TextColumn-image TextColumn-image--icon" />
      default:
        return (
          <ResponsiveImage
            src={block.media.src}
            alt={block.media.alt || block.title}
            sizes="(min-width: 960px) 25vw, 50vw"
            className="TextColumn-image"
            height={block.media.height || IMAGE_SIZE}
            width={block.media.width || IMAGE_SIZE}
          />
        )
    }
  }

  return (
    <section className={cx('TextColumns', className)}>
      <PageWidth>
        <h2 className="TextColumns-title">{title}</h2>

        <div className="TextColumns-container" data-banners={blocks.length}>
          {(blocks || []).map((block, i) => (
            <div className="TextColumn" key={i}>
              {block.media && renderImage(block)}
              {block.title && <h3 className="TextColumn-title">{block.title}</h3>}
              {block.description && (
                <p
                  className="TextColumn-description"
                  dangerouslySetInnerHTML={{ __html: block.description }}
                />
              )}
            </div>
          ))}
        </div>
      </PageWidth>
    </section>
  )
}

export default TextColumns
