import React, { useState } from 'react'
import UIIcon from 'Components/UIIcon'
import { ResponsiveImage } from 'frontend-ui'

import './styles.css'

const ProductTinEngraving = ({
  hasEngravedTinProduct,
  onCheckboxChange = () => {},
  onMessageChange = () => {},
  addEngravingText = 'Add Custom Engraved Case - $9.95',
  engravedTinProduct,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [isEngraved, setIsEngraved] = useUpdatedValues(false, onCheckboxChange)
  const [engravedMessage, setEngravedMessage] = useUpdatedValues('', onMessageChange)
  const engravedTinProductThumbnailSrc =
    typeof engravedTinProduct !== 'undefined' &&
    engravedTinProduct &&
    typeof engravedTinProduct.media !== 'undefined'
      ? engravedTinProduct.media[0].details.src
      : false
  const engravedTinProductThumbnailAlt =
    typeof engravedTinProduct !== 'undefined' &&
    engravedTinProduct &&
    typeof engravedTinProduct.media !== 'undefined'
      ? engravedTinProduct.media[0].details.alt
      : false
  const onChildCheckboxChange = () => {
    setIsEngraved(event.target.checked)
  }
  const onChildMessageChange = () => {
    setEngravedMessage(event.target.value)
  }

  if (hasEngravedTinProduct) {
    return (
      <div className="TinEngraving">
        <div className="TinEngraving-container">
          <label className="TinEngraving-label" htmlFor="TinEngraving">
            <input
              className="TinEngraving-checkbox"
              type="checkbox"
              name="TinEngraving"
              id="TinEngraving"
              defaultChecked={isEngraved}
              onChange={onChildCheckboxChange}
            />
            {addEngravingText}
          </label>
          {!!engravedTinProductThumbnailSrc && (
          <button
            className="TinEngraving-modalTrigger"
            aria-label="More info"
            aria-expanded="false"
            aria-describedby="TinEngraving-modal"
            onMouseEnter={(e) => {
              e.currentTarget.ariaExpanded = true;
              setShowModal(true);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.ariaExpanded = false;
              setShowModal(false);
            }}
            onFocus={(e) => {
              e.currentTarget.ariaExpanded = true;
              setShowModal(true);
            }}
            onBlur={(e) => {
              e.currentTarget.ariaExpanded = false;
              setShowModal(false);
            }}
          >
            <UIIcon className="TinEngraving-infoIcon" icon={UIIcon.Icons.Info} isSpan>
              More info
            </UIIcon>
          </button>
          )}
        </div>
        {!!engravedTinProductThumbnailSrc && (
        <div
          id="TinEngraving-modal"
          className="TinEngraving-modal"
          hidden={!showModal}
          role="tooltip">
          <ResponsiveImage
            src={engravedTinProductThumbnailSrc}
            width="2800"
            height="1867"
            loading="lazy"
            sizes="300px"
            alt="" />
          <p className="TinEngraving-imageDescription">{engravedTinProductThumbnailAlt}</p>
        </div>
        )}
        {isEngraved && (
          <div className="TinEngraving-textContainer" id="TinContainer">
            <input
              className="TinEngraving-textInput"
              type="text"
              name="tinText"
              maxLength="30"
              id="TinText"
              placeholder="Please enter the text to be engraved"
              value={engravedMessage}
              onChange={onChildMessageChange}
            />
          </div>
        )}
      </div>
    )
  }

  return null
}

function useUpdatedValues(initialValue, onChange) {
  const [updatingValue, setUpdatingValue] = useState(initialValue)

  return [
    updatingValue,
    updatedValue => {
      setUpdatingValue(updatedValue)
      onChange(updatedValue)
    },
  ]
}

export default ProductTinEngraving
