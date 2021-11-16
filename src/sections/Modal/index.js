import React, { useEffect, useState, useRef } from 'react'
import Button from 'Components/Button'
import UIIcon from 'Components/UIIcon'
import { focusTrap } from 'Components/FocusTrap'

import './styles.css'

const Modal = ({
  children,
  buttonText = 'Open Modal',
  buttonStyle = 'primary',
  onOpen = () => {},
  onClose = () => {}
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef()
  const modalButtonRef = useRef()
  const [focus, focusCleanUp] = focusTrap(modalRef)

  const toggleModal = (e) => {
    setIsModalOpen(!isModalOpen)

    if (isModalOpen) {
      if (typeof onClose === 'function') {
        onClose()
      }
      focusCleanUp()
      modalButtonRef.current.focus()
    } else {
      if (typeof onOpen === 'function') {
        onOpen()
      }
      focus()
    }
  }

  const blockToggleModal = (e) => {
    e.stopPropagation()
  }

  useEffect(() => {
    const exitModalOnEsc = (e) => {
      if (e.which == 27) {
        toggleModal()
      }
    }

    if (isModalOpen && !!modalRef && !!modalRef.current) {
      modalRef.current.addEventListener('keydown', exitModalOnEsc)
    }

    return () => {
      if (!!modalRef && !!modalRef.current) {
        modalRef.current.removeEventListener('keydown', exitModalOnEsc)
      }
    }
  }, [isModalOpen])

  return (
    <React.Fragment>
      <Button
        style={buttonStyle}
        as={'button'}
        onClick={toggleModal}
        parentRef={modalButtonRef}
      >
        {buttonText}
      </Button>

      <div
        className={`Modal ${isModalOpen ? '' : 'Modal--hidden'}`}
        onClick={toggleModal}
        role="dialog"
        aria-modal="true"
        ref={modalRef}
      >
        <div
          className="Modal-content"
          onClick={blockToggleModal}
        >
          <button
            className="Modal-close"
            onClick={toggleModal}
          >
            <UIIcon
              icon={UIIcon.Icons.Close}
              isSpan={true}
            >
              Close modal window
            </UIIcon>
          </button>

          {children}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Modal
