import React from 'react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import ViralSweep from './'

export default {
  title: 'Integration / Viral Sweep',
  component: ViralSweep,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
  notes: 'Special Embed for ViralSweep',
}

export const viralSweep = () => {
  return (
    <>
      <ViralSweep
        title={text('Title', 'Enter to win a Free Groovelife Ring!')}
        id={text('ID', 'vsscript_71023_448426')}
        scriptSource={text(
          'Script source',
          'https://app.viralsweep.com/vsa-widget-809500-71023.js?sid=71023_448426',
        )}
        pageWidth={boolean('Page Width?', true)}
      />
    </>
  )
}
