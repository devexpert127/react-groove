import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { addDecorator, addParameters } from '@storybook/react'
import { StoreProvider } from '../src/lib/built-in/store/context'
import lazyLoadingPolyfill from 'frontend-ui/dist/lazyLoadingPolyfill'
import { withFrontendRouter } from './decorators/withFrontendRouter'
import { withFrontendHead } from './decorators/withFrontendHead'

import '../src/global.css' // Add global css so it loads before the components css

lazyLoadingPolyfill()

addParameters({
  backgrounds: {
    values: [
      { name: 'light', value: '#fff', default: true },
      { name: 'dark', value: '#191818' },
      { name: 'alt', value: '#E7E9EA' },
      { name: 'accent', value: '#F38732' },
    ],
  },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, { numeric: true }),
  },
})

addDecorator(storyFn => (
  <Router>
    <StoreProvider>
      <div id="frontend-root">{storyFn()}</div>
    </StoreProvider>
  </Router>
))

addDecorator(withFrontendRouter)

addDecorator(withFrontendHead)
