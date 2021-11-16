import React, { useState } from 'react'
import { useProductBoxContext } from 'Components/ProductBoxContext'
import './styles.css'

const ProductFillColorSelector = ({ formId = 'form', fillColor, setFillColor, fillColorList, scrolledPastForm }) => {
  const { product } = useProductBoxContext()
  if (!product.hasFillColors) {
    return null
  }

  const handleFillColor = event => {
    if (!!event.target.value) {
      setFillColor(event.target.value)
    }
  }
  const inputId = `${formId}_fill-color`

  return (
    <div className="ProductBox-variantsWrapper">
      <div className="ProductBox-inputWrapper">
        <label htmlFor={inputId} className="ProductBox-inputLabel">
          Fill Color
        </label>
        <div className="ProductBox-selectWrapper">
          <select
            className="ProductBox-input ProductBox-input--select"
            id={inputId}
            onChange={e => handleFillColor(e)}
          >
            <option hidden>{scrolledPastForm ? 'Fill Color' : 'Select'}</option>
            {fillColorList.map(color => (
              <option key={color.name} value={color.name}>
                {color.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default ProductFillColorSelector
