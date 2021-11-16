export const isBelt = ({ name }) => name && name.toLowerCase().includes('belt')
export const isGiftCard = ({ name }) => name && name.toLowerCase().includes('gift card')
export const isWatchBand = ({ type }) => type && type.toLowerCase().includes('watch band')
export const isRing = product => {
  // https://groove-rings.myshopify.com/admin/collections/165013782595 - all products excluding belts.
  return !isWatchBand(product) && !isBelt(product) && !isGiftCard(product)
}

export const hideRingSizingOptions = (product) => {
  const { typeCollection = null, hideDontKnowRingSize = false } = product
  // hideVia our code check for product type
  const hideViaCode = !isRing(product)
  // hideVia field on product
  const hideViaProduct = hideDontKnowRingSize
  // hideVia field on typeCollection
  let hideViaType = false
  if (typeCollection) {
    const { hideDontKnowYourRingSize = false } = typeCollection
    hideViaType = hideDontKnowYourRingSize
  }
  // return and if any are true then this function will hide
  return hideViaCode || hideViaProduct || hideViaType
}


export function isBundle(product) {
  if (product.bundledProducts) {
    return product.bundledProducts.length > 0
  } else {
    return false
  }
}

export function formatMoney(amount, currency = 'USD') {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function discountPercent({ originalPrice, price }) {
  if (originalPrice) {
    return Math.round(((originalPrice - price) / originalPrice) * 100)
  } else {
    return 0
  }
}

export function calculateBundlePrice(product, bundleVariants) {
  const discount = product.bundlePercentDiscount

  return bundleVariants.reduce((subtotal, bundleVariant) => {
    const amount = getDiscountPrecent(discount, parseFloat(bundleVariant.selectedVariant.price))

    return subtotal + amount
  }, 0)
}

export function calculateBundleOriginalPrice(bundleVariants) {
  return bundleVariants.reduce((subtotal, bundleVariant) => {
    const amount = parseFloat(bundleVariant.selectedVariant.price)

    return subtotal + amount
  }, 0)
}

export function getDiscountParts(discount) {
  const discountType = /\$|%/.exec(discount) // Find either a $ or %
  const discountAmount = /\d+\.*\d*/.exec(discount) // get any digits followed by . and more digits i.e. 15.50

  return {
    discountType: !!discountType ? discountType[0] : '', // if no type is found don't error so percent is returned from getScriptSalePrice()
    discountAmount: parseFloat(discountAmount[0]), // needs to be number
  }
}

export function getDiscountFlateRate(discount, price) {
  return price - discount
}

export function getDiscountPrecent(discount, price) {
  return parseFloat((price - price * (discount / 100)).toFixed(2))
}

export function hasUpsellPopup({ upsellPopup = null }) {
  return !!upsellPopup && upsellPopup.enabled
}

export function isShogunProduct(product) {
  /*
    Product card needs to deal with products from Shogun and products from
    Shopifys ProductRecommendations GraphQL API endpoint.
    These have different properties.
  */
  return !!product.name
}

export function getProductMinPrice(product) {
  return isShogunProduct(product) ? product.minPrice : product.priceRange.minVariantPrice.amount
}

export function getProductMaxPrice(product) {
  return isShogunProduct(product) ? product.maxPrice : product.priceRange.maxVariantPrice.amount
}

export function getCompareAtPrice(product) {
  /*
    lowest compare at price for variants that have a compare at price greater than the current price
  */
  const productVariants = isShogunProduct(product) ? product.variants : (product.variants.edges || []).map(variant => variant.node)
  const compareAtPrices = productVariants
    .map(variant => {
      if (variant.originalPrice > variant.price) {
        return variant.originalPrice
      }
    })
    .filter(compareAtPrice => {
      return compareAtPrice !== undefined
    })
    .sort((a, b) => {
      return a - b
    })

  return compareAtPrices[0]
}

export function getProductVariants(product) {
  return isShogunProduct(product) ? product.variants : product.variants.edges
}

export function hasDiscount(product) {
  /*
    Products can have discounts if:
    - variant.price < variant.originalPrice (compare at price)
    - product has a discount item and it is enabled
      discount item can be:
      - % or flat rate discount i.e. 20% off or $5 off
      - price change i.e. all products are $20
      - discount note (no price change) i.e. 2 for $44 (this is just the display title)
  */
  const compareAtDiscount = hasCompareAtDiscount(product)
  const scriptDiscount = hasScriptDiscount(product)
  const hasDiscount = compareAtDiscount || scriptDiscount
  let discountType
  if (hasDiscount) {
    if (compareAtDiscount) {
      discountType = 'compareAtDiscount'
    } else {
      discountType = 'scriptDiscount'
    }
  }

  return [hasDiscount, discountType]
}

export function hasCompareAtDiscount(product) {
  let hasDiscount = false
  const variants = getProductVariants(product)

  for (const key in variants) {
    const variant = variants[key]
    let price, compareAtPrice

    if (isShogunProduct(product)) {
      price = variant.price
      compareAtPrice = variant.originalPrice
    } else {
      price = parseFloat(variant.node.priceV2.amount)
      compareAtPrice = !!variant.node.compareAtPriceV2
        ? parseFloat(variant.node.compareAtPriceV2.amount)
        : 0
    }

    if (compareAtPrice > price) {
      hasDiscount = true
      break
    }
  }
  return hasDiscount
}

export function hasScriptDiscount(product) {
  if (isShogunProduct(product)) {
    return !!product.discount && product.discount.enabled
  } else {
    /*
      TODO:
      RelatedProducts section needs to pass in discount information because product
      data comes from Shopify and Shogun doesn't wrap it in the extra fields.
      We need a way to implictly infer the correct discount for each product.
      This will likely be tags.
    */
  }
  return false
}

export function getSalePrice(discount, discountType, price) {
  if (discountType === 'compareAtDiscount') {
    return price
  } else {
    return getScriptSalePrice(discount, price)
  }
}

export function getNonSalePrice(product, discountType) {
  if (discountType === 'compareAtDiscount') {
    return getCompareAtPrice(product)
  } else {
    return getProductMinPrice(product)
  }
}

export function getDiscountMessage(product, discountType) {
  if (discountType === 'scriptDiscount' && product.discount.displayMessage !== '') {
    return product.discount.displayMessage
  }
  return false
}

export function getScriptSalePrice(discount, price) {
  if (discount.priceChange > 0) {
    return discount.priceChange
  } else if (discount.discountAmount !== '') {
    try {
      const { discountType, discountAmount } = getDiscountParts(discount.discountAmount)
      switch (discountType) {
        case '$':
          return getDiscountFlateRate(discountAmount, price)
          break
        default:
          // %
          return getDiscountPrecent(discountAmount, price)
      }
    } catch (e) {
      console.error('ProductCardPrice.getScriptSalePrice error:', e, discount)
      return false
    }
  }
  return false
}

export const isPriceFrom = (min, max) => max > min

export const discountTypes = {
  script: 'scriptDiscount',
  compare: 'compareAtDiscount',
}

export function getPriceProperties(bundle, product, selectedVariant, variantSelected) {
  let priceProps = {
    price: null,
    comparePrice: null,
    priceText: null,
    minPrice: null,
  }

  if (isBundle(product)) {
    const regularBundlePrice = calculateBundleOriginalPrice(bundle.variants)
    const saleBundlePrice = calculateBundlePrice(product, bundle.variants)
    priceProps = {
      comparePrice: regularBundlePrice,
      price: saleBundlePrice,
      isOnSale: true,
    }
  } else {
    const productMinPrice = getProductMinPrice(product),
      productMaxPrice = getProductMaxPrice(product)
    let [isOnSale, discountType] = hasDiscount(product)
    let price,
      comparePrice,
      discountMessage = null

    if (isOnSale) {
      price = getSalePrice(product.discount, discountType, productMinPrice)
      comparePrice = getNonSalePrice(product, discountType)
      discountMessage = getDiscountMessage(product, discountType)
    } else {
      price = productMinPrice
    }

    const usePriceFrom = isPriceFrom(productMinPrice, productMaxPrice)

    priceProps = {
      usePriceFrom: usePriceFrom,
      price: price,
      comparePrice: comparePrice,
      priceText: discountMessage,
      isOnSale: isOnSale,
    }

    if (variantSelected) {
      isOnSale = false
      let variantPrice = selectedVariant.price
      let variantComparePrice = selectedVariant.originalPrice

      if (discountType === discountTypes.script) {
        isOnSale = product.discount.enabled
        variantComparePrice = variantPrice
        variantPrice = getSalePrice(product.discount, discountType, variantPrice) || null
      } else {
        isOnSale = variantPrice < variantComparePrice
      }

      priceProps = {
        ...priceProps,
        usePriceFrom: false,
        isOnSale: isOnSale,
        price: variantPrice,
        comparePrice: variantComparePrice > variantPrice ? variantComparePrice : null,
      }
    }
  }
  return priceProps
}

/**
 * convertId - converts storefront id's into shopify id's for products and
 * variants
 *
 * @param  {string} storefrontId the base64 encoded id from storefront api
 * @return {string} the id of the product or variant ready for shopify use
 * @example
 * convertId('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzIxMjkxNDE3MjcyOTk=');
 * returns '2129141727299'
 *
 */

export function convertId(storefrontId) {
  if (!!storefrontId) {
    if (isBase64(storefrontId)) {
      return atob(storefrontId.toString())
        .replace('gid://shopify/ProductVariant/', '')
        .replace('gid://shopify/Product/', '')
    }

    return storefrontId
  } else {
    return
  }
}

export function isBase64(str) {
  str = str.toString()

  if (str === '' || str.trim() === '') {
    return false
  }

  try {
    return btoa(atob(str)) == str
  } catch (err) {
    return false
  }
}

export default {
  isBelt,
  isGiftCard,
  isWatchBand,
  isRing,
  hideRingSizingOptions,
  isBundle,
  formatMoney,
  discountPercent,
  calculateBundlePrice,
  calculateBundleOriginalPrice,
  getDiscountParts,
  getDiscountFlateRate,
  getDiscountPrecent,
  hasUpsellPopup,
  isShogunProduct,
  getProductMinPrice,
  getProductMaxPrice,
  getCompareAtPrice,
  getProductVariants,
  hasDiscount,
  hasCompareAtDiscount,
  hasScriptDiscount,
  getSalePrice,
  getNonSalePrice,
  getDiscountMessage,
  getScriptSalePrice,
  isPriceFrom,
  discountTypes,
  getPriceProperties,
  convertId,
  isBase64
}
