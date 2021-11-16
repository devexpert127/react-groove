import React from 'react'
import { withKnobs, text, object, boolean } from '@storybook/addon-knobs'
import ProductBox from './'
import App from '../../components/App'
import productsData from '../../static/products.json'
// ToDo: merge with data in products.json
import productTwilightBlossom from '../../static/product-TwilightBlossom.json' // these are four products with products.variants.media turned on.

// ------
// Available for sale Data
// https://frontend.getshogun.com/956ebb91-c687-460a-9d8c-dc07b5b9dbc6/pages/703a4edf-bd0b-4bf3-afcc-96c972a4ef0b
// thin-aspire-leopard-love
import productDataLeopardLoveThin from '../../static/product-LeopardLove-Thin.json'
import inventoryDataLeopardLoveThin from '../../static/inventory-LeopardLove-Thin.json'
import productDataLeopard from '../../static/product-Leopard.json'
import inventoryDataLeopard from '../../static/inventory-Leopard.json'
import productDataOriginalSolidDeepStoneGrey from '../../static/product-OriginalSolidDeepStoneGrey.json'
import inventoryDataOriginalSolidDeepStoneGrey from '../../static/inventory-OriginalSolidDeepStoneGrey.json'
import productDataTropicsAppleWatchBand from '../../static/product-TropicsAppleWatchBand.json'
import inventoryDataTropicsAppleWatchBand from '../../static/inventory-TropicsAppleWatchBand.json'

// ------

export default {
  title: 'Product / Product Box',
  component: ProductBox,
  decorators: [withKnobs],
}

const fillColorList = [
  { name: 'White' },
  { name: 'Black' },
  { name: 'Blue' },
  { name: 'Light Blue' },
  { name: 'Red' },
  { name: 'Gold' },
  { name: 'Orange' },
  { name: 'Yellow' },
  { name: 'No Fill Color' },
]

const engravedTinProduct = {
  name: 'custom-engraved-tin',
  variants: [
    {
      storefrontId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xMzk5Mjk2NDU4NzYw',
      externalId: '120912510984',
      _id: '9f34218f-36ad-4e0b-b72f-cbd777b3fb0d',
    },
  ],
  media: [
    {
      details: {
        alt: 'personalized tin',
        height: 1867,
        name: 'CustomTinILYText.148.png',
        src: 'https://f.shgcdn.com/091f8ab9-390c-4e41-b19e-8e1c5bdbcaa2/',
        storageID: '091f8ab9-390c-4e41-b19e-8e1c5bdbcaa2',
        width: 2800,
        _type: 'image',
      },
    },
  ],
}

const template = args => {
  document.body.style.padding = '0'
  document.body.style.paddingBottom = '400vh' // simulate long scroll page
  return (
    <App>
      <ProductBox {...args} />
    </App>
  )
}

const setProductSwitcherTitle = boolean('Custom productSwitcherTitle', false)
const productSwitcherTitleText = text('productSwitcherTitle', 'Select Your Style')

const getProductFromData = (key = 0, data = productsData) => {
  // Product switcher
  // get the last three products so we don't clash with the current master product
  const productSwitcherProducts = data.slice(0, -3).slice(-4)
  const product = {
    hasCustomTinOption: true,
    upsellPopup: {
      discount: '20%',
      enabled: true,
      messaging: 'Wait... add a Zeus ring for 20% off!',
      product: data[data.length - 1], // last product so it doesn't clash with current product
    },
    productSwitcherProducts: productSwitcherProducts,
    productSwitcherTitle: productSwitcherTitleText,
    ...data[key],
  }
  return product
}

