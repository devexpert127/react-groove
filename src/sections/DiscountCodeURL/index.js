/*
  DiscountCodeURL component is not related to the Discounts CMS group or any of the logic behind calculating discounts in products.
  This component is a fix for Shopify's discount URL that accepts a code and applies it in the checkout.

  Customer flow:
  1. The customer clicks on a discount link in an email or types it into the browser.
  2. This discount link looks like `discount/CODE10` where `CODE10` is the discount code to be added to the cart.
  3. Shoguns DNS setup (Fastly) will take take the code from the URL and redirect to this page sending the code as a URL parameter. i.e. `/discount?code=CODE10`
  4. The component will gather the code from the URL parameter and store it in local storage.
  5. The customer will be redirected to the homepage.
  6. The CartDrawer component will collect the code from local storage and add it to the checkout button URL.
  7. When the customer clicks the checkout button we remove the discount code from local storage. This is so we don't end up reaplying the code once it has been used.
     Once the code has been added Shopify will still keep this as long as the cart is kept in the session. Or the customer can add it again if they have left it unused long enough.

  Features and notes:
  - This component will be added to a standalone page with no other sections.
  - Any discount code added this way will take precedence over a global discount code added by a site wide discount.
  - Any extra URL parameters given to the original discount URL will be preserved by Shogun/Fastly and handed over.
  - If a redirect URL paremter with another URL is given it will redirect to that page instead of the homepage. e.g. `/discount?code=CODE10&redirect=/product/product-slug`
  - Use shared DiscountCodeURL functions and extract anything from the cartDrawer into it to keep all the business logic together.

  Bonus UX features to consider:
  - Flash message in the cart to confirm to the customer that the discount has been gathered and will be applied to the checkout.
    Flash message is stored in local storage and is removed once used by the cart.
  - Cart drawer opens after redirect to display the flash message.
*/

import React from 'react'
import { useRouter } from 'frontend-router'
import PageWidth from 'Components/PageWidth'
import Link from 'frontend-link'
import {
  storeDiscountCode,
  getDiscountCodeFromURL,
  getRedirectPathFromURL
} from 'Components/DiscountCodeURLShared'

import './styles.css'

const DiscountCodeURL = ({ debugCode, debugBlockRedirect }) => {
  if (typeof window !== 'undefined') {
    const router = useRouter()
    const routerLocation = router.location
    const code = getDiscountCodeFromURL(routerLocation, debugCode)
    const redirectPath = getRedirectPathFromURL(routerLocation)
    if (!!code) {
      storeDiscountCode(code)
      if (!debugBlockRedirect) {
        router.push(redirectPath)
      }
    }
  }

  return (
    <section className="DiscountCodeURL">
      <PageWidth>
        <div className="DiscountCodeURL-content">
          <p>If you are seeing this message you have not been redirected. <Link to="/">Head back to the homepage by clicking here</Link>.</p>
        </div>
      </PageWidth>
    </section>
  )
}

export default DiscountCodeURL
