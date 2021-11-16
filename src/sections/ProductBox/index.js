import React, { useEffect, useMemo, useState } from 'react'
import cx from 'classnames'
import { useRouter } from 'frontend-router'
import { ProductBoxContext } from 'Components/ProductBoxContext'
import ProductTinEngraving from 'Components/ProductTinEngraving'
import ProductCarousel from 'Components/ProductCarousel'
import PageWidth from 'Components/PageWidth'
import OkendoReviewStars from 'Components/OkendoReviewStars'
import RingSizingOptions from 'Components/RingSizingOptions'
import Modal from 'Components/Modal'
import ProductStockNote from 'Components/ProductStockNote'
import FloatingForm from 'Components/FloatingForm'
import ProductForm from 'Components/ProductForm'
import ProductBoxPrice from 'Components/ProductBoxPrice'
import ProductBoxShopPay from 'Components/ProductBoxShopPay'
import UpsellPopup from 'Components/UpsellPopup'
import {
  hideRingSizingOptions,
  isBundle,
  hasUpsellPopup,
  getPriceProperties,
} from 'Components/ProductShared'
import { getVisibleMedia, getSelectedMediaIndex } from 'Components/SliderShared'
import { useCartState, useCartActions } from 'frontend-checkout'
import './styles.css'

const productTrackingDataGA = (product, variantToTrack, priceProps, quantity, bundle) => {
  const productsData = [
    {
      name: product.name.replace("'", ''),
      id: (variantToTrack && variantToTrack.externalId) || product.externalId,
      productId: product.externalId,
      productCategory: product.type,
      price: (priceProps && priceProps.price) || '',
      compareAtPrice: (priceProps && priceProps.comparePrice) || '',
      sku: (variantToTrack && variantToTrack.sku) || '',
      brand: (product.vendor && product.vendor.replace("'", '')) || '',
      variantId: (variantToTrack && variantToTrack.externalId) || '',
      variant: (variantToTrack && variantToTrack.name.replace("'", '')) || '',
      quantity: quantity,
    },
  ]
  if (isBundle(product)) {
    // TODO: add each bundled product data to the productsData array
  }
  return productsData
}

const trackGAEvent = (event, product, variantToTrack, priceProps, quantity, bundle) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    const productsData = productTrackingDataGA(
      product,
      variantToTrack,
      priceProps,
      quantity,
      bundle,
    )
    if (event === 'productDetailView') {
      window.dataLayer.push({
        event: event,
        currencyCode: 'USD',
        ecommerce: {
          detail: {
            products: productsData,
          },
          imgURL: product.media[0].details.src,
        },
      })
    } else {
      window.dataLayer.push({
        event: event,
        currencyCode: 'USD',
        ecommerce: {
          add: {
            products: productsData,
          },
          imgURL: product.media[0].details.src,
        },
      })
    }
  }
}

const trackProductDetailViewGA = (product, variantToTrack, priceProps, quantity, bundle) => {
  trackGAEvent('productDetailView', product, variantToTrack, priceProps, quantity, bundle)
}

const trackAddToCartGA = (product, variantToTrack, priceProps, quantity, bundle) => {
  trackGAEvent('addToCart', product, variantToTrack, priceProps, quantity, bundle)
}

const trackAddToCartJU = (product, variantToTrack, priceProps, quantity, fillColor) => {
  if (window && window.juapp) {
    juapp('local', 'prodId', `${product.externalId}`)

    if (isBundle(product)) {
      // TODO: Add each product with seperate juapp('cartItemAdd', ...) calls?
    } else {
      juapp('cartItemAdd', {
        productid: product.externalId,
        variationid: (variantToTrack && variantToTrack.externalId) || '',
        sku: (variantToTrack && variantToTrack.sku) || '',
        name: product.name.replace("'", ''),
        quantity: quantity,
        price: (priceProps && priceProps.price) || '',
        color: product.hasFillColors ? fillColor : '',
        size:
          (variantToTrack &&
            variantToTrack.selectedOptions &&
            variantToTrack.selectedOptions.value) ||
          '',
      })
    }
  }
}

const trackAddToCart = (bundle, product, variantToTrack, variantSelected, quantity, fillColor) => {
  const priceProps = getPriceProperties(bundle, product, variantToTrack, variantSelected)
  trackAddToCartGA(product, variantToTrack, priceProps, quantity, bundle)
  trackAddToCartJU(product, variantToTrack, priceProps, quantity, fillColor)
}

