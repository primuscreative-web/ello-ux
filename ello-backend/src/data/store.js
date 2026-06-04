const fs = require('fs')
const path = require('path')
const { hashPassword, verifyPassword } = require('../lib/password')
const { professionals } = require('./mockData')

const dataDir = path.join(__dirname, '..', '..', 'data')
const dataFile = path.join(dataDir, 'ello-dev-store.json')
const initialState = {
  users: [],
  sessions: [],
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
      users: Array.isArray(parsed.users) ? parsed.users : [],
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
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

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function findUserByEmail(state, email) {
  const normalizedEmail = normalizeEmail(email)
  return state.users.find((user) => user.email === normalizedEmail)
}

function toPublicUser(user) {
  if (!user) return null

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    profileId: user.profileId,
    createdAt: user.createdAt
  }
}

function createUser(state, payload, role, profileId) {
  const email = normalizeEmail(payload.email)

  if (findUserByEmail(state, email)) {
    const error = new Error('Email ja cadastrado.')
    error.code = 'EMAIL_EXISTS'
    error.errors = { email: 'Este email ja esta em uso.' }
    throw error
  }

  const now = new Date().toISOString()
  const user = {
    id: createId('user'),
    email,
    passwordHash: hashPassword(payload.password),
    role,
    profileId,
    createdAt: now,
    updatedAt: now
  }

  state.users.push(user)
  return user
}

function createSessionForUser(state, user) {
  const session = {
    token: createId('session'),
    userId: user.id,
    createdAt: new Date().toISOString()
  }

  state.sessions.push(session)
  return session
}

function createClientSignup(payload) {
  const state = readState()
  const client = {
    id: createId('client'),
    type: 'client',
    ...withoutSensitiveFields(payload),
    createdAt: new Date().toISOString()
  }
  const user = createUser(state, payload, 'client', client.id)
  const session = createSessionForUser(state, user)

  state.clients.push(client)
  writeState(state)
  return { profile: client, token: session.token, user: toPublicUser(user) }
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
  const user = createUser(state, payload, 'professional', signup.id)
  const session = createSessionForUser(state, user)

  state.professionalSignups.push(signup)
  writeState(state)
  return { profile: signup, token: session.token, user: toPublicUser(user) }
}

function loginUser(payload) {
  const state = readState()
  const user = findUserByEmail(state, payload.email)

  if (!user || !verifyPassword(payload.password, user.passwordHash)) {
    const error = new Error('Email ou senha invalidos.')
    error.code = 'INVALID_CREDENTIALS'
    error.errors = { email: 'Confira email e senha.' }
    throw error
  }

  const session = createSessionForUser(state, user)
  writeState(state)

  return { token: session.token, user: toPublicUser(user) }
}

function getUserByToken(token) {
  const state = readState()
  const session = state.sessions.find((item) => item.token === token)

  if (!session) return null

  return toPublicUser(state.users.find((user) => user.id === session.userId))
}

function createQuote(payload, user) {
  const state = readState()
  const professional = professionals.find((item) => item.id === payload.professionalId)
  const quote = {
    id: createId('quote'),
    status: 'Novo pedido',
    clientUserId: user?.id || null,
    professionalId: payload.professionalId,
    professionalName: professional?.name || 'Profissional ELLO',
    description: payload.description,
    desiredDate: payload.desiredDate,
    location: payload.location,
    responsePrice: '',
    responseMessage: '',
    responseEta: '',
    respondedAt: '',
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

function listQuotesForUser(user) {
  const quotes = listQuotes()

  if (user?.role === 'client') {
    return quotes.filter((quote) => quote.clientUserId === user.id)
  }

  return quotes
}

function respondToQuote(id, payload, user) {
  const state = readState()
  const quote = state.quotes.find((item) => item.id === id)

  if (!quote) {
    const error = new Error('Pedido nao encontrado.')
    error.code = 'QUOTE_NOT_FOUND'
    throw error
  }

  if (user?.role !== 'professional') {
    const error = new Error('Apenas profissionais podem responder pedidos.')
    error.code = 'FORBIDDEN'
    throw error
  }

  quote.status = 'Orcamento enviado'
  quote.responsePrice = payload.responsePrice
  quote.responseEta = payload.responseEta
  quote.responseMessage = payload.responseMessage
  quote.respondedAt = new Date().toISOString()

  writeState(state)
  return quote
}

function updateQuoteStatus(id, payload, user) {
  const state = readState()
  const quote = findQuoteForUser(state, id, user)
  const allowedStatuses = ['Aceito', 'Cancelado']

  if (!quote) {
    const error = new Error('Pedido nao encontrado.')
    error.code = 'QUOTE_NOT_FOUND'
    throw error
  }

  if (user?.role !== 'client') {
    const error = new Error('Apenas clientes podem alterar o status do pedido.')
    error.code = 'FORBIDDEN'
    throw error
  }

  if (!allowedStatuses.includes(payload.status)) {
    const error = new Error('Status invalido para esta etapa.')
    error.code = 'INVALID_STATUS'
    throw error
  }

  if (payload.status === 'Aceito' && quote.status !== 'Orcamento enviado') {
    const error = new Error('Aceite disponivel apenas apos o orcamento.')
    error.code = 'INVALID_STATUS'
    throw error
  }

  quote.status = payload.status
  quote.statusUpdatedAt = new Date().toISOString()

  writeState(state)
  return quote
}

function findQuoteForUser(state, id, user) {
  const quote = state.quotes.find((item) => item.id === id)

  if (!quote) return null
  if (user?.role === 'client' && quote.clientUserId !== user.id) return null

  return quote
}

function listQuoteMessages(id, user) {
  const state = readState()
  const quote = findQuoteForUser(state, id, user)

  if (!quote) {
    const error = new Error('Pedido nao encontrado.')
    error.code = 'QUOTE_NOT_FOUND'
    throw error
  }

  return Array.isArray(quote.messages) ? quote.messages : []
}

function createQuoteMessage(id, payload, user) {
  const state = readState()
  const quote = findQuoteForUser(state, id, user)

  if (!quote) {
    const error = new Error('Pedido nao encontrado.')
    error.code = 'QUOTE_NOT_FOUND'
    throw error
  }

  const message = {
    id: createId('msg'),
    quoteId: quote.id,
    senderUserId: user.id,
    senderRole: user.role,
    body: payload.body,
    createdAt: new Date().toISOString()
  }

  quote.messages = Array.isArray(quote.messages) ? quote.messages : []
  quote.messages.push(message)
  quote.lastMessageAt = message.createdAt

  writeState(state)
  return message
}

function getStoreSummary() {
  const state = readState()

  return {
    users: state.users.length,
    sessions: state.sessions.length,
    clients: state.clients.length,
    professionalSignups: state.professionalSignups.length,
    quotes: state.quotes.length
  }
}

module.exports = {
  createClientSignup,
  createProfessionalSignup,
  createQuote,
  createQuoteMessage,
  getUserByToken,
  getStoreSummary,
  listQuoteMessages,
  loginUser,
  listQuotes,
  listQuotesForUser,
  readState,
  respondToQuote,
  updateQuoteStatus
}
