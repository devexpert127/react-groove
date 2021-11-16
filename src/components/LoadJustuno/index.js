import { useEffect } from 'react'
import { useCartActions } from 'frontend-checkout'

function getPageType(routerLocation) {
  const routerPathname = routerLocation.pathname
  if (routerPathname === '/') {
    return 'homepage'
  } else if (routerPathname.indexOf('/collections/') > -1) {
    return 'collection'
  } else if (routerPathname.indexOf('/products/') > -1) {
    return 'product'
  } else if (routerPathname.indexOf('/blog') > -1 || routerPathname.indexOf('/news') > -1) {
    return 'blog'
  }
  return 'page'
}

export function useLoadJustuno(routerLocation) {
  const { addItems } = useCartActions()

  useEffect(() => {
    const addToCartFromJustUno = event => {
      const { message, id, quantity } = event.data
      if (message === 'addItemsFromJustUno' && id && quantity) {
        addItems({ id, quantity })
      }
    }

    if (!window.ju_alreadyloaded) {
      const asset_host = '//cdn.jst.ai/'
      window.ju_num = '5DABD6B0-706E-454F-B9A6-FF54F9D7587B'
      window.asset_host = asset_host
      ;(function(i, s, o, g, r, a, m) {
        i[r] =
          i[r] ||
          function() {
            ;(i[r].q = i[r].q || []).push(arguments)
          }
        ;(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0])
        a.async = 1
        a.src = g
        m.parentNode.insertBefore(a, m)
      })(window, document, 'script', asset_host + 'vck.js', 'juapp')
      //
      //

      // See note on https://support.justuno.com/tracking-visitor-carts-conversions-past-orders around:
      //  Tracking visitor shopping cart items and totals
      window.juapp =
        window.juapp ||
        function() {
          ;(window.juapp.q = window.juapp.q || []).push(arguments)
        }

      juapp('local', 'pageType', getPageType(routerLocation))
    }

    window.addEventListener('message', addToCartFromJustUno)

    return () => window.removeEventListener('message', addToCartFromJustUno)
  }, [])
}

export default () => null
