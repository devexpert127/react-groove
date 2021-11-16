import { useEffect } from 'react'

export function useLoadOptimonk() {
  useEffect(() => {
    ;(function(e, a) {
      var t,
        r = e.getElementsByTagName('head')[0],
        c = e.location.protocol
      t = e.createElement('script')
      t.type = 'text/javascript'
      t.charset = 'utf-8'
      t.async = !0
      t.defer = !0
      t.src = c + '//front.optimonk.com/public/' + a + '/shopify/preload.js'
      r.appendChild(t)
    })(document, '17933')
  }, [])
}

export default () => null
