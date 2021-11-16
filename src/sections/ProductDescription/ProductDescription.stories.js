import React from 'react'
import { withKnobs, text, object } from '@storybook/addon-knobs'

import ProductDescription from './'

export default {
  title: 'Text / Product Description',
  component: ProductDescription,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}

export const productDescription = () => {
  const title = text('Title', "What's Awesome About It")
  const content = text(
    'Content',
    `<p>Perfect for the man that gets $@#! done. The <strong>Zeus Edge</strong> ring is for the warrior, the fighter, the man that pushes every part of life to the limit. Love silicone rings but miss the form and rigid strength of your metal ring? The Zeus <strong>Anti-Stretch</strong> inner-molded band adds form and rigidity to the medical grade silicone. We took our all-time best selling ring and gave it a new Edge profile. Replace your metal ring today with our new chamfered-edge design and never look back.</p>`,
  )

  // const content = object('Content', [{"children":[
  //   {"text":"Perfect for the man that gets $@#! done. The "},
  //   {"bold":true,"text":"Zeus Edge "},
  //   {"text":"ring is for the warrior, the fighter, the man that pushes every part of life to the limit. Love silicone rings but miss the form and rigid strength of your metal ring? The Zeus "},
  //   {"bold":true,"text":"Anti-Stretch "},
  //   {"text":"inner-molded band adds form and rigidity to the medical grade silicone. We took our all-time best selling ring and gave it a new Edge profile. Replace your metal ring today with our new chamfered-edge design and never look back."}
  // ],"type":"paragraph"}]);

  return (
    <>
      <ProductDescription title={title} content={content} />
    </>
  )
}