function useOptionSelector({ name, values }) {
  // Frontend product option values are objects rather than strings. This is
  // intentional in order to provide support for other platforms such as
  // BigCommerce which have a externalId for every value.
  //
  // https://lucid.slack.com/archives/C013K8PQLC8/p1599358548093600
  // https://lucid.slack.com/archives/C013K8PQLC8/p1599433276110600
  //
  // This object structure is NOT used in variant.selectedOptions, where each
  // option.value is just the string (as in Shopify). See the findVariant
  // function below. The
  //
  //     selectedOptions[i]._id
  //
  // -seems to match
  //
  //     option.values[i]._id
  //
  // -so it seems that the objects in variant.selectedOptions are equivalent to
  // these non-standard value objects from product.options, but this _id field
  // seems to be internal to Frontend rather than pulled from Shopify.
  values = values.map(({ value }) => ({
    isPlaceholder: false,
    value,
  }))
  values = [
    {
      isPlaceholder: true,
      value: 'Select',
    },
    ...values,
  ]

  // When the placeholder option is selected, isSelected is false.
  // When a non-placeholder option is selected, isSelected is true.
  const [isSelected, setIsSelected] = useState(false)
  const [selectedValue, setSelectedValue] = useState(values[0].value)
  const onChange = event => {
    setIsSelected(true)
    setSelectedValue(event.target.value)
  }

  return {
    isSelected,
    name,
    onChange,
    selectedValue,
    values,
  }
}

function useOptionSelectors({ options }) {
  return options.map(useOptionSelector)
}

function firstVariant(variants) {
  if (!variants || !variants.length) return false
  const variantPositionOne = variants.find(variant => variant.position === 1)
  const first = variantPositionOne !== undefined ? variantPositionOne : variants[0]
  return first
}

function findVariant({ variants }, optionSelectors) {
  // Ensure all options have been selected.
  for (const optionSelector of optionSelectors) {
    if (!optionSelector.isSelected) {
      return null
    }
  }

  const variant = variants.find(variant => {
    if (variant.selectedOptions) {
      return variant.selectedOptions.reduce((result, { name, value }) => {
        if (result) {
          const optionSelector = optionSelectors.find(option => option.name === name)
          return optionSelector.selectedValue === value
        } else {
          return false
        }
      }, true)
    } else {
      return false
    }
  })

  if (variant) {
    console.debug(`Selected variant '${variant.name}'.`)

    return variant
  } else {
    console.debug('No variant matching selected options.')

    return null
  }
}

const getSelectedOptions = optionSelectors => optionSelectors.filter(option => option.isSelected)
const strSpacless = (str = '') => str.replace(' ', '')
const options = selectedOptions =>
  selectedOptions && selectedOptions.length
    ? selectedOptions.reduce((obj, option) => {
        const key = strSpacless(option.name)
        obj[key] = option.selectedValue
        return obj
      }, {})
    : []
const removeUndefinedFromArray = array => array.filter(x => x !== undefined)
const getSelectedVariants = (productVariants, selectedOptions) => {
  const selected = productVariants.filter(variant => {
    const variantSelectedOptions = variant.selectedOptions
    let shouldFilter = true
    if (variantSelectedOptions && selectedOptions) {
      const variantOptions = removeUndefinedFromArray([
        variantSelectedOptions[0] || undefined,
        variantSelectedOptions[1] || undefined,
        variantSelectedOptions[2] || undefined,
      ])
      const test = options(selectedOptions)
      const testValues = removeUndefinedFromArray(
        variantOptions.map(x => x && test[strSpacless(x.name)]),
      )
      const testValue = (value, testValue) => value === testValue
      if (testValues.length === 0) {
        shouldFilter = true
      }
      if (testValues.length === 1) {
        shouldFilter = testValue(testValues[0], variantOptions[0].value)
      }
      if (testValues.length === 2) {
        shouldFilter =
          testValue(testValues[0], variantOptions[0].value) &&
          testValue(testValues[1], variantOptions[1].value)
      }
      if (testValues.length === 3) {
        shouldFilter =
          testValue(testValues[0], variantOptions[0].value) &&
          testValue(testValues[1], variantOptions[1].value) &&
          testValue(testValues[2], variantOptions[2].value)
      }
    }

    return shouldFilter
  })
  console.groupEnd()
  return selected
}

