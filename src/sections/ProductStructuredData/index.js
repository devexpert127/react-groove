import React from 'react'
import Helmet from 'frontend-head'

const ProductStructuredData = ({ product }) => {
  const {
    name,
    thumbnail = [],
    metaDescription,
    externalId,
    availableForSale,
    variants = [],
    slug,
    metafields = [],
  } = product || {}
  const variant = variants.find((v) => v.position === 1) || []
  let ratingValue, ratingCount = 0
  const metafieldsOkendo = metafields.filter((m) => m.namespace === 'okendo').find((m) => m.key === 'summaryData') || {}
  if (!!metafieldsOkendo.value) {
    ({ reviewAverageValue: ratingValue, reviewCount: ratingCount } = JSON.parse(metafieldsOkendo.value))
  }

  return (
    <Helmet>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `
        {
          "@context": "http://schema.org/",
          "@type": "Product",
          "name": "${name}",
          "image": "${thumbnail.src}",
          "description": "${metaDescription}",
          "mpn": "${externalId}",
          "sku": "${variant.sku}",
          "brand": {
            "@type": "Organization",
            "name": "Groove Life"
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": "${variant.price}",
            "availability": "${availableForSale ? 'InStock' : 'OutOfStock'}",
            "url": "https://groovelife.com/products/${slug}",
            "seller": {
              "@type": "Organization",
              "name": "Groove Life"
            }
          }
          ${
            ratingCount > 0
              ? `, "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "${ratingValue}",
              "ratingCount": "${ratingCount}"
            }`
              : ''
          }
        }
      `,
        }}
      />
    </Helmet>
  )
}

export default React.memo(ProductStructuredData)
