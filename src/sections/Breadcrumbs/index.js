import React from 'react'
import cx from 'classnames'
import Link from 'frontend-link'
import PageWidth from 'Components/PageWidth'

import './styles.css'

const Breadcrumbs = ({ breadcrumbs = [], currentTitle }) => {
  return (
    <section className="Breadcrumbs">
      <PageWidth>
        <nav role="navigation" aria-label="breadcrumbs">
          <ol className="Breadcrumb-list">
            <li className="Breadcrumb-item">
              <Link to="/" className="Breadcrumb">
                <span className="Breadcrumb-title">Home</span>
              </Link>
            </li>

            {breadcrumbs.map((breadcrumb, i) => {
              return (
                <li className="Breadcrumb-item" key={i}>
                  {breadcrumb.link && breadcrumb.title && (
                    <React.Fragment>
                      <span className="Breadcrumb-divide"> / </span>
                      <Link to={breadcrumb.link} className="Breadcrumb">
                        <span className="Breadcrumb-title">{breadcrumb.title}</span>
                      </Link>
                    </React.Fragment>
                  )}
                </li>
              )
            })}

            <li className="Breadcrumb-item">
              <span className="Breadcrumb-divide"> / </span>
              <span className="Breadcrumb-title">{currentTitle}</span>
            </li>
          </ol>
        </nav>
      </PageWidth>
    </section>
  )
}

export default Breadcrumbs
