import { useEffect } from 'react'

export function useLoadPinterest() {
  useEffect(() => {
    addPinterestVerificationMetaTag()

    !(function(e) {
      if (!window.pintrk) {
        window.pintrk = function() {
          window.pintrk.queue.push(Array.prototype.slice.call(arguments))
        }
        var n = window.pintrk
        ;(n.queue = []), (n.version = '3.0')
        var t = document.createElement('script')
        ;(t.async = !0), (t.src = e)
        var r = document.getElementsByTagName('script')[0]
        r.parentNode.insertBefore(t, r)
      }
    })('https://s.pinimg.com/ct/core.js')

    window.pintrk('load', '2618915426702', { em: '{{ customer.email }}' })
    window.pintrk('page')
    window.pintrk('track', 'pagevisit')
  }, [])
}

function addPinterestVerificationMetaTag() {
  const meta = document.createElement('meta')
  meta.name = 'p:domain_verify'
  meta.content = '4923ba415b9e957a8da64316db2c7f8d'
  document.getElementsByTagName('head')[0].appendChild(meta)
}

export default () => null
