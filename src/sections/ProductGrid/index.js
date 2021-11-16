import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'frontend-router'
import cx from 'classnames'
import PageWidth from 'Components/PageWidth'
import ProductCard from 'Components/ProductCard'
import Button from 'Components/Button'
import DrawerContainer from 'Components/DrawerContainer'
import Pagination from 'Components/Pagination'
import UIIcon from 'Components/UIIcon'
import Link from 'frontend-link'

import './styles.css'

const useCheckMedia = query => {
  if (typeof window === 'undefined') return

  const [matches, setMatches] = useState(window.matchMedia(query).matches)

  useEffect(() => {
    let media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    let listener = () => setMatches(media.matches)
    media.addListener(listener)

    return () => media.removeListener(listener)
  }, [query])

  return matches
}

const isBrowser = typeof document !== 'undefined'

const ProductGrid = ({
  products,
  filterOptions,
  showFilters,
  title,
  link,
  buttonText,
  productLimit,
  pagination,
  hideMasterPageSection,
}) => {
  if (typeof hideMasterPageSection !== 'undefined' && !!hideMasterPageSection) return null

  const [filterTerms, setFilterTerms] = useState([]),
    [sortTerms, setSortTerms] = useState(''),
    [filteredAndSortedResults, setFilteredAndSortedResults] = useState([]),
    [refinedFilterOptions, setRefinedFilterOptions] = useState([]),
    [filtersLoaded, setFiltersLoaded] = useState(false),
    [isOpen, setIsOpen] = useState(false),
    formRef = useRef(),
    sortByRef = useRef(),
    overlayRef = useRef(),
    productGridRef = useRef(),
    collectionFiltersRef = useRef(),
    [formHeight, setFormHeight] = useState(0),
    [formMargin, setFormMargin] = useState(0),
    [filterButtonWidth, setFilterButtonWidth] = useState(0),
    [activeVariantWrapper, setActiveVariantWrapper] = useState(false),
    [currentPage, setCurrentPage] = useState(1),
    [offset, setOffset] = useState(0),
    [pagesArray, setPagesArray] = useState([]),
    largeScreen = useCheckMedia('(min-width: 60em)'), // Same as in the css
    [uniqueId,] = useState(Math.random().toString(36).substring(6));

  const router = useRouter()
  const routerLocation = router.location

  const sortByOptions = {
    manual: {
      value: 'manual',
      text: 'Sort By',
    },
    priceAscending: {
      value: 'price-ascending',
      text: 'Price: Low to High',
    },
    priceDescending: {
      value: 'price-descending',
      text: 'Price: High to Low',
    },
    titleAscending: {
      value: 'title-ascending',
      text: 'A-Z',
    },
    titleDescending: {
      value: 'title-descending',
      text: 'Z-A',
    },
    createdAscending: {
      value: 'created-ascending',
      text: 'Oldest to Newest',
    },
    createdDescending: {
      value: 'created-descending',
      text: 'Newest to Oldest',
    },
    bestSelling: {
      value: 'best-selling',
      text: 'Best Selling',
    },
  }

  if (!productLimit || productLimit === 0 || productLimit === undefined || productLimit === '') {
    // set default if no limit declared
    productLimit = 50
  }

  let tagCounter = 0,
    limit = currentPage * productLimit,
    sortByWidth

  const getPagesArray = products => {
    // reset array
    pagesArray.length = 0
    let pages = Math.ceil(products.length / productLimit),
      lowEnd = 1,
      highEnd = pages

    while (lowEnd <= highEnd) {
      pagesArray.push(lowEnd++)
    }

    setPagesArray(pagesArray)
  }

  // set current page on click
  const onPageClick = (e, currentPage) => {
    let pageNumber = parseInt(e.target.getAttribute('data-page'))
    setCurrentPage(currentPage !== pageNumber ? pageNumber : currentPage)
    currentPage = pageNumber
    setOffset(currentPage * productLimit - productLimit)
  }

  // pagination from data received in getFinalResults()
  const paginateProducts = (products, offset, limit) => {
    return products.slice(offset, limit)
  }

  const variantSelectorToggle = product => {
    if (largeScreen) {
      setActiveVariantWrapper(false)
    } else {
      setActiveVariantWrapper(activeVariantWrapper === product ? false : product)
    }
  }

  const updateFormHeight = () => {
    if (!formRef.current) return

    if (largeScreen && isBrowser) {
      const collectionFilters = collectionFiltersRef.current,
        collectionFiltersHeight = collectionFilters.offsetHeight

      setFormHeight(isOpen ? collectionFiltersHeight + formRef.current.offsetHeight + 'px' : 0)
    } else {
      const headerHeight = getHeaderHeight()
      const newFormHeight = headerHeight ? `calc(100% - ${headerHeight})` : '100%'
      setFormHeight(newFormHeight)
    }
  }

  const updateFormMargin = () => {
    if (largeScreen) {
      setFormMargin(0)
    } else {
      if (isBrowser) {
        setFormMargin(getHeaderHeight())
      }
    }
  }

  const getHeaderHeight = () => {
    const header = document.querySelector('.Header')
    if (header && header !== undefined) {
      return header.offsetHeight + 'px'
    }
    return 0
  }

  const updateFilterButtonWidth = () => {
    if (!sortByRef.current) return

    if (checkIfMobile()) {
      setFilterButtonWidth(0)
    } else {
      sortByWidth = sortByRef.current.offsetWidth + 'px'
      setFilterButtonWidth(sortByWidth)
    }
  }

  const checkIfMobile = () => {
    let isMobile = false

    if (typeof window !== 'undefined' && window.innerWidth < 600) {
      isMobile = true
    }

    return isMobile
  }

  useEffect(() => {
    setTimeout(() => {
      // hack so that the height is gotten after the css has finished rendering
      updateFormHeight()
      updateFormMargin()
    }, 1)
  }, [isOpen])

  useEffect(() => {
    updateFilterButtonWidth()
  }, [checkIfMobile()])

  /**
   * serialize - serializes form data so that we can work with it. similar to
   * jQuery's serialize method
   *
   * @param  {object} form the form node to be serialized
   * @return {array} an array of form inputs. ex: ["color=blue", "size=size-7"]
   */
  const serialize = form => {
    // Setup our serialized data
    let serialized = []

    // Loop through each field in the form
    for (var i = 0; i < form.elements.length; i++) {
      const field = form.elements[i]

      // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
      if (
        !field.name ||
        field.disabled ||
        field.type === 'file' ||
        field.type === 'reset' ||
        field.type === 'submit' ||
        field.type === 'button'
      )
        continue

      // If a multi-select, get all selections
      if (field.type === 'select-multiple') {
        for (var n = 0; n < field.options.length; n++) {
          if (!field.options[n].selected) continue
          serialized.push(
            encodeURIComponent(field.name) + '=' + encodeURIComponent(field.options[n].value),
          )
        }
      }

      // Convert field data to a query string
      else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
        serialized.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value))
      }
    }

    return serialized
  }

  /**
   * clearRadios - clears the selected filter styling on a given group/column of
   * filter options
   *
   * @param  {object} parentFilterGroup the filter group/column that should have
   * it's filter selection styling cleared
   */
  const clearRadios = parentFilterGroup => {
    // make all radio text in this column normal
    const allRadios = parentFilterGroup.querySelectorAll('input')

    allRadios.forEach((radio, i) => {
      radio.nextSibling.classList.remove('selected')
    })
  }

  /**
   * filterSortChange - gets data of filtered and sorted results
   * no matter which one has been affected (filter or sort), gather and combine
   * the data and update state
   */
  const filterSortChange = () => {
    // filtering functionality
    const serializedFormArray = serialize(formRef.current)
    const result = serializedFormArray.map(serializedFormEntry => serializedFormEntry.split('=')[1])
    setFilterTerms(result)

    // sorting functionality
    const sortbyForm = sortByRef.current

    setSortTerms(sortbyForm.value)
  }

  /**
   * getFilterGroup - gets a filter group from refinedFilterOptions by its name
   *
   * @param  {string} groupName matches the name property of the group to be returned
   * @return {array} the selected filter group and a temporary copy of refinedFilterOptions used for updating its state
   */
  const getFilterGroup = groupName => {
    const tempRefinedFilterOptions = [...refinedFilterOptions]
    const filterGroup = tempRefinedFilterOptions.filter(group => group.name == groupName)[0]
    return [
      filterGroup,
      tempRefinedFilterOptions
    ]
  }

  /**
   * filterClick - filtering functionality when users select a filter radio button
   *
   * @param  {event} e used to get the selected radio node
   */
  const filterClick = e => {
    const [filterGroup, tempRefinedFilterOptions] = getFilterGroup(e.target.dataset.groupName)
    const parentFilterGroup = e.target.closest('.CollectionFilters-filterGroup')
    const selectedRadioLabel = parentFilterGroup.querySelector('input:checked').nextSibling

    // if user clicked a filter that was already selected
    if (selectedRadioLabel.classList.contains('selected')) {
      // make all radio text in this column normal. this has to happen inside
      // the conditional, or else the results would be erased before we checked
      clearRadios(parentFilterGroup)

      // remove selected class to this column
      parentFilterGroup.classList.remove('CollectionFilters-filterGroup--selected')

      // deselect radio button
      e.target.checked = false

      // set property for filter group state
      filterGroup.selected = false
    } else {
      // make all radio text in this column normal. this has to happen inside
      // the conditional, or else the results would be erased before we checked
      clearRadios(parentFilterGroup)

      // make the selected radio text bold
      selectedRadioLabel.classList.add('selected')

      // add selected class to this column
      parentFilterGroup.classList.add('CollectionFilters-filterGroup--selected')

      // set property for filter group state
      filterGroup.selected = true
    }

    // update refinedFilterOptions
    setRefinedFilterOptions(tempRefinedFilterOptions)

    // reload filters and sortby
    filterSortChange()
  }

  /**
   * filterButtonClear - removes selected filter choice from the chosen group/column.
   * reloads filters and sort paramters so that results stay updated.
   *
   * @param  {event} e used to target the specific clear button that was clicked
   */
  const filterButtonClear = e => {
    e.preventDefault()

    const [filterGroup, tempRefinedFilterOptions] = getFilterGroup(e.target.dataset.groupName)
    const parentFilterGroup = e.target.parentNode

    // make all radio text in this column normal
    clearRadios(parentFilterGroup)

    // uncheck this column
    parentFilterGroup.querySelector('input:checked').checked = false

    // remove selected class form this column
    parentFilterGroup.classList.remove('CollectionFilters-filterGroup--selected')

    // update refinedFilterOptions
    filterGroup.selected = false
    setRefinedFilterOptions(tempRefinedFilterOptions)

    // reload filters and sortby
    filterSortChange()
  }

  /**
   * applyFilter - closes form and  applyies filter changes
   *
   * @param  {event} e used to target the specific clear button that was clicked
   */
  const applyFilter = e => {
      e.preventDefault()
      filterSlideToggle()
  }

  const updateFilterButtonText = (buttonEl, newText) => {
    if (buttonEl && buttonEl !== undefined) {
      buttonEl.textContent = newText
    } else {
      return
    }
  }

  /**
   * filterSlideToggle - set isOpen state, to show/hide the drawer.the
   * conditional logic creates a slide down effect on desktop sreensizes.
   *
   * @param  {boolean} forceClose used to close the filter drawer rather than toggle it.
   */
  const filterSlideToggle = forceClose => {
    if (!productGridRef.current) {
      return
    }

    const form = formRef.current,
      overlay = overlayRef.current,
      filterButton = productGridRef.current.querySelector(`#CollectionFilters-filterButton-${uniqueId}`)

    const showFilters = () => {
      if (typeof filterButton !== 'undefined') {
        updateFilterButtonText(filterButton, 'Hide Filters')
      }

      // show overlay
      if (typeof overlay !== 'undefined') {
        overlay.classList.add('active')
      }
      if (typeof form !== 'undefined') {
        form.classList.add('active')
      }
    }

    const hideFilters = () => {
      if (typeof filterButton !== 'undefined') {
        updateFilterButtonText(filterButton, 'Filter')
        filterButton.focus()
      }

      // hide overlay
      if (typeof overlay !== 'undefined') {
        overlay.classList.remove('active')
      }

      if (typeof form !== 'undefined') {
        form.classList.remove('active')
      }
    }

    if (typeof forceClose === "boolean" && !!forceClose) {
      // close
      hideFilters()
      setIsOpen(false)
    } else {
      setIsOpen(!isOpen)

      // toggle
      if (!isOpen) {
        showFilters()
      } else {
        hideFilters()
      }
    }
  }

  /**
   * tagsMatch - filtering logic. checks if product tags match selected tags.
   * returns a boolean which is later used to filter the products array.
   *
   * @param  {object} product a single product
   * @return {boolean} used to filter the products array
   */
  const tagsMatch = product => {
    const tags = product.tags
    const isClear = currentValue => currentValue == 'clear'

    if (filterTerms == '' || filterTerms == [] || filterTerms.every(isClear)) {
      // if empty or cleared, show all
      return true
    }

    if (tags && tags.length > 0) {
      // if tags exist, check each tag against each filter term
      let matchesArray = []

      tags.forEach((tag, i) => {
        filterTerms.forEach((filterTerm, n) => {
          if (tag.toLowerCase() === filterTerm.toLowerCase()) {
            // update the array length for every match
            matchesArray.push('x')
          }
        })
      })

      /**
       * in order for a product to show, it must have:
       * - the same tags as the selected filter terms
       * - the same quantity of matches as there are filter terms
       * this ensures that the filters are compounding
       *
       */
      if (matchesArray.length == filterTerms.length) {
        return true
      }
    }

    /**
     * if tag doesn't match search term, hide that product
     * OR
     * if product has no tags, hide that product
     */
    return false
  }

  /**
   * getFinalResults - sorting logic. takes filtered list of products and sorts them.
   * returns an array of product objects
   *
   * @return {array}
   */
  const getFinalResults = () => {
    let filterResults

    if (products && products !== undefined) {
      // filtered results
      filterResults = products.filter(tagsMatch)
    } else {
      filterResults = []
    }

    let finalResults = filterResults

    // sorting functionality
    switch (sortTerms) {
      case sortByOptions.manual.value:
        finalResults = filterResults
        break

      case sortByOptions.priceAscending.value:
        finalResults = filterResults.sort((a, b) => {
          return a.minPrice - b.minPrice
        })
        break

      case sortByOptions.priceDescending.value:
        finalResults = filterResults.sort((a, b) => {
          return b.minPrice - a.minPrice
        })
        break

      case sortByOptions.titleAscending.value:
        finalResults = filterResults.sort((a, b) => {
          const titleA = a.name.toLowerCase()
          const titleB = b.name.toLowerCase()
          if (titleA < titleB) {
            return -1
          }
          if (titleA > titleB) {
            return 1
          }
          return 0 // names must be equal
        })
        break

      case sortByOptions.titleDescending.value:
        finalResults = filterResults.sort((a, b) => {
          const titleA = a.name.toLowerCase()
          const titleB = b.name.toLowerCase()
          if (titleB < titleA) {
            return -1
          }
          if (titleB > titleA) {
            return 1
          }
          return 0 // names must be equal
        })
        break

      case sortByOptions.createdAscending.value:
        finalResults = filterResults.sort((a, b) => {
          const titleA = a.createdAt ? a.createdAt.toLowerCase() : 0
          const titleB = b.createdAt ? b.createdAt.toLowerCase() : 0
          if (titleA < titleB) {
            return -1
          }
          if (titleA > titleB) {
            return 1
          }
          return 0 // names must be equal
        })
        break

      case sortByOptions.createdDescending.value:
        finalResults = filterResults.sort((a, b) => {
          const titleA = a.createdAt ? a.createdAt.toLowerCase() : 0
          const titleB = b.createdAt ? b.createdAt.toLowerCase() : 0
          if (titleB < titleA) {
            return -1
          }
          if (titleB > titleA) {
            return 1
          }
          return 0 // names must be equal
        })
        break

      case sortByOptions.bestSelling.value:
        finalResults = filterResults
        break

      default:
        finalResults = filterResults
    }

    getPagesArray(finalResults)

    /**
     * If the current upper limit for pagination is greater than the length of the
     * array of product results, set the current page back by one. (This will happen
     * until set to max page of current number of pages.)
     */
    if (limit > finalResults.length) {
      if (offset > finalResults.length) {
        limit = offset
        setOffset(limit - productLimit)
        setCurrentPage(limit / productLimit)
      } else {
        limit = currentPage * productLimit
        setCurrentPage(limit / productLimit)
      }
    }
    finalResults = paginateProducts(finalResults, offset, limit)

    return finalResults
  }

  /**
   * activeProductTags - gets an array of every unique tag that is currently
   * applied to any product on the page
   *
   * @return {array} an array of all the tags
   */
  const activeProductTags = () => {
    let tagArray = []

    products.forEach((product, i) => {
      if (product.tags && product.tags.length > 0) {
        product.tags.forEach((tag, i) => {
          tagArray.push(tag.toLowerCase())
        })
      }
    })

    return [...new Set(tagArray)]
  }

  /**
   * getFilterOptions - checks all tags on all products on the page. organizes
   * those tags into groups/columns that users can select.
   *
   * @return {array} each index in the array is a group/column of filter options
   */
  const getFilterOptions = () => {
    if (filterOptions) {
      // loop through each filter option column
      // filter options are defined in an object as passed as a prop to this component
      const refinedFilterOptions = filterOptions.filter(filterOption => {
        // default to false
        let filterOptionsExists = false

        if (filterOption.tags && filterOption.tags !== undefined && filterOption.tags.length > 0) {
          // filter the tags of the object at this index, removing tags that aren't applied
          const refinedFilterOption = filterOption.tags.filter(tag => {
            // true if at least one tag in this column exists on a product on the page
            if (activeProductTags().includes(tag.toLowerCase())) {
              // update to true
              filterOptionsExists = true

              return true
            } else {
              return false
            }
          })
          // update the tag list to only the applicable ones
          filterOption.tags = refinedFilterOption
          filterOption.selected = false
        }

        // return a boolean on the filter method
        return filterOptionsExists
      })

      return refinedFilterOptions
    } else {
      return []
    }
  }

  const NothingFound = () => {
    return <h4 className="ProductGrid-empty">Nothing found. Try updating your filters.</h4>
  }

  const DefaultProductGrid = () => {
    if (!products) return null;
    return (
      <ul className="ProductGrid-grid">
        {products.slice(0, productLimit).map((product, i) => {
          if (!product) return null;
          return (
            <ProductCard
              product={product}
              key={i}
              onClick={() => {
                variantSelectorToggle(product)
              }}
              active={activeVariantWrapper === product}
            />
          )
        })}
      </ul>
    )
  }

  const showEmptyGrid = contentLoaded => {
    // if the products are already loaded, filtering any further should result
    // in "nothing found".
    if (contentLoaded) {
      return <NothingFound />
    }

    // if the products are not yet loaded, show a placeholder of the default
    // product grid (no filtering applied). the primary purpose of this is to
    // prevent users from seeing the "nothing found" message while the products
    // load
    return <DefaultProductGrid />
  }

  useEffect(() => {
    // sorted and filtered results
    setFilteredAndSortedResults(getFinalResults)

    // filtersLoaded is used to see whether we should load the "nothing found"
    // message, or simply load the products in
    if (!filtersLoaded) {
      setFiltersLoaded(true)
    }

    setTimeout(() => {
      if (window.dataLayer && window.dataLayer !== undefined) {
        // Differentiate between collection view and search results view events
        const urlParams = new URLSearchParams(routerLocation.search)
        const isSearch = urlParams.get('q')
        const list = isSearch ? 'Search Results' : 'Collection View'
        const actionField = isSearch ? { list: 'Search Results' } : { list: 'Collection Page' }

        const visibleProducts = filteredAndSortedResults.map(function(product, index) {
          const variant = product.variants[0]
          return {
            name: product.name.replace("'", ''),
            id: (variant && variant.sku) || '',
            productId: (product && product.externalId) || '',
            variantId: (variant && variant.externalId) || '',
            shopifyId:
              'shopify_US_' + product.externalId + '_' + ((variant && variant.externalId) || ''),
            price: product.maxPrice,
            brand: (product.vendor && product.vendor.replace("'", '')) || '',
            position: index,
            list: list,
            handle: product.slug,
          }
        })

        const collectionImpressionsGtmData = {
          event: 'productImpression',
          ecommerce: {
            actionField: actionField,
            impressions: visibleProducts,
          },
        }

        if (isSearch) {
          collectionImpressionsGtmData.searchQuery = urlParams
        }

        window.dataLayer.push(collectionImpressionsGtmData)
      }
    }, 100)
  }, [filterTerms, sortTerms, offset]) // fires anytime any of these states is changed

  useEffect(() => {
    // show applicable choices in the filter dropdown
    setRefinedFilterOptions(getFilterOptions)

    // close drawer on window resize and ESC key
    const forceCloseFilterDrawer = () => {
      filterSlideToggle(true)
    }
    const closeFilterDrawerOnEsc = (e) => {
      if (e.which == 27) forceCloseFilterDrawer()
    }

    window.addEventListener('resize', forceCloseFilterDrawer)
    if (!!productGridRef && !!productGridRef.current) {
      productGridRef.current.addEventListener('keydown', closeFilterDrawerOnEsc)
    }

    return () => {
      window.removeEventListener('resize', forceCloseFilterDrawer)
      if (!!productGridRef && !!productGridRef.current) {
        productGridRef.current.removeEventListener('keydown', closeFilterDrawerOnEsc)
      }
    }
  }, []) // fires once, on load

  const sortByOptionsArray = Object.values(sortByOptions)
  const getCurrentSortByOption = () => {
    const test = !sortTerms || sortTerms === '' ? sortByOptions.manual.value : sortTerms
    return sortByOptionsArray.find(option => option.value === test)
  }

  if (!products || products.length <= 0) {
    return null
  }

  return (
    <section className="ProductGrid" ref={productGridRef}>
      {showFilters && (
        <PageWidth className="CollectionFilters-container">
          <div
            className={cx('CollectionFilters-filtersSection', {
              ['CollectionFilters-filtersSection--sort-only']: !refinedFilterOptions.length,
            })}
          >
            {filtersLoaded && (
              <React.Fragment>
                {!!refinedFilterOptions.length && (
                  <div style={{ minWidth: filterButtonWidth }}>
                    <Button
                      { ...(isOpen && checkIfMobile() &&
                        { 'aria-hidden': true, tabIndex: '-1' }
                      )}
                      as="button"
                      style="basic"
                      id={`CollectionFilters-filterButton-${uniqueId}`}
                      className="CollectionFilters-filterButton"
                      onClick={filterSlideToggle}
                    >
                      Filter
                    </Button>
                  </div>
                )}
                <div className="CollectionFilters-sortby">
                  <label htmlFor={`sortBy-${uniqueId}`}>Sort by</label>
                  <select
                    {...(isOpen && checkIfMobile() && { 'aria-hidden': true, tabIndex: '-1' })}
                    className="CollectionFilters-filterSelect"
                    ref={sortByRef}
                    onChange={filterSortChange}
                    id={`sortBy-${uniqueId}`}
                  >
                    {sortByOptionsArray.map(({ text, value }, i) => (
                      <option key={i} value={value}>
                        {text}
                      </option>
                    ))}
                  </select>
                  <span
                    className="CollectionFilters-sortby__selected"
                    aria-hidden="true"
                    role="presentation"
                  >
                    {sortTerms ? getCurrentSortByOption().text : 'Sort by'}
                  </span>
                </div>
              </React.Fragment>
            )}
          </div>

          <DrawerContainer isOpen={isOpen} scrollLock={checkIfMobile()}>
            <div
              { ...(!isOpen &&
                { 'aria-hidden': true, tabIndex: '-1' }
              )}
              style={{ height: formHeight, marginTop: formMargin }}
              className={cx('CollectionFilters', {
                ['CollectionFilters--hidden']: !isOpen,
              })}
              ref={collectionFiltersRef}
            >
              {checkIfMobile() &&
                <Button
                  className="CollectionFilters-mobileCloseButton"
                  as="button"
                  style="unstyled"
                  onClick={filterSlideToggle}
                  aria-hidden={!isOpen}
                  tabIndex={!isOpen ? '-1' : '0'}
                >
                  <UIIcon icon={UIIcon.Icons.Close} className="CollectionFilters-mobileCloseButton-icon" />
                  <span className="CollectionFilters-mobileCloseButton-icon-text">Collection filters opened. Press to close collection filters.</span>
                </Button>
              }
              <form id={`CollectionFilters-form-${uniqueId}`} className="CollectionFilters-form" ref={formRef}>
                {refinedFilterOptions &&
                  refinedFilterOptions.map((filterOption, i) => (
                    <div className="CollectionFilters-filterGroup" key={i}>
                      <h4 className="CollectionFilters-title">{filterOption.name}</h4>
                      {filterOption.selected &&
                        <Button
                          className="CollectionFilters-buttonClear"
                          as="button"
                          onClick={filterButtonClear}
                          data-group-name={filterOption.name}
                          aria-hidden={!isOpen}
                          tabIndex={!isOpen ? '-1' : '0'}
                        >
                          clear
                        </Button>
                      }
                      <hr />

                      <fieldset className="CollectionFilters-fieldset" id={`${filterOption.name.toLowerCase()}-${uniqueId}`}>
                        {filterOption.tags &&
                          filterOption.tags.map((tag, i) => (
                            <React.Fragment key={i}>
                              <input
                                type="radio"
                                id={`${filterOption.name.toLowerCase()}-${i}-${uniqueId}`}
                                name={filterOption.name.toLowerCase()}
                                data-group-name={filterOption.name}
                                value={tag}
                                onClick={filterClick}
                                aria-hidden={!isOpen}
                                tabIndex={!isOpen ? '-1' : '0'}
                                />
                              <label htmlFor={`${filterOption.name.toLowerCase()}-${i}-${uniqueId}`}key={i}>
                                {tag.replace('-', ' ')}
                              </label>
                            </React.Fragment>
                          ))}
                      </fieldset>
                    </div>
                  ))}
                  <div className="CollectionFilters-apply">
                    <Button
                      className="CollectionFilters-buttonApply"
                      as="button"
                      style="primary"
                      onClick={(e) => applyFilter(e)}
                      aria-hidden={!isOpen}
                      tabIndex={!isOpen ? '-1' : '0'}
                    >
                      Apply
                    </Button>
                  </div>
              </form>
            </div>
          </DrawerContainer>
        </PageWidth>
      )}

      <div className="ProductGrid-products">
        <div
          id={`ProductGrid-overlay-${uniqueId}`}
          className="ProductGrid-overlay"
          ref={overlayRef}
          onClick={filterSlideToggle}
        ></div>

        <PageWidth>
          {title && <h2>{title}</h2>}
          {filteredAndSortedResults.length ? (
            <ul className="ProductGrid-grid">
              {filteredAndSortedResults.slice(0, productLimit).map((product, i) => (
                <ProductCard
                  product={product}
                  key={i}
                  onClick={() => {
                    variantSelectorToggle(product)
                  }}
                  active={activeVariantWrapper === product}
                />
              ))}
            </ul>
          ) : (
            showEmptyGrid(filtersLoaded)
          )}
          {pagination && pagesArray.length > 1 && (
            <Pagination
              pages={pagesArray}
              onClick={e => {
                onPageClick(e, currentPage)
              }}
              currentPage={currentPage}
              scrollToTop={productGridRef.current}
            />
          )}
          {link && buttonText && (
            <Button style="primary" as={Link} to={link}>
              {buttonText}
            </Button>
          )}
        </PageWidth>
      </div>
    </section>
  )
}

export default ProductGrid