function useVariants(product) {
  const productVariants = product && product.variants
  let defaultVariant = firstVariant(productVariants)

  if (!defaultVariant) {
    return
  }

  const [isSelected, setIsSelected] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(defaultVariant)
  const optionSelectors = useOptionSelectors(product)
  useEffect(
    () => {
      let variant = findVariant(product, optionSelectors)
      const selected = !!variant
      setIsSelected(selected)
      const selectedOptions = getSelectedOptions(optionSelectors)
      const selectedVariants = getSelectedVariants(product.variants, selectedOptions)
      if (!selected) {
        defaultVariant = firstVariant(productVariants)
      }
      setSelectedVariant(variant || defaultVariant)
    },
    optionSelectors.map(optionSelector => optionSelector.selectedValue),
  )

  return {
    isSelected,
    optionSelectors,
    selectedVariant,
  }
}

function selectedVariantIds(variants) {
  return variants.map(variant => {
    if (variant.selectedVariant) {
      return variant.selectedVariant.externalId
    } else {
      return null
    }
  })
}

function useItems(
  quantity,
  product,
  variant,
  bundleVariants,
  fillColor,
  isEngraved,
  engravedMessage,
  engravedTinProductVariant,
) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const newItems = []

    if (isBundle(product)) {
      newItems.push({
        properties: {
          'bundleId': product.externalId,
          'bundlePercentDiscount': product.bundlePercentDiscount,
        },
        id: variant.selectedVariant.externalId,
        quantity,
      })
      bundleVariants.forEach(bundleVariant => {
        newItems.push({
          properties: {
            'bundledBy': product.externalId,
          },
          id: bundleVariant.selectedVariant.externalId,
          quantity,
        })
      })
    } else {
      /**
       * if the product has fill color options, pass the selected fillColor
       * state as a line item property. does not apply to bundles, as custom
       * products are not offered with bundles
       */
      if (product.hasFillColors) {
        newItems.push({
          properties: {
            'Fill Color': fillColor
          },
          id: variant.selectedVariant.externalId,
          quantity,
        })
      } else {
        newItems.push({
          id: variant.selectedVariant.externalId,
          quantity,
        })
      }
    }

    if (isEngraved && typeof engravedTinProductVariant !== 'undefined') {
      newItems.push({
        properties: {
          'Engraved Text': engravedMessage
        },
        id: engravedTinProductVariant.externalId,
        quantity: 1,
      })
    }

    setItems(newItems)
  }, [
    quantity,
    fillColor,
    isEngraved,
    engravedMessage,
    ...selectedVariantIds([variant, ...bundleVariants]),
  ])

  return items
}

const hasCustomTinOption = product => {
  return product.hasCustomTinOption
}

