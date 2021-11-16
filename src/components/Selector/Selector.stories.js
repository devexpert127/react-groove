import React from 'react'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'

import Selector from './'

export default {
  title: 'Selector',
  component: Selector,
  decorators: [withKnobs],
}

const template = args => (
  <Selector
    options={[
      { name: 'Item 1', value: '1' },
      { name: 'Item 2', value: '2' },
      { name: 'Item 3', value: '3' },
      { name: 'Item 4', value: '4' },
    ]}
    onChange={value => console.log(value)}
    label={'This is label'}
    inputID={'example1'}
    useLabelForHiddenOption={boolean('hidden label for hidden option', false)}
    useNotSelectedOption={boolean('not selected hidden option', true)}
    {...args}
  />
)

export const selector = template.bind({})
selector.args = {}
selector.storyName = 'Selector'
