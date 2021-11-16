import React, { createElement } from 'react'
import cx from 'classnames'
import Arrow from 'Components/IconArrow'
import Cart from 'Components/IconCart'
import ChevronLeft from 'Components/IconChevronLeft'
import ChevronRight from 'Components/IconChevronRight'
import Close from 'Components/IconClose'
import Facebook from 'Components/IconFacebook'
import FacebookF from 'Components/IconFacebookF'
import GooglePlus from 'Components/IconGooglePlus'
import Instagram from 'Components/IconInstagram'
import Info from 'Components/IconInfo'
import LinkedIn from 'Components/IconLinkedIn'
import Menu from 'Components/IconMenu'
import Minus from 'Components/IconMinus'
import Pinterest from 'Components/IconPinterest'
import Plus from 'Components/IconPlus'
import PlusMinus from 'Components/IconPlusMinus'
import Search from 'Components/IconSearch'
import Twitter from 'Components/IconTwitter'
import Youtube from 'Components/IconYoutube'
import './styles.css'

const UIIcon = props => {
  const {
    icon,
    className,
    isSpan = false,
    children = null,
    hideChildren = true,
    textPlacementLeft = false,
  } = props
  if (!icon) return null
  const { svg, name } = icon,
    IconSvg = () => svg(),
    componentName = 'Icon',
    textClass = `${componentName}-text`,
    textContent = children && (
      <span className={cx(textClass, { [`${textClass}--hidden`]: hideChildren })}>{children}</span>
    ),
    childContent = (
      <React.Fragment>
        {textPlacementLeft ? textContent : null}
        <IconSvg />
        {!textPlacementLeft ? textContent : null}
      </React.Fragment>
    )

  return createElement(
    isSpan ? 'span' : 'div',
    {
      className: cx(componentName, `${componentName}--${name}`, className),
    },
    childContent,
  )
}
UIIcon.Icons = {
  Arrow: {
    name: 'arrow',
    svg: Arrow,
  },
  Cart: {
    name: 'cart',
    svg: Cart,
  },
  ChevronLeft: {
    name: 'chevron-left',
    svg: ChevronLeft,
  },
  ChevronRight: {
    name: 'chevron-right',
    svg: ChevronRight,
  },
  Close: {
    name: 'close',
    svg: Close,
  },
  Facebook: {
    name: 'facebook',
    svg: Facebook,
  },
  FacebookF: {
    name: 'facebook-f',
    svg: FacebookF,
  },
  GooglePlus: {
    name: 'google-plus',
    svg: GooglePlus,
  },
  Info: {
    name: 'info',
    svg: Info,
  },
  Instagram: {
    name: 'instagram',
    svg: Instagram,
  },
  LinkedIn: {
    name: 'linkedin',
    svg: LinkedIn,
  },
  Menu: {
    name: 'menu',
    svg: Menu,
  },
  Minus: {
    name: 'minus',
    svg: Minus,
  },
  Pinterest: {
    name: 'pinterest',
    svg: Pinterest,
  },
  Plus: {
    name: 'plus',
    svg: Plus,
  },
  PlusMinus: {
    name: 'plus-minus',
    svg: PlusMinus,
  },
  Search: {
    name: 'search',
    svg: Search,
  },
  Twitter: {
    name: 'twitter',
    svg: Twitter,
  },
  Youtube: {
    name: 'youtube',
    svg: Youtube,
  },
}
UIIcon.defaultProps = {
  icon: null,
  className: '',
}

export default UIIcon
