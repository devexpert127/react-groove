import React from 'react'
import { EmailForm } from 'frontend-ui'

const DEFAULT_SUBSCRIPTION_DATA = {
  $fields: '$consent,$source,$method_type,$method_id,$consent_version',
  $list_fields: '$consent',
  $timezone_offset: 3,
  $source: '$embed',
  $method_type: 'Klaviyo Form',
  $method_id: 'embed',
  $consent_version: 'Embed default text',
}
const KLAVIYO_SUBSCRIPTION_URL = 'https://manage.kmail-lists.com/ajax/subscriptions/subscribe'

const KlaviyoSubscriptionForm = ({ children, onSubmitSuccess, g, className, renderInput }) => {
  return (
    <EmailForm
      emailConfig={{
        type: 'klaviyo',
        subscriptionUrl: KLAVIYO_SUBSCRIPTION_URL,
      }}
      onSubmitSuccess={onSubmitSuccess}
      className={className}
    >
      {renderInput ? renderInput() : null}
      {children}
      {Object.keys(DEFAULT_SUBSCRIPTION_DATA).map((key) => (
        <input type="hidden" key={key} name={key} value={DEFAULT_SUBSCRIPTION_DATA[key]} />
      ))}
      <input type="hidden" name="g" value={g} />
    </EmailForm>
  )
}
export default KlaviyoSubscriptionForm
