import React, { useEffect, useRef, useState } from 'react'
import Button from 'Components/Button'

import './styles.css'

const KlaviyoBackInStockForm = ({
  title,
  subtitle,
  currentProductId,
  currentVariantId,
  buttonText = `Notify me when available`,
  buttonTextSubmitting = `Submitting`,
  errorMessage = `Something went wrong, please try again.`,
  successMessage = `You're in! We'll let you know when it's back.`,
  newsletterSubscribe = `Subscribe to newsletter`,
  id = false
}) => {
  const emailRef = useRef()
  const subscribeRef = useRef()
  const successRef = useRef()
  const errorRef = useRef()
  const [isButtonSubmitting, setIsButtonSubmitting] = useState(false)

  const bis = new KlaviyoBIS('MZ4zYi')

  function buttonHandler(e) {
    e.preventDefault()
    setIsButtonSubmitting(true)
    bis.sendRequest(
      emailRef.current.value,
      currentVariantId,
      currentProductId,
      !!subscribeRef.current ? subscribeRef.current.checked : false,
    )
  }

  function KlaviyoBIS(publicApiKey, newsletterListId = '') {
    this.publicApiKey = publicApiKey
    this.newsletterListId = newsletterListId
  }

  KlaviyoBIS.prototype.requestSuccess = function() {
    successRef.current.classList.remove('KlaviyoBackInStockForm-hide')
    errorRef.current.classList.add('KlaviyoBackInStockForm-hide')
  }

  KlaviyoBIS.prototype.requestError = function() {
    successRef.current.classList.add('KlaviyoBackInStockForm-hide')
    errorRef.current.classList.remove('KlaviyoBackInStockForm-hide')
  }

  KlaviyoBIS.prototype.hasNewsletterId = function() {
    return !!this.newsletterListId
  }

  KlaviyoBIS.prototype.clearMessages = function() {
    successRef.current.classList.add('KlaviyoBackInStockForm-hide')
    errorRef.current.classList.add('KlaviyoBackInStockForm-hide')
  }

  KlaviyoBIS.prototype.sendRequest = function(email, variantId, productId, isSubscribed = false) {
    var _this = this
    var encodedEmail = encodeURIComponent(email)
    var request = new XMLHttpRequest()
    request.open('POST', 'https://a.klaviyo.com/onsite/components/back-in-stock/subscribe', true)
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    request.send(
      `a=${this.publicApiKey}&email=${encodedEmail}&g=${this.newsletterListId}&variant=${variantId}&product=${productId}&platform=shopify&subscribe_for_newsletter=${isSubscribed}`,
    )
    request.onreadystatechange = function() {
      var DONE = 4 // readyState 4 means the request is done.
      var OK = 200 // status 200 is a successful return.
      if (request.readyState === DONE) {
        if (request.status === OK) {
          _this.requestSuccess()
        } else {
          _this.requestError()
        }

        setIsButtonSubmitting(false)
      }
    }
  }
  const componentName = "KlaviyoBackInStockForm";
  const emailInputId = `${componentName}_email${id? `-${id}`: ''}`;
  const signUpId =`${componentName}-newsletterSubscribe`;
  return (
    <div className="KlaviyoBackInStockForm">
      <h3>{title}</h3>
      <p>{subtitle}</p>
      <form action="#">
        <label htmlFor={emailInputId} className={`${componentName}-email-label`}>Email</label>
        <input
          id={emailInputId}
          type="email"
          placeholder="Email"
          ref={emailRef}
          onFocus={() => {
            bis.clearMessages()
          }}
        />
        {bis.hasNewsletterId() && (
          <p className="KlaviyoBackInStockForm-newsletterSubscribeWrapper">
            <input
              type="checkbox"
              id={signUpId}
              ref={subscribeRef}
            />
            <label htmlFor={signUpId}>
              {newsletterSubscribe}
            </label>
          </p>
        )}
        <Button
          onClick={buttonHandler}
          as="button"
          disabled={!!isButtonSubmitting}
          style="primary"
          className="KlaviyoBackInStockForm-submit"
        >
          {isButtonSubmitting ? buttonTextSubmitting : buttonText}
        </Button>
        <div
          className="KlaviyoBackInStockForm-errorMessage KlaviyoBackInStockForm-alert KlaviyoBackInStockForm-hide"
          ref={errorRef}
        >
          <p>{errorMessage}</p>
        </div>
        <div
          className="KlaviyoBackInStockForm-successMessage KlaviyoBackInStockForm-alert KlaviyoBackInStockForm-hide"
          ref={successRef}
        >
          <p>{successMessage}</p>
        </div>
      </form>
    </div>
  )
}

export default KlaviyoBackInStockForm
