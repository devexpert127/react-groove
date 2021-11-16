import React from 'react'
import WhyGrooveLife from 'Components/WhyGrooveLife'
import './styles.css'

/*
  Wrapper component for TextColumns
*/

const WhyGrooveLifeProduct = ({ title, typeCollection, hideMasterPageSection }) => {
  if (!typeCollection || !typeCollection.whyGrooveLife || !typeCollection.whyGrooveLife.length)
    return null

  return (
    <WhyGrooveLife
      title={title}
      benefits={typeCollection.whyGrooveLife}
      hideMasterPageSection={hideMasterPageSection}
    />
  )
}

export default WhyGrooveLifeProduct
