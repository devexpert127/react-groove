import React from 'react'
import TextColumns from 'Components/TextColumns'
import './styles.css'

/*
  Wrapper component for TextColumns
*/

const MadeForIcons = ({ title, typeCollection }) => {
  if (!typeCollection || !typeCollection.madeForIcons || !typeCollection.madeForIcons.length)
    return null

  const blocks = typeCollection.madeForIcons.map(({ name = null, icon = { icon: null } }) => {
    return {
      title: name,
      media: icon.icon,
    }
  })

  return <TextColumns title={title} blocks={blocks} mediaType="icon" className="SellingIcons" />
}

export default MadeForIcons
