import React from 'react'
import Link from 'frontend-link'
import PageWidth from 'Components/PageWidth'
import Button from 'Components/Button'
import SvgImage from 'Components/SvgImage'
import RichText from 'frontend-ui/RichText'

import './styles.css'

const SupportOptions = ({ options = [] }) => {
  if (options.length > 0) {
    return (
      <section className="SupportOptions">
        <PageWidth>
          <div className="SupportOptions-container" data-options={options.length}>
            {options.map(({ icon = { icon: null }, name: title = null, buttonLink = null, buttonText = null, description = null, }, i) => (
              <div className="SupportOption" key={i}>
                {icon.icon && (
                  <SvgImage {...icon.icon} className="SupportOption-icon" />
                )}
                {title && <h2 className="SupportOption-title">{title}</h2>}
                {description && (
                  <div className="SupportOption-description">
                    <RichText source={description} />
                  </div>
                )}
                {buttonText && buttonLink && (
                  <Button
                    className="SupportOption-button"
                    style="primary"
                    as={Link}
                    to={buttonLink}
                  >
                    {buttonText}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </PageWidth>
      </section>
    )
  }

  return null
}

export default SupportOptions
