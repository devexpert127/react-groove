import React, { useState, useRef, useEffect } from 'react'
import ResponsiveImage from 'frontend-ui/ResponsiveImage'
import Link from 'frontend-link'
import PageWidth from 'Components/PageWidth'
import Button from 'Components/Button'

import './styles.css'

const TeamsGrid = ({ teams }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const searchRef = useRef()
  const handleChange = () => {
    setSearchTerm(searchRef.current.value)
  }
  let placeholderText
  let header

  if (teams && teams !== undefined && teams.collectionItem && teams.collectionItem.length > 0) {
    placeholderText = teams.collectionItem[0].name + ', etc...'
  } else {
    placeholderText = 'Patriots, etc...'
  }

  if (
    teams &&
    teams !== undefined &&
    teams.header &&
    teams.header !== undefined &&
    teams.header !== ''
  ) {
    header = teams.header
  } else {
    header = 'Search for your team'
  }

  useEffect(() => {
    const results = teams.collectionItem.filter(team =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setSearchResults(results)
  }, [searchTerm])
  const inputId = "TeamsGrid-filter_Input"
  return (
    <section className="TeamsGrid">
      <PageWidth className="TeamsGrid-filter">
        <h2 className="TeamsGrid-filterTitle">{header}</h2>
        <label htmlFor={inputId}>Search:</label>
        <input
          type="text"
          id={inputId}
          placeholder={placeholderText}
          ref={searchRef}
          value={searchTerm}
          onChange={handleChange}
        />
      </PageWidth>

      <div className="TeamsGrid-grid">
        {searchResults.map((team, i) => (
          <Link className="TeamsGrid-link" to={team.link} key={i}>
            {(team.image || []).src && (
              <ResponsiveImage
                className="TeamsGrid-image"
                src={team.image.src}
                alt={team.image.alt || ''}
                sizes="(min-width: 960px) 20vw, 50vw"
              />
            )}
            <div className="TeamsGrid-buttonWrapper">
              <Button as="span" to={team.link} style="primary" className="TeamsGrid-button">
                {team.name}
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default TeamsGrid
