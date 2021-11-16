# Contents

- [ResponsiveImage component](#responsiveimage-component)
- [getResponsiveImageSrc helper](#getresponsiveimagesrc-helper)
- [ResponsiveBackgroundImage component](#responsivebackgroundimage-component)

# ResponsiveImage component

This component is designed to:
- Load appropriately sized images based on device screen width by providing [`srcSet` property](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset) for you.
- Automatically load appropriate [image format](https://uploadcare.com/docs/image_transformations/compression_performance/#operation-format) (e.g. webp when possible) and [quality](https://uploadcare.com/docs/image_transformations/compression_performance/#operation-quality)
- Polyfill [lazy loading](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading) support [when needed](https://caniuse.com/#feat=loading-lazy-attr)

This optimizations only work for images that are uploaded using Shogun Frontend to our cdn. For external images, there's no real benefit of using `ResponsiveImage` component unless you want to lazyload them.

## Configuration

`ResponsiveImage` component accepts all the props that `img` component accepts with this two modifications:

- Prop `loading` defaults to `lazy`, which means that by default images rendered using this component will be lazy loaded. If you want your image to load _immediately_ on page load, use `loading="eager"`
- `srcSet` prop is generated for you to adapt to different screen sizes. Though, if you pass your own `srcSet`, it will be used instead.


### Usage example

Let's say we have a product image on the page that takes about the half of the page width on bigger screens and most of the page width on smaller screens, [like shown in this demo](https://share.getcloudapp.com/ApuAQAPA). This is how we'd implement it:

```jsx
<ResponsiveImage
  className="ProductBox-featuredImage"
  src={variant.images[0]}
  alt={variant.name}
  sizes="(max-width: 767px) 80vw, 40vw"
  loading="eager"
  width="500"
  height="1500"
/>
```

Note that:
- Using the [sizes prop](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes) We're telling the browser that for smaller screens, this image takes about 80% of screen width, for bigger screens it's just 40%. This helps browser load appropriately sized image. Those values don't need to be exact.
- We're using `loading="eager"` to tell the browser to load this image right away and don't try to optimize by lazy loading it.
- We're using [`width`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-width) and [`height`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-height) which is always a good practice if possible.

Let's say on the bottom of the product page we have a full-width image that features some product detail:

```jsx
<ResponsiveImage
  className="ProductBox-featuredImage"
  width="1500"
  height="300"
  src={variant.images[0]}
  alt={variant.name}
/>
```

Note that:
- We're not providing `loading` prop, it will default to lazy and this image will be lazy loaded when and if the user scrolls down.
- We're not providing `sizes` prop, which means browser assumes it will be full width (`100vw`).
- We're providing [`width`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-width) and [`height`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-height) properties, it's _highly_ recommended to do this as it helps the browser properly allocate space for the image being lazy loaded and avoid jumps of content on the page.

# getResponsiveImageSrc helper

`getResponsiveImageSrc` can be used to manually manipulate image urls from our cdn.

## Usage examples

Resize image width and scale height proportionally
```js
getResponsiveImageSrc("https://ucarecdn.com/c5b7dd84-c0e2-48ff-babc-d23939f2c6b4/", { width: "1000" })
// https://ucarecdn.com/c5b7dd84-c0e2-48ff-babc-d23939f2c6b4/-/resize/1000x/
```

Resize the image to exact dimensions
```js
getResponsiveImageSrc("https://ucarecdn.com/c5b7dd84-c0e2-48ff-babc-d23939f2c6b4/", { width: "1000", height: "500" })
// https://ucarecdn.com/c5b7dd84-c0e2-48ff-babc-d23939f2c6b4/-/resize/1000x500/
```

# ResponsiveBackgroundImage component

This component is designed to help you use background images efficiently. It takes care of generating media queries and rendering backgroud images based on screen sizes for you.

## Configuration
`ResponsiveBackgroundImage` component accepts all the props `div` (it renders div behind the scenes) accepts with addition of:

- `srcs: Record<string, string>` - Accepts an object containing key-value pairs of valid media query and image urls.
  - Any value supported by css `@media` expression is supported
  - You can use `default` as a key for top level background-image style (see an example below)
- `alt: string` - similar to `img` `alt` property


## Example

```jsx
import ResponsiveBackgroundImage from 'frontend-ui/ResponsiveBackgroundImage'

export const ProductImage = ({src}) => {
  return (
    <ResponsiveBackgroundImage
      srcs={{
        '(max-width: 768px)': getResponsiveImageSrc(src, { width: '800' }),
        '(min-width: 768px) and (max-width: 1024px)': getResponsiveImageSrc(src, {
          width: '1000',
        }),
        default: getResponsiveImageSrc(src, { width: '1200' }),
      }}
      alt="Our product"
      className="ProductImage-background"
      style={{ width: '600px', height: '300px', backgroundSize: '100%' }}
    />
  )
}
```

Here we tell the component to render three different images for three different screen resolutions, which is going to be rendered as:


```css
// default
.my-img {
  background-image: url("...");
}

@media (max-width: 768px) {
  .my-img {
    background-image: url("...");
  }
}
@media (min-width: 768px) and (max-width: 1024px) {
  .my-img {
    background-image: url("...");
  }
}
```
