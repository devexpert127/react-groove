import React from 'react'
import { withKnobs, text, object } from '@storybook/addon-knobs'
import UIIcon from './'

export default {
  title: 'UI Icon',
  component: UIIcon,
  decorators: [withKnobs],
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
}

export const icon = () => {
  return <UIIcon icon={UIIcon.Icons.Arrow} />
}

export const AllIcons = () => {
  const icons = Object.entries(UIIcon.Icons);
  const items = []

  for (const [key, value] of icons) {
    items.push(
      <div key={key}
        style={{
          margin: "10px",
          padding: "10px",
          backgroundColor: "#EEE",
          fontSize: "12px"
        }}
      >
        <span>{key}</span><br/>
        <code>UIIcon.Icons.{key}</code><br/>
        <UIIcon icon={value} />
      </div>
    )
  }
  return (
    <div
      style={{
        display: "grid",
        "grid-template-columns": "repeat(auto-fill, minmax(300px, 1fr))",
        "grid-auto-rows": "minmax(auto, auto)",
        "grid-gap": '24px',
      }}>
      {items}
  
    </div>
  )
}
