import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import PageWidth from 'Components/PageWidth'
import ProductCard from 'Components/ProductCard'

import './styles.css'

const filterProducts = (products, excludedProducts = []) => {
  if (!products || !products.length) return []

  const excludedProductSlugs = excludedProducts.map((p) => p.slug)
  return products.filter((p) => !excludedProductSlugs.includes(p.handle))
}

const RelatedProducts = ({ title, parentProduct, excludedProducts, limit = 4 }) => {
  if (!parentProduct) return null

  const [products, setProducts] = useState([])

  useEffect(() => {
    let isMounted = true
    if (isBrowser) {
      const base64productId = btoa(`gid://shopify/Product/${parentProduct.externalId}`)
      const data = `
        {
          productRecommendations(productId: "${base64productId}") {
            title
            handle
            id
            tags
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            images(first:100) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
            variants(first:100) {
              edges {
                node {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  compareAtPriceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      `

      // create request object
      const request = new XMLHttpRequest()

      // set params
      const method = 'POST'
      const url = 'https://groove-rings.myshopify.com/api/graphql'
      const asynchronous = true

      // open request
      request.open(method, url, asynchronous)

      // set ajax headers
      request.setRequestHeader(
        'X-Shopify-Storefront-Access-Token',
        '908031e6682ed3099645fb280d2e5162',
      )
      request.setRequestHeader('Content-Type', 'application/graphql')

      // set request listener
      request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          // avoid updating state if the component unmounted before the request completes
          if (!isMounted) {
            return
          }

          // success
          const response = JSON.parse(this.response).data
          const filteredProducts = filterProducts(response.productRecommendations, excludedProducts)
          setProducts(filteredProducts)
        } else {
          // we reached our target server, but it returned an error
          console.log(this.response)
        }
      }

      request.onerror = function() {
        // there was a connection error of some sort
        console.log(this.response)
      }

      request.send(data)
    }

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="RelatedProducts">
      <PageWidth>
        <h2 className="RelatedProducts-title">{title}</h2>

        <ul className="RelatedProducts-grid">
          {products.slice(0, limit).map((product, i) => (
            <ProductCard product={product} key={i} />
          ))}
        </ul>
      </PageWidth>
    </section>
  )
}

const isBrowser = typeof document !== 'undefined'

export default RelatedProducts
