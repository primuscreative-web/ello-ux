const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { hashPassword, verifyPassword } = require('../lib/password')

const dataDir = path.join(__dirname, '..', '..', 'data')
const dataFile = path.join(dataDir, 'ello-dev-store.json')
const SESSION_TTL_MS = Number(process.env.ELLO_SESSION_TTL_MS || 1000 * 60 * 60 * 24 * 30)
const initialState = {
  users: [],
  sessions: [],
  clients: [],
  professionalSignups: [],
  quotes: [],
  auditEvents: []
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
      quotes: Array.isArray(parsed.quotes) ? parsed.quotes : [],
      auditEvents: Array.isArray(parsed.auditEvents) ? parsed.auditEvents : []
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
  return `${prefix}-${Date.now()}-${crypto.randomBytes(8).toString('hex')}`
}

function createSessionToken() {
  return `session-${crypto.randomBytes(32).toString('base64url')}`
}

function withoutSensitiveFields(payload) {
  const { password, confirmPassword, ...safePayload } = payload
  return safePayload
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function toInitials(name) {
  return String(name || 'ELLO')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'EL'
}

function mapProfessional(signup) {
  const name = signup.publicName || signup.fullName || 'Profissional ELLO'
  const category = signup.specialty || 'Servicos'

  return {
    id: signup.id,
    name,
    category,
    city: signup.city || 'Brasil',
    neighborhood: signup.coverage || signup.city || 'Brasil',
    rating: 0,
    jobs: 0,
    responseTime: 'responde em breve',
    price: signup.basePrice || 'A combinar',
    chargeType: signup.chargeType || 'por atendimento',
    keywords: [category, signup.city, signup.coverage, signup.description].filter(Boolean).map((item) => String(item).toLowerCase()),
    bio: signup.description || 'Perfil profissional em construcao.',
    portfolio: [],
    reviewCount: 0,
    verified: signup.verificationStatus === 'verified',
    completedJobsLabel: '0 servicos',
    trustSignals: [],
    recentWork: [],
    availability: signup.availability || 'A combinar',
    avatar: toInitials(name),
    accent: 'from-[#E8FFF7] via-white to-[#FFF0DD]',
    chips: [category, signup.city, signup.availability || 'A combinar'].filter(Boolean).slice(0, 3),
    profileHealth: signup.profileStatus === 'published' ? 72 : 48
  }
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
    fullName: user.fullName,
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
    fullName: payload.fullName,
    profileId,
    createdAt: now,
    updatedAt: now
  }

  state.users.push(user)
  return user
}

function createSessionForUser(state, user) {
  const createdAt = new Date().toISOString()
  const session = {
    token: createSessionToken(),
    userId: user.id,
    createdAt,
    expiresAt: new Date(Date.now() + SESSION_TTL_MS).toISOString()
  }

  state.sessions.push(session)
  return session
}

function recordAuditEvent(state, { actorUserId = null, entityType, entityId, action, metadata = {} }) {
  state.auditEvents = Array.isArray(state.auditEvents) ? state.auditEvents : []
  state.auditEvents.push({
    id: createId('audit'),
    actorUserId,
    entityType,
    entityId,
    action,
    metadata,
    createdAt: new Date().toISOString()
  })
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
  recordAuditEvent(state, {
    actorUserId: user.id,
    entityType: 'client_profile',
    entityId: client.id,
    action: 'client.signup',
    metadata: { city: client.city }
  })
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
  recordAuditEvent(state, {
    actorUserId: user.id,
    entityType: 'professional_profile',
    entityId: signup.id,
    action: 'professional.signup',
    metadata: { specialty: signup.specialty, city: signup.city }
  })
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
  recordAuditEvent(state, {
    actorUserId: user.id,
    entityType: 'session',
    entityId: session.token.slice(0, 18),
    action: 'auth.login',
    metadata: { role: user.role }
  })
  writeState(state)

  return { token: session.token, user: toPublicUser(user) }
}

function getUserByToken(token) {
  if (!token) return null

  const state = readState()
  const session = state.sessions.find((item) => item.token === token)

  if (!session) return null
  if (session.expiresAt && Date.parse(session.expiresAt) <= Date.now()) return null

  return toPublicUser(state.users.find((user) => user.id === session.userId))
}

