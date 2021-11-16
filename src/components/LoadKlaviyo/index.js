import { useEffect } from 'react'

export function useLoadKlaviyo() {
  useEffect(() => {
    var _learnq = _learnq || []

    _learnq.push(['account', 'MZ4zYi'])
    ;(function() {
      var b = document.createElement('script')
      b.type = 'text/javascript'
      b.async = true
      b.src =
        ('https:' == document.location.protocol ? 'https://' : 'http://') +
        'a.klaviyo.com/media/js/analytics/analytics.js'
      var a = document.getElementsByTagName('script')[0]
      a.parentNode.insertBefore(b, a)
    })()
  }, [])
}

export default () => null
