import React from 'react'
import cx from 'classnames'
import PageWidth from 'Components/PageWidth'
import SvgImage from 'Components/SvgImage'

import './styles.css'

const ValueProps = ({
  shippingTimeframe,
  valuePropOneTitle,
  valuePropOneSubtitle,
  valuePropOneIcon,
  valuePropTwoTitle,
  valuePropTwoSubtitle,
  valuePropTwoIcon,
  valuePropThreeTitle,
  valuePropThreeSubtitle,
  valuePropThreeIcon,
  noTopPadding,
  noBottomPadding,
  productTags
}) => {

  // temp workaround pre-bulk updating in Shogun:
  // if we've defined a product on the ValueProps section, find applicable
  // shipping tags and reassign value of shippingTimeframe variable
  if (productTags && productTags !== undefined && productTags.length > 0) {
    for (let tag = 0; tag < productTags.length; tag++) {
      let tagDowncase = productTags[tag].toLowerCase()

      switch (tagDowncase) {
        case 'tag-ships-in-24':
          shippingTimeframe = '24 Hours'
          break
        case 'tag-ships-in-48':
          shippingTimeframe = '48 Hours'
          break
        case 'tag-ships-in-3to5':
          shippingTimeframe = '3-5 Days'
          break
        case 'tag-ships-in-4to7':
          shippingTimeframe = '4-7 Days'
          break
        case 'tag-ships-in-5to7':
          shippingTimeframe = '5-7 Days'
          break
        case 'tag-ships-in-7to10':
          shippingTimeframe = '7-10 Days'
          break
        case 'tag-ships-in-12to15':
          shippingTimeframe = '12-15 Days'
          break
      }
    }
  }

  // If we still have nothing for shippingTimeframe, default to 3-5 days
  if (!shippingTimeframe || shippingTimeframe === undefined) {
    shippingTimeframe = '3-5 Days'
  }

  valuePropOneSubtitle = valuePropOneSubtitle.replace('{shippingTimeframe}', shippingTimeframe)
  valuePropTwoSubtitle = valuePropTwoSubtitle.replace('{shippingTimeframe}', shippingTimeframe)
  valuePropThreeSubtitle = valuePropThreeSubtitle.replace('{shippingTimeframe}', shippingTimeframe)

  const valuePropOne = {
      title: valuePropOneTitle,
      subtitle: valuePropOneSubtitle,
      icon: valuePropOneIcon,
    },
    valuePropTwo = {
      title: valuePropTwoTitle,
      subtitle: valuePropTwoSubtitle,
      icon: valuePropTwoIcon,
    },
    valuePropThree = {
      title: valuePropThreeTitle,
      subtitle: valuePropThreeSubtitle,
      icon: valuePropThreeIcon,
    },
    props = []

  props.push(valuePropOne, valuePropTwo, valuePropThree)

  return (
    <section
      className={cx(
        'ValueProps',
        { ['ValueProps--noTopPadding']: !!noTopPadding },
        { ['ValueProps--noBottomPadding']: !!noBottomPadding },
      )}
    >
      <PageWidth>
        <div className="ValueProps-container">
          {props.map(({ icon = { icon: null, name: '' }, title, subtitle }, i) => (
            <div className="ValueProp" key={i}>
              {icon && icon.icon && (
                <div className="ValueProp-icon">
                  <SvgImage {...icon.icon} name={icon.name} />
                </div>
              )}
              <div className="ValueProp-text">
                {title && <h3 className="ValueProp-title">{title}</h3>}
                {subtitle && <p className="ValueProp-subtitle">{subtitle}</p>}
              </div>
            </div>
          ))}
        </div>
      </PageWidth>
    </section>
  )
}

export default ValueProps
