import React, { useRef, useState, useEffect } from 'react'
import { Widget } from '@uploadcare/react-widget'

export const UploadWidget = () => {
  const [uploadedImages, setUploadedImages] = useState([])
  const ref = useRef()

  // useEffect(() => {
  //   console.log(ref)
  // })

  return (
    <>
      <Widget
        ref={ref}
        publicKey={'363c3abf3d5be4d9c36d'}
        cdnBase={'https://assets.frontend.shogun.dev/'}
        onChange={u => {
          setUploadedImages(uis => [u.cdnUrl, ...uis])
        }}
        clearable
      />
      <ul>
        {uploadedImages.map(image => (
          <a key={image} href={image} target="_blank" rel="noopener noreferrer">
            <img src={image} alt="uploadcare image" />
          </a>
        ))}
      </ul>
    </>
  )
}

export default { title: 'Upload Widget', component: UploadWidget }
