import React, { useEffect, useState, useRef } from 'react'
import cx from 'classnames'
import { focusTrap } from 'Components/FocusTrap'
import './styles.css'

const DrawerContainer = ({
  children,
  isOpen,
  onClickOut = () => {},
  scrollLock = true,
  defaultLoaded = false,
}) => {
  const drawerContentRef = useRef()
  const drawerContainerRef = useRef()
  const [top, setTop] = useState(0)
  const [focus, focusCleanUp] = focusTrap(drawerContentRef)
  const [loaded, setLoaded] = useState(defaultLoaded)

  useEffect(() => {
    const { classList, style } = document.body

    if (scrollLock) {
      if (isOpen) {
        setTop(scrollY)
        style.top = `-${scrollY}px`
        classList.add('has-drawer')
      } else {
        classList.remove('has-drawer')
        style.top = ''
        scrollTo({ top })
      }
    }

    return () => {
      classList.remove('has-drawer')
      style.top = ''
    }
  }, [isOpen])

  useEffect(() => {
    const exitDrawerOnEsc = e => {
      if (e.which == 27 && typeof onClickOut === 'function') {
        onClickOut()
      }
    }

    if (isOpen) {
      focus()
      if (!!drawerContainerRef && !!drawerContainerRef.current) {
        drawerContainerRef.current.addEventListener('keydown', exitDrawerOnEsc)
      }
    }

    return () => {
      focusCleanUp()
      if (!!drawerContainerRef && !!drawerContainerRef.current) {
        drawerContainerRef.current.removeEventListener('keydown', exitDrawerOnEsc)
      }
    }
  }, [children, isOpen])

  useEffect(() => {
    if (!drawerContainerRef?.current) return
    const [overlay] = drawerContainerRef.current.children

    function onAnimationEnds() {
      setLoaded(true)

      overlay.removeEventListener('animationend', onAnimationEnds)
    }

    overlay.addEventListener('animationend', onAnimationEnds)
  }, [isOpen])

  return (
    <div
      className={cx('DrawerContainer', { 'is-open': isOpen })}
      aria-hidden={!isOpen}
      ref={drawerContainerRef}
    >
      <div className={cx('DrawerOverlay', { loaded })} onClick={onClickOut}></div>
      <div className="DrawerContent" ref={drawerContentRef}>
        {children}
      </div>
    </div>
  )
}

export default DrawerContainer
