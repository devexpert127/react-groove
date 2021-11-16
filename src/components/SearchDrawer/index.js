import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'frontend-router'
import cx from 'classnames'
import useSearch from 'frontend-ui/useSearch'
import DrawerContainer from 'Components/DrawerContainer'
import UIIcon from 'Components/UIIcon'
import './styles.css'

const SearchDrawer = ({
  hooks = {
    useSearch,
  },
  hitsPerPage = 5,
  isOpen,
  onClose,
  placeholderText = 'Search',
}) => {
  const router = useRouter()
  const { hits, pagination, search, status } = hooks.useSearch({ hitsPerPage })
  const [query, setQuery] = useState('')
  const [loaded, setLoaded] = useState(false)
  const debouncedSearch = useCallback(debounce(search, 300), [])
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  const onChange = event => {
    const newValue = event.target.value
    setQuery(newValue)
    debouncedSearch(newValue)
  }

  const onSubmit = event => {
    event.preventDefault()
    if (!!query && query !== '') {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  useEffect(() => {
    if (isOpen) {
      inputRef.current.select()
    }
  }, [isOpen])

  useEffect(() => {
    if (!containerRef?.current) return

    function onAnimationEnds() {
      setLoaded(true)

      containerRef.current.removeEventListener('animationend', onAnimationEnds)
    }

    containerRef.current.addEventListener('animationend', onAnimationEnds)
  }, [isOpen])

  return (
    <DrawerContainer isOpen={isOpen} onClickOut={onClose}>
      <div ref={containerRef} className={cx('SearchDrawer', { loaded })}>
        <div className="SearchDrawer-bar">
          <h2 className="SearchDrawer-searchIcon">
            <UIIcon icon={UIIcon.Icons.Search} isSpan hideChildren>
              Search
            </UIIcon>
          </h2>
          <div className="SearchDrawer-query">
            <form
              action="/search"
              method="get"
              aria-owns={hits.length > 0 ? 'search-drawer-list' : undefined}
              onSubmit={onSubmit}
            >
              <label
                className="SearchDrawer-form-hidden"
                id="search-drawer-label"
                htmlFor="search-drawer"
              >
                Search
              </label>
              <input
                aria-labelledby="search-drawer-label"
                aria-autocomplete="list"
                name="q"
                id="search-drawer"
                ref={inputRef}
                type="text"
                placeholder={placeholderText}
                value={query}
                onChange={onChange}
                {...(!isOpen && { tabIndex: -1 })}
              />
            </form>
          </div>
          <button
            className="SearchDrawer-close"
            onClick={onClose}
            {...(!isOpen && { tabIndex: -1 })}
          >
            <UIIcon className="SearchDrawer-closeButton" icon={UIIcon.Icons.Close} />
            <span className="SearchDrawer-form-hidden">Close search</span>
          </button>
        </div>
        {status !== 'PRISTINE' && (
          <Results hits={hits} pagination={pagination} query={query} status={status} />
        )}
      </div>
    </DrawerContainer>
  )
}

function Results({ hits, pagination, query, status }) {
  if (hits.length === 0 && status !== 'LOADING') {
    return (
      <div className="SearchDrawer-results">
        <p className="SearchDrawer-resultMessage">No results found</p>
      </div>
    )
  }
  if (hits.length === 0 && status === 'LOADING') {
    return (
      <div className="SearchDrawer-results">
        <p className="SearchDrawer-resultMessage">Loading</p>
      </div>
    )
  }
  if (hits.length > 0) {
    return (
      <React.Fragment>
        <div className="SearchDrawer-details">
          <p>
            Showing <b>{hits.length}</b> of {pagination.totalHits} results
          </p>
          <p>
            <a href={`/search?q=${encodeURIComponent(query)}`}>View all results</a>
          </p>
        </div>
        <div className="SearchDrawer-results">
          <ul role="listbox" aria-labelledby="search-drawer-label" id="search-drawer-list">
            {hits.map(hit => (
              <li role="option" className="SearchResult" key={hit.objectID}>
                <a href={`/products/${hit.slug}`}>{hit.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </React.Fragment>
    )
  }
  return null
}

// NOTE: Adapted from rambdax.
function debounce(fn, ms) {
  let timeout

  return (...input) => {
    const later = () => {
      timeout = null
      fn.apply(null, input)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, ms)
  }
}

export default SearchDrawer
