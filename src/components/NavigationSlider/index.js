import React from 'react'
import Link from 'frontend-link'
import ResponsiveImage from 'frontend-ui/ResponsiveImage'

import './styles.css'

const IMAGE_WIDTH = 180
const IMAGE_HEIGHT = 216
const NUMBER_OF_IMAGES_TO_EAGER_LOAD = 12

const NavigationSlider = ({ menu }) => {
  const { navigationLinks = [] } = menu || {}

  return (
    <nav className="NavigationSlider">
      {navigationLinks.length && (
        <ul className="NavigationSlider-list">
          {navigationLinks.map(({ image = [], link, title, accessibleTitle }, i) => (
            <li className="NavigationSlider-item" key={i}>
              <Link to={link} className="NavigationSlider-item-link" target="_self">
                {image.src && (
                  <ResponsiveImage
                    className="NavigationSlider-item-image"
                    src={image.src}
                    alt={image.alt || title}
                    width={image.width || IMAGE_WIDTH}
                    height={image.height || IMAGE_HEIGHT}
                    sizes="5em"
                    loading={i > NUMBER_OF_IMAGES_TO_EAGER_LOAD ? 'lazy-polyfill' : 'eager'}
                  />
                )}
                <span
                  className="NavigationSlider-item-title"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
                {!!accessibleTitle && (
                  <span className="NavigationSlider-item-accessibleTitle">, {accessibleTitle}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default NavigationSlider
