import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'
import {
  getDiscountCodeFromURL,
  getRedirectPathFromURL
} from './'

export default {
  title: 'DiscountCodeURLShared',
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}

const locationData = {
  hash: '',
  host: 'groovelife.com',
  hostname: 'groovelife.com',
  href: 'https://groovelife.com/discount',
  origin: 'https://groovelife.com',
  pathname: '/discount',
  port: '',
  protocol: 'https:',
  search: ''
}

export const discountCodeFromURL = () => {
  const routerLocation = {
    ...locationData,
    href: "https://groovelife.com/discount/CODE10",
    pathname: "/discount/CODE10",
  }

  const res = getDiscountCodeFromURL(routerLocation)

  if (res == 'CODE10') {
    return (<p style={{color: 'green'}}>getDiscountCodeFromURL pathname: PASS<br/>Result: {res}</p>)
  } else {
    return (<p style={{color: 'red'}}>getDiscountCodeFromURL pathname: FAIL<br/>Result: {res}</p>)
  }
}

export const discountCodeFromURLParameter = () => {
  const routerLocation = {
    ...locationData,
    search: '?code=CODE10'
  }

  const res = getDiscountCodeFromURL(routerLocation)

  if (res == 'CODE10') {
    return (<p style={{color: 'green'}}>getDiscountCodeFromURL with parameter: PASS<br/>Result: {res}</p>)
  } else {
    return (<p style={{color: 'red'}}>getDiscountCodeFromURL with parameter: FAIL<br/>Result: {res}</p>)
  }
}

export const noDiscountCode = () => {
  const routerLocation = {
    ...locationData,
    href: "https://groovelife.com/discount",
    pathname: "/discount",
  }

  const res = getDiscountCodeFromURL(routerLocation)

  if (res === false) {
    return (<p style={{color: 'green'}}>no discount code supplied for getDiscountCodeFromURL: PASS<br/>Result: {res}</p>)
  } else {
    return (<p style={{color: 'red'}}>no discount code supplied for getDiscountCodeFromURL: FAIL<br/>Result: {res}</p>)
  }
}

export const redirectPathFromURL = () => {
  const routerLocation = {
    ...locationData,
    search: '?code=CODE10&redirect=/path/to/redirect/to'
  }

  const res = getRedirectPathFromURL(routerLocation)

  if (res == '/path/to/redirect/to') {
    return (<p style={{color: 'green'}}>getRedirectPathFromURL: PASS<br/>Result: {res}</p>)
  } else {
    return (<p style={{color: 'red'}}>getRedirectPathFromURL: FAIL<br/>Result: {res}</p>)
  }
}

export const redirectPathFromURLNoRedirectParam = () => {
  const routerLocation = {
    ...locationData
  }

  const res = getRedirectPathFromURL(routerLocation)

  if (res == '/') {
    return (<p style={{color: 'green'}}>getRedirectPathFromURL no redirect: PASS<br/>Result: {res}</p>)
  } else {
    return (<p style={{color: 'red'}}>getRedirectPathFromURL no redirect: FAIL<br/>Result: {res}</p>)
  }
}
