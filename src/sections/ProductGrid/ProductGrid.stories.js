import React from 'react'
import { withKnobs, boolean, files, text, number, object } from '@storybook/addon-knobs'
import ProductGrid from './'
import productData from '../../static/products.json'

export default {
  title: 'Product / Product Grid',
  component: ProductGrid,
  decorators: [withKnobs],
}

/*
  Product Discounts rules on data

  Compare at price:
  1. No discount, all variants the same price.
    - Should show single price, black, no cross out
  2. No discount, variant price varies.
    - Should show "From $xx.xx", black, no cross out
  3. Discount, all variants the same price.
    - Should show sale price in orange. Regular price black and crossed out.
  4. Discount, variant price varies.
    - Should show "On sale from $xx.xx" with sale price in orange. Min regular price black and crossed out.

  Script discounts:
  1. Message only, no crossed out price. (e.g. 2 for $20)
  2. Percent off (with message)
  3. Flat rate off (with message)
  4. Price change (no message)
*/

const filterOptions = [
  {
    name: 'Styles',
    tags: [
      'air-womens-stackable-rings',
      'camouflage-silicon-rings',
      'edge-collection',
      'groove-exclusive-silicone-rings',
      'solid-color-silicone-rings',
      'all-custom-rings',
      'groove-dimension-rings',
      'groove-hero-patriotic-silicone-rings',
      'groove-watch-bands',
      'mayhem-by-groove-ring',
      'metallic',
      'zeus',
      'men-and-womens-patterned-silicone-wedding-rings',
    ],
  },
  {
    name: 'Compatibility',
    tags: ['apple', 'fitbit', 'samsung'],
  },
  {
    name: 'Gender',
    tags: ['women', 'men', 'other'],
  },
  {
    name: 'Color',
    tags: [
      'apple',
      'black',
      'stone-grey',
      'blue',
      'metallic',
      'copper',
      'pearl',
      'black-pearl',
      'storm-grey',
      'green',
      'white',
      'orange',
      'seafoam',
      'pink',
      'lavender',
      'coral',
      'red',
      'lilac',
      'brown',
      'gray',
    ],
  },
  {
    name: 'Size',
    tags: [
      'size-4',
      'size-5',
      'size-6',
      'size-7',
      'size-8',
      'size-9',
      'size-10',
      'size-11',
      'size-12',
      'size-13',
      'size-14',
      'size-15',
      'size-19',
      'size-sm',
      'size-s',
      'size-med',
      'size-m',
      'size-lg',
      'size-l',
      'size-xl',
      'size-2xl',
      'size-xxl',
      'size-flat-brim',
      'size-38mm-series-1-2-3-or-40mm-series-4',
      'size-42mm-series-1-2-3-or-44mm-series-4',
      'size-7-thin',
      'size-7-orig',
      'size-8-thin',
      'size-8-orig',
      'size-9-thin',
      'size-9-orig',
      'size-10-thin',
      'size-10-orig',
      'size-11-thin',
      'size-11-orig',
    ],
  },
  {
    name: 'Band Length',
    tags: ['40mm', '7000mm'],
  },
  {
    name: 'Watch Band Style',
    tags: ['Camo', 'Snakesin'],
  },
  {
    name: 'Price',
    tags: ['under-10', '10-20', '20-30', '30-40', '40-50', 'over-50'],
  },
]

export const productGrid = () => {
  const showFilters = boolean('Show filters?', true),
    title = text('Title', 'Groove Zeus | Silicone Rings'),
    link = text('Link', '/to-go-nowhere'),
    buttonText = text('Button Text', 'Shop the Collection'),
    productLimit = number('Number of products to show', 8),
    pagination = boolean('Paginate?', true),
    hideMasterPageSection = boolean('Hide master page section?', false)

  return (
    <>
      <ProductGrid
        products={productData}
        filterOptions={filterOptions}
        showFilters={showFilters}
        title={title}
        link={link}
        buttonText={buttonText}
        productLimit={productLimit}
        pagination={pagination}
        hideMasterPageSection={hideMasterPageSection}
      />
    </>
  )
}
