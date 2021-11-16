import React, { useState } from 'react'
import Button from 'Components/Button'
import PageWidth from 'Components/PageWidth'
import RichText from 'frontend-ui/RichText'
import KlaviyoSubscriptionForm from 'Components/KlaviyoSubscriptionForm'

import './styles.css'

const NewsletterSubscription = ({
  klaviyoId,
  content,
  placeholderText = 'Enter your email address here...',
  buttonText = 'Sign Up',
}) => {
  if (klaviyoId && content) {
    const [uniqueId,] = useState(Math.random().toString(36).substring(6))

    return (
      <section className="NewsletterSubscription">
        <PageWidth>
          <div className="NewsletterSubscription-text">
            <RichText source={content} />
          </div>

          <KlaviyoSubscriptionForm
            className="NewsletterSubscription-form"
            g={klaviyoId}
            renderInput={() => {
              return (
                <div className="NewsletterSubscription-inputs">
                  <label
                    htmlFor="NewsletterSubscription-email"
                    className="NewsletterSubscription-label"
                  >
                    Email
                  </label>
                  <input
                    id={`NewsletterSubscription-email-${uniqueId}`}
                    type="email"
                    name="email"
                    className="NewsletterSubscription-email"
                    placeholder={placeholderText}
                  />
                  <Button
                    className="NewsletterSubscription-button"
                    style="primary"
                    type="submit"
                    name="commit"
                  >
                    {buttonText}
                  </Button>
                </div>
              )
            }}
          />
        </PageWidth>
      </section>
    )
  }

  return null
}

export default NewsletterSubscription
