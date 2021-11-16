import React, { useState } from 'react'
import './styles.css'

const Selector = ({
  selectedOption,
  onChange,
  options = null,
  useLabelForHiddenOption = false,
  useNotSelectedOption = false,
  idPrefix = null,
  label,
  className = '',
  getOptionName = object => object.name,
  getOptionValue = object => object.value,
}) => {
  const handleChange = event => {
    if (!!event.target.value) {
      onChange(event.target.value)
    }
  }

  const toCamelCase = str => str.replace(/[-_]\w/gi, match => match[1].toUppercase())
  const hasLabel = label !== ''
  let inputID = hasLabel ? `${toCamelCase(label)}Selector` : null
  if (idPrefix && idPrefix !== '') {
    inputID = `${idPrefix}${inputID}`
  }
  return (
    <div className={`Selector ${className}`}>
      <div className="Selector-inputWrapper">
        {inputID && (
          <label htmlFor={inputID} className="Selector-inputLabel">
            {label}
          </label>
        )}
        <div className="Selector-selectWrapper">
          <select className="Selector-input" id={inputID} onChange={e => handleChange(e)}>
            {useNotSelectedOption ? (
              <option hidden>{useLabelForHiddenOption && hasLabel ? { label } : 'Select'}</option>
            ) : null}
            {options.map(option => (
              <option key={`${inputID}-${getOptionName(option)}`} value={getOptionValue(option)}>
                {getOptionName(option)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default Selector
