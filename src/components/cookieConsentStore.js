// Bump this when the cookie policy changes meaningfully so visitors are asked again.
const CONSENT_KEY = 'mm_cookie_consent_v1'

/**
 * Returns 'accepted', 'declined' or null (not decided yet).
 * Gate any future analytics / marketing scripts on this returning 'accepted',
 * and listen for the 'mm:cookie-consent' window event to react to a fresh choice.
 */
export function getCookieConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY)
  } catch {
    return null
  }
}

export function saveCookieConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    /* storage blocked (private mode etc.) — the banner simply shows again next visit */
  }
  window.dispatchEvent(new CustomEvent('mm:cookie-consent', { detail: value }))
}
