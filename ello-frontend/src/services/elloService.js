import {
  categories,
  onboardingSlides
} from '../data/elloData'
import { getSessionToken } from './session'

const wait = (ms = 180) => new Promise((resolve) => window.setTimeout(resolve, ms))
const API_URL = import.meta.env.VITE_ELLO_API_URL || ''

async function postJson(path, payload, method = 'POST', tokenOverride = '') {
  if (!API_URL) {
    throw new Error('API nao configurada para este ambiente.')
  }

  let response

  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...((tokenOverride || getSessionToken()) ? { Authorization: `Bearer ${tokenOverride || getSessionToken()}` } : {})
      },
      body: JSON.stringify(payload)
    })
  } catch {
    throw new Error('API indisponivel. Inicie o backend em http://localhost:3001.')
  }

  const body = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(body.error || 'Nao foi possivel concluir a solicitacao.')
    error.errors = body.errors || {}
    throw error
  }

  return body.data
}

async function getJson(path, tokenOverride = '') {
  if (!API_URL) {
    throw new Error('API nao configurada para este ambiente.')
  }

  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      ...((tokenOverride || getSessionToken()) ? { Authorization: `Bearer ${tokenOverride || getSessionToken()}` } : {})
    }
  })
  const body = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(body.error || 'Nao foi possivel carregar os dados.')
  }

  return body.data
}

export async function getOnboardingSlides() {
  await wait()
  return onboardingSlides
}

export async function getCategories() {
  await wait()
  return categories
}

export async function getProfessionals({ search = '', category = 'Todos' } = {}) {
  try {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (category && category !== 'Todos') params.set('category', category)
    const apiProfessionals = await getJson(`/professionals${params.toString() ? `?${params}` : ''}`)

    return apiProfessionals
  } catch {
    await wait()
  }

  return []
}

export async function getProfessionalById(id) {
  return getJson(`/professionals/${id}`)
}

export async function getRequests() {
  if (!getSessionToken()) {
    return []
  }

  const apiQuotes = await getJson('/quotes')

  return apiQuotes.map((quote) => ({
    id: quote.id,
    client: quote.location,
    clientName: quote.clientName,
    service: quote.description,
    status: quote.status,
    date: 'Agora',
    value: quote.responsePrice || 'A definir',
    responseEta: quote.responseEta,
    responseMessage: quote.responseMessage,
    professionalId: quote.professionalId,
    professionalName: quote.professionalName
  }))
}

export function createClientSignup(payload) {
  return postJson('/signups/clients', payload)
}

export function createProfessionalSignup(payload) {
  return postJson('/signups/professionals', payload)
}

export async function createQuoteRequest(payload) {
  return postJson('/quotes', payload)
}

export async function respondToQuote(id, payload) {
  return postJson(`/quotes/${id}/response`, payload, 'PATCH')
}

export async function updateQuoteStatus(id, status) {
  return postJson(`/quotes/${id}/status`, { status }, 'PATCH')
}

export async function getQuoteMessages(id) {
  return getJson(`/quotes/${id}/messages`)
}

export async function sendQuoteMessage(id, payload) {
  return postJson(`/quotes/${id}/messages`, payload)
}

export function login(payload) {
  return postJson('/auth/login', payload)
}

export function getCurrentUser() {
  return getJson('/auth/me')
}

export function getCurrentUserWithToken(token) {
  return getJson('/auth/me', token)
}

export function getGoogleAuthUrl(redirectTo) {
  const params = new URLSearchParams({ redirectTo })
  return getJson(`/auth/google?${params.toString()}`)
}
