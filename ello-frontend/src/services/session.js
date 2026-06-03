const SESSION_KEY = 'ello.session'

export function saveSession(session) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function getSession() {
  try {
    return JSON.parse(window.localStorage.getItem(SESSION_KEY)) || null
  } catch {
    return null
  }
}

export function clearSession() {
  window.localStorage.removeItem(SESSION_KEY)
}

export function getSessionToken() {
  return getSession()?.token || ''
}
