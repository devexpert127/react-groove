/*
  Lucid — 2021/03/10
  Uhh, not sure if this was expecting anything else to be loaded at any point but this is really not doing anything.
  Checking for optimizely in the DOM and network tab shows nothing. Logging the variable in the console only shows
  the variable being added here.
  Client has asked for this to be removed anyway so it is probably not a problem anymore.
*/

import { useEffect } from 'react'

export function useLoadOptimizely() {
  useEffect(() => {
    window.optimizely = window.optimizely || []
    window.optimizely.push('activateUniversalAnalytics')
  }, [])
}

export default () => null
