import React from 'react'
import TextColumns from 'Components/TextColumns'
import './styles.css'

/*
  Wrapper component takes an array of images and turns them into the correct block structure
*/

const FeaturedIn = ({ title, images }) => {
  if (!images || !images.length) return null
  const blocks = images.map(image => {
    return { media: image }
  })
  return <TextColumns title={title} blocks={blocks} mediaType="video" className="FeaturedIn" />
}

export default FeaturedIn
