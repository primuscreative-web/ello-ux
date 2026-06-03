import {
  categories,
  onboardingSlides,
  professionalStats,
  professionals,
  requests
} from '../data/elloData'
import { getSessionToken } from './session'

const wait = (ms = 180) => new Promise((resolve) => window.setTimeout(resolve, ms))
const API_URL = import.meta.env.VITE_ELLO_API_URL || 'http://localhost:3001'

async function postJson(path, payload) {
  let response

  try {
    response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
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
  await wait()
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
  await wait()
  return professionals.find((professional) => professional.id === id) || professionals[0]
}

export async function getProfessionalStats() {
  await wait()
  return professionalStats
}

export async function getRequests() {
  try {
    const apiQuotes = await getJson('/quotes')

    if (apiQuotes.length > 0) {
      return apiQuotes.map((quote) => ({
        id: quote.id,
        client: quote.location,
        service: quote.description,
        status: quote.status,
        date: 'Agora',
        value: 'A definir'
      }))
    }
  } catch {
    await wait()
  }

  return requests
}

export function createClientSignup(payload) {
  return postJson('/signups/clients', payload)
}

export function createProfessionalSignup(payload) {
  return postJson('/signups/professionals', payload)
}

export function createQuoteRequest(payload) {
  return postJson('/quotes', payload)
}

export function login(payload) {
  return postJson('/auth/login', payload)
}

export function getCurrentUser() {
  return getJson('/auth/me')
}
