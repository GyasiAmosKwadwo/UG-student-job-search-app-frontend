const AUTH_KEY = 'ugcl_auth_v1'

export function getAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return parsed
  } catch {
    return null
  }
}

export function setAuth(auth) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth))
}

export function clearAuth() {
  localStorage.removeItem(AUTH_KEY)
}

export function isLoggedIn() {
  return Boolean(getAuth()?.loggedIn)
}

export function getUser() {
  return getAuth()?.user ?? null
}

