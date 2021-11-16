import React, { useState, useRef } from 'react'
import cx from 'classnames'
import Logo from 'Components/Logo'
import Link from 'frontend-link'
import Accordion from 'Components/Accordion'
import KlaviyoSubscriptionForm from 'Components/KlaviyoSubscriptionForm'
import Button from 'Components/Button'
import UIIcon from 'Components/UIIcon'
import RichText from 'frontend-ui/RichText'

import './styles.css'

const Footer = ({
  menus,
  socialLinks,
  klaviyoId,
  siteCredits,
  newsletterHeader = 'News and Updates',
  inputPlaceholder = 'Enter your email address here ...',
  buttonText = 'Sign Up',
  newsletterSuccessMessage = 'Thank you for subscribing!',
}) => {
  const contents =
    menus && menus.length
      ? menus.map((menus, i) => ({
          name: menus.name,
          isGrid: true,
          content: (
            <ul className="Footer-submenu">
              {menus &&
                menus.navigationLinks &&
                menus.navigationLinks.map((navigationLink, i) => (
                  <li className="Footer-submenuItem" key={i}>
                    <Link className="Footer-submenuLink" to={navigationLink.link} target="_self">
                      {navigationLink.title}
                    </Link>
                  </li>
                ))}
            </ul>
          ),
        }))
      : []

  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState(null)
  const inputEl = useRef(null)

  const validateEmail = email => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w]+$/g
    return regex.test(String(email).toLowerCase())
  }

  const emailValidator = e => {
    if (validateEmail(inputEl.current.value)) {
      setError(null)
    } else {
      setError('Invalid email address')
      e.preventDefault()
    }
  }

  const onSubmitSuccess = () => {
    setSubmitSuccess(true)
  }

  return (
    <section className="Footer">
      <div className="Footer-container">
        <div className="Footer-head">
          <h2 className="Footer-headLogo">
            <Logo uniqueId={"footer"} />
          </h2>
        </div>
        <div className="Footer-grid">
          <Accordion items={contents} isGrid={true} expandOnLarge={true} />
          <div className="Footer-gridItem Footer-gridItem--subscription">
            <h3 className="Footer-heading">
              <span className="Footer-headingText">{newsletterHeader}</span>
            </h3>
            <div className="Footer-newsletterWrapper">
              <KlaviyoSubscriptionForm
                g={klaviyoId}
                onSubmitSuccess={onSubmitSuccess}
                className={cx('Footer-newsletterForm', {
                  ['Footer-newsletterForm--hidden']: !!submitSuccess,
                })}
                renderInput={() => {
                  return (
                    <React.Fragment>
                      <label htmlFor="Footer-newsletter" className="Footer-newsletterLabel">
                        Email
                      </label>
                      <input
                        id="Footer-newsletter"
                        ref={inputEl}
                        type="email"
                        name="email"
                        className="Footer-newsletterInput"
                        placeholder={inputPlaceholder}
                      />
                    </React.Fragment>
                  )
                }}
              >
                <Button
                  as="button"
                  type="submit"
                  value="submit"
                  style="primary"
                  className="Footer-newsletterButton"
                  onClick={emailValidator}
                >
                  {buttonText}
                </Button>
                {error && (
                  <div
                    className={cx('Footer-newsletterError', {
                      ['Footer-newsletterError--hidden']: !error,
                    })}
                  >
                    {error}
                  </div>
                )}
              </KlaviyoSubscriptionForm>
              <div
                className={cx('Footer-newsletterSuccess', {
                  ['Footer-newsletterSuccess--hidden']: !submitSuccess,
                })}
              >
                {newsletterSuccessMessage}
              </div>
            </div>
          </div>
          {siteCredits && (
            <div className="Footer-gridItem Footer-gridItem--footerText">
              <div className="Footer-text">
                <RichText source={siteCredits} />
              </div>
            </div>
          )}
          <div className="Footer-gridItem Footer-gridItem--socialIcons">
            {socialLinks &&
              socialLinks.map.length > 0 &&
              socialLinks.map((socialLink, i) => {
                const icon =  UIIcon.Icons[socialLink.name]
                if (!icon) return null
                return (
                  <a className="Footer-socialLink" href={socialLink.link} key={i}>
                    {socialLink.icon && (
                      <React.Fragment>
                        <UIIcon icon={icon} />
                        <span className="Footer-socialLink-text">{socialLink.name}</span>
                      </React.Fragment>
                    )}
                  </a>
                )
              })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
