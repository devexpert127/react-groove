import React from 'react'
import cx from 'classnames'
import ResponsiveBackgroundImage from 'frontend-ui/ResponsiveBackgroundImage'
import getResponsiveImageSrc from 'frontend-ui/getResponsiveImageSrc'
import './styles.css'

const BackgroundImage = ({
  children,
  imageSrc,
  mobileImageSrc,
  className,
  imgRatio,
  widths: [smWidth, mdWidth, lgWidth, xlWidth] = [600, 1200, 1600, 2048],
  loading = 'lazy',
}) => {
  // --------
  //  image heights, sizes and ratios
  // --------
  const imgRatioSmall = imgRatio ? imgRatio.small : false
  const imgRatioMedium = imgRatio ? imgRatio.medium : false
  const imgRatioLarge = imgRatio ? imgRatio.large : false
  const bannerRatios = {
    '150': 150,
    '1x1': 100,
    '25x23': 92.857,
    '5x4': 80,
    '4x3': 75,
    '16x9': 56.25,
    '2x1': 50,
    '3x1': 33.333,
  }
  const calcHeight = (width, ratio) => Math.round(width / parseFloat(ratio / 100))
  // --------
  // image sources
  // --------
  const desktopImageSource = imageSrc
  const mobileImageSource = mobileImageSrc || imageSrc
  const defaultImageSource =
    mobileImageSource === desktopImageSource
      ? getResponsiveImageSrc(mobileImageSource, {
          height: String(calcHeight(smWidth, bannerRatios[imgRatioSmall])),
        })
      : getResponsiveImageSrc(mobileImageSource, { width: 600 })
  // --------
  if (imageSrc && imageSrc !== undefined) {
    return (
      <div
        className={cx(
          'BackgroundImage',
          { [`BackgroundImage--${imgRatioLarge}`]: !!imgRatioLarge },
          { [`BackgroundImage--${imgRatioMedium}-md`]: !!imgRatioMedium },
          { [`BackgroundImage--${imgRatioSmall}-sm`]: !!imgRatioSmall },
          className,
        )}
      >
        <ResponsiveBackgroundImage
          srcs={{
            default: defaultImageSource,
            '(min-width: 600px)': getResponsiveImageSrc(desktopImageSource, {
              width: String(mdWidth),
            }),
            '(min-width: 1200px)': getResponsiveImageSrc(desktopImageSource, {
              width: String(lgWidth),
            }),
            '(min-width: 1600px)': getResponsiveImageSrc(desktopImageSource, {
              width: String(xlWidth),
            }),
          }}
          alt={imageSrc.alt}
          className="BackgroundImage--img"
          loading={loading}
        />
        {children}
      </div>
    )
  } else {
    return null
  }
}

export default BackgroundImage
