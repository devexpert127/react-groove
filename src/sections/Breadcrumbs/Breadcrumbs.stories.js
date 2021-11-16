import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'

import Breadcrumbs from './'

export default { title: 'Breadcrumbs', component: Breadcrumbs, decorators: [withKnobs] }

export const breadcrumbs = () => {
  return (
    <Breadcrumbs
      breadcrumbs={[
        {
          link: '/pages/shop-men',
          name: 'Shop Men',
        },
        {
          link: '/collections/new-mens-watch-bands',
          name: "Men's Watch Bands",
        },
      ]}
      currentTitle="Apple Watch Band Kryptek Typhon"
    />
  )
}
