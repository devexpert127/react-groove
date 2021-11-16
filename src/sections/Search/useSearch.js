import { useState } from 'react'
import {
  clone,
  filter,
  flip,
  includes,
  map,
  pipe,
  prop,
  range,
  take,
  toLower,
  toString,
} from 'ramda'
import products from '../../static/products.json'

// Fake implementation of useSearch hook from frontend-ui for Storybook.

export function useSearch({ hitsPerPage = 20 }) {
  const [currentHits, setCurrentHits] = useState([])
  const [hits, setHits] = useState([])
  const [pagination, setPagination] = useState(initialPagination)
  const [status, setStatus] = useState('PRISTINE')
  const fetchMore = async () => {
    return new Promise(resolve => {
      if (currentHits.length > 0) {
        setStatus('FETCHING_MORE')
        // Simulate API call delay.
        setTimeout(() => {
          setHits(take(hitsPerPage + hitsPerPage * (pagination.page + 1), currentHits))
          setPagination({
            ...pagination,
            page: pagination.page + 1,
          })

          setStatus('IDLE')

          resolve()
        }, 300)
      } else {
        resolve()
      }
    })
  }
  const search = async (query, type = 'Products') => {
    setCurrentHits([])
    setHits([])
    setPagination(initialPagination)
    return new Promise(resolve => {
      if (query !== '') {
        setStatus('LOADING')
        // Simulate API call delay.
        setTimeout(() => {
          const newHits = map(searchResult, filter(matchQuery(query), products))

          setCurrentHits(newHits)
          setHits(take(hitsPerPage, newHits))
          setPagination({
            page: 0, // zero-based
            totalPages: Math.ceil(newHits.length / hitsPerPage),
            totalHits: newHits.length,
          })

          setStatus('IDLE')

          resolve()
        }, 300)
      } else {
        resolve()
      }
    })
  }

  return {
    fetchMore,
    hits,
    pagination,
    search,
    status,
  }
}

const initialPagination = {
  page: 0,
  totalPages: 0,
  totalHits: 0,
}

// Naive (no scoring obviously).
function matchQuery(query) {
  return pipe(prop('name'), toLower, includes(toLower(query)))
}

// Fill out with generated data to keep products.json small.
function searchResult(product) {
  return {
    ...product,
    images: [
      {
        src: 'https://assets.frontend.shogun.dev/42ce34ef-1be0-4fb8-a766-52a27308abb0/',
      },
    ],
    maxPrice: '29.99',
    minPrice: '19.99',
    objectID: product.id,
    tags: [],
    variants: map(
      n => ({
        id: toString(n),
        title: toString(n),
      }),
      range(1, 9),
    ),
  }
}
