import React, { useRef, useState } from 'react'
import cx from 'classnames'
import ResponsiveImage from 'frontend-ui/ResponsiveImage'
import Video from 'frontend-ui/Video'
import { useCartState, useCartActions } from 'frontend-checkout'
import Link from 'frontend-link'
import Slider from 'Components/Slider'
import ProductLabel from 'Components/ProductLabel'
import OkendoReviewStars from 'Components/OkendoReviewStars'
import Button from 'Components/Button'
import Plus from 'Components/IconPlus'
import Close from 'Components/IconClose'
import ProductCardPrice from 'Components/ProductCardPrice'
import { convertId } from 'Components/ProductShared'

import './styles.css'

const PRODUCT_IMAGE_WIDTH = 180
const PRODUCT_IMAGE_HEIGHT = 120

const ProductCard = ({ product, onClick, active }) => {
  const { inventory } = useCartState()
  const [activeSlide, setActiveSlide] = useState(0)

  if (product && product !== undefined) {
    // check for storefront properties first
    const productSlug = !!product.handle ? product.handle : product.slug,
      productName = !!product.title ? product.title : product.name,
      productId = !!product.id ? convertId(product.id) : convertId(product._id),
      productImages = product.images,
      productMedia = product.media,
      productImageEdges = productImages ? productImages.edges : null,
      productOptions = product.options,
      productVariants = product.variants,
      productTags = product.tags,
      href = '/products/' + productSlug,
      mobileSliderRef = useRef(0),
      mobileVariantsFirstElRef = useRef(0),
      mobileVariantsLastElRef = useRef(0),
      [mobileSlideVariant, setMobileSlideVariant] = useState(''),
      [mobileSlideAvailableForSale, setMobileSlideAvailableForSale] = useState(true),
      {
        isProductAvailableForSale,
        getProductQuantity,
        getProductMinOrder,
        getProductMaxOrder,
        addItems,
        showCart,
      } = useCartActions(),
      labelTags = [
        'tag-best-seller',
        'tag-limited-edition',
        'tag-new',
        'tag-sale',
        'tag-bundle-savings',
        'tag-sold-out',
        'tag-back-in-stock',
        'tag-widethin',
      ]

    const checkIfMobile = () => {
      let isMobile = false

      if (typeof window !== 'undefined' && window.innerWidth < 600) {
        isMobile = true
      }

      return isMobile
    }

    function sliderAfterChangeHandler(currentSlide) {
      if (
        currentSlide !== undefined &&
        mobileSliderRef.current.props.children &&
        mobileSliderRef.current.props.children !== undefined
      ) {
        setMobileSlideVariant({
          id: mobileSliderRef.current.props.children[currentSlide].props['data-variant-id'],
          externalId:
            mobileSliderRef.current.props.children[currentSlide].props['data-variant-external-id'],
          price: mobileSliderRef.current.props.children[currentSlide].props['data-variant-price'],
          name: mobileSliderRef.current.props.children[currentSlide].props['data-variant-name'],
          quantity:
            mobileSliderRef.current.props.children[currentSlide].props['data-variant-quantity'],
        })
        setMobileSlideAvailableForSale(
          mobileSliderRef.current.props.children[currentSlide].props['data-available-for-sale'],
        )
      }
    }

    let allowQuickadd = false
    let hasNoQuickaddTag = false
    let allowQuickaddDesktop = false
    let hasNoQuickaddDesktopTag = false

    if (productTags && productTags.length > 0) {
      for (let tag = 0; tag < productTags.length; tag++) {
        let tagDowncase = productTags[tag].toLowerCase()

        if (tagDowncase === 'no-quickadd') {
          hasNoQuickaddTag = true
        }

        if (tagDowncase === 'no-quickadd-desktop') {
          hasNoQuickaddDesktopTag = true
        }
      }
    }

    // No longer checking for 'Size' option – below is the logic used on GL Shopify theme
    if (!hasNoQuickaddTag && productOptions && productOptions.length === 1) {
      allowQuickadd = true
    }

    if (!hasNoQuickaddDesktopTag) {
      allowQuickaddDesktop = true
    }

    async function handleAddItemToCart(variant) {
      if (variant) {
        if (!variant.externalId || variant.externalId === undefined) {
          variant.externalId = convertId(variant.externalId)
        }
        try {
          await addItems({ id: variant.externalId, quantity: 1 })
          trackQuickAddToCart(product, variant, getIsVariantQuantity)
          showCart()
        } catch (e) {
          console.error('handleAddItemToCart error:', e)
        }
      }
    }

    let collectedLabelTag = false
    function haslabelTag(tag) {
      let haslabelTag = false
      if (labelTags.includes(tag) && !collectedLabelTag) {
        haslabelTag = true
        collectedLabelTag = true
      }
      return haslabelTag
    }

    function hasNoInventoryProductVariants(variantId) {
      return (
        typeof window === 'undefined' ||
        !isProductAvailableForSale ||
        !isProductAvailableForSale({ id: variantId })
      )
    }

    function getIsVariantAvailableForSale(variantId) {
      if (hasNoInventoryProductVariants(variantId)) return false
      return isProductAvailableForSale({ id: variantId })
    }

    function getIsVariantQuantity(variantId) {
      if (hasNoInventoryProductVariants(variantId)) return 0
      return getProductQuantity({ id: variantId })
    }

    function handleVariantsMobileKeydown(e) {
      if (document && document !== undefined) {
        if (e.keyCode === 9) {
          // If tabbed

          //Rotate Focus
          if (e.shiftKey && document.activeElement === mobileVariantsFirstElRef.current) {
            // If tabbed in reverse
            e.preventDefault()
            mobileVariantsLastElRef.current.focus()
          } else if (!e.shiftKey && document.activeElement === mobileVariantsLastElRef.current) {
            // If tabbed forward
            e.preventDefault()
            mobileVariantsFirstElRef.current.focus()
          }
        }
      }
    }

    return (
      <li
        {...(!active && checkIfMobile() && { 'aria-hidden': true, tabIndex: '-1' })}
        className={cx('ProductCard', {
          ['ProductCard--allowQuickaddDesktop']: allowQuickaddDesktop,
        })}
      >
        <div className="ProductCard-top">
          {/* check for matching tags and show icon if appropriate */}
          {productTags &&
            productTags.map((tag, i) => {
              if (haslabelTag(tag)) {
                return <ProductLabel label={tag} key={i} />
              }
            })}
          {productMedia && productMedia !== undefined && !productImageEdges && (
            <React.Fragment>
              {/*
               * check if product has properties .images.edges
               * if not, that means it's not from the Storefront API, so
               * use Frontend properties
               */}
              <Slider
                className="ProductCard-slider"
                beforeChange={(_, next) => setActiveSlide(next)}
                arrows
              >
                {product.media
                  .filter(media => !isGifOrHidden(media.details))
                  .map((media, i) => {
                    return (
                      <Slider.Slot key={i}>
                        <ProductCardImageShogun
                          href={href}
                          media={media}
                          active={activeSlide === i}
                          productName={productName}
                        />
                      </Slider.Slot>
                    )
                  })}
              </Slider>
            </React.Fragment>
          )}

          {productImages &&
            productImages !== undefined &&
            !!productImageEdges &&
            productImages.edges.length && (
              <Link
                className="ProductCard-link"
                to={href}
                title={`${productName}: Link to the product detail page`}
                aria-hidden="true"
                tabIndex="-1"
              >
                {/*
                 * check if product has properties .images.edges
                 * if it does, that means it's from the Storefront API, so
                 * use Storefront API properties. additionally, only show the first
                 * image, and don't use slider
                 */}

                <img
                  className="ProductCard-image"
                  src={imageSrc(productImages.edges[0].node.originalSrc, '420x420')}
                  alt={productImages.edges[0].node.altText}
                  loading="lazy"
                />
              </Link>
            )}
          <Link
            className="ProductCard-link"
            to={href}
            title={`${productName}: Link to the product detail page`}
          >
            <h3 className={cx('ProductCard-title', { ['ProductCard-title--hidden']: active })}>
              <span>{productName}</span>
              <span className="ProductCard-linkText">: Link to the product detail page</span>
            </h3>
          </Link>
        </div>

        <div className="ProductCard-meta">
          {productVariants && productVariants.length > 1 && allowQuickadd && (
            <button
              className="Button--primary ProductCard-variantsMobileToggle"
              onClick={onClick}
              onKeyDown={e => {
                handleVariantsMobileKeydown(e)
              }}
              ref={mobileVariantsFirstElRef}
            >
              {active && (
                <React.Fragment>
                  <Close></Close>
                  <span className="ProductCard-variantsMobileToggleText">
                    {productName}: Close quick add options
                  </span>
                </React.Fragment>
              )}
              {!active && (
                <React.Fragment>
                  <Plus></Plus>
                  <span className="ProductCard-variantsMobileToggleText">
                    {productName}: Open quick add options
                  </span>
                </React.Fragment>
              )}
            </button>
          )}

          <div
            className={cx(
              'ProductCard-info',
              { ['ProductCard-info--hidden']: active },
              {
                ['ProductCard-info--hide-hover']:
                  productVariants && productVariants.length > 1 && allowQuickadd,
              },
            )}
          >
            <ProductCardPrice product={product} />

            <React.Fragment>
              {/* Pass a different ID based on whether product is coming from Storefront API */}
              {productImages &&
                productImages !== undefined &&
                !!productImageEdges &&
                productImages.edges.length && <OkendoReviewStars productId={productId} />}
              {productVariants && !productVariants.edges && (
                <OkendoReviewStars productId={product.externalId} />
              )}
            </React.Fragment>
          </div>

          {/*
           * check if the product has properties .edges
           * if it doesn't, that means it's NOT pulled from the Storefront API.
           * so we can infer that this is NOT the related products section.
           * therefore, this code block will only show on sections that are
           * NOT the related products section
           */}
          {productVariants && !productVariants.edges && allowQuickadd && (
            <div
              className={cx('ProductCard-variants-wrapper', {
                ['ProductCard-variants-wrapper--active']: active,
              })}
            >
              <ul className="ProductCard-variants">
                {productVariants.length > 0 &&
                  productVariants.map((variant, i) => (
                    <li className="ProductCard-button-wrapper" key={i}>
                      <Button
                        as="button"
                        className={cx('ProductCard-button', {
                          'ProductCard-button--unavailable': !getIsVariantAvailableForSale(
                            variant.externalId,
                          ),
                        })}
                        disabled={!getIsVariantAvailableForSale(variant.externalId)}
                        onClick={() => {
                          handleAddItemToCart(variant)
                        }}
                      >
                        <span className="ProductCard-buttonTooltip">
                          {getIsVariantAvailableForSale(variant.externalId) ? 'Add' : 'Sold Out'}
                        </span>
                        {getIsVariantAvailableForSale(variant.externalId) ? (
                          <span className="ProductCard-buttonVisuallyHiddenText">to cart </span>
                        ) : null}
                        <span className="ProductCard-buttonVisuallyHiddenText">{productName} </span>
                        <span className="ProductCard-buttonVisuallyHiddenText">Size </span>
                        <span>{variant.name}</span>
                      </Button>
                    </li>
                  ))}
              </ul>

              {/*
               * check if the product has properties .edges
               * if it doesn't, that means it's NOT pulled from the Storefront API.
               * so we can infer that this is NOT the related products section.
               * therefore, this code block will only show on sections that are
               * NOT the related products section
               */}
              {productVariants && !productVariants.edges && allowQuickadd && (
                <div className="ProductCard-variantsMobile">
                  <Button
                    as="button"
                    aria-hidden={!active}
                    tabIndex={!active ? '-1' : '0'}
                    style={!!mobileSlideAvailableForSale ? 'primary' : 'default'}
                    disabled={!mobileSlideAvailableForSale}
                    onClick={() => {
                      handleAddItemToCart(mobileSlideVariant || productVariants[0])
                    }}
                  >
                    {!!mobileSlideAvailableForSale ? 'Add to Cart' : 'Sold Out'}
                    <span className="ProductCard-buttonVisuallyHiddenText"> {productName} </span>
                    <span className="ProductCard-buttonVisuallyHiddenText">
                      Size{' '}
                      {mobileSlideVariant.name ? mobileSlideVariant.name : productVariants[0].name}
                    </span>
                  </Button>

                  <Slider
                    className="ProductCard-slider"
                    PrevArrow={
                      <Slider.ArrowPrev
                        onKeyDown={e => {
                          handleVariantsMobileKeydown(e)
                        }}
                      />
                    }
                    NextArrow={
                      <Slider.ArrowNext
                        parentRef={mobileVariantsLastElRef}
                        onKeyDown={e => {
                          handleVariantsMobileKeydown(e)
                        }}
                      />
                    }
                    afterChange={sliderAfterChangeHandler}
                    ref={mobileSliderRef}
                    beforeChange={(_, next) => setActiveSlide(next)}
                    arrows
                  >
                    {productVariants.length > 0 &&
                      productVariants.map((variant, i) => (
                        <Slider.Slot key={i}>
                          <small
                            data-variant-id={variant.externalId}
                            data-variant-external-id={convertId(variant.externalId)}
                            data-variant-price={variant.price}
                            data-variant-name={variant.name}
                            data-variant-quantity={getIsVariantQuantity(variant.externalId)}
                            data-available-for-sale={getIsVariantQuantity(variant.externalId) > 0}
                            hidden={activeSlide !== i ? true : undefined}
                          >
                            SIZE: <br />
                            {variant.name}
                          </small>
                        </Slider.Slot>
                      ))}
                  </Slider>
                </div>
              )}
            </div>
          )}
        </div>
      </li>
    )
  } else {
    return null
  }
}

