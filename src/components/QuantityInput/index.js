import React, { useState, useRef, useEffect } from 'react'
import './styles.css'

const QuantityInput = ({
  id,
  min = 1,
  max = null,
  label,
  placeholder,
  name,
  onQuantityChange = () => {},
}) => {
  const [value, setValue] = useValue(1, onQuantityChange)
  const onChange = () => {
    setValue(parseInt(event.target.value))
  }
  const onDec = () => {
    if (min) {
      setValue(Math.max(min, value - 1))
    } else {
      setValue(value - 1)
    }
  }
  const onInc = () => {
    if (max) {
      setValue(Math.min(max, value + 1))
    } else {
      setValue(value + 1)
    }
  }

  return (
    <div className="QuantityInput-wrapper">
      <label htmlFor={id} className="QuantityInput-label">
        {label}
      </label>
      <div className="QuantityInput-numberWrapper">
        <button type="button" onClick={onDec} className="QuantityInput-decButton">
          <span>&#45;</span>
        </button>
        <input
          type="number"
          id={id}
          min={min}
          max={max}
          onChange={onChange}
          placeholder={placeholder}
          className="QuantityInput-input"
          value={value}
          name={name}
        />
        <button type="button" onClick={onInc} className="QuantityInput-incButton">
          <span>&#43;</span>
        </button>
      </div>
    </div>
  )
}

function useValue(initialValue, onChange) {
  const [value, setValue] = useState(initialValue)

  return [
    value,
    newValue => {
      setValue(newValue)
      onChange(newValue)
    },
  ]
}

export default QuantityInput
