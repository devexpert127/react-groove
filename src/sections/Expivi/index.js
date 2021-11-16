import React, { useEffect, useRef, useState } from 'react'
import PageWidth from 'Components/PageWidth'
import Button from 'Components/Button'
import { useCartActions } from 'frontend-checkout'
import './styles.css'

// TODO: implement Cloudinary as storage device for thumbnail files & store reference to the images on the product object:
// import {AdvancedImage} from '@cloudinary/react'
// import {Cloudinary} from '@cloudinary/base'

const ASSETS_URL = 'https://admin.expivi.net/widgets/assets/v1.440'
const TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc3MDdmMzM3ZWRlNzkxN2RhMjA0M2RjOTZhMGNjZWQ1ZDY0N2VlMDVlODk3YzM2ZTQ0NjQ4ZDE4YzBkNTg1ZGViNmEzNDAwMjJkZDg5MWQwIn0.eyJhdWQiOiIxIiwianRpIjoiNzcwN2YzMzdlZGU3OTE3ZGEyMDQzZGM5NmEwY2NlZDVkNjQ3ZWUwNWU4OTdjMzZlNDQ2NDhkMThjMGQ1ODVkZWI2YTM0MDAyMmRkODkxZDAiLCJpYXQiOjE1OTI0ODU5NTAsIm5iZiI6MTU5MjQ4NTk1MCwiZXhwIjoxOTA4MDE4NzUwLCJzdWIiOiIxMzAwIiwic2NvcGVzIjpbXX0.E3lN-skFwvDvm3nseLf5RpoGBKEq47TYz93J1IfyJbx1QcMJFiri6jWtBs_tRTYoIOqfmcn8G51kjTXSAh-VbrFQTuicmnsbiVp7MT751F5iWNCQfIarBRnLL48Y18vJJSYwtGhlvoS4OworKaYh9WcjHohquVCv237L1qOkmwuwec1YzWMV_WFDro8o65wRZK2Tntax8vPqqMwAAewbX3FhX3Mz6VfeQD89LlhYyvL2rXeT9XOSqUKjVUFgpVyZaOnXyF_92eFm2V8RwLW0Vv4iuupa3Ya7QV6k2XJjLjjIIgd-7fatgTHsVdTl9IuDmP5BZrOSW_S8hV2hPOwh06PE488-diT7ZxDB1scTsGj3hJ6g0VxVH45Aq4YdEqadW71Ebd3XDO5vvr_dzuMo2-gP6ihXAtkqOgU1zZyZ0cmDzBW0ythAb1b4_K-bckwhlwFxEmuKI0tWw1ZFQQz75d73cjGt0bJUTtvnD4eoDXVWEocgCNVeSLgtPVmHjGoiTDIM7fhIJ_xmeXDZdOm6v-vJW2jdDVfVtiDqrkY6hx8GrvolL-mg83hVhPNKBzofqI6mjTiVs69Zqnsj3mqPNsGuY_tiajFEcaemt0HkjSbygDf73XR5H9cfIqqFZ-SKEkp6Jyq-PEBkNPEm7T0Ib76E_-YkHUXh22Cf8Chkm3Q'

