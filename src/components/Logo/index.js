import React from 'react'

import './styles.css'

const Logo = ({ uniqueId = 'logo', }) => {
  const titleId = `${uniqueId}-title`
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="Logo" viewBox="0 0 326.3 49.4" role="img" aria-labelledby={`${titleId}`}>
      <title id={titleId}>Groove Life logo</title>
      <path
        d="M111 39.6l-5.3-11.1h-2.5v11.1H96V9.8h11.8c6.6 0 10.2 4.7 10.2 9.6 0 4.1-2.5 6.6-4.9 7.8l6.4 12.4H111zm-3.6-23.2h-4.1v6h4.1c2 0 3.2-1.5 3.2-3s-1.2-3-3.2-3zM141.1 36.5c-2.2 2.2-4.7 3.3-8.3 3.3s-6.2-1.2-8.3-3.3c-3.1-3.1-3-7.3-3-11.8s-.1-8.7 3-11.8c2.2-2.2 4.7-3.3 8.3-3.3s6.2 1.2 8.3 3.3c3.1 3.1 3 7.3 3 11.8s.2 8.7-3 11.8zm-5.4-19.1c-.5-.7-1.6-1.3-2.9-1.3s-2.4.6-2.9 1.3c-.7.9-1.1 1.9-1.1 7.3s.4 6.4 1.1 7.3c.5.7 1.6 1.3 2.9 1.3s2.4-.6 2.9-1.3c.7-.9 1.1-1.8 1.1-7.3s-.4-6.4-1.1-7.3zM167.9 36.5c-2.2 2.2-4.7 3.3-8.3 3.3-3.6 0-6.2-1.2-8.3-3.3-3.1-3.1-3-7.3-3-11.8s-.1-8.7 3-11.8c2.2-2.2 4.7-3.3 8.3-3.3 3.6 0 6.2 1.2 8.3 3.3 3.1 3.1 3 7.3 3 11.8s.1 8.7-3 11.8zm-5.4-19.1c-.5-.7-1.6-1.3-2.9-1.3s-2.4.6-2.9 1.3c-.7.9-1.1 1.9-1.1 7.3s.4 6.4 1.1 7.3c.5.7 1.6 1.3 2.9 1.3s2.4-.6 2.9-1.3c.7-.9 1.1-1.8 1.1-7.3s-.4-6.4-1.1-7.3zM187.8 39.6h-5.4l-9.8-29.8h7.6l5 16.7 4.9-16.7h7.6l-9.9 29.8zM200.7 39.6V9.8H221v6.5h-13v5h11v6.5h-11V33h13v6.5h-20.3zM235.4 39.6V9.8h7.3v23.3h12.5v6.5h-19.8zM259.5 39.6V9.8h7.3v29.8h-7.3zM280.2 16.4v5.2h11v6.5h-11v11.5h-7.3V9.8h20.3v6.5h-13zM297 39.6V9.8h20.3v6.5h-12.9v5h11v6.5h-11V33h12.9v6.5H297zM88.7 36.5c-2.6 2.6-5.4 3.3-8.7 3.3-3.5 0-6.1-1.2-8.3-3.3-3.1-3.1-3-7.3-3-11.8s-.1-8.7 3-11.8c2.2-2.2 4.7-3.3 8.3-3.3 7.7 0 10.9 5 11.6 9.9h-7.4c-.6-2.3-1.8-3.3-4.3-3.3-1.3 0-2.3.6-2.9 1.3-.7.9-1.1 1.9-1.1 7.3s.4 6.5 1.1 7.4c.5.7 1.5 1.3 2.9 1.3 1.5 0 2.6-.5 3.3-1.2.8-.8 1.1-2 1.1-3.2v-.4h-4.4v-6.1h11.7v4.1c.1 4.7-.6 7.5-2.9 9.8zM31.5 39.6l10.3-26.7H24.2L21.1 21l6.9.1-1.6 4.1H11.9c-.9 0-1.4-.6-1.7-.9-.2-.3-.6-1-.2-1.9l4.4-11.3c.3-.8 1.1-1.3 1.9-1.3H43L46.8 0H16.2c-4.8 0-9.3 3.1-11 7.6L.8 18.9c-1.4 3.6-.9 7.7 1.3 11C4.3 33.1 8 35 11.9 35h10.8l-3.8 10-1.7 4.4h34.3l3.8-9.8H31.5z"
        fill="currentColor"
      />
      <g>
        <path
          d="M321.8 10.2V13h-.4v-2.8h-.9v-.4h2.2v.4h-.9zm4.1 2.8v-2.7l-1.1 2.7h-.1l-1.1-2.7V13h-.4V9.8h.6l.9 2.3.9-2.3h.6V13h-.3z"
          fill="currentColor"
        />
      </g>
    </svg>
  )
}

export default Logo
