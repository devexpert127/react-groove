import * as React from 'react'
import { makeDecorator } from '@storybook/addons'
import { HeadManagerContext, initHeadManager } from 'frontend-head'

export const withFrontendHead = makeDecorator({
  name: 'FrontendHead',
  parameterName: 'frontendHead',
  wrapper(getStory, context) {
    const headManager = initHeadManager()

    return (
      <HeadManagerContext.Provider value={headManager}>
        {getStory(context)}
      </HeadManagerContext.Provider>
    )
  },
})
