const DISCOUNTCODEKEY = 'discountCode'
const CARTFLASHKEY = 'cartFlash'
export const discountCodeMessage = (code) => `Your discount code <code>${code}</code> has been received and will be applied the next time you visit the&nbsp;checkout!`

// Utillities
export const getLocalStorage = (key) => {
  if (typeof window !== 'undefined') {
    return JSON.parse(window.localStorage.getItem(key))
  }
}

export const setLocalStorage = (key, value) => {
  // Possible todo: use `import useStore from 'frontend-store'` instead of local storage
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}

export const getURLParam = (routerLocation, key) => {
  return new URLSearchParams(routerLocation.search).get(key)
}

// Flash message
export const setCartFlashMessage = (id, message, vewied = false) => {
  setLocalStorage(`${CARTFLASHKEY}-${id}`, {
    id,
    message,
    vewied
  })
}

export const unsetCartFlashMessage = (id) => {
  setLocalStorage(`${CARTFLASHKEY}-${id}`, false)
}

export const getCartFlashMessage = (id) => {
  return getLocalStorage(`${CARTFLASHKEY}-${id}`)
}

export const cartFlashMessageWasViewed = (id) => {
  const flash = getCartFlashMessage(id)
  setCartFlashMessage(flash.id, flash.message, true)
}

// Discount code
export const storeDiscountCode = (code) => {
  setLocalStorage(DISCOUNTCODEKEY, code)
  setCartFlashMessage(DISCOUNTCODEKEY, discountCodeMessage(code))
}

export const getStoredDiscountCode = () => {
  return getLocalStorage(DISCOUNTCODEKEY)
}

export const removeStoredDiscountCode = () => {
  setLocalStorage(DISCOUNTCODEKEY, false)
  unsetCartFlashMessage(DISCOUNTCODEKEY)
}

export const getDiscountCodeFromURLPath = (pathname) => {
  const pathnameParts = pathname.split('/').filter((i) => i !== '')
  const lastPathnamePart = pathnameParts[pathnameParts.length - 1]
  return (pathnameParts.length > 1 && lastPathnamePart.indexOf('.') === -1) ? lastPathnamePart : false
}

export const getDiscountCodeFromURL = (routerLocation, debugCode) => {
  if (!!debugCode) return debugCode
  const codeFromParam = getURLParam(routerLocation, 'code')
  if (!!codeFromParam) {
    return codeFromParam
  } else {
    return getDiscountCodeFromURLPath(routerLocation.pathname)
  }
}

// Redirect
export const getRedirectPathFromURL = (routerLocation) => {
  return getURLParam(routerLocation, 'redirect') || '/'
}

export default () => null
