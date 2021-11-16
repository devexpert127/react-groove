import { useEffect, useRef } from 'react'

function loadOrderLookup() {
  const script = document.createElement('script')
  script.src = 'https://groovelife.com/apps/orderLookupApp'
  script.type = 'text/javascript'
  script.id = 'nll_orderLookUpHookScript'
  script.async = true

  const firstScript = document.getElementsByTagName('script')[0]
  firstScript.parentNode.insertBefore(script, firstScript)
}

export function useLoadOrderLookup(location) {
  const isOrderLookupLoaded = useRef(false)

  useEffect(() => {
    if (isOrderLookupLoaded && isOrderLookupLoaded.current) {
      refreshOrderLookup()
      return
    }

    loadOrderLookup()
    isOrderLookupLoaded.current = true
  }, [location])
}

export function refreshOrderLookup() {
  window.ola_getForm && window.ola_getForm()
}

export default () => null
