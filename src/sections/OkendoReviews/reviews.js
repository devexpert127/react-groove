import React, { useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import useStore from 'frontend-store'
import PageWidth from 'Components/PageWidth'
import { fetchReviewStats } from 'Components/OkendoStarRating'
import './styles.css'

if (typeof window !== "undefined") {
  window.okeReviewsWidgetOnInit = function (okendoInitApi) {
    window.okendoInitApi = okendoInitApi;
  }
}

const OkendoReviews = ({ subscriberId = '9a389bb7-f28c-4b43-990a-7ec42d72623b', productId }) => {
  const [, setStore] = useStore()
  const [reviewCount, setReviewCount] = useState(-1)
  const [scriptsLoaded, setScriptsLoaded] = useState(false)
  const [attachOkendoScripts, setAttachOkendoScripts] = useState(false)

  const intersectionRef = useRef(null)
  const pageOffsetYDistance = useRef(null)

  const scrollHandler = () => {
    if (!intersectionRef.current) return
    if (attachOkendoScripts) return

    const { y } = intersectionRef.current.getBoundingClientRect()
    if (pageOffsetYDistance.current >= y) {
      setAttachOkendoScripts(true)
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  })

  useEffect(() => {
    if (!intersectionRef.current) return
    if (pageOffsetYDistance.current) return

    // Calculate review initialization point on pageY
    pageOffsetYDistance.current = document.body.offsetHeight / 2
  }, [intersectionRef.current, pageOffsetYDistance.current])

  useEffect(() => {
    return () => {
      intersectionRef.current = null
      setStore({ okendoReviews: null })
    }
  }, [])

  useEffect(() => {
    if (!attachOkendoScripts) return
    // already loaded everything
    if (scriptsLoaded) return

    if (reviewCount === -1) {
      fetchReviewStats({ subscriberId, productId }).then(res => {
        if (res.error) return
        setStore({ okendoReviews: res })
        setReviewCount(res.count)
      })
    }

    // insufficient reviews
    if (reviewCount < 3) return

    // okendo scripts arent' loaded yet
    if (!window.__ok_loaded) {
      resourcesToLoad.forEach(resource => {
        appendElement(resource)
      })

      window.__ok_loaded = true // don't load again on different page
    }

    // okendo scripts loaded, init the widget
    if (window.okendoInitApi && intersectionRef.current) {
      window.okendoInitApi.initReviewsWidget(intersectionRef.current)
    }

    setScriptsLoaded(true)
  }, [reviewCount, attachOkendoScripts, scriptsLoaded])

  return (
    <PageWidth className={cx('OkendoReviews', { 'is-visible': reviewCount >= 3 })}>
      <script
        type="application/json"
        id="oke-reviews-settings"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            customDomain: 'reviews.nomadgoods.com',
            disableInitialReviewsFetchOnProducts: false,
            gaEventTrackingEnabled: false,
            omitMicrodata: true,
            reviewSortOrder: 'media',
            subscriberId,
          }),
        }}
      ></script>

      {reviewCount >= 3 && <h3 className="OkendoReviews-header">Reviews</h3>}

      <div
        ref={intersectionRef}
        data-oke-reviews-widget
        className={cx("okeReviews","js-okeReviews", { hidden: reviewCount < 3 })}
        data-oke-reviews-product-id={`shopify-${productId}`}
        data-oke-reviews-load-initial-count="3"
      >
        <div data-oke-reviews-version="2.10.13" />
      </div>
    </PageWidth>
  )
}

function appendElement({ tag, props, where }) {
  const elem = document.createElement(tag)
  Object.keys(props).forEach(key => {
    elem[key] = props[key]
  })

  document[where].appendChild(elem)
}

const resourcesToLoad = [
  {
    props: {
      src:
        'https://d3hw6dc1ow8pp2.cloudfront.net/reviewsWidget.min.js?shop=nomadtest.myshopify.com',
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
      href:
        'https://dov7r31oq5dkj.cloudfront.net/9a389bb7-f28c-4b43-990a-7ec42d72623b/widget-style-customisations.css?v=56f37ba6-ddf1-4bf0-8880-99e21dcb3f97',
      rel: 'stylesheet',
    },
    tag: 'link',
    where: 'head',
  },
]

export default OkendoReviews

// Info from Okendo below

