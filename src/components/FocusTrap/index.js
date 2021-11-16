const FOCUSABLE_ELEMENT_SELECTORS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex="0"], [contenteditable]'
const KEY_CODE_MAP = {
  TAB: 9
}

const isFocusableElementFocused = (focusableElements) => {
  return [...focusableElements].filter(e => e === document.activeElement).length
}

export const focusTrap = (ref, focusElementRef) => {
  let ele,
    keyboardHandler;

  const focus = () => {
    ele = ref.current
    const focusableElements = ele.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS)
    //There can be containers without any focusable element
    if (focusableElements.length > 0) {
      const firstFocusableEl = focusableElements[0],
            lastFocusableEl = focusableElements[focusableElements.length - 1],
            elementToFocus = (focusElementRef && focusElementRef.current) ? focusElementRef.current : firstFocusableEl;

      /*
        If focus() has been called again because the children of the container have been updated
        we need to keep the focus on the same element instead of jumping it back to the first element.

        If none of the focusable elements are focused then focus the selected one.
      */
      if (!isFocusableElementFocused(focusableElements)) {
        setTimeout(() => {
          elementToFocus.focus()
        }, 1)
      }

      keyboardHandler = function keyboardHandler(e) {
        if (e.keyCode === KEY_CODE_MAP.TAB) {
          //Rotate Focus
          if (e.shiftKey && document.activeElement === firstFocusableEl) {
            e.preventDefault()
            lastFocusableEl.focus()
          } else if (!e.shiftKey && document.activeElement === lastFocusableEl) {
            e.preventDefault()
            firstFocusableEl.focus()
          }
        }
      }
      ele.addEventListener('keydown', keyboardHandler)
    }
  }

  const focusCleanUp = () => {
    if (keyboardHandler && ele) {
      ele.removeEventListener('keydown', keyboardHandler);
    }
  }

  return [
    focus,
    focusCleanUp
  ]
}

export default () => null
