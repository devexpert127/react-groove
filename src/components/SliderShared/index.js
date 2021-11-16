const getSlides = slider => {
  if (!slider) return false
  return slider.querySelectorAll('.Slider__slot')
}
const getLinks = element => {
  if (!element) return false
  return element.querySelectorAll('a')
}
function setTabIndex(elements, hidden = true) {
  elements.forEach(link => {
    link.setAttribute('tab-index', hidden === 'true' || hidden === true ? '-1' : '0')
  })
}
export function updateSlides(sliderEl = null) {
  if (!sliderEl) return
  const slides = getSlides(sliderEl)
  if (slides) {
    slides.forEach(slide => {
      if (!slide) return
      const links = getLinks(slide)
      let hide = slide.ariaHidden
      const hasLinks = links && links.length !== 0
      if (hasLinks) {
        setTabIndex(links, hide)
        // links.forEach(link => console.log(link))
      }
    })
  }
}

export function isGifOrHidden(details) {
  return /\.gif$/.test(details.name) || /hidden/.test(details.alt)
}

export const getVisibleMedia = media => media.filter(({ details }) => !isGifOrHidden(details))

export const getSelectedMediaIndex = (media, selectedMedia) => {
  if (selectedMedia !== undefined && selectedMedia.length) {
    const variantImageIndex = media.findIndex(
      item => item.details.src === selectedMedia[0].details.src,
    )
    return variantImageIndex
  }
  return 0
}

export default () => null
