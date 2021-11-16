import React from 'react'
import PageWidth from 'Components/PageWidth'
import ResponsiveImage from 'frontend-ui/ResponsiveImage'
import './styles.css'

const Testimonials = ({ testimonials = [] }) => {
  return (
    <section className="Testimonials">
      <PageWidth>
        <div className="Testimonials-container">
          {testimonials.map((testimonial, i) => (
            <div className="Testimonials-item" key={i}>
              <div className="Testimonials-item-image">
                <ResponsiveImage
                  src={testimonial.image.src}
                  alt={testimonial.image.alt || testimonial.name}
                  sizes="(min-width: 960px) 50vw, 90vw"
                />
              </div>

              <div className="Testimonials-item-content">
                <div className="Testimonials-item-quote">
                  <h4 className="Testimonials-item-title">{testimonial.name}</h4>
                  <h5 className="Testimonials-item-subtitle">{testimonial.title}</h5>
                  <p className="Testimonials-item-description">{testimonial.testimonial}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PageWidth>
    </section>
  )
}

export default Testimonials