<html>
    <head>
        <!-- Okendo main script to boostrap all HTML elements on load -->
        <script>
            (function () {
                function asyncLoad() {
                    // Replace the query param ?shop=<xxx> with the api domain of your shop.
                    var urls = [
                        "https:\/\/d3hw6dc1ow8pp2.cloudfront.net\/reviewsWidget.min.js?shop=okendo-cosmetics.myshopify.com"
                    ];
                    for (var i = 0; i < urls.length; i++) {
                        var s = document.createElement("script");
                        s.type = "text/javascript";
                        s.async = true;
                        s.src = urls[i];
                        var x = document.getElementsByTagName("script")[0];
                        x.parentNode.insertBefore(s, x);
                    }
                }
                if (window.attachEvent) {
                    window.attachEvent("onload", asyncLoad);
                } else {
                    window.addEventListener("load", asyncLoad, false);
                }
            })();
        </script>
​
        <!-- Okendo default stylesheet -->
        <link href="https://d3hw6dc1ow8pp2.cloudfront.net/styles/main.min.css" rel="stylesheet" type="text/css" />
​
        <style type="text/css">
            /* Remove if a Write A Review Button should be hidden */
            .okeReviews .okeReviews-reviewsWidget-header-controls-writeReview {
                display: inline-block;
            }
            /* Remove if empty reviews widget should be hidden */
            .okeReviews .okeReviews-reviewsWidget.is-okeReviews-empty {
                display: block;
            }
            /* Styling for place holder content. Should be removed */
            .container {
                margin: 0 auto;
                max-width: 1200px;
            }
            #oke-starSnippet {
                padding-top: 5px;
            }
        </style>
​
        <!-- Subscriber-specific stylesheet hosted by Okendo. Linked to Okendo Admin/Settings/Widgets - Advanced.
            Important to note: '1ec34ba6-5bcc-4cb7-8506-0f7f27207988' is the store's unique Okendo subscriberId. For the purpose of the demo it will belong to a test store and should be modified when developing for a merchant.
            The store's subscriberId can be found in Okendo Reviews Admin/Settings/Integrations/Credentials/User ID -->
        <link
            rel="stylesheet"
            type="text/css"
            href="https://dov7r31oq5dkj.cloudfront.net/1ec34ba6-5bcc-4cb7-8506-0f7f27207988/widget-style-customisations.css"
        />
        <!-- Subscriber-specific settings. The 'subscriberId' below should also be updated to match the merchant's subscriberId
            'widgetTemplateId' accepts the following values: 'default' | 'featured-media' | 'minimal' | 'carousel'  -->
        <script type="application/json" id="oke-reviews-settings">
            {
                "filtersEnabled": true,
                "omitMicrodata": true,
                "subscriberId": "1ec34ba6-5bcc-4cb7-8506-0f7f27207988",
                "widgetTemplateId": "minimal"
            }
        </script>
    </head>
    <body>
        <div class="container">
            <input placeholder="Enter Product Id" id="oke-productId" />
            <button id="loadReviewsWidget">Load Widgets</button>
​
            <!-- `data-oke-reviews-product-id` is used to determine which product Okendo widgets should load reviews for, and is the product ID in Shopify - prefixed with 'shopify-' -->
            <div
                id="oke-starSnippet"
                data-oke-reviews-product-listing-rating
                data-oke-reviews-product-id="shopify-604889939995"
            ></div>
​
            <div data-oke-reviews-widget-holder data-oke-reviews-product-id="shopify-604889939995">
                <div data-oke-reviews-nav-bar></div>
                <div data-oke-reviews-widget></div>
                <div data-oke-reviews-qanda></div>
            </div>
        </div>
​
        <!-- The following function showcases how Okendo snippets can be configured to display different products by changing the data-oke-reviews-product-id attribute.
            We can also see the window.okeReviewsWidgetOnInit lifecycle hook that gets called once the widget is finished initilizing. This serves as a trigger for custom functions that needs to run after that point.
            However, it should be noted that the window.okeReviewsWidgetOnInit is not needed to initialize the widget. Our main script once loaded will scan through all data-oke-reviews-xxx snippets on the page and bootstrap them by default -->
        <script>
            window.okeReviewsWidgetOnInit = function (okeInitApi) {
                document.getElementById('loadReviewsWidget').onclick = function() {
                    var widgetPlaceholder = document.getElementById('oke-reviewsWidget');
                    var snippetPlaceholder = document.getElementById('oke-starSnippet');
                    var productId = document.getElementById('oke-productId').value;
​
                    widgetPlaceholder.dataset.okeReviewsProductId = productId ? 'shopify-'+  productId : ''
                    snippetPlaceholder.dataset.okeReviewsProductId = productId ? 'shopify-'+  productId : ''
​
                    okeInitApi.initReviewsWidget(widgetPlaceholder);
                    okeInitApi.initStarRatingSummary(snippetPlaceholder);
                };
            }
        </script>
    </body>
</html>
