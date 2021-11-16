import React, { useState } from 'react'
import cx from 'classnames'
import ProductTitle from 'Components/ProductTitle'
import ProductBundleOptionSelectors from 'Components/ProductBundleOptionSelectors'
import ProductOptionSelectors from 'Components/ProductOptionSelectors'
import ProductSubmitButton from 'Components/ProductSubmitButton'
import ProductFillColorSelector from 'Components/ProductFillColorSelector'
import ProductSwitcher from 'Components/ProductSwitcher'
import QuantityInput from 'Components/QuantityInput'
import Modal from 'Components/Modal'
import KlaviyoBackInStockForm from 'Components/KlaviyoBackInStockForm'
import { useCartActions } from 'frontend-checkout'
import { BUTTON_STATES, ERROR_MSG_DURATION } from 'Components/CartShared'
import './styles.css'

function isStacked(variant, hasFillColors, isBundle) {
  let optionCount = variant.optionSelectors.length
  if (hasFillColors) optionCount++

  return !!isBundle || optionCount >= 2
}

const ProductForm = ({
  variant,
  quantity,
  onQuantityChange,
  selectSizeText,
  addToCartText,
  addToCartTextFloating,
  addToCartTextFloatingSelected,
  isEachVariantSelected,
  availableVariantOptions,
  items,
  klaviyoBisButtonText,
  klaviyoBisSubtitle,
  product,
  scrolledPastForm,
  floating,
  isBundle,
  bundle,
  bundleIncludesText,
  fillColor,
  setFillColor,
  fillColorList,
  onCartAdd,
  id = 'ProductForm',
  cartInventory,
  formIsValid = true
}) => {
  // console.log('ProductForm', { product }) // debug
  // console.log('ProductForm', JSON.stringify({ product })) // debug in xm and be able to copy paste from console

  /*
    Note: Button state is not directly the same as disabled.
    The button can be in an idle state and either enabled or disabled.
    It is BUTTON_STATES.IDLE but disabled before a variant has been selected.
  */

  let isValid = false
  // let availableVariantOptions = true
  const { externalId } = (variant || []).selectedVariant || {}
  const { availableForSale } = cartInventory.find(variant => variant.externalId === externalId)
  const canPurchase = isEachVariantSelected && availableForSale
  const productAvailable =
    (canPurchase && product.hasFillColors && !!fillColor) || (canPurchase && !product.hasFillColors)
  const outOfStock = isEachVariantSelected && !availableForSale
  const [buttonState, setButtonState] = useState(BUTTON_STATES.IDLE)
  const { addItems } = useCartActions()

  function clearError() {
    setButtonState(BUTTON_STATES.IDLE)
  }

  async function addItemsToCart() {
    console.debug('Adding items to cart:', items)
    setButtonState(BUTTON_STATES.LOADING)
    try {
      await addItems(items)
      setButtonState(BUTTON_STATES.IDLE)
      onCartAdd()
    } catch (e) {
      console.debug('Error Adding items to cart:', e)
      setButtonState(BUTTON_STATES.ERROR)
      setTimeout(clearError, ERROR_MSG_DURATION) // Remove error message after 3 seconds.
    }
  }

  let productSwitcherProducts = product.productSwitcherProducts
  let productSwitcherTitle = product.productSwitcherTitle
  if (!productSwitcherProducts) {
    if (
      product.typeCollection &&
      product.typeCollection.productSwitcher &&
      product.typeCollection.productSwitcher.products
    ) {
      productSwitcherProducts = product.typeCollection.productSwitcher.products
    }

    if (product.typeCollection && product.typeCollection.productSwitcherTitle) {
      productSwitcherTitle = product.typeCollection.productSwitcherTitle
    }
  }

  isValid = productAvailable && isEachVariantSelected && formIsValid
  // if (isEachVariantSelected && variant.selectedVariant === false) {
  //   availableVariantOptions = false
  // }

  return (
    <div
      className={cx('ProductForm', {
        ['ProductForm--stacked']: isStacked(variant, product.hasFillColors, isBundle),
      })}
      id={id}
    >
      {!!floating && <ProductTitle productTitle={product.name} />}
      {!floating && <ProductSwitcher products={productSwitcherProducts} title={productSwitcherTitle} />}
      <div className="ProductBox-form-selectors">
        <ProductBundleOptionSelectors
          bundle={bundle}
          bundleIncludesText={bundleIncludesText}
          scrolledPastForm={scrolledPastForm}
          floating={floating}
          formId={id}
        />
        <ProductOptionSelectors
          options={variant.optionSelectors}
          scrolledPastForm={scrolledPastForm}
          floating={floating}
          formId={id}
        />
        <ProductFillColorSelector
          fillColor={fillColor}
          setFillColor={setFillColor}
          fillColorList={fillColorList}
          scrolledPastForm={scrolledPastForm}
          formId={id}
        />
        <div className="ProductBox-quantityWrapper">
          <QuantityInput
            id={`${id}_quantity`}
            name="quantity"
            label="Qty"
            value={quantity}
            onQuantityChange={onQuantityChange}
          />
        </div>
        <div className="ProductBox-submit">
          <ProductSubmitButton
            addToCartText={
              !!floating && !isEachVariantSelected
                ? addToCartTextFloating
                : !!floating && isEachVariantSelected
                ? addToCartTextFloatingSelected
                : addToCartText
            }
            selectSizeText={selectSizeText}
            items={items}
            isValid={isValid}
            available={availableVariantOptions}
            buttonState={buttonState}
            onClick={addItemsToCart}
            outOfStock={outOfStock}
            outOfStockComponent={
              <Modal
                buttonText={
                  <React.Fragment>
                    {klaviyoBisButtonText}
                    <span className="Button__hidden"> When Back in Stock</span>
                  </React.Fragment>
                }
              >
                <KlaviyoBackInStockForm
                  title={`${product.name} (${variant.selectedVariant.name})`}
                  subtitle={klaviyoBisSubtitle}
                  currentProductId={product.externalId}
                  currentVariantId={variant.selectedVariant.externalId}
                  id={!!floating ? 'floating' : ''}
                />
              </Modal>
            }
          />
        </div>
      </div>
    </div>
  )
}
export default ProductForm