const ProductBox = ({
  selectSizeText = 'Select',
  addToCartText = 'Add to cart',
  addToCartTextFloating = 'Select',
  addToCartTextFloatingSelected = 'Buy Now',
  bundleIncludesText = 'Bundle includes',
  engravedTinProduct,
  fillColorList,
  klaviyoBisButtonText = 'Notify me',
  klaviyoBisSubtitle = 'Register to receive a notification when this item comes back in stock.',
  noTopPadding,
  noBottomPadding,
  product,
  inventory = null, // this prop is specifically so we can test in storybook
  sizingModalButtonText = `Don't know your ring size?`,
  sizingModalOptions = [],
  sizingModalTitle,
  sizingModalVideo,
}) => {
  // console.log('ProductBox', { product }) // debug
  // console.log('ProductBox', JSON.stringify({ product })) // debug in xm and be able to copy paste from console

  // Quantity input
  const [quantity, setQuantity] = useState(1)
  const onQuantityChange = value => {
    setQuantity(parseInt(value))
  }

  const variant = useVariants(product)

  if (!variant) {
    console.error('Product is missing its variants.')
    return null
  }

  // lifted state for FillColorSelector and SubmitButton
  const [fillColor, setFillColor] = useState('')

  // Custom Tin Engraving
  const [isEngraved, setIsEngraved] = useState(false)
  const [canEngrave, setCanEngrave] = useState(false) // Check box is selected but it's not valid until we have text
  const [engravedMessage, setEngravedMessage] = useState('')
  const engravedTinProductVariant =
    typeof engravedTinProduct !== 'undefined' &&
    engravedTinProduct &&
    typeof engravedTinProduct.variants !== 'undefined'
      ? engravedTinProduct.variants[0]
      : false
  // receive updated values from child ProductTinEngraving component
  const onCheckboxChange = canEngrave => {
    setCanEngrave(canEngrave)
    setIsEngraved(canEngrave && engravedMessage !== '')
  }
  const onMessageChange = engravedMessage => {
    setEngravedMessage(engravedMessage)
    setIsEngraved(canEngrave && engravedMessage !== '')
  }

  const bundle = {}
  bundle.products = isBundle(product) ? product.bundledProducts : []
  bundle.variants = isBundle(product)
    ? product.bundledProducts.map(() => {
        return useVariants(product)
      })
    : []
  if (isBundle(product) && bundle.variants.includes(undefined)) {
    console.error('A bundle product is missing its variants.')
    return null
  }
  const isEachVariantSelected = [variant, ...bundle.variants].every(variant => variant.isSelected)
  const isAllOptionsSelected =
    product && variant
      ? product.options.length ===
        variant.optionSelectors.filter(option => option.isSelected === true).length
      : false
  const items = useItems(
    quantity,
    product,
    variant,
    bundle.variants,
    fillColor,
    isEngraved,
    engravedMessage,
    engravedTinProductVariant,
  )

  const [upsellVisible, setUpsellVisible] = useState(false)
  const {
    showCart,
    isProductAvailableForSale,
    getProductQuantity,
    getProductMinOrder,
    getProductMaxOrder
  } = useCartActions()

  // Track Page Views
  const priceProps = getPriceProperties(
    bundle,
    product,
    variant.selectedVariant,
    isEachVariantSelected,
  )
  const router = useRouter()
  useEffect(() => {
    trackProductDetailViewGA(product, variant.selectedVariant, priceProps, quantity, bundle)
  }, [])

  function onCartAdd() {
    trackAddToCart(
      bundle,
      product,
      variant.selectedVariant,
      isEachVariantSelected,
      quantity,
      fillColor,
    )

    if (hasUpsellPopup(product)) {
      setUpsellVisible(true)
    } else {
      showCart()
    }
  }

  const context = useMemo(
    () => ({
      product,
    }),
    [],
  )

  //---------------------------------------------------------
  // get the inventory from the cart State, alias it to cartInventory
  let { inventory: cartInventory = null } = useCartState()
  // console.log('inventory', JSON.stringify(cartInventory)) // debug - warning this is 1.2MB
  // get the cartInventory and cart cartStatus
  let {
    // products: cartProducts = null,
    status: cartStatus,
    productVariants: cartProductVariants = null,
  } = cartInventory
  // Storybook fix
  // We pass in inventory in storybook and use it instead of inventory
  if (inventory && !cartProductVariants) {
    cartProductVariants = inventory.productVariants
  }
  // if the inventory hasn't loaded or we have no inventory set some defaults,
  // we must have some inventory to set various ui elements like the product form and stock note,
  // but don't block the rest of the product box from loading
  let variantsAvailability = []
  let hasVariantsForSale = false
  let selectedVariantForSale = false
  let showStockNote = false // Don't show stock note if we haven't gotten inventory from the cart yet

  if (cartProductVariants || cartStatus !== 'loading') {
    const { selectedVariant } = variant
    const { externalId: selectedVariantExternalId } = selectedVariant
    // Get an array of all the variants for the inventory data
    // and add the externalId as a property of the object so we can look up the availability of each variant
    let allVariants = Object.values(product.variants)
    allVariants.push(selectedVariant)
    allVariants.map(({ externalId }) => {
      variantsAvailability.push({
        ...cartProductVariants[externalId],
        externalId: externalId,
      })
    })

    let variantsForSale
    // have we got some variants that are available for sale
    // by default we don't know which variant is selected so we need to work out if any are available
    // if there are none then we can default to out of stock
    // othewise it will be in stock until a variant is selected
    if (isProductAvailableForSale && isProductAvailableForSale !== undefined) { // New inventory actions don't work in Storybook, so only use this if we have access to it
      variantsForSale = variantsAvailability.filter(
        variant => isProductAvailableForSale({ id: selectedVariantExternalId }) !== false,
      )
    } else {
      variantsForSale = variantsAvailability.filter(
        variant => variant.availableForSale !== false,
      )
    }

    hasVariantsForSale = variantsForSale.length !== 0
    // console.log({ variantsAvailability }) // debug
    // console.log(JSON.stringify(variantsAvailability)) // debug
    // console.log({ variantsForSale }) // debug
    // console.log(JSON.stringify(variantsForSale)) // debug
    // console.log({ hasVariantsForSale }) // debug
    const selectedVariantAvailability = variantsAvailability.find(
      variant => variant.externalId === selectedVariantExternalId,
    )

    if (isProductAvailableForSale && isProductAvailableForSale !== undefined) { // New inventory actions don't work in Storybook, so only use this if we have access to it
      selectedVariantForSale = isProductAvailableForSale({ id: selectedVariantAvailability.externalId })
    } else {
      selectedVariantForSale = selectedVariantAvailability.availableForSale
    }
    showStockNote = true
  }
  const productMedia = getVisibleMedia(product.media)
  const productMediaIndex = getSelectedMediaIndex(productMedia, variant.selectedVariant.media)

  // Anything external to the form that might stop it from being submitted i.e. engraving
  let formIsValid = isEachVariantSelected
  if (!!engravedTinProductVariant && canEngrave && !isEngraved) {
    formIsValid = false
  }
  let availableVariantOptions = true
  if (isAllOptionsSelected && variant.selectedVariant === false) {
    availableVariantOptions = false
  }

  return (
    <section
      className={cx(
        'ProductBox',
        { ['ProductBox--noTopPadding']: !!noTopPadding },
        { ['ProductBox--noBottomPadding']: !!noBottomPadding },
      )}
    >
      <PageWidth>
        <ProductBoxContext.Provider value={context}>
          <div className="ProductBox-container">
            <ProductCarousel
              className="ProductBox-carousel"
              media={productMedia}
              showThumbnails={false}
              slideIndex={productMediaIndex}
            />
            <div className="ProductBox-info">
              <h1 className="ProductBox-title">{product.name}</h1>
              <OkendoReviewStars
                className="ProductBox-reviewStars"
                productId={product.externalId}
              />
              <ProductBoxPrice
                variantSelected={isEachVariantSelected}
                className="ProductBox-price"
                product={product}
                bundle={bundle}
                variant={variant}
              />
              <ProductBoxShopPay
                variantSelected={isEachVariantSelected}
                product={product}
                variant={variant}
              />
              {showStockNote && (
                <ProductStockNote
                  className="ProductBox-stockNote"
                  availableForSale={
                    isEachVariantSelected ? selectedVariantForSale : hasVariantsForSale
                  }
                  availableVariantOptions={availableVariantOptions}
                />
              )}
              {!!variantsAvailability && !!variantsAvailability.length && (
                <React.Fragment>
                  <ProductTinEngraving
                    hasEngravedTinProduct={hasCustomTinOption(product)}
                    onCheckboxChange={onCheckboxChange}
                    onMessageChange={onMessageChange}
                    engravedTinProduct={engravedTinProduct}
                  />
                  <FloatingForm>
                    <ProductForm
                      bundle={bundle}
                      variant={variant}
                      quantity={quantity}
                      onQuantityChange={onQuantityChange}
                      selectSizeText={selectSizeText}
                      addToCartText={addToCartText}
                      addToCartTextFloating={addToCartTextFloating}
                      addToCartTextFloatingSelected={addToCartTextFloatingSelected}
                      isEachVariantSelected={isAllOptionsSelected}
                      availableVariantOptions={availableVariantOptions}
                      items={items}
                      klaviyoBisButtonText={klaviyoBisButtonText}
                      klaviyoBisSubtitle={klaviyoBisSubtitle}
                      product={product}
                      bundleIncludesText={bundleIncludesText}
                      isBundle={isBundle(product)}
                      fillColor={fillColor}
                      setFillColor={setFillColor}
                      fillColorList={fillColorList}
                      onCartAdd={onCartAdd}
                      id="ProductForm"
                      cartInventory={variantsAvailability}
                      formIsValid={formIsValid}
                    />
                  </FloatingForm>
                  <UpsellPopup
                    upsell={product.upsellPopup}
                    visible={upsellVisible}
                    // onClose={onUpsellClose}
                  />
                  {!hideRingSizingOptions(product) ? (
                    <div className="ProductBox-ringSizing">
                      <Modal buttonText={sizingModalButtonText} buttonStyle={'unstyled'}>
                        <RingSizingOptions
                          title={sizingModalTitle}
                          options={sizingModalOptions}
                          video={sizingModalVideo}
                        />
                      </Modal>
                    </div>
                  ) : null}
                </React.Fragment>
              )}
            </div>
          </div>
        </ProductBoxContext.Provider>
      </PageWidth>
    </section>
  )
}

export default ProductBox
