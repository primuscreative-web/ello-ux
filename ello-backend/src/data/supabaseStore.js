const { professionals: fallbackProfessionals } = require('./mockData')

const quoteStatusToDb = {
  'Novo pedido': 'new',
  'Orcamento enviado': 'quoted',
  Aceito: 'accepted',
  'Em andamento': 'in_progress',
  Concluido: 'completed',
  Cancelado: 'cancelled'
}

const quoteStatusFromDb = {
  new: 'Novo pedido',
  quoted: 'Orcamento enviado',
  accepted: 'Aceito',
  in_progress: 'Em andamento',
  completed: 'Concluido',
  cancelled: 'Cancelado',
  declined: 'Recusado'
}

function requireConfig() {
  const config = {
    url: String(process.env.SUPABASE_URL || '').replace(/\/$/, ''),
    anonKey: process.env.SUPABASE_ANON_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY
  }

  if (!config.url || !config.anonKey || !config.serviceKey) {
    const error = new Error('Supabase nao configurado. Defina SUPABASE_URL, SUPABASE_ANON_KEY e SUPABASE_SERVICE_ROLE_KEY.')
    error.code = 'STORE_NOT_CONFIGURED'
    throw error
  }

  return config
}

async function supabaseFetch(path, { method = 'GET', body, token, service = true, headers = {} } = {}) {
  const config = requireConfig()
  const key = service ? config.serviceKey : config.anonKey
  const response = await fetch(`${config.url}${path}`, {
    method,
    headers: {
      apikey: key,
      Authorization: `Bearer ${token || key}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined
  })
  const text = await response.text()
  const data = text ? JSON.parse(text) : null

  if (!response.ok) {
    const error = new Error(data?.message || data?.error_description || data?.error || 'Erro Supabase.')
    error.status = response.status
    error.details = data
    throw error
  }

  return { data, response }
}

function restPath(table, query = '') {
  return `/rest/v1/${table}${query ? `?${query}` : ''}`
}

async function insertRow(table, payload) {
  const { data } = await supabaseFetch(restPath(table), {
    method: 'POST',
    body: payload,
    headers: { Prefer: 'return=representation' }
  })

  return Array.isArray(data) ? data[0] : data
}

async function patchRows(table, query, payload) {
  const { data } = await supabaseFetch(restPath(table, query), {
    method: 'PATCH',
    body: payload,
    headers: { Prefer: 'return=representation' }
  })

  return Array.isArray(data) ? data : []
}

async function selectRows(table, query) {
  const { data } = await supabaseFetch(restPath(table, query))
  return Array.isArray(data) ? data : []
}

async function selectOne(table, query) {
  const rows = await selectRows(table, query)
  return rows[0] || null
}

async function countTable(table) {
  const { response } = await supabaseFetch(restPath(table, 'select=id&limit=1'), {
    headers: { Prefer: 'count=exact' }
  })
  const range = response.headers.get('content-range') || ''
  const count = Number(range.split('/')[1])

  return Number.isFinite(count) ? count : 0
}

function withoutSensitiveFields(payload) {
  const { password, confirmPassword, ...safePayload } = payload
  return safePayload
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

function mapProfessional(row) {
  const fullName = row.profiles?.full_name || row.public_name || 'Profissional ELLO'
  const category = row.specialty || 'Servicos'

  return {
    id: row.id,
    name: row.public_name || fullName,
    category,
    city: row.city,
    neighborhood: row.coverage || row.city,
    rating: Number(row.rating || 0) || 4.9,
    jobs: Number(row.jobs || 0),
    responseTime: row.response_time || 'responde em breve',
    price: row.base_price,
    chargeType: row.charge_type,
    keywords: [category, row.city, row.coverage, row.description].filter(Boolean).map((item) => String(item).toLowerCase()),
    bio: row.description,
    portfolio: [],
    availability: row.availability || 'A combinar',
    avatar: toInitials(row.public_name || fullName),
    accent: 'from-[#E8FFF7] via-white to-[#DDF3FF]',
    chips: [category, row.city, row.availability || 'A combinar'].filter(Boolean).slice(0, 3),
    profileHealth: row.profile_status === 'published' ? 92 : 72
  }
}

function mapQuote(row) {
  const professionalName = row.professional_profiles?.public_name || row.professional_profiles?.profiles?.full_name || 'Profissional ELLO'

  return {
    id: row.id,
    status: quoteStatusFromDb[row.status] || 'Novo pedido',
    clientUserId: row.client_profiles?.user_id || null,
    professionalId: row.professional_id,
    professionalName,
    description: row.description,
    desiredDate: row.desired_date,
    location: row.location,
    responsePrice: row.response_price || '',
    responseMessage: row.response_message || '',
    responseEta: row.response_eta || '',
    respondedAt: row.responded_at || '',
    createdAt: row.created_at,
    statusUpdatedAt: row.updated_at
  }
}

function toPublicUser(profile, profileId) {
  if (!profile) return null

  return {
    id: profile.id,
    email: profile.email,
    role: profile.role,
    profileId,
    createdAt: profile.created_at
  }
}

async function createAuthUser(payload, role) {
  const { data } = await supabaseFetch('/auth/v1/admin/users', {
    method: 'POST',
    body: {
      email: String(payload.email || '').toLowerCase(),
      password: payload.password,
      email_confirm: true,
      user_metadata: {
        full_name: payload.fullName,
        role
      }
    }
  })

  return data
}

async function createSession(payload) {
  const { data } = await supabaseFetch('/auth/v1/token?grant_type=password', {
    method: 'POST',
    service: false,
    body: {
      email: String(payload.email || '').toLowerCase(),
      password: payload.password
    }
  })

  return data
}

async function getProfileId(profile) {
  if (profile.role === 'client') {
    const client = await selectOne('client_profiles', `user_id=eq.${profile.id}&select=id`)
    return client?.id || null
  }

  if (profile.role === 'professional') {
    const professional = await selectOne('professional_profiles', `user_id=eq.${profile.id}&select=id`)
    return professional?.id || null
  }

  return null
}

async function getProfileByUserId(userId) {
  return selectOne('profiles', `id=eq.${userId}&select=*`)
}

async function getUserByToken(token) {
  if (!token) return null

  try {
    const { data: authUser } = await supabaseFetch('/auth/v1/user', {
      token,
      service: false
    })
    const profile = await getProfileByUserId(authUser.id)
    const profileId = await getProfileId(profile)

    return toPublicUser(profile, profileId)
  } catch {
    return null
  }
}

async function createClientSignup(payload) {
  const authUser = await createAuthUser(payload, 'client')
  const profile = await insertRow('profiles', {
    id: authUser.id,
    email: authUser.email,
    role: 'client',
    full_name: payload.fullName
  })
  const client = await insertRow('client_profiles', {
    user_id: authUser.id,
    birth_date: payload.birthDate || null,
    city: payload.city,
    region: payload.region || null,
    interests: payload.interests || null
  })
  const session = await createSession(payload)

  return {
    profile: { id: client.id, type: 'client', ...withoutSensitiveFields(payload), createdAt: client.created_at },
    token: session.access_token,
    user: toPublicUser(profile, client.id)
  }
}

async function createProfessionalSignup(payload) {
  const authUser = await createAuthUser(payload, 'professional')
  const profile = await insertRow('profiles', {
    id: authUser.id,
    email: authUser.email,
    role: 'professional',
    full_name: payload.fullName
  })
  const professional = await insertRow('professional_profiles', {
    user_id: authUser.id,
    public_name: payload.publicName || payload.fullName,
    specialty: payload.specialty,
    city: payload.city,
    coverage: payload.coverage,
    description: payload.description,
    base_price: payload.basePrice,
    charge_type: payload.chargeType,
    availability: payload.availability || null,
    materials: payload.materials || null,
    phone: payload.phone || null,
    fiscal_city: payload.fiscalCity || null,
    document_ref: payload.document ? `doc-${authUser.id}` : null,
    verification_status: 'pending',
    profile_status: 'published'
  })
  const session = await createSession(payload)

  return {
    profile: { id: professional.id, type: 'professional', verificationStatus: 'pending', profileStatus: 'published', ...withoutSensitiveFields(payload), createdAt: professional.created_at },
    token: session.access_token,
    user: toPublicUser(profile, professional.id)
  }
}

async function loginUser(payload) {
  const session = await createSession(payload)
  const profile = await getProfileByUserId(session.user.id)
  const profileId = await getProfileId(profile)

  if (!profile) {
    const error = new Error('Perfil nao encontrado.')
    error.code = 'INVALID_CREDENTIALS'
    throw error
  }

  return {
    token: session.access_token,
    user: toPublicUser(profile, profileId)
  }
}

async function listProfessionals({ search = '', category = '' } = {}) {
  const normalizedCategory = String(category || '').trim()
  const filters = [
    'select=*,profiles(full_name)',
    'profile_status=eq.published',
    'order=created_at.desc',
    'limit=50'
  ]

  if (normalizedCategory && normalizedCategory.toLowerCase() !== 'todos') {
    filters.push(`specialty=ilike.${encodeURIComponent(normalizedCategory)}`)
  }

  const rows = await selectRows('professional_profiles', filters.join('&'))
  const normalizedSearch = String(search || '').toLowerCase().trim()
  const mapped = rows.map(mapProfessional)

  if (!normalizedSearch) return mapped

  return mapped.filter((professional) => (
    professional.name.toLowerCase().includes(normalizedSearch) ||
    professional.category.toLowerCase().includes(normalizedSearch) ||
    professional.city.toLowerCase().includes(normalizedSearch) ||
    professional.neighborhood.toLowerCase().includes(normalizedSearch) ||
    professional.bio.toLowerCase().includes(normalizedSearch)
  ))
}

async function getProfessionalById(id) {
  const row = await selectOne('professional_profiles', `id=eq.${id}&select=*,profiles(full_name)`)
  return row ? mapProfessional(row) : fallbackProfessionals.find((item) => item.id === id) || null
}

async function getClientProfile(user) {
  const client = await selectOne('client_profiles', `user_id=eq.${user.id}&select=*`)
  if (!client) {
    const error = new Error('Perfil de cliente nao encontrado.')
    error.code = 'FORBIDDEN'
    throw error
  }

  return client
}

async function getProfessionalProfile(user) {
  const professional = await selectOne('professional_profiles', `user_id=eq.${user.id}&select=*`)
  if (!professional) {
    const error = new Error('Perfil profissional nao encontrado.')
    error.code = 'FORBIDDEN'
    throw error
  }

  return professional
}

async function createQuote(payload, user) {
  const client = await getClientProfile(user)
  const professional = await selectOne('professional_profiles', `id=eq.${payload.professionalId}&select=id`)

  if (!professional) {
    const error = new Error('Profissional nao encontrado.')
    error.code = 'QUOTE_NOT_FOUND'
    throw error
  }

  const quote = await insertRow('quote_requests', {
    client_id: client.id,
    professional_id: professional.id,
    description: payload.description,
    desired_date: payload.desiredDate || null,
    location: payload.location,
    status: 'new'
  })

  return mapQuote(quote)
}

async function listQuotesForUser(user) {
  const select = 'select=*,client_profiles(user_id),professional_profiles(public_name,profiles(full_name))&order=created_at.desc'

  if (user.role === 'client') {
    const client = await getClientProfile(user)
    return (await selectRows('quote_requests', `${select}&client_id=eq.${client.id}`)).map(mapQuote)
  }

  const professional = await getProfessionalProfile(user)
  return (await selectRows('quote_requests', `${select}&professional_id=eq.${professional.id}`)).map(mapQuote)
}

async function listQuotes() {
  return (await selectRows('quote_requests', 'select=*,client_profiles(user_id),professional_profiles(public_name,profiles(full_name))&order=created_at.desc')).map(mapQuote)
}

async function findQuoteForUser(id, user) {
  const rows = await listQuotesForUser(user)
  return rows.find((quote) => quote.id === id) || null
}

async function respondToQuote(id, payload, user) {
  if (user?.role !== 'professional') {
    const error = new Error('Apenas profissionais podem responder pedidos.')
    error.code = 'FORBIDDEN'
    throw error
  }

  const professional = await getProfessionalProfile(user)
  const rows = await patchRows('quote_requests', `id=eq.${id}&professional_id=eq.${professional.id}`, {
    status: 'quoted',
    response_price: payload.responsePrice,
    response_eta: payload.responseEta,
    response_message: payload.responseMessage,
    responded_at: new Date().toISOString()
  })

  if (rows.length === 0) {
    const error = new Error('Pedido nao encontrado.')
    error.code = 'QUOTE_NOT_FOUND'
    throw error
  }

  return mapQuote(rows[0])
}

async function updateQuoteStatus(id, payload, user) {
  if (user?.role !== 'client') {
    const error = new Error('Apenas clientes podem alterar o status do pedido.')
    error.code = 'FORBIDDEN'
    throw error
  }

  const quote = await findQuoteForUser(id, user)
  if (!quote) {
    const error = new Error('Pedido nao encontrado.')
    error.code = 'QUOTE_NOT_FOUND'
    throw error
  }

  const status = quoteStatusToDb[payload.status]
  if (!['accepted', 'cancelled'].includes(status)) {
    const error = new Error('Status invalido para esta etapa.')
    error.code = 'INVALID_STATUS'
    throw error
  }

  if (status === 'accepted' && quote.status !== 'Orcamento enviado') {
    const error = new Error('Aceite disponivel apenas apos o orcamento.')
    error.code = 'INVALID_STATUS'
    throw error
  }

  const rows = await patchRows('quote_requests', `id=eq.${id}`, {
    status,
    accepted_at: status === 'accepted' ? new Date().toISOString() : null,
    cancelled_at: status === 'cancelled' ? new Date().toISOString() : null
  })

  return mapQuote(rows[0])
}

async function listQuoteMessages(id, user) {
  const quote = await findQuoteForUser(id, user)
  if (!quote) {
    const error = new Error('Pedido nao encontrado.')
    error.code = 'QUOTE_NOT_FOUND'
    throw error
  }

  return (await selectRows('quote_messages', `quote_request_id=eq.${id}&select=*&order=created_at.asc`)).map((message) => ({
    id: message.id,
    quoteId: message.quote_request_id,
    senderUserId: message.sender_user_id,
    senderRole: message.sender_user_id === user.id ? user.role : '',
    body: message.body,
    createdAt: message.created_at
  }))
}

async function createQuoteMessage(id, payload, user) {
  const quote = await findQuoteForUser(id, user)
  if (!quote) {
    const error = new Error('Pedido nao encontrado.')
    error.code = 'QUOTE_NOT_FOUND'
    throw error
  }

  const message = await insertRow('quote_messages', {
    quote_request_id: id,
    sender_user_id: user.id,
    body: payload.body
  })

  return {
    id: message.id,
    quoteId: message.quote_request_id,
    senderUserId: message.sender_user_id,
    senderRole: user.role,
    body: message.body,
    createdAt: message.created_at
  }
}

async function getStoreSummary() {
  return {
    users: await countTable('profiles'),
    sessions: 0,
    clients: await countTable('client_profiles'),
    professionalSignups: await countTable('professional_profiles'),
    quotes: await countTable('quote_requests')
  }
}

function readState() {
  return {
    users: [],
    sessions: [],
    clients: [],
    professionalSignups: [],
    quotes: []
  }
}

module.exports = {
  createClientSignup,
  createProfessionalSignup,
  createQuote,
  createQuoteMessage,
  getProfessionalById,
  getUserByToken,
  getStoreSummary,
  listProfessionals,
  listQuoteMessages,
  loginUser,
  listQuotes,
  listQuotesForUser,
  readState,
  respondToQuote,
  updateQuoteStatus
}