function ProductCardImageShogun({ href, media, productName }) {
  if (
    typeof media !== 'undefined' &&
    typeof media.details !== 'undefined' &&
    media.details.src !== ''
  ) {
    if (media.details._type === 'video') {
      return (
        <Video className="ProductCard-video" autoPlay loop muted playsInline>
          <source src={media.details.src} type="video/mp4" />
        </Video>
      )
    } else {
      return (
        <Link
          className="ProductCard-link"
          to={href}
          title={`${productName}: Link to the product detail page`}
          aria-hidden="true"
          tabIndex="-1"
        >
          <ResponsiveImage
            className="ProductCard-image"
            src={media.details.src}
            alt={media.details.alt}
            width={PRODUCT_IMAGE_WIDTH}
            height={PRODUCT_IMAGE_HEIGHT}
            sizes="(min-width: 960px) 20vw, 70vw"
            loading="lazy-polyfill"
          />
        </Link>
      )
    }
  }
  return null
}

function trackQuickAddToCart(product, variant, getIsVariantQuantity) {
  if (window.dataLayer && window.dataLayer !== undefined) {
    let variantToTrack

    if (variant && variant !== undefined) {
      variantToTrack = variant
    } else {
      variantToTrack = product.variants[0]
    }

    window.dataLayer.push({
      event: 'addToCart',
      ecommerce: {
        add: {
          products: [
            {
              name: product.name.replace("'", ''),
              productId: product.externalId,
              variantId: parseInt(variantToTrack.externalId),
              price: variantToTrack.price,
              variant: (variantToTrack && variantToTrack.name.replace("'", '')) || '',
              quantity: 1,
              inventoryCount: getIsVariantQuantity(variantToTrack.externalId),
            },
          ],
        },
      },
    })
  }
}

// TODO: Replace this when Frontend comes up with a built-in solution for
//       responsive images for line items.
//
//       This workaround simply applies a size to the Shopify CDN URL.
function imageSrc(originalSrc, size) {
  return originalSrc.replace(/(\.\w{3,4})(\?.+)?$/, (match, p1, p2) => {
    return `_${size}${p1}${p2 || ''}`
  })
}

function isGifOrHidden(details) {
  return /\.gif$/.test(details.name) || /hidden/.test(details.alt)
}

export default ProductCard
