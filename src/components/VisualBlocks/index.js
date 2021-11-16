import React from 'react'
import cx from 'classnames'
import PageWidth from 'Components/PageWidth'
import ResponsiveImage from 'frontend-ui/ResponsiveImage'
import Video from 'frontend-ui/Video'

import './styles.css'

const VisualBlocks = ({ blocks = [], superimposeText, mediaType }) => {
  const renderImage = block => {
    switch (mediaType) {
      case 'video':
        return (
          <Video className="VisualBlock-visual" muted autoPlay loop playsInline>
            <source src={block.media.src} type="video/mp4" />
          </Video>
        )
      default:
        return (
          <ResponsiveImage
            className="VisualBlock-visual"
            src={block.media.src}
            alt={block.name}
            sizes="(min-width: 960px) 30vw, 100vw"
          />
        )
    }
  }

  return (
    <section className={cx('VisualBlocks', { ['VisualBlocks-superimposeText']: superimposeText })}>
      <PageWidth>
        <div className="VisualBlocks-container" data-blocks={blocks.length}>
          {blocks.length > 0 &&
            blocks.map((block, i) => (
              <div className="VisualBlock" key={i}>
                {block.media && renderImage(block)}
                <div className="VisualBlock-textContainer">
                  <div className="VisualBlock-text">
                    {block.name && <h3 className="VisualBlock-title">{block.name}</h3>}
                    {block.description && (
                      <p className="VisualBlock-description">{block.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </PageWidth>
    </section>
  )
}

export default VisualBlocks
