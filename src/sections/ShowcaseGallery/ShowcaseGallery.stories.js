import React from 'react'
import ShowcaseGallery from './'
import productData from '../../static/products.json'

export default {
  title: 'Integration / ShowcaseGallery',
  component: ShowcaseGallery
}

const template = args => {
  return <ShowcaseGallery {...args} />
}

export const showcaseGallery = template.bind({})
showcaseGallery.args = {
  galleryId: '19696',
  filterByProduct: false,
  product: productData[0],
  pageWidth: true,
  paddingTop: false,
  paddingBottom: true
}
