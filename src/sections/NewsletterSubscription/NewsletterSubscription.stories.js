import React from 'react'
import { withKnobs, text, object } from '@storybook/addon-knobs'
import NewsletterSubscription from './'

export default {
  title: 'Newsletter Subscription',
  component: NewsletterSubscription,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
    notes: '',
  },
}

export const newsletterSubscription = () => {
  const content = [
    {
      children: [
        { text: 'Sign up', italic: true },
        { text: ' to get the latest on sales, new releases and more.' },
      ],
      type: 'paragraph',
    },
  ]

  return (
    <NewsletterSubscription
      klaviyoId={text('Klaviyo ID', 'fakeid')}
      placeholderText={text('Placeholder Text', 'Enter your email address here...')}
      buttonText={text('Button Text', 'Sign Up')}
      content={object('Content', content)}
    />
  )
}
