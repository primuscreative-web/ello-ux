import { getSession } from './session'

const PROFILE_KEY = 'ello.profileOverrides'

function readOverrides() {
  try {
    return JSON.parse(window.localStorage.getItem(PROFILE_KEY)) || {}
  } catch {
    return {}
  }
}

function writeOverrides(overrides) {
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(overrides))
}

export function firstName(name = '') {
  return String(name).trim().split(/\s+/)[0] || 'voce'
}

export function initials(name = '') {
  const parts = String(name || 'ELLO').trim().split(/\s+/).filter(Boolean)
  return parts.slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'EL'
}

export function getCurrentProfile() {
  const session = getSession()
  const user = session?.user || {}
  const profile = session?.profile || {}
  const overrides = readOverrides()[user.id] || {}
  const fullName = overrides.fullName || profile.fullName || profile.publicName || user.fullName || user.name || user.email?.split('@')[0] || ''

  return {
    id: user.id,
    role: user.role || profile.type || 'client',
    email: user.email || profile.email || '',
    fullName,
    publicName: overrides.publicName || profile.publicName || fullName,
    birthDate: overrides.birthDate || profile.birthDate || '',
    specialty: overrides.specialty || profile.specialty || '',
    city: overrides.city || profile.city || '',
    region: overrides.region || profile.region || '',
    coverage: overrides.coverage || profile.coverage || '',
    experience: overrides.experience || profile.experience || '',
    description: overrides.description || profile.description || '',
    basePrice: overrides.basePrice || profile.basePrice || '',
    chargeType: overrides.chargeType || profile.chargeType || '',
    availability: overrides.availability || profile.availability || '',
    materials: overrides.materials || profile.materials || '',
    phone: overrides.phone || profile.phone || '',
    fiscalCity: overrides.fiscalCity || profile.fiscalCity || '',
    document: overrides.document || profile.document || '',
    paymentKey: overrides.paymentKey || profile.paymentKey || '',
    avatar: initials(overrides.publicName || fullName)
  }
}

export function saveCurrentProfile(patch) {
  const session = getSession()
  if (!session?.user?.id) return null

  const overrides = readOverrides()
  overrides[session.user.id] = {
    ...(overrides[session.user.id] || {}),
    ...patch
  }
  writeOverrides(overrides)
  window.dispatchEvent(new CustomEvent('ello:profile-changed'))
  return getCurrentProfile()
}