const getInventory = (key, availableForSale = true, data = productsData) => {
  const { variants = null, selectedVariant = null } = getProductFromData(key, data)
  let inventory = {
    products: {},
    productVariants: {},
    loading: 'loaded',
  }
  if (selectedVariant) {
    inventory.productVariants[selectedVariant.externalId] = { availableForSale: availableForSale }
  }
  if (variants) {
    variants.map(variant => {
      inventory.productVariants[variant.externalId] = { availableForSale: availableForSale }
    })
  }
  return inventory
}
// --------------
// Use real product data as a base and then add/update the properties as needed.
//
// productsData[0]: No discount, all variants the same price.
//   - Should show single price, black, no cross out
// --------------
export const productData0 = template.bind({})
productData0.args = {
  product: getProductFromData(0),
  engravedTinProduct: engravedTinProduct,
  linkedProductsTitle: text('Linked Products Title', 'Select Your Style:'),
  fillColorList: object('Fill Color List', fillColorList),
  sizingModalTitle: text('Sizing Modal Title', '3 EASY OPTIONS TO FIND YOUR SIZE:'),
  sizingModalOptions: [
    {
      name: 'Quiz',
      icon: {
        name: 'return',
        svg:
          '<svg aria-hidden="true" focusable="false" role="presentation" class="Icon Icon--utility" viewBox="0 0 490 490"><path d="M108 23.5H21.5A21.4 21.4 0 0 0 0 45v86.6c0 11.8 9.6 21.5 21.4 21.5h86.7c11.8 0 21.4-9.7 21.4-21.5V45c0-11.9-9.6-21.5-21.4-21.5zM14 45c0-4.2 3.3-7.5 7.4-7.5h86.7c4.1 0 7.5 3.3 7.5 7.5v86.6c0 4.1-3.4 7.5-7.5 7.5H21.4a7.5 7.5 0 0 1-7.4-7.5V45zM183.7 60.3H483a7 7 0 0 0 0-14H183.7a7 7 0 0 0 0 14zM183.7 95.3h236.5a7 7 0 0 0 0-14H183.7a7 7 0 0 0 0 14zM483 116.3H183.7a7 7 0 0 0 0 14H483a7 7 0 0 0 0-14zM483 203H183.7a7 7 0 0 0 0 14H483a7 7 0 0 0 0-14zM183.7 252h236.5a7 7 0 0 0 0-14H183.7a7 7 0 0 0 0 14zM483 273H183.7a7 7 0 0 0 0 14H483a7 7 0 0 0 0-14zM483 359.8H183.7a7 7 0 0 0 0 14H483a7 7 0 0 0 0-14zM183.7 408.7h236.5a7 7 0 0 0 0-14H183.7a7 7 0 0 0 0 14zM483 429.7H183.7a7 7 0 0 0 0 14H483a7 7 0 0 0 0-14z"></path><path d="M28 118a7 7 0 0 0 7 7 7 7 0 0 0 5-2L64.7 98 89.6 123a7 7 0 0 0 9.8 0 7 7 0 0 0 0-9.8L74.6 88.3l24.8-24.8a7 7 0 0 0-9.8-9.9L64.8 78.4 39.9 53.6a7 7 0 0 0-9.8 0 7 7 0 0 0 0 10l24.8 24.7L30 113a7 7 0 0 0-2 4.9zM28 431.4a7 7 0 0 0 7 7 7 7 0 0 0 5-2l24.8-24.8 24.8 24.8a7 7 0 0 0 9.8 0 7 7 0 0 0 0-10l-24.8-24.7L99.4 377a7 7 0 0 0 0-9.8 7 7 0 0 0-9.8 0l-24.8 24.8L39.9 367a7 7 0 0 0-9.8 0 7 7 0 0 0 0 9.8l24.8 24.8L30 426.5a7 7 0 0 0-2 5zM108 180.2H21.5A21.4 21.4 0 0 0 0 201.7v86.6c0 11.8 9.6 21.5 21.4 21.5h86.7c11.8 0 21.4-9.7 21.4-21.5v-86.6c0-11.8-9.6-21.5-21.4-21.5zm-94 21.5c0-4.2 3.3-7.5 7.4-7.5h86.7c4.1 0 7.5 3.3 7.5 7.5v86.6c0 4.2-3.4 7.5-7.5 7.5H21.4a7.5 7.5 0 0 1-7.4-7.5v-86.6z"></path><path d="M108 337H21.5A21.4 21.4 0 0 0 0 358.4V445c0 11.9 9.6 21.5 21.4 21.5h86.7c11.8 0 21.4-9.6 21.4-21.5v-86.6c0-11.8-9.6-21.4-21.4-21.4zm-94 21.4c0-4.1 3.3-7.5 7.4-7.5h86.7c4.1 0 7.5 3.4 7.5 7.5V445c0 4.2-3.4 7.5-7.5 7.5H21.4A7.5 7.5 0 0 1 14 445v-86.6zM47.5 280a7 7 0 0 0 11-.6l41.9-61a7 7 0 0 0-1.8-9.6 7 7 0 0 0-9.7 1.8l-36.7 53.5-12-14a7 7 0 0 0-10.6 9.2l18 20.7z"></path></svg>',
        icon: {
          alt: 'Printer',
          mimeType: 'image/svg+xml',
          name: 'icon_printer.svg',
          posterStorageID: null,
          posterUrl: 'https://f.shgcdn.com/%!s(<nil>)/',
          size: 1846,
          src: 'https://f.shgcdn.com/88e0aaf1-b288-4a40-bec7-9bdad13038ef/',
          storageID: '88e0aaf1-b288-4a40-bec7-9bdad13038ef',
          uuid: '0f12b90e-6271-4a02-9192-b7179cd1f249',
          _type: 'video',
        },
      },
      buttonText: 'Take the Quiz',
      buttonLink: '/pages/warranty-new',
      description: [
        {
          children: [{ text: 'I don’t have a ring & I don’t have a clue on my sizing.' }],
          type: 'paragraph',
        },
        {
          children: [{ text: '(Most fun, somewhat accurate, 30 second commitment)' }],
          type: 'paragraph',
        },
      ],
    },
    {
      name: 'App',
      icon: {
        name: 'warranty',
        svg:
          '<svg aria-hidden="true" focusable="false" role="presentation" class="Icon Icon--utility" viewBox="0 0 93.169 93.169"><path d="M64.902 0H28.265c-3.711 0-6.72 3.009-6.72 6.72v79.729c0 3.712 3.008 6.72 6.72 6.72h36.637c3.713 0 6.722-3.008 6.722-6.72V6.72C71.623 3.009 68.615 0 64.902 0zM42.088 3.973h8.991c.323 0 .586.263.586.587 0 .323-.263.586-.586.586h-8.991c-.324 0-.586-.263-.586-.586 0-.324.263-.587.586-.587zm-8.962-1.41c.518 0 .938.42.938.938s-.419.938-.938.938-.938-.42-.938-.938.42-.938.938-.938zm-4.25-.562c.829 0 1.5.672 1.5 1.5s-.671 1.5-1.5 1.5-1.5-.672-1.5-1.5.671-1.5 1.5-1.5zM48.93 89.758h-4.691c-1.488 0-2.693-1.205-2.693-2.691 0-1.487 1.205-2.692 2.693-2.692h4.691c1.488 0 2.693 1.205 2.693 2.692 0 1.486-1.205 2.691-2.693 2.691zm19.847-7.51H24.391V10.92h44.386v71.328z"></path></svg>',
        icon: {
          alt: 'Printer',
          mimeType: 'image/svg+xml',
          name: 'icon_printer.svg',
          posterStorageID: null,
          posterUrl: 'https://f.shgcdn.com/%!s(<nil>)/',
          size: 1846,
          src: 'https://f.shgcdn.com/88e0aaf1-b288-4a40-bec7-9bdad13038ef/',
          storageID: '88e0aaf1-b288-4a40-bec7-9bdad13038ef',
          uuid: '0f12b90e-6271-4a02-9192-b7179cd1f249',
          _type: 'video',
        },
      },
      buttonText: 'Use App',
      buttonLink: '/pages/warranty',
      description: [
        {
          children: [{ text: "I have a ring but I'm OCD and I need to make sure." }],
          type: 'paragraph',
        },
        { children: [{ text: '(Easy, accurate, 2 min commitment)' }], type: 'paragraph' },
      ],
    },
    {
      name: 'Print',
      icon: {
        name: 'order',
        svg:
          '<svg aria-hidden="true" focusable="false" role="presentation" class="Icon Icon--utility" viewBox="0 0 470 484.8"><path d="M375.4,484.8H94.6l8.9-107h263L375.4,484.8z M102.2,477.8h265.6l-7.7-93H109.9L102.2,477.8z M125,464.8 c-2.1,0-4-0.7-5.6-2.1c-1.7-1.5-2.7-3.6-2.9-5.8c-0.3-4.7,3.2-8.8,7.9-9.1l0.1,2.1v-2.1h135.8c4.7,0,8.5,3.8,8.5,8.5 s-3.8,8.5-8.5,8.5H125.5C125.3,464.8,125.2,464.8,125,464.8z M124.9,454.8c-0.8,0.1-1.4,0.8 1.3,1.6c0,0.5,0.3,0.9,0.5,1 c0.2,0.2,0.6,0.4,1.1,0.4l0.2,0h135c0.8,0,1.5-0.7,1.5-1.5s-0.7-1.5-1.5-1.5H124.9z M126.9,439.8c-2.1,0-4-0.7-5.6-2.1 c-1.7-1.5-2.7-3.6-2.9-5.8c-0.2-2.3,0.6-4.5,2.1-6.2c1.5-1.7,3.6-2.7,5.8-2.9l0.2,0h213.7c4.7,0,8.5,3.8,8.5,8.5s-3.8,8.5-8.5,8.5 H127.4C127.2,439.8,127.1,439.8,126.9,439.8z M126.8,429.8c-0.5,0.1-0.8,0.3-0.9,0.5c-0.2,0.2-0.4,0.6-0.4,1.1c0,0.5,0.3,0.9,0.5,1 s0.6,0.4,1.1,0.4l0.2,0h213c0.8,0,1.5-0.7,1.5-1.5s-0.7-1.5-1.5-1.5H126.8z M129,414.8c-2.1,0-4-0.7-5.6-2.1 c-1.7-1.5-2.7-3.6-2.9-5.8c-0.3-4.7,3.2-8.8,7.9-9.1l0.2,0h170.7c4.7,0,8.5,3.8,8.5,8.5s-3.8,8.5-8.5,8.5H129.5 C129.3,414.8,129.2,414.8,129,414.8z M128.9,404.8c-0.8,0.1-1.4,0.8-1.3,1.6c0,0.5,0.3,0.9,0.5,1c0.2,0.2,0.6,0.4,1.1,0.4l0.2,0h170 c0.8,0,1.5-0.7,1.5-1.5s-0.7-1.5-1.5-1.5H128.9z"></path><path d="M85,116.2v60H25c-4.4,0-8.4,2.9-9.6,7.2l-15,50c-0.3,0.9-0.4,1.9-0.4,2.8v160c0.1,2.7,1.1,5.2,3,7.1c1.9,1.8,4.4,2.9,7,3 h74.5l3-35.5v-49.6c0-1.3,0.6-2.6,1.5-3.5l5-5c0.8-0.8,1.9-1.4,3-1.5h275.5c1.3,0,2.6,0.6,3.5,1.5l5,5c0.9,0.9,1.5,2.2,1.5,3.5v49.6 l3,35.4H460c5.5,0,10-4.5,10-10v-70h-50v-20h50v-70c0-0.9-0.1-1.9-0.4-2.8l-15-50c-1.2-4.3-5.2-7.2-9.6-7.2h-60v-60h-15v67.5 c0,2.7-1.1,5.2-3,7.1l-10,10c-1.9,1.9-4.4,3-7,3H120c-2.6,0-5.1-1.1-7-3l-10-10c-1.9-1.9-3-4.4-3-7v-67.6L85,116.2z M99.6,321.2 l-2.1,2.1v38h275v-38l-2-2L99.6,321.2z"></path><path d="M353.5,197h-237V0h237V197z M123.5,190h223V7h-223V190z"></path></svg>',
        icon: {
          alt: 'Printer',
          mimeType: 'image/svg+xml',
          name: 'icon_printer.svg',
          posterStorageID: null,
          posterUrl: 'https://f.shgcdn.com/%!s(<nil>)/',
          size: 1846,
          src: 'https://f.shgcdn.com/88e0aaf1-b288-4a40-bec7-9bdad13038ef/',
          storageID: '88e0aaf1-b288-4a40-bec7-9bdad13038ef',
          uuid: '0f12b90e-6271-4a02-9192-b7179cd1f249',
          _type: 'video',
        },
      },
      buttonText: 'Print Sizer',
      buttonLink: '/pages/order-lookup',
      description: [
        {
          children: [{ text: "I don't have a ring and I have lots of spare time." }],
          type: 'paragraph',
        },
        {
          children: [{ text: '(Boring, slow, extremely accurate (need a printer))' }],
          type: 'paragraph',
        },
      ],
    },
  ],
  sizingModalVideo: `<iframe src="https://player.vimeo.com/video/418197471" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>`,
  inventory: getInventory(0),
}
productData0.storyName = 'Product 0'
// --------------
// Use real product data as a base and then add/update the properties as needed.
//   - Should show single price, black, no cross out
//   productsData[0]: Discounted Product, variants price varies
//     - Should show "$xx.xx", black, no cross out
// --------------
export const productData1 = template.bind({})
productData1.args = {
  ...productData0.args,
  product: getProductFromData(1),
  inventory: getInventory(1),
}
productData1.storyName = 'No Discount, variant price varies'
// --------------
// Use real product data as a base and then add/update the properties as needed.
//   - Should show single price, black, no cross out
//   productsData[2]: Discount, all variants the same price.
//     - Should show sale price in orange. Regular price black and crossed out.
// --------------
export const productData2 = template.bind({})
productData2.args = {
  ...productData0.args,
  product: getProductFromData(2),
  inventory: getInventory(2),
}
productData2.storyName = 'Discount, all variants the same price'
// --------------
// Use real product data as a base and then add/update the properties as needed.
//   - Should show single price, black, no cross out
//   productsData[3]: Discount, variant price varies.
//     - Should show "On sale from $xx.xx" with sale price in orange. Min regular price black and crossed out.
// --------------
export const productData3 = template.bind({})
productData3.args = {
  ...productData0.args,
  product: getProductFromData(3),
  inventory: getInventory(3),
}
productData3.storyName = 'Discount, variant price varies'
// --------------
// Use real product data as a base and then add/update the properties as needed.
//   - Should show discountMessage, single price,black, no cross out
//   productsData[4]: No discount, variant price varies.
//     - Should show "Buy two for $30", orange, regular price black and crossed out
// --------------
export const productData4 = template.bind({})
productData4.args = {
  ...productData0.args,
  product: getProductFromData(4),
  inventory: getInventory(4),
}
productData4.storyName = 'Discount Message'
// --------------
// Use real product data as a base and then add/update the properties as needed.
//   productsData[5]: DiscountMessage, DiscountAmount, all variants same
//     - Should show message with sale price, and originalPrice.
//     - -  "xx% off! $xx.xx", oragne, no cross out,
//     - -  "$xx.xx", orange, no cross out,
// --------------
export const productData5 = template.bind({})
productData5.args = {
  ...productData0.args,
  product: getProductFromData(5),
  inventory: getInventory(5),
}
productData5.storyName = 'Discount Amount (%) + DiscountMessage'
// --------------
// Use real product data as a base and then add/update the properties as needed.
//   productsData[6]: DiscountMessage, DiscountAmount, all variants same
//     - Should show message with sale price, and originalPrice.
//     - -  "$xx off! $xx.xx", oragne, no cross out,
//     - -  "$xx.xx", orange, no cross out,
// --------------
export const productData6 = template.bind({})
productData6.args = {
  ...productData0.args,
  product: getProductFromData(6),
  inventory: getInventory(6),
}
productData6.storyName = 'Discount Amount ($) + DiscountMessage'
// --------------
// Use real product data as a base and then add/update the properties as needed.
//   productsData[7]: Discount, all variants same
//     - Should show 2 prices.
//     - -  "$xx.xx", black, crossed out,
//     - -  ""$xx.xx", orange, no cross out,
// --------------
export const productData7 = template.bind({})
productData7.args = {
  ...productData0.args,
  product: getProductFromData(7),
  inventory: getInventory(7),
}
productData7.storyName = 'Discount, all variants same'
// --------------
// Use real product data as a base and then add/update the properties as needed.
//   - Should show single price, black, no cross out
//   productsData[8]: No discount, all variants the same price.
//     - Should show "$xx.xx", black, no cross out
// --------------
export const productData8 = template.bind({})
productData8.args = {
  ...productData0.args,
  product: getProductFromData(8),
  inventory: getInventory(8),
}
productData8.storyName = 'No discount, all variants the same price'
// --------------
// Use real product data as a base and then add/update the properties as needed.
// //   productsData[9]: Discount used for the Sale testing discounting
// And real sale - this was the birthday sale all rings were $25 but on live site ( not new.groovlife )
// The orange was $25 RINGS, crossed out black was $x.xx
// --------------
export const productData9 = template.bind({})
productData9.args = {
  ...productData0.args,
  product: getProductFromData(9),
  inventory: getInventory(9),
}
productData9.storyName = 'Birthday Promo, $25 RINGS, crossed out black was $x.xx'

