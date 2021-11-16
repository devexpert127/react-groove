import React, { useRef, useCallback, useEffect, useState, forwardRef, cloneElement } from 'react'
import cx from 'classnames'
import './styles.css'
const isBrowser = typeof document !== 'undefined'
//--------------------
// debounce function
// NOTE: Adapted from rambdax.
//--------------------
function debounce(fn, ms) {
  let timeout

  return (...input) => {
    const later = () => {
      timeout = null
      fn.apply(null, input)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, ms)
  }
}
//--------------------
// Base form component
// Used by floating form to keep the 2 versions of the form keeping in sync
//--------------------
const BaseForm = forwardRef(({ children = null, floating, visible = true, style }, ref) => {
  if (!children) {
    return null
  }

  const baseClass = 'FloatingForm'
  // clone children to pass on floating property
  const clonedChildren = cloneElement(
    children,
    {
      ...children.props,
      id: `${children.props.id}${floating ? 'Float' : 'NotFloat'}`,
      floating: floating
    },
    null,
  )
  return (
    <div
      ref={ref}
      style={style}
      className={cx(
        baseClass,
        { [`${baseClass}--floating`]: floating },
        { [`${baseClass}--floating-visible`]: floating && visible },
      )}
    >
      {clonedChildren}
    </div>
  )
})
BaseForm.displayName = 'BaseForm' // required for chrome dev tools
//--------------------
// FloatingForm
//--------------------
const FloatingForm = ({ children }) => {
  if (!children) {
    return null
  }

  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrolledPastForm, setScrolledPastForm] = useState(false)
  const [floatingFormOffset, setFloatingFormOffset] = useState(0)
  const formScrollRef = useRef()
  let header = null
  const isScrolledPastForm = formHeight => {
    header = document.getElementsByClassName('Header')[0]

    if (header) {
      let headerHeight = header.offsetHeight

      setFloatingFormOffset(headerHeight)
    }

    setScrolledPastForm(
      formScrollRef.current.getBoundingClientRect().bottom + formHeight <= formHeight,
    )
  }

  const handleScroll = () => {
    if (formScrollRef.current) {
      let formHeight = formScrollRef.current.offsetHeight
      return isScrolledPastForm(formHeight)
    }
  }

  const debouncedScrollHandler = useCallback(debounce(handleScroll, 100), [])
  useEffect(() => {
    if (isBrowser) {
      window.addEventListener('scroll', debouncedScrollHandler, { passive: true })
      window.addEventListener('resize', debouncedScrollHandler)

      return () => {
        window.removeEventListener('scroll', debouncedScrollHandler)
        window.removeEventListener('resize', debouncedScrollHandler)
      }
    }
  }, [])

  // update children with scrolled past prop

  const clonedChildren = cloneElement(
    children,
    {
      ...children.props,
      scrolledPastForm: scrolledPastForm
    },
    null,
  )

  return (
    <React.Fragment>
      <BaseForm floating={false} ref={formScrollRef}>{clonedChildren}</BaseForm>
      <BaseForm floating={true} visible={!!scrolledPastForm} style={{ top: floatingFormOffset }}>
        {clonedChildren}
      </BaseForm>
    </React.Fragment>
  )
}
export default FloatingForm
