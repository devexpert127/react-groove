import React from 'react'
import cx from 'classnames'
import BackgroundImage from 'Components/BackgroundImage'
import SvgImage from 'Components/SvgImage'

import './styles.css'

const BenefitsBanner = ({ benefits, benefitImages, noTopPadding, noBottomPadding }) => {
  if (
    benefits &&
    benefits !== undefined &&
    benefits.length > 0 &&
    benefitImages &&
    benefitImages.desktopImage &&
    benefitImages.desktopImage !== undefined
  ) {
    return (
      <section
        className={cx(
          'BenefitsBanner',
          { ['BenefitsBanner--noTopPadding']: !!noTopPadding },
          { ['BenefitsBanner--noBottomPadding']: !!noBottomPadding },
          {
            ['BenefitsBanner--hide-mobile']:
              !benefitImages.mobileImageOne ||
              benefitImages.mobileImageOne === undefined ||
              !benefitImages.mobileImageTwo ||
              benefitImages.mobileImageTwo === undefined,
          },
        )}
      >
        <div className="BenefitsBanner-block">
          <BackgroundImage
            className="BackgroundImage--desktop"
            imageSrc={benefitImages.desktopImage.src}
            imgRatio={{ large: '16x9' }}
          />
          {benefitImages.mobileImageOne &&
            benefitImages.mobileImageOne !== undefined &&
            benefitImages.mobileImageTwo &&
            benefitImages.mobileImageTwo !== undefined && (
              <React.Fragment>
                <BackgroundImage
                  className="BackgroundImage--mobile"
                  imageSrc={benefitImages.mobileImageOne.src}
                  imgRatio={{ large: '150', medium: '1x1', small: '150' }}
                />
                <BackgroundImage
                  className="BackgroundImage--mobile"
                  imageSrc={benefitImages.mobileImageTwo.src}
                  imgRatio={{ large: '150', medium: '1x1', small: '150' }}
                />
              </React.Fragment>
            )}
          {benefits.length > 0 && (
            <div
              className={cx('BenefitsBanner-content', {
                ['BenefitsBanner--content--hidden']: !!benefitImages.imageHasText,
              })}
            >
              {benefits.map(({ icon = { icon: null }, name: title = null, description = null }, i) => (
                <div className="BenefitsBanner-benefit" key={i}>
                  {icon.icon && (
                      <SvgImage className="BenefitsBanner-benefitIcon" {...icon.icon} />
                    )}
                  {title && (
                      <h2 className="BenefitsBanner-benefitTitle">{title}</h2>
                    )}
                  {description && (
                      <p className="BenefitsBanner-benefitDescription">{description}</p>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  } else {
    return null
  }
}

export default BenefitsBanner
