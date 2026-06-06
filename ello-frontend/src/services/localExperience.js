const FAVORITES_KEY = 'ello.favorite.professionals'
const REVIEWS_KEY = 'ello.professional.reviews'
const REPORTS_KEY = 'ello.trust.reports'
const QUOTES_KEY = 'ello.local.quotes'

const defaultReviews = {
  'ana-martins': [
    { id: 'rev-ana-1', name: 'Mariana L.', rating: 5, text: 'Atendimento pontual, acabamento lindo e comunicacao muito clara.', createdAt: 'Hoje' },
    { id: 'rev-ana-2', name: 'Bianca R.', rating: 5, text: 'Explicou tudo antes, levou material e deixou o resultado impecavel.', createdAt: '2 dias' }
  ],
  'bruno-azevedo': [
    { id: 'rev-bruno-1', name: 'Rafael M.', rating: 5, text: 'Fez pintura limpa e cumpriu o prazo combinado.', createdAt: 'Ontem' },
    { id: 'rev-bruno-2', name: 'Thais P.', rating: 4, text: 'Bom custo-beneficio e retorno rapido pelo chat.', createdAt: '1 semana' }
  ],
  'carla-santos': [
    { id: 'rev-carla-1', name: 'Patricia G.', rating: 5, text: 'Organizacao excelente e cuidado com cada comodo.', createdAt: '3 dias' }
  ]
}

const demoMessages = {
  'REQ-1042': [
    { id: 'msg-demo-1', senderUserId: 'client-demo', senderRole: 'client', body: 'Oi, preciso confirmar se voce atende no sabado de manha.', createdAt: new Date().toISOString() },
    { id: 'msg-demo-2', senderUserId: 'pro-demo', senderRole: 'professional', body: 'Atendo sim. Me envie o bairro e uma foto de referencia para eu calcular melhor.', createdAt: new Date().toISOString() }
  ]
}

function readJson(key, fallback) {
  try {
    return JSON.parse(window.localStorage.getItem(key)) || fallback
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function getFavoriteIds() {
  return readJson(FAVORITES_KEY, [])
}

export function isFavoriteProfessional(id) {
  return getFavoriteIds().includes(id)
}

export function toggleFavoriteProfessional(id) {
  const favorites = getFavoriteIds()
  const nextFavorites = favorites.includes(id)
    ? favorites.filter((item) => item !== id)
    : [id, ...favorites]

  writeJson(FAVORITES_KEY, nextFavorites)
  window.dispatchEvent(new CustomEvent('ello:favorites-changed', { detail: nextFavorites }))
  return nextFavorites
}

export function getProfessionalReviews(id) {
  const reviews = readJson(REVIEWS_KEY, defaultReviews)
  return reviews[id] || []
}

export function addProfessionalReview(id, payload) {
  const reviews = readJson(REVIEWS_KEY, defaultReviews)
  const nextReview = {
    id: `rev-${id}-${Date.now()}`,
    name: payload.name || 'Cliente ELLO',
    rating: Number(payload.rating || 5),
    text: payload.text,
    createdAt: 'Agora'
  }

  const nextReviews = {
    ...reviews,
    [id]: [nextReview, ...(reviews[id] || [])]
  }

  writeJson(REVIEWS_KEY, nextReviews)
  return nextReview
}

export function createTrustReport(payload) {
  const reports = readJson(REPORTS_KEY, [])
  const report = {
    id: `report-${Date.now()}`,
    status: 'Recebida',
    createdAt: new Date().toISOString(),
    ...payload
  }

  writeJson(REPORTS_KEY, [report, ...reports])
  return report
}

export function getTrustReports() {
  return readJson(REPORTS_KEY, [])
}

export function getDemoMessages(id) {
  return demoMessages[id] || []
}

export function getLocalQuotes() {
  return readJson(QUOTES_KEY, [])
}

export function createLocalQuote(payload, professional) {
  const quote = {
    id: `REQ-${Date.now()}`,
    professionalId: payload.professionalId,
    professionalName: professional?.name || 'Profissional ELLO',
    client: payload.location,
    service: payload.description,
    status: 'Novo pedido',
    date: 'Agora',
    value: 'A definir',
    responseEta: '',
    responseMessage: '',
    budget: payload.budget,
    contactPreference: payload.contactPreference
  }
  const quotes = getLocalQuotes()
  writeJson(QUOTES_KEY, [quote, ...quotes])
  return quote
}

export function updateLocalQuoteStatus(id, status) {
  const quotes = getLocalQuotes()
  const nextQuotes = quotes.map((quote) => (
    quote.id === id ? { ...quote, status } : quote
  ))
  writeJson(QUOTES_KEY, nextQuotes)
  return nextQuotes.find((quote) => quote.id === id) || null
}

export function respondToLocalQuote(id, payload) {
  const quotes = getLocalQuotes()
  const nextQuotes = quotes.map((quote) => (
    quote.id === id
      ? {
          ...quote,
          status: 'Orcamento enviado',
          value: payload.responsePrice,
          responseEta: payload.responseEta,
          responseMessage: payload.responseMessage
        }
      : quote
  ))
  writeJson(QUOTES_KEY, nextQuotes)
  return nextQuotes.find((quote) => quote.id === id) || null
}
