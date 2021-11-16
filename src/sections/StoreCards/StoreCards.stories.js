import React from 'react'
import { withKnobs, text, number } from '@storybook/addon-knobs'
import StoreCards from './'

export default {
  title: 'Integration / Store Cards',
  component: StoreCards,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}

export const storeCards = () => {
  const stores = []
  for (let i = 0; i < number('Store amount', 5); i++) {
    stores.push({
      address: text('Address', '12141 KATY FREEWAY', `Store-${i}`),
      city: text('City', 'HOUSTON', `Store-${i}`),
      provinceState: text('Province/State', 'TX', `Store-${i}`),
      postalZipCode: text('Postal/Zip Code', '77079', `Store-${i}`),
      title: text('Name', "Charlestowne Mall", `Store-${i}`),
      link: text(
        'Link',
        'https://www.google.com/maps/place/2400+Galleria+Cir,+Birmingham,+AL+35244/@33.3787671,-86.8124858,17z/data=!3m1!4b1!4m5!3m4!1s0x8889221710c1e15d:0x556614b30bdd9e7d!8m2!3d33.3787626!4d-86.8102971',
        `Store-6`,
      ),
    })
  }

  stores.push({
    name: text('Name', 'This Store Has A Different Name', `Store-6`),
    address: text('Address', '12141 ANOTHER PLACE', `Store-6`),
    city: text('City', 'DALLAS', `Store-6`),
    provinceState: text('Province/State', 'TX', `Store-6`),
    postalZipCode: text('Postal/Zip Code', '77074', `Store-6`),
    title: '',
    link: '',
  })

  return (
    <>
      <StoreCards stores={stores} hidePaddingTop={false} hidePaddingBottom={true} />
    </>
  )
}
