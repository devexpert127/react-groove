import { useEffect } from 'react'

// Todo: create a loadScript shared function.
function loadScript({ src }, appendEl ) {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = src
  appendEl.append(script)
}

export function useLoadAttentive() {
  useEffect(() => {
    loadScript({ src: 'https://cdn.attn.tv/groovelife/dtag.js' }, document.body);
  }, [])
}

export default () => null