// --------------
// Watch band
// Should be no ring sizing modal link
// --------------
export const watchBand = template.bind({})
watchBand.args = {
  ...productData1.args,
  product: getProductFromData(15),
  inventory: getInventory(15),
}
watchBand.storyName = 'Watch Band'
// --------------
// Watch band
// Should be no ring sizing modal link
// --------------
export const ring = template.bind({})
ring.args = {
  ...productData1.args,
  product: getProductFromData(1),
  inventory: getInventory(1),
}
ring.storyName = 'Ring'
// --------------
// Groove belt
// Should be no ring sizing modal link
// --------------
export const belt = template.bind({})
belt.args = {
  ...productData1.args,
  product: getProductFromData(21),
  inventory: getInventory(21),
}
belt.storyName = 'Belt'
// --------------
// eCard
// --------------
export const giftcard = template.bind({})
giftcard.args = {
  ...productData1.args,
  product: getProductFromData(22),
  inventory: getInventory(22),
}
giftcard.storyName = 'Gift Card'

// --------------
// Product with typeColletion, where productSwitcherProducts have not yet been updated
// --------------
export const productSwitcherProducts = template.bind({})
productSwitcherProducts.args = {
  ...productData1.args,
  product: {
    ...getProductFromData(2),
    typeCollection: {
      productSwitcher: {
        products: productsData.slice(0, -3).slice(-4),
      },
      productSwitcherTitle: setProductSwitcherTitle ? productSwitcherTitleText : null,
    },
  },
  inventory: getInventory(2),
}
productSwitcherProducts.storyName = 'TypeCollection, productSwitcherProducts added'
// --------------
// Product with typeColletion, where productSwitcherProducts have not yet been updated
// --------------
export const typeCollection = template.bind({})
typeCollection.args = {
  ...productData0.args,
  product: {
    ...getProductFromData(2),
    typeCollection: {
      productSwitcher: {
        products: productsData.slice(0, -3).slice(-4),
      },
      productSwticherTitle: setProductSwitcherTitle ? productSwitcherTitleText : null,
    },
    productSwitcherTitle: null,
    productSwitcherProducts: null,
  },
  inventory: getInventory(2),
}
typeCollection.storyName = 'TypeCollection, no productSwitcherProducts added'
// --------------
// availableForSale - some variants are available
// --------------
export const allAvailableForSale = template.bind({})
allAvailableForSale.args = {
  product: productsData[1],
  inventory: getInventory(1, true),
}
allAvailableForSale.storyName = 'All Available For Sale'
// --------------
// availableForSale - some variants are available
// --------------
export const noneAvailableForSale = template.bind({})
noneAvailableForSale.args = {
  product: productsData[1],
  inventory: getInventory(1, false),
}
noneAvailableForSale.storyName = 'No variants Available For Sale'
// --------------
// availableForSale - some variants are available
// --------------
export const mixedAvailableForSale = template.bind({})
mixedAvailableForSale.args = {
  product: productDataLeopardLoveThin,
  inventory: inventoryDataLeopardLoveThin,
}
mixedAvailableForSale.storyName = 'Variants Available For Sale ( Leopard Love)'

