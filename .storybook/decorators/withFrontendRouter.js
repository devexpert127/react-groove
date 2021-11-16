import * as React from 'react'
import { makeDecorator } from '@storybook/addons'
import Router, { RouterContext } from 'frontend-router'

export const withFrontendRouter = makeDecorator({
  name: 'FrontendRouter',
  parameterName: 'frontendRouter',
  wrapper(getStory, context, settings) {
    Router.router = {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push(...args) {
        action('frontendRouter.push')(...args)
        return Promise.resolve(true)
      },
      replace(...args) {
        action('frontendRouter.replace')(...args)
        return Promise.resolve(true)
      },
      reload(...args) {
        action('frontendRouter.reload')(...args)
      },
      back(...args) {
        action('frontendRouter.back')(...args)
      },
      prefetch(...args) {
        action('frontendRouter.prefetch')(...args)
        return Promise.resolve()
      },
      beforePopState(...args) {
        action('frontendRouter.beforePopState')(...args)
      },
      events: {
        on(...args) {
          action('frontendRouter.events.on')(...args)
        },
        off(...args) {
          action('frontendRouter.events.off')(...args)
        },
        emit(...args) {
          action('frontendRouter.events.emit')(...args)
        },
      },
      isFallback: false,
      ...settings.options,
      ...settings.parameters,
    }

    return (
      <RouterContext.Provider value={Router.router}>{getStory(context)}</RouterContext.Provider>
    )
  },
})
