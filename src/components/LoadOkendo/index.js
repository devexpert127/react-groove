import { useEffect, useRef } from 'react'

const subscriberId = 'ce368659-4a86-4ae4-b46b-b809043f8999' // debug: '1ec34ba6-5bcc-4cb7-8506-0f7f27207988'
const resourcesToLoad = [
  {
    props: {
      src:
        'https://d3hw6dc1ow8pp2.cloudfront.net/reviewsWidget.min.js?shop=groove-rings.myshopify.com',
      async: true,
    },
    tag: 'script',
    where: 'body',
  },
  {
    props: {
      href: 'https://d3hw6dc1ow8pp2.cloudfront.net/styles/main.min.css',
      rel: 'stylesheet',
    },
    tag: 'link',
    where: 'head',
  },
  {
    props: {
      href: `https://dov7r31oq5dkj.cloudfront.net/${subscriberId}/widget-style-customisations.css`,
      rel: 'stylesheet',
    },
    tag: 'link',
    where: 'head',
  },
  {
    props: {
      type: 'application/json',
      id: 'oke-reviews-settings'
    },
    content: `
      {
        "filtersEnabled": true,
        "omitMicrodata": true,
        "subscriberId": "${subscriberId}",
        "widgetTemplateId": "minimal"
      }
    `,
    tag: 'script',
    where: 'body',
  },
]

const appendElement = ({ tag, props, where, content }) => {
  const elem = document.createElement(tag)
  Object.keys(props).forEach(key => {
    elem[key] = props[key]
  })

  if (content) {
    elem.innerHTML = content
  }

  document[where].appendChild(elem)
}

const loadOkendoScripts = () => {
  if (typeof window !== 'undefined') {
    window.okeReviewsWidgetOnInit = function (okendoInitApi) {
      window.okendoInitApi = okendoInitApi;
    }
  }

  resourcesToLoad.forEach(resource => {
    appendElement(resource)
  })
}

export function useLoadOkendo() {
  const isOrderLookupLoaded = useRef(false)

  useEffect(() => {
    if (!isOrderLookupLoaded || !isOrderLookupLoaded.current) {
      loadOkendoScripts()
      isOrderLookupLoaded.current = true
    }
  }, [])
}

export default () => null
