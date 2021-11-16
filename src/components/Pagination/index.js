import React, { useState, useEffect } from 'react'
import cx from 'classnames'

import './styles.css'

const Pagination = ({ pages, onClick, currentPage, scrollToTop = false }) => {
  if (!pages) return null
  const [prevHidden, setPrevHidden] = useState(true)
  const [nextHidden, setNextHidden] = useState(false)
  const itemThreshold = 10
  const itemPadding = 4
  const paginationItems = getPaginationItems()

  function scrollTo(x = null) {
    let scrollPosition = 0
    const hasX = x !== null && (x !== false || x === 0)
    if (!hasX) {
      return
    }
    // if number passed in.
    if (typeof x === 'number') {
      scrollPosition = x
    }
    // if element or ref passed in
    if (typeof x === 'object') {
      const element = x.current ? x.current : x
      const elTopPosition = element.getBoundingClientRect().top
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      scrollPosition = elTopPosition + scrollTop
    }

    window.scrollTo({
      top: scrollPosition,
      left: 0,
      behavior: 'smooth',
    })
  }

  function getPaginationItems() {
    if (pages.length > itemThreshold) {
      const items = []
      let start = currentPage - itemPadding >= 1 ? currentPage - itemPadding : 1
      let end = currentPage + itemPadding <= pages.length ? currentPage + itemPadding : pages.length

      // Get items around currentPage
      while (start <= end) {
        items.push(start++)
      }

      // add first page if we don't have it
      if (!items.includes(1)) {
        if (!items.includes(2)) {
          items.unshift('...')
        }
        items.unshift(1)
      }

      // add last page if we don't have it
      if (!items.includes(pages.length)) {
        if (!items.includes(pages.length - 1)) {
          items.push('...')
        }
        items.push(pages.length)
      }

      return items
    }
    return pages
  }

  function handleClick(e, page) {
    {
      if (currentPage !== page && Number.isInteger(page)) {
        onClick(e)
        scrollTo(scrollToTop)
      }
    }
  }

  useEffect(() => {
    setPrevHidden(
      (paginationItems && paginationItems.length <= 1) || currentPage === 1 ? true : false,
    )
    setNextHidden(
      (paginationItems && paginationItems.length <= 1) || currentPage === pages.length
        ? true
        : false,
    )
  }, [currentPage])

  const prevPage = currentPage - 1
  const nextPage = currentPage + 1

  return (
    <div className="Pagination">
      <ol className="Pagination-list">
        <li
          className={cx('Pagination-list-item Pagination-list-item--prev', {
            ['Pagination-list-item--hidden']: prevHidden,
          })}
          data-page={prevPage}
          onClick={e => handleClick(e, prevPage)}
        >
          &lt;&lt; Previous
        </li>
        {paginationItems &&
          paginationItems.map((page, i) => (
            <li
              className={cx(
                'Pagination-list-item',
                { ['Pagination-list-item--current']: currentPage === page },
                { ['Pagination-list-item--disabled']: !Number.isInteger(page) },
              )}
              key={i}
              data-page={page}
              onClick={e => handleClick(e, page)}
            >
              {page}
            </li>
          ))}
        <li
          className={cx('Pagination-list-item Pagination-list-item--next', {
            ['Pagination-list-item--hidden']: nextHidden,
          })}
          data-page={nextPage}
          onClick={e => handleClick(e, nextPage)}
        >
          Next &gt;&gt;
        </li>
      </ol>
    </div>
  )
}

export default Pagination
