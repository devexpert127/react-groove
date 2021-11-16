import React, { useEffect, useState } from 'react'
import PageWidth from 'Components/PageWidth'
import RichText from 'frontend-ui/RichText'
import './styles.css'

/**
 * StoreRocket integration
 * @see https://storerocket.io/app/widget/install
 */
const StoreLocator = ({
  title,
  account, // account id ("E382YD7JBQ")
  location = '', // location-slug start location ("the-british-museum-england")
  filters = '', // To be created on "Search Filters" section ("england")
  tracking = false, // enable tracking (boolean)
}) => {
  const [loaded, setLoaded] = useState(false)

  async function loadStoreRocket() {
    if (!loaded) {
      await loadAsset(createScript('https://cdn.storerocket.io/widget.js'))
      setLoaded(true)
    }

    window.StoreRocket.init({
      selector: '.storerocket-store-locator',
      account,
      location,
      filters,
      tracking,
    })
  }

  useEffect(() => {
    if (!account) return

    loadStoreRocket()
  }, [])

  return (
    <PageWidth className="StoreLocator">
      {Boolean(title) ? (
        <div className="StoreLocator-leadText">
          <RichText source={title} />
        </div>
      ) : null}
      <div className="storerocket-store-locator"></div>
    </PageWidth>
  )
}

function loadAsset(element) {
  return new Promise(function(resolve, reject) {
    let ready = false
    element.onerror = function(err) {
      reject(err, element)
    }
    element.onload = element.onreadystatechange = function() {
      if (!ready && (!this.readyState || this.readyState == 'complete')) {
        ready = true
        resolve()
      }
    }

    document.head.appendChild(element)
  })
}

function createScript(src) {
  const script = document.createElement('script')

  script.type = 'text/javascript'
  script.src = src

  return script
}

export default StoreLocator
