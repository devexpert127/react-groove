import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import WarrantyRegistration from './'

export default {
  title: 'Integration / Warranty Registration',
  component: WarrantyRegistration,
  decorators: [withKnobs],
}

export const warrantyRegistration = () => {
  return <WarrantyRegistration />
}
