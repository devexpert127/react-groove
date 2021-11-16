import React from 'react'
import cx from 'classnames'
import PageWidth from 'Components/PageWidth'

import './styles.css'

const StoreCard = ({ title, link, address, city, provinceState, postalZipCode }) => {
  const CardContentContainer = !!link ? 'a' : 'div'
  return (
    <li className="StoreCard">
      <CardContentContainer
        {...(!!link?
          { href: link, className: 'StoreCard-content StoreCard-content--link' } :
          { className: 'StoreCard-content'}
        )}
      >
        {!!title &&
          <h2>{title}</h2>
        }
        <dl className="StoreCard-details">
          {!!address &&
            <div className="StoreCard-details-group StoreCard-details-group--address">
              <dt>Store address</dt>
              <dd>{address}</dd>
            </div>
          }
          {!!city &&
            <div className="StoreCard-details-group StoreCard-details-group--city">
              <dt>City</dt>
              <dd>{city}{(!!provinceState || !!postalZipCode) && ','}</dd>
            </div>
          }
          {!!provinceState &&
            <div className="StoreCard-details-group StoreCard-details-group--province-state">
              <dt>Province or state</dt>
              <dd>{provinceState}</dd>
            </div>
          }
          {!!postalZipCode &&
            <div className="StoreCard-details-group StoreCard-details-group--postal-zip-code">
              <dt>Zip or postal code</dt>
              <dd>{postalZipCode}</dd>
            </div>
          }
        </dl>
      </CardContentContainer>
    </li>
  )
}

const StoreCards = ({
  stores = [],
  heading,
  hidePaddingTop = false,
  hidePaddingBottom = false,
}) => {
  return (
    <section className={cx('StoreCards', { ['StoreCards--padding-top']: !hidePaddingTop }, { ['StoreCards--padding-bottom']: !hidePaddingBottom })}>
      <PageWidth className="StoreCards-container">
        <h1 className="StoreCards-heading">{heading || 'Find a store near you!'}</h1>
        <ul className="StoreCards-list">
          {stores.map((store, i) => (
            <StoreCard
              title={store.title}
              link={store.link}
              address={store.address}
              city={store.city}
              provinceState={store.provinceState}
              postalZipCode={store.postalZipCode}
              key={i}
            />
          ))}
        </ul>
      </PageWidth>
    </section>
  )
}

export default StoreCards
