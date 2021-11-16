import React from 'react'
import Slider from './'

export default {
  title: 'Slider',
  component: Slider,
}

export const slider = () => {
  return (
    <Slider>
      <Slider.Slot>1</Slider.Slot>
      <Slider.Slot>2</Slider.Slot>
      <Slider.Slot>3</Slider.Slot>
    </Slider>
  )
}
