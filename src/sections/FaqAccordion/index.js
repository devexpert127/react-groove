import React from 'react'
import cx from 'classnames'
import Accordion from 'Components/Accordion'
import PageWidth from 'Components/PageWidth'
import RichText from 'frontend-ui/RichText'
import UIIcon from 'Components/UIIcon'
import './styles.css'

const FaqAccordion = ({ items = [], title = null, noTopPadding, noBottomPadding }) => {
  const contents = items.map((item, i) => ({
    name: item.name,
    content: <RichText source={item.content} />,
  }))


  return (
    <section
      className={cx(
        'FaqAccordion',
        { ['FaqAccordion--noTopPadding']: !!noTopPadding },
        { ['FaqAccordion--noBottomPadding']: !!noBottomPadding },
      )}
    >
      <PageWidth>
        {title && <h2>{title}</h2>}
        <Accordion items={contents} icon={UIIcon.Icons.PlusMinus} />
      </PageWidth>
    </section>
  )
}

export default FaqAccordion
