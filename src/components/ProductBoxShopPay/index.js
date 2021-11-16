import React from 'react'
import cx from 'classnames'
import ProductPrice from 'Components/ProductPrice'
import { getPriceProperties } from 'Components/ProductShared'
import Modal from 'Components/Modal'
import ShopPayLogo from 'Components/ShopPayLogo'

import './styles.css'

const ProductBoxShopPay = ({ product, variant, variantSelected = false }) => {
  // const priceProps = getPriceProperties(product, variant.selectedVariant, variantSelected)

  // define the lower alternative, set to higher if needed
  let shopPayMessaging = ''
  let shopPayModalMessaging = ''
  let shopPayModalPrice = ''

  shopPayMessaging =
    'Pay in full or in 4 interest-free installments for orders between $50 and $1000 with '

  shopPayModalMessaging =
    'Choose Shop Pay at checkout and pay in full or in 4 interest-free installments for orders '
  shopPayModalPrice = 'between $50 and $1000.'

  if (variant !== undefined) {
    if (variant.selectedVariant.price > 50.0) {
      shopPayMessaging =
        'Pay in full or in 4 interest-free installments of $' +
        (variant.selectedVariant.price / 4).toFixed(2) +
        ' with '

      shopPayModalMessaging =
        'Choose Shop Pay at checkout to pay in full or split your purchase into 4 equal installments of '
      shopPayModalPrice = '$' + (variant.selectedVariant.price / 4).toFixed(2)
    }
  }

  return (
    <div className={'ShopPay'}>
      {shopPayMessaging}
      {shopPayMessaging.indexOf('Choose Shop Pay') == -1 ? <ShopPayLogo /> : false}
      <Modal buttonText={'Learn More About Shop Pay'} buttonStyle={'unstyled'}>
        <div>
          <h1>Pay now or later - It&lsquo;s up to you.</h1>
          <p>
            {shopPayModalMessaging}
            <span className="price">{shopPayModalPrice}</span> *.
          </p>
          <br />
          <p>
            <b>No hidden fees</b>
          </p>
          <p>No interest, no hidden fees, and no impact to your credit score.</p>
          <br />
          <p>
            <b>Make the most of your budget</b>
          </p>
          <p>Automatic payments every two weeks keep things flexible.</p>
          <br />
          <p>
            <sub>
              *Subject to eligibility check and approval. Estimated payment amount excludes taxes
              and shipping fees.
              <a
                href="https://www.affirm.com/licenses"
                target="_blank"
                aria-describedby="shopify-payment-terms-modal-warning-text"
                rel="noreferrer"
              >
                &nbsp;Notice to California Residents
              </a>
            </sub>
          </p>
          <div>
            <ShopPayLogo />
          </div>
          <p>
            <sub>installments in partnership with affirm</sub>
          </p>
        </div>
      </Modal>
    </div>
  )
}

export default ProductBoxShopPay
