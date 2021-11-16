import React from 'react'
import cx from 'classnames'
import Link from 'frontend-link'
import PageWidth from 'Components/PageWidth'
import BannerContent from 'Components/BannerContent'

import './styles.css'

const stripHTMLFromTitle = (str) => str.replace(/(<([^>]+)>)/gi, "")

const BannerBase = ({
    className = '',
    foreground = null,
    background = null,
    textAlignment = null,
    textPosition = { name: "Center Center", value: 'center-center'},
    link = null,
    linkTitleText = null,
    pageWidth = false,
  }) => {
  if (!foreground && !background) return null
  const componentName = 'Banner',
  backgroundClassName = `${componentName}-bg`;
  let content = (
    <React.Fragment>
      {(foreground) ?
        React.cloneElement(
          foreground,
          {
            className: cx(
              {[ backgroundClassName ]: !!foreground },
              foreground.props && foreground.props.className ? foreground.props.className : '',
            ),
            textAlignment: textAlignment,
            textPosition: textPosition,
          },
      ) : null}
      {background &&
        React.cloneElement(
          background,
          {
            className: cx(
              {[ backgroundClassName ]: !!foreground },
              background.props && background.props.className ? background.props.className : ''
            )
          },
      )}
    </React.Fragment>
  )

  // if link then wrap in Link
  if (!!link) {
    content = (
      <Link
        className={`${componentName}-link`}
        to={link}
        title={stripHTMLFromTitle(linkTitleText)}
      >
        {content}
      </Link>
    )
  }

  // pageWidth then wrap in PageWdith
  if (pageWidth) {
    content = (
      <PageWidth>
        {content}
      </PageWidth>
    )
  }

  return (
    <section className={cx(
      className,
      componentName,
    )}>
      {content}
    </section>
  )
}

export default BannerBase
