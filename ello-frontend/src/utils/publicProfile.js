export function createProfileSlug(profile = {}) {
  const base = profile.publicName || profile.name || profile.fullName || profile.specialty || profile.id || 'profissional'
  const normalized = String(base)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  return normalized || 'profissional'
}

export function getPublicBaseUrl() {
  if (import.meta.env.VITE_ELLO_PUBLIC_BASE_URL) return import.meta.env.VITE_ELLO_PUBLIC_BASE_URL.replace(/\/$/, '')
  if (typeof window !== 'undefined') return window.location.origin
  return 'https://ello-ux.vercel.app'
}

export function createPublicProfilePath(profile = {}) {
  const slug = createProfileSlug(profile)
  const id = profile.profileId || profile.id || ''
  return `/p/${slug}${id ? `-${id}` : ''}`
}

export function createPublicProfileUrl(profile = {}) {
  return `${getPublicBaseUrl()}${createPublicProfilePath(profile)}`
}

export function extractProfileIdFromSlug(slug = '') {
  const value = String(slug)
  const uuid = value.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)
  if (uuid) return uuid[0]

  const parts = value.split('-')
  return parts[parts.length - 1] || value
}