function createQuote(payload, user) {
  const state = readState()
  const professional = state.professionalSignups.find((item) => item.id === payload.professionalId)
  if (!professional) {
    const error = new Error('Profissional nao encontrado.')
    error.code = 'QUOTE_NOT_FOUND'
    throw error
  }

  const quote = {
    id: createId('quote'),
    status: 'Novo pedido',
    clientUserId: user?.id || null,
    professionalId: payload.professionalId,
    clientName: user?.fullName || 'Cliente ELLO',
    professionalName: professional.publicName || professional.fullName || 'Profissional ELLO',
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
  recordAuditEvent(state, {
    actorUserId: user?.id || null,
    entityType: 'quote_request',
    entityId: quote.id,
    action: 'quote.create',
    metadata: { professionalId: quote.professionalId, status: quote.status }
  })
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

  return quotes.filter((quote) => quote.professionalId === user.profileId)
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

  if (quote.professionalId !== user.profileId) {
    const error = new Error('Pedido nao encontrado.')
    error.code = 'QUOTE_NOT_FOUND'
    throw error
  }

  quote.status = 'Orcamento enviado'
  quote.responsePrice = payload.responsePrice
  quote.responseEta = payload.responseEta
  quote.responseMessage = payload.responseMessage
  quote.respondedAt = new Date().toISOString()
  recordAuditEvent(state, {
    actorUserId: user.id,
    entityType: 'quote_request',
    entityId: quote.id,
    action: 'quote.respond',
    metadata: { status: quote.status }
  })

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
  recordAuditEvent(state, {
    actorUserId: user.id,
    entityType: 'quote_request',
    entityId: quote.id,
    action: 'quote.status_update',
    metadata: { status: quote.status }
  })

  writeState(state)
  return quote
}

function findQuoteForUser(state, id, user) {
  const quote = state.quotes.find((item) => item.id === id)

  if (!quote) return null
  if (user?.role === 'client' && quote.clientUserId !== user.id) return null
  if (user?.role === 'professional' && quote.professionalId !== user.profileId) return null

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

  return (Array.isArray(quote.messages) ? quote.messages : []).map((message) => {
    const mine = message.senderUserId === user.id
    const senderRole = mine
      ? user.role
      : user.role === 'client' ? 'professional' : 'client'

    return {
      ...message,
      senderRole,
      senderName: mine ? 'Voce' : senderRole === 'professional' ? quote.professionalName : quote.clientName
    }
  })
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
    senderName: 'Voce',
    body: payload.body,
    createdAt: new Date().toISOString()
  }

  quote.messages = Array.isArray(quote.messages) ? quote.messages : []
  quote.messages.push(message)
  quote.lastMessageAt = message.createdAt
  recordAuditEvent(state, {
    actorUserId: user.id,
    entityType: 'quote_message',
    entityId: message.id,
    action: 'quote.message_create',
    metadata: { quoteId: quote.id, senderRole: user.role }
  })

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
    quotes: state.quotes.length,
    auditEvents: state.auditEvents.length
  }
}

function listProfessionals({ search = '', category = '' } = {}) {
  const state = readState()
  const normalizedSearch = String(search || '').toLowerCase()
  const normalizedCategory = String(category || '').toLowerCase()

  return state.professionalSignups.map(mapProfessional).filter((professional) => {
    const matchesSearch =
      !normalizedSearch ||
      professional.name.toLowerCase().includes(normalizedSearch) ||
      professional.category.toLowerCase().includes(normalizedSearch) ||
      professional.city.toLowerCase().includes(normalizedSearch) ||
      professional.neighborhood.toLowerCase().includes(normalizedSearch) ||
      professional.keywords.some((keyword) => keyword.includes(normalizedSearch))

    const matchesCategory =
      !normalizedCategory || normalizedCategory === 'todos' || professional.category.toLowerCase() === normalizedCategory

    return matchesSearch && matchesCategory
  })
}

function getProfessionalById(id) {
  const state = readState()
  const professional = state.professionalSignups.find((item) => item.id === id)
  return professional ? mapProfessional(professional) : null
}

module.exports = {
  createClientSignup,
  createProfessionalSignup,
  createQuote,
  createQuoteMessage,
  getUserByToken,
  getStoreSummary,
  listQuoteMessages,
  listProfessionals,
  loginUser,
  getProfessionalById,
  listQuotes,
  listQuotesForUser,
  readState,
  respondToQuote,
  updateQuoteStatus
}
