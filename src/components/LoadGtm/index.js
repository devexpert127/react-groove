import { useEffect } from 'react'

function loadGtmScript() {
  const gtmScript = document.createElement('script')
  gtmScript.src = 'https://www.googletagmanager.com/gtag/js?id=UA-80988022-1'
  gtmScript.type = 'text/javascript'
  gtmScript.async = true

  const firstScript = document.getElementsByTagName('script')[0]

  firstScript.parentNode.insertBefore(gtmScript, firstScript);
    
  // Google Tag Manager 
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-NSKXDM2');
  // End Google Tag Manager 
}

export function useLoadGtm() {
  useEffect(() => {
    loadGtmScript()
  }, [])
}

export default () => null