export const mixedAvailableForSale2 = template.bind({})
mixedAvailableForSale2.args = {
  product: productDataOriginalSolidDeepStoneGrey,
  inventory: inventoryDataOriginalSolidDeepStoneGrey,
}
mixedAvailableForSale2.storyName = 'Variants Available For Sale ( Original Solid Deep Stone Grey )'
export const Leopard = template.bind({})
Leopard.args = {
  product: productDataLeopard,
  inventory: inventoryDataLeopard,
}
Leopard.storyName = 'Variants Available For Sale ( Leopard )'
// --------------
// unavailableVariantOptions - A product that does not have variants for all option combinations. No Narrow/Long options
// --------------
export const unavailableOptions = template.bind({})
unavailableOptions.args = {
  product: productDataTropicsAppleWatchBand,
  inventory: inventoryDataTropicsAppleWatchBand,
}
unavailableOptions.storyName = 'Unavailable variant combinations'
// --------------

// --------------
// Variant Switcher
// Should be no ring sizing modal link
// --------------
const productsAspireData = [
  productTwilightBlossom,
  productDataOriginalSolidDeepStoneGrey,
  productsData[1],
  productsData[2],
  productsData[3],
  productsData[4],
]
export const variantImageSwitcher = template.bind({})
variantImageSwitcher.args = {
  product: getProductFromData(0, productsAspireData),
  inventory: getInventory(0, true, productsAspireData),
}
// --------------
// Bundled Product
// --------------
const bundleProduct = productsData[0]
bundleProduct.storyName = 'Bundle Product'
bundleProduct.bundledProducts = productsData.slice(1, 3)
bundleProduct.bundlePercentDiscount = 15
bundleProduct.hasCustomTinOption = true
bundleProduct.typeCollection = {
  productSwitcher: {
    products: [],
  },
}

export const productBoxBundle = template.bind({})
productBoxBundle.args = {
  engravedTinProduct: engravedTinProduct,
  product: bundleProduct,
}
productBoxBundle.storyName = 'Bundle Product'
