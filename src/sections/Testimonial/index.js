import React from 'react'
import cx from 'classnames'
import RichText from 'frontend-ui/RichText'
import PageWidth from 'Components/PageWidth'

import './styles.css'

const Testimonial = ({ content, readingLength }) => {
  return (
    <section className="Testimonial">
      <PageWidth>
        <div className="Testimonial-content">
          <div className={cx({ ['Testimonial-content--reading-length']: !!readingLength })}>
            <RichText source={content} />
          </div>
        </div>
      </PageWidth>
    </section>
  )
}

export default Testimonial