const Expivi = ({ id, collections = [], extraProduct = {}, customProduct = {} }) => {
  const expivi = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const { addItems } = useCartActions()
  const { showCart } = useCartActions()

  async function loadExpivi() {
    if (isLoaded) return

    await loadAsset(createStyleSheet(`${ASSETS_URL}/ExpiviComponent.css`))
    // await loadAsset(createScript(`${ASSETS_URL}/vendor.lib.js`))
    // await loadAsset(createScript(`${ASSETS_URL}/index.js`))
    await loadAsset(createScript(`https://cdn.shopify.com/s/files/1/1011/1278/files/vendor.lib.js?v=1619019491`))
    await loadAsset(createScript(`https://cdn.shopify.com/s/files/1/1011/1278/files/index.js?v=1619019491`))
    await loadAsset(createScript(`${ASSETS_URL}/ExpiviComponent.js`))

    setIsLoaded(true)

    expivi.current = new window.ExpiviComponent.default({
      catalogueId: id,
      currency: 'USD',
      locale: 'en',
      optionContainer: '.Expivi-options',
      priceSelectors: '.Expivi-price',
      token: TOKEN,
      viewerContainer: '.Expivi-viewer',
    })

    await Promise.all([
      loadAsset(
        createStyleSheet('https://fonts.googleapis.com/css2?family=Bellefair&display=swap'),
      ),
      loadAsset(createStyleSheet('https://fonts.googleapis.com/css2?family=Karla&display=swap')),
      loadAsset(
        createStyleSheet('https://fonts.googleapis.com/css2?family=Yellowtail&display=swap'),
      ),
    ])
  }

  useEffect(() => {
    loadExpivi()
  }, [])

  async function addCustomProductToCart(results) {
    const allAttributes = results.configured_products[0].configuration.attributes.reduce(
      (list, attr) => ({
        ...list,
        [attr.attribute_name.toLowerCase()]: attr.attribute_value_name,
      }),
      {},
    )
    const thumbnail = results.configured_products[0].thumbnail
    if (!collections) {
      console.error(`No 'collections' prop provided, got ${JSON.stringify(collections)} instead`)
      return
    }

    const sku = getCustomProductSKU(results)

    const allProductVariants = collections.reduce((variants, collection) => {
      return [
        ...variants,
        ...collection.products.reduce((list, product) => [...list, ...product.variants], []),
      ]
    }, [])

    const productVariant = allProductVariants.find(
      variant => variant.sku.toLowerCase() === sku.toLowerCase(),
    )

    if (!productVariant) {
      console.error(`No product variant found for this product, not able to add to the cart`)
      console.error('Custom Product SKU', sku)
      console.error(
        'Available Product SKUs',
        allProductVariants.map(variant => variant.sku),
      )
      return
    }

    const timestamp = new Date()
    const product = {
      id: productVariant.externalId,
      quantity: 1,
      properties: getProductsCustomAttributes(results, timestamp),
    }

    const custProd = {
      id: customProduct.variants[0].externalId,
      quantity: 1,
      properties: getExtraProductCustomAttributes(
        results,
        false,
        allAttributes,
        thumbnail,
        timestamp,
      ),
    }

    const products = allAttributes['enter your text here line 1']
      ? [
          product,
          {
            id: customProduct.variants[0].externalId,
            quantity: 1,
            properties: getExtraProductCustomAttributes(
              results,
              false,
              allAttributes,
              thumbnail,
              timestamp,
            ),
          },
          {
            id: extraProduct.variants[0].externalId,
            quantity: 1,
            properties: getExtraProductCustomAttributes(
              results,
              true,
              allAttributes,
              thumbnail,
              timestamp,
            ),
          },
        ]
      : [product, custProd]
    await addItems(products)

    // Open sidecart
    showCart()
  }

  const [errorMessageText, setErrorMessageText] = useState(false)
  const expiviContainerRef = useRef()
  const onAddToCart = () => {
    if (!isBrowser) return
    const allInputs = expiviContainerRef.current.getElementsByTagName('input')

    for (const input in allInputs) {
      if (/\p{Extended_Pictographic}/u.test(allInputs[input].value) /* has emoji*/) {
        setErrorMessageText(
          'Oops!  Looks like there is an emoji in your customization.  Fix it and try again!',
        )
        return
      }
    }

    if (document.getElementsByClassName('error--text').length !== 0) {
      setErrorMessageText(
        'Uh oh, looks like your text is over the given limit. Fix it and try again!',
      )
    } else {
      setErrorMessageText(false)
      window.expivi.saveConfiguration(256, 256).then(results => {
        addCustomProductToCart(results)
      })
    }
  }

  if (!id || !isLoaded) return null

  return (
    <React.Fragment>
      <section className="Expivi" ref={expiviContainerRef}>
        <PageWidth>
          <div className="Expivi-container">
            <div className="Expivi-viewer"></div>
            <div className="Expivi-details">
              <div className="Expivi-options"></div>
              <div className="Expivi-addToCart">
                <div className="Expivi-price"></div>
                <Button as="button" style="default" onClick={onAddToCart}>
                  Add to cart
                </Button>
                <div className="Expivi-addToCart--error-message" aria-live="polite">
                  {errorMessageText}
                </div>
              </div>
            </div>
          </div>
        </PageWidth>
      </section>
    </React.Fragment>
  )
}

