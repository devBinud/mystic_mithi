import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaXmark } from 'react-icons/fa6'
import { getCookieConsent, saveCookieConsent } from './cookieConsentStore'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (getCookieConsent()) return

    // Wait for the signature preloader to finish so the banner doesn't compete with it.
    let timer
    const reveal = () => { timer = setTimeout(() => setVisible(true), 1200) }

    if (document.getElementById('mm-preloader')) {
      window.addEventListener('mm:preloader-done', reveal, { once: true })
    } else {
      reveal()
    }

    return () => {
      window.removeEventListener('mm:preloader-done', reveal)
      clearTimeout(timer)
    }
  }, [])

  const choose = (value) => {
    saveCookieConsent(value)
    setVisible(false)
  }

  // Closing with the X is treated as declining non-essential cookies (privacy-safe default).
  const dismiss = () => choose('declined')

  return (
    <div
      className={`mm-cookie ${visible ? 'is-visible' : ''}`}
      role="dialog"
      aria-live="polite"
      aria-labelledby="mm-cookie-title"
      aria-describedby="mm-cookie-text"
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="mm-cookie-inner">
        <button
          type="button"
          className="mm-cookie-close"
          onClick={dismiss}
          aria-label="Close cookie notice"
        >
          <FaXmark size={22} />
        </button>

        <h2 id="mm-cookie-title" className="mm-cookie-title">Cookies &amp; Similar Technologies</h2>

        <p id="mm-cookie-text" className="mm-cookie-text">
          We use cookies and similar technologies to understand how you use this site,
          keep it secure and working smoothly, and remember things like your cart.{' '}
          <button
            type="button"
            className="mm-cookie-more"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls="mm-cookie-details"
          >
            {expanded ? 'Read less' : 'Read more'}
          </button>
        </p>

        <div id="mm-cookie-details" className={`mm-cookie-details ${expanded ? 'is-open' : ''}`}>
          <div>
            <ul>
              <li><strong>Essential</strong>: needed for the site to work, such as your cart and checkout. Always on.</li>
              <li><strong>Analytics</strong>: anonymous stats that help us see which poems and books readers enjoy. Only with your consent.</li>
            </ul>
            <p>
              You can change your mind at any time by clearing your browser&apos;s site data.
              Questions? <Link to="/contact" onClick={() => setVisible(false)}>Get in touch</Link>.
            </p>
          </div>
        </div>

        <div className="mm-cookie-actions">
          <button type="button" className="mm-cookie-btn mm-cookie-btn-ghost" onClick={() => choose('declined')}>
            Decline All Cookies
          </button>
          <button type="button" className="mm-cookie-btn mm-cookie-btn-solid" onClick={() => choose('accepted')}>
            I Agree
          </button>
        </div>
      </div>
    </div>
  )
}
