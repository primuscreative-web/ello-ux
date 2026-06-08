const FAVORITES_KEY = 'ello.favorite.professionals'
const REVIEWS_KEY = 'ello.professional.reviews'
const REPORTS_KEY = 'ello.trust.reports'

function readJson(key, fallback) {
  try {
    return JSON.parse(window.localStorage.getItem(key)) || fallback
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function getFavoriteIds() {
  return readJson(FAVORITES_KEY, [])
}

export function isFavoriteProfessional(id) {
  return getFavoriteIds().includes(id)
}

export function toggleFavoriteProfessional(id) {
  const favorites = getFavoriteIds()
  const nextFavorites = favorites.includes(id)
    ? favorites.filter((item) => item !== id)
    : [id, ...favorites]

  writeJson(FAVORITES_KEY, nextFavorites)
  window.dispatchEvent(new CustomEvent('ello:favorites-changed', { detail: nextFavorites }))
  return nextFavorites
}

export function getProfessionalReviews(id) {
  const reviews = readJson(REVIEWS_KEY, {})
  return reviews[id] || []
}

export function addProfessionalReview(id, payload) {
  const reviews = readJson(REVIEWS_KEY, {})
  const nextReview = {
    id: `rev-${id}-${Date.now()}`,
    name: payload.name || 'Cliente ELLO',
    rating: Number(payload.rating || 5),
    text: payload.text,
    createdAt: 'Agora'
  }

  const nextReviews = {
    ...reviews,
    [id]: [nextReview, ...(reviews[id] || [])]
  }

  writeJson(REVIEWS_KEY, nextReviews)
  return nextReview
}

export function createTrustReport(payload) {
  const reports = readJson(REPORTS_KEY, [])
  const report = {
    id: `report-${Date.now()}`,
    status: 'Recebida',
    createdAt: new Date().toISOString(),
    ...payload
  }

  writeJson(REPORTS_KEY, [report, ...reports])
  return report
}

export function getTrustReports() {
  return readJson(REPORTS_KEY, [])
}
