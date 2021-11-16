import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'frontend-router'
import useSearch from 'frontend-ui/useSearch'
import Button from 'Components/Button'
import PageWidth from 'Components/PageWidth'
import ProductCard from 'Components/ProductCard'
import './styles.css'

let debugHooks = false
const getUseSearch = (hitsPerPage) => debugHooks ? debugHooks.useSearch(hitsPerPage) : useSearch(hitsPerPage)

const Search = ({
  hooks = {},
  hitsPerPage = 20,
  initialQuery = '',
  placeholderText = 'Search',
}) => {
  if (hooks.useSearch && typeof hooks.useSearch === 'function') {
    // only used in Storybook were we don't have access to the real hooks
    debugHooks = hooks
  }
  const { location } = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const inputRef = useRef(null)
  const { fetchMore, hits, pagination, search, status } = getUseSearch({ hitsPerPage })

  useEffect(() => {
    const searchParam = queryParam(location.search)
    if (!!searchParam) {
      setQuery(searchParam)
    }
  }, [location])

  useEffect(() => {
    if (query !== '') {
      search(query)
    }
  }, [query])

  const onSearchChange = e => {
    setQuery(inputRef.current.value)
  }

  return (
    <section className="Search">
      <PageWidth>
        <SearchInput inputRef={inputRef} query={query} onSearchChange={onSearchChange} placeholderText={placeholderText} />
        {status === 'LOADING' && <Loading query={query} />}
        {hasResults(status) && hits.length > 0 && (
          <Pagination hits={hits} pagination={pagination} query={query} />
        )}
        {hasResults(status) && hits.length > 0 && <Results hits={hits} />}
        {status === 'IDLE' && hits.length === 0 && <Empty query={query} />}
        {hasMore(pagination) && <LoadMore fetchMore={fetchMore} status={status} />}
      </PageWidth>
    </section>
  )
}

function queryParam(searchParam) {
  if (typeof window !== 'undefined' && location) {
    return new URLSearchParams(searchParam).get('q')
  } else {
    return false
  }
}

function hasResults(status) {
  return ['FETCHING_MORE', 'IDLE'].includes(status)
}

// NOTE: The page is zero-based (see Algolia).
function hasMore({ page, totalPages }) {
  return totalPages > page + 1 && totalPages > 1
}

function SearchInput({ query, onSearchChange, inputRef, placeholderText }) {
  return (
    <form className="Search-form" action="/search" method="get" aria-owns="search-list">
      <label className="Search-form-label" id="search-label" htmlFor="search">
        Search
      </label>
      <input
        aria-labelledby="search-label"
        aria-autocomplete="list"
        name="query"
        id="search"
        ref={inputRef}
        type="text"
        placeholder={placeholderText}
        value={query}
        onChange={onSearchChange}
      />
    </form>
  )
}

function Loading({ query }) {
  return (
    <div className="Search-loading">
      <p>Loading results for &quot;{query}&quot;...</p>
    </div>
  )
}

function Empty({ query }) {
  return (
    <div className="Search-empty">
      <p>No results found for &quot;{query}&quot;</p>
    </div>
  )
}

function Pagination({ hits, pagination, query }) {
  return (
    <div className="Search-pagination">
      <p>
        Showing <b>{hits.length}</b> of {pagination.totalHits} results for “{query}”
      </p>
    </div>
  )
}

function Results({ hits }) {
  return (
    <div className="Search-results" role="listbox" aria-labelledby="search-label" id="search-list">
      {hits.map((hit, i) => (
        <ProductCard product={hit} key={i} />
      ))}
    </div>
  )
}

function LoadMore({ fetchMore, status }) {
  return (
    <div className="Search-loadMore">
      <Button as="button" disabled={status === 'FETCHING_MORE'} onClick={fetchMore} style="primary">
        Load more
      </Button>
    </div>
  )
}

export default Search
