import React from 'react'
import Link from 'frontend-link'
import PageWidth from 'Components/PageWidth'
import Button from 'Components/Button'
import SvgImage from 'Components/SvgImage'
import ArticleVideo from 'Components/ArticleVideo'
import RichText from 'frontend-ui/RichText'
import './styles.css'

const RingSizingOptions = ({ title, options = [], modalButtonText = '', video = null }) => {
  if (options.length === 0) return null
  
  return (
    <React.Fragment>
      <section className="RingSizingOptions">
        <PageWidth>
          {title && <h4 className="RingSizingOptions-title">{title}</h4>}
          <div className="RingSizingOptions-container" data-options={options.length}>
            {options.map(({ name, description, icon = { icon: null }, buttonLink, buttonText }, i) => {
              return (
                  <div className="RingSizingOption" key={i}>
                    {name && <h5 className="RingSizingOption-title">{name}</h5>}
                    {buttonLink && icon.icon && (
                      <Link to={buttonLink}>
                          <SvgImage {...icon.icon} className="RingSizingOption-icon" />
                      </Link>
                    )}
                    {!buttonLink && icon.icon && (
                        <SvgImage {...icon.icon} className="RingSizingOption-icon" />
                    )}
                    {buttonText && buttonLink && (
                      <Button
                        className="RingSizingOption-button"
                        style="primary"
                        as={Link}
                        to={buttonLink}
                      >
                        {buttonText}
                      </Button>
                    )}
                    {description && (
                      <div className="RingSizingOption-description">
                        <RichText source={description} />
                      </div>
                    )}
                    {i !== options.length + 1 ? <p className="RingSizingOption__or">or</p> : null}
                  </div>
                )
              })
            }
          </div>
        </PageWidth>
      </section>
      {video && <ArticleVideo video={video} pageWidth={false} />}
    </React.Fragment>
  )
}

export default RingSizingOptions
