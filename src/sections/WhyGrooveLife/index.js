import React from 'react'
import TextColumns from 'Components/TextColumns'
import './styles.css'

/*
  Wrapper component for TextColumns
*/

const WhyGrooveLife = ({ title, benefits, hideMasterPageSection }) => {
  if (typeof hideMasterPageSection !== 'undefined' && !!hideMasterPageSection) return null
  if (!benefits || !benefits.length) return null

  const blocks = benefits.map(({ name = null, icon = { icon: null }, description }) => {
    return {
      title: name,
      media: icon.icon,
      description: description,
    }
  })

  return <TextColumns title={title} blocks={blocks} mediaType="icon" className="WhyGrooveLife" />
}

export default WhyGrooveLife
