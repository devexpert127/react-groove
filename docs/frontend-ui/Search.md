# useSearch hook

This hook allows you search products using Algolia

## Configuration

`useSearch` hook allows you to configure how many items you want result page to include.

| Name        | Required | Type   | Default value | Description                                               |     |
| ----------- | -------- | ------ | ------------- | --------------------------------------------------------- | --- |
| hitsPerPage | -        | number | 20            | Controls the number of entries per page in search results |     |

## Return values

`useSearch` hook returns an object containing 7 keys:

| Name         | Type                                                                                                           | Description                                                |     |
| ------------ | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | --- |
| status       | 'PRISTINE' \| 'IDLE' \| 'ERRORED' \| 'LOADING' \| 'FETCHING_MORE'                                              | Status of performed search operation                       |     |
| statuses     | { PRISTINE: 'PRISTINE', IDLE: 'IDLE', ERRORED: 'ERRORED', LOADING: 'LOADING', FETCHING_MORE: 'FETCHING_MORE' } | Constants representing different search states             |     |
| errorMessage | string \| null                                                                                                 | Error message if something went wrong                      |     |
| hits         | Array<{ objectID: string }>                                                                                    | Array of matching object IDs                               |     |
| pagination   | { page: number, totalPages: number, totalHits: number }                                                        | Current pagination state                                   |     |
| search       | async (query, type = 'Products') => Promise<void>                                                              | Callback to be called to trigger search operation          |     |
| fetchMore    | async () => Promise<void>                                                                                      | Callback to be called to fetch next page of search results |     |

### Usage

    function SearchDemo() {
      const [searchQuery, setSearchQuery] = React.useState('')

      const {
        status,
        statuses: { ERRORED, LOADING, PRISTINE, FETCHING_MORE },
        errorMessage,
        hits,
        search,
        fetchMore,
        pagination: { page, totalPages },
      } = useSearch({
        hitsPerPage: 3,
      })

      return (
        <div className="SearchDemo">
          {status === ERRORED && <div>Error {errorMessage}</div>}
          <div className="Search">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              placeholder="Search..."
              disabled={status === LOADING}
            />

            <button
              disabled={status === LOADING || searchQuery.length === 0}
              onClick={async () => {
                search(searchQuery)
              }}
            >
              {status === LOADING ? '...' : 'Go'}
            </button>
          </div>
          <hr />
          <div className="SearchResults">
            {hits.length === 0 && status === PRISTINE && <p>Start searching to see results</p>}

            {hits.length === 0 && status !== PRISTINE && status !== LOADING && (
              <p>No results found for {searchQuery}</p>
            )}

            {hits.length === 0 && status === LOADING && <p>Loading</p>}

            {hits.length > 0 && (
              <React.Fragment>
                <ul>
                  {hits.map((hit) => (
                    <li key={hit.objectID}>
                      <p>
                        <strong>Name:</strong> {hit.name}
                      </p>
                      <p>
                        <strong>Description:</strong> {hit.description}
                      </p>
                    </li>
                  ))}
                </ul>

                {page + 1 < totalPages && (
                  <button onClick={() => fetchMore()}>
                    {status === FETCHING_MORE ? '...' : 'Load more'}
                  </button>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      )
    }
