const { professionals } = require('./mockData')

const state = {
  clients: [],
  professionalSignups: [],
  quotes: []
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function withoutSensitiveFields(payload) {
  const { password, confirmPassword, ...safePayload } = payload
  return safePayload
}

function createClientSignup(payload) {
  const client = {
    id: createId('client'),
    type: 'client',
    ...withoutSensitiveFields(payload),
    createdAt: new Date().toISOString()
  }

  state.clients.push(client)
  return client
}

function createProfessionalSignup(payload) {
  const signup = {
    id: createId('pro'),
    type: 'professional',
    verificationStatus: 'pending',
    profileStatus: 'draft',
    ...withoutSensitiveFields(payload),
    createdAt: new Date().toISOString()
  }

  state.professionalSignups.push(signup)
  return signup
}

function createQuote(payload) {
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
  return quote
}

function listQuotes() {
  return [...state.quotes].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

module.exports = {
  createClientSignup,
  createProfessionalSignup,
  createQuote,
  listQuotes,
  state
}
