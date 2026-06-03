const fs = require('fs')
const path = require('path')
const { professionals } = require('./mockData')

const dataDir = path.join(__dirname, '..', '..', 'data')
const dataFile = path.join(dataDir, 'ello-dev-store.json')
const initialState = {
  clients: [],
  professionalSignups: [],
  quotes: []
}

function ensureStoreFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify(initialState, null, 2))
  }
}

function readState() {
  ensureStoreFile()

  try {
    const parsed = JSON.parse(fs.readFileSync(dataFile, 'utf8'))

    return {
      clients: Array.isArray(parsed.clients) ? parsed.clients : [],
      professionalSignups: Array.isArray(parsed.professionalSignups) ? parsed.professionalSignups : [],
      quotes: Array.isArray(parsed.quotes) ? parsed.quotes : []
    }
  } catch {
    return { ...initialState }
  }
}

function writeState(nextState) {
  ensureStoreFile()
  fs.writeFileSync(dataFile, JSON.stringify(nextState, null, 2))
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function withoutSensitiveFields(payload) {
  const { password, confirmPassword, ...safePayload } = payload
  return safePayload
}

function createClientSignup(payload) {
  const state = readState()
  const client = {
    id: createId('client'),
    type: 'client',
    ...withoutSensitiveFields(payload),
    createdAt: new Date().toISOString()
  }

  state.clients.push(client)
  writeState(state)
  return client
}

function createProfessionalSignup(payload) {
  const state = readState()
  const signup = {
    id: createId('pro'),
    type: 'professional',
    verificationStatus: 'pending',
    profileStatus: 'draft',
    ...withoutSensitiveFields(payload),
    createdAt: new Date().toISOString()
  }

  state.professionalSignups.push(signup)
  writeState(state)
  return signup
}

function createQuote(payload) {
  const state = readState()
  const professional = professionals.find((item) => item.id === payload.professionalId)
  const quote = {
    id: createId('quote'),
    status: 'Novo pedido',
    professionalId: payload.professionalId,
    professionalName: professional?.name || 'Profissional ELLO',
    description: payload.description,
    desiredDate: payload.desiredDate,
    location: payload.location,
    createdAt: new Date().toISOString()
  }

  state.quotes.push(quote)
  writeState(state)
  return quote
}

function listQuotes() {
  const state = readState()
  return [...state.quotes].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

function getStoreSummary() {
  const state = readState()

  return {
    clients: state.clients.length,
    professionalSignups: state.professionalSignups.length,
    quotes: state.quotes.length
  }
}

module.exports = {
  createClientSignup,
  createProfessionalSignup,
  createQuote,
  getStoreSummary,
  listQuotes,
  readState
}
