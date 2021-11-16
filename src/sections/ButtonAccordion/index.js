import React from 'react'
import Accordion from 'Components/Accordion'
import PageWidth from 'Components/PageWidth'
import UIIcon from 'Components/UIIcon'
import RichText from 'frontend-ui/RichText'
import './styles.css'

const ButtonAccordion = ({ buttonColor = '#000', items = [], title = null }) => {
  const contents = items.map((item, i) => ({
    name: item.name,
    content: <RichText source={item.content} />,
  }))

  return (
    <section className="ButtonAccordion" style={{ '--accordion-color': buttonColor }}>
      <PageWidth>
        {title && <h2>{title}</h2>}
        <Accordion items={contents} icon={UIIcon.Icons.PlusMinus} style="button" />
      </PageWidth>
    </section>
  )
}

export default ButtonAccordion
