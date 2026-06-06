import {
  categories,
  onboardingSlides,
  professionalStats,
  professionals,
  requests
} from '../data/elloData'
import { createLocalQuote, getDemoMessages, getLocalQuotes, respondToLocalQuote, updateLocalQuoteStatus } from './localExperience'
import { getSessionToken } from './session'

const wait = (ms = 180) => new Promise((resolve) => window.setTimeout(resolve, ms))
const API_URL = import.meta.env.VITE_ELLO_API_URL || ''

async function postJson(path, payload, method = 'POST') {
  if (!API_URL) {
    throw new Error('API nao configurada para este ambiente.')
  }

  let response

  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(getSessionToken() ? { Authorization: `Bearer ${getSessionToken()}` } : {})
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

async function getJson(path) {
  if (!API_URL) {
    throw new Error('API nao configurada para este ambiente.')
  }

  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      ...(getSessionToken() ? { Authorization: `Bearer ${getSessionToken()}` } : {})
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

    if (apiProfessionals.length > 0) {
      return apiProfessionals
    }
  } catch {
    await wait()
  }

  const normalizedSearch = search.toLowerCase().trim()
  return professionals.filter((professional) => {
    const matchesCategory = category === 'Todos' || professional.category === category
    const matchesSearch =
      !normalizedSearch ||
      professional.name.toLowerCase().includes(normalizedSearch) ||
      professional.category.toLowerCase().includes(normalizedSearch) ||
      professional.city.toLowerCase().includes(normalizedSearch) ||
      professional.neighborhood.toLowerCase().includes(normalizedSearch) ||
      professional.bio.toLowerCase().includes(normalizedSearch) ||
      professional.keywords.some((keyword) => keyword.includes(normalizedSearch))

    return matchesCategory && matchesSearch
  })
}

export async function getProfessionalById(id) {
  try {
    return await getJson(`/professionals/${id}`)
  } catch {
    await wait()
  }

  return professionals.find((professional) => professional.id === id) || professionals[0]
}

export async function getProfessionalStats() {
  await wait()
  return professionalStats
}

export async function getRequests() {
  if (!getSessionToken()) {
    await wait()
    return [...getLocalQuotes(), ...requests]
  }

  try {
    const apiQuotes = await getJson('/quotes')

    if (apiQuotes.length > 0) {
      return apiQuotes.map((quote) => ({
        id: quote.id,
        client: quote.location,
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
  } catch {
    await wait()
  }

  return [...getLocalQuotes(), ...requests]
}

export function createClientSignup(payload) {
  return postJson('/signups/clients', payload)
}

export function createProfessionalSignup(payload) {
  return postJson('/signups/professionals', payload)
}

export async function createQuoteRequest(payload) {
  try {
    return await postJson('/quotes', payload)
  } catch {
    await wait(120)
    const professional = professionals.find((item) => item.id === payload.professionalId)
    return createLocalQuote(payload, professional)
  }
}

export async function respondToQuote(id, payload) {
  try {
    return await postJson(`/quotes/${id}/response`, payload, 'PATCH')
  } catch {
    await wait(120)
    return respondToLocalQuote(id, payload) || {
      id,
      status: 'Orcamento enviado',
      responsePrice: payload.responsePrice,
      responseEta: payload.responseEta,
      responseMessage: payload.responseMessage
    }
  }
}

export async function updateQuoteStatus(id, status) {
  try {
    return await postJson(`/quotes/${id}/status`, { status }, 'PATCH')
  } catch {
    await wait(120)
    return updateLocalQuoteStatus(id, status) || { id, status }
  }
}

export async function getQuoteMessages(id) {
  try {
    return await getJson(`/quotes/${id}/messages`)
  } catch {
    await wait()
    return getDemoMessages(id)
  }
}

export async function sendQuoteMessage(id, payload) {
  try {
    return await postJson(`/quotes/${id}/messages`, payload)
  } catch {
    await wait(120)
    return {
      id: `msg-local-${Date.now()}`,
      quoteId: id,
      senderUserId: 'local-user',
      senderRole: 'client',
      body: payload.body,
      createdAt: new Date().toISOString()
    }
  }
}

export function login(payload) {
  return postJson('/auth/login', payload)
}

export function getCurrentUser() {
  return getJson('/auth/me')
}
