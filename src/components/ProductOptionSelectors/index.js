import React from 'react'
import slugify from 'Components/Slugify'
import './styles.css'

const ProductOptionSelectors = ({ formId = 'form', options, scrolledPastForm, floating }) => {
  return (
    <React.Fragment>
      {options.map((option, i) => {
        const inputId = `${formId}_${slugify(option.name)}`
        return (
          <div className="ProductBox-variantsWrapper" key={option.name}>
            <div className="ProductBox-inputWrapper">
              <label htmlFor={inputId} className="ProductBox-inputLabel">
                {option.name}
              </label>
              <div className="ProductBox-selectWrapper">
                <select
                  className="ProductBox-input ProductBox-input--select"
                  id={inputId}
                  onChange={option.onChange}
                  value={option.selectedValue}
                >
                  {option.values.map(({ isPlaceholder, value }, i) => (
                    <option disabled={isPlaceholder} hidden={isPlaceholder} key={i} value={value}>
                      {floating && isPlaceholder ? option.name : value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )
      })}
    </React.Fragment>
  )
}
export default ProductOptionSelectors