function getCustomProductSKU(results) {
  const attributes = results.configured_products[0].configuration.attributes
  const skuAttributeKeys = ['Pricing_Profile', 'Pricing_Ring Color', 'Pricing_Size']

  return attributes
    .filter(attr => skuAttributeKeys.includes(attr.attribute_name))
    .map(attr => attr.attribute_value_name)
    .join('-')
}
const timestamp = new Date()

const customAttributesMapping = {
  style: 'choose your style',
  'ring color': 'ring color',
  customization: 'choose your customization',
  'fill color': 'choose your ink color',
  size: 'select size',
}

const iconTypeCustomAttributeKey = 'icon type'
const customizationAttributeMapping = {
  text: ['enter your text here'],
  monogram: ['monogram left', 'monogram center', 'monogram right'],
  icon: [iconTypeCustomAttributeKey],
}

function getProductsCustomAttributes(results, timestamp) {
  const preppedAttributes = {
    'link-id': String(timestamp.getTime())
  }
  return preppedAttributes
}

function getExtraProductCustomAttributes(results, isTin, allAttributes, thumbnail, timestamp) {
  if (isTin) {
    return {
      'Line 1': allAttributes['enter your text here line 1'].split(' @')[0],
      'Line 2': allAttributes['enter your text here line 2'].split(' @')[0],
      'Line 3': allAttributes['enter your text here line 3'].split(' @')[0],
      'Engraved Font': allAttributes['enter your text here line 3'].split(' @font:')[1],
      'link-id': String(timestamp.getTime()),
    }
  } else {
    const filteredAttributes = results.configured_products[0].attributes.reduce(
      (list, attr) => ({
        ...list,
        [attr.attribute_name.toLowerCase()]: attr.attribute_value_name,
      }),
      {},
    )
    let preppedAttributes = {}

    if (filteredAttributes['choose your customization'] == 'Icon') {
      if (filteredAttributes['adventure'] != undefined) {
        preppedAttributes['Icon'] = filteredAttributes['adventure']
      } else if (filteredAttributes['faith'] != undefined) {
        preppedAttributes['Icon'] = filteredAttributes['faith']
      } else if (filteredAttributes['wildlife'] != undefined) {
        preppedAttributes['Icon'] = filteredAttributes['wildlife']
      }
    } else if (filteredAttributes['choose your customization'] == 'Monogram') {
      preppedAttributes['Monogram Style'] = filteredAttributes['choose your style']
      let letter1 = filteredAttributes['monogram left'].split(' @')[0]
      let letter2 = filteredAttributes['monogram center'].split(' @')[0]
      let letter3 = filteredAttributes['monogram right'].split(' @')[0]
      preppedAttributes['Monogram Letters'] = '' + letter1 + letter2 + letter3
    } else if (filteredAttributes['choose your customization'] == 'text') {
      let textInfo = filteredAttributes['enter your text here'].split(' @font:')
      preppedAttributes['Engraved Text'] = textInfo[0]
      preppedAttributes['Engraved Font'] = textInfo[1]
    }
    preppedAttributes['Fill Color'] = filteredAttributes['choose your ink color']
    preppedAttributes['link-id'] = String(timestamp.getTime())
    preppedAttributes['custom-link-id'] = thumbnail

    return preppedAttributes
  }
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

function createStyleSheet(href) {
  const link = document.createElement('link')

  link.rel = 'stylesheet'
  link.href = href

  return link
}

const isBrowser = typeof document !== 'undefined'

export default Expivi
