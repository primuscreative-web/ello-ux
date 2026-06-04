const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:5180',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5180'
]

function getAllowedOrigins() {
  const configured = String(process.env.ELLO_ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  return configured.length > 0 ? configured : DEFAULT_ALLOWED_ORIGINS
}

function corsOptions() {
  const allowedOrigins = getAllowedOrigins()

  return {
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
        return
      }

      callback(new Error('Origem nao permitida pelo CORS.'))
    },
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 600
  }
}

function securityHeaders(_req, res, next) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Referrer-Policy', 'no-referrer')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site')
  next()
}

function notFound(_req, res) {
  res.status(404).json({ error: 'Rota nao encontrada.' })
}

function errorHandler(error, _req, res, _next) {
  if (error.type === 'entity.too.large') {
    res.status(413).json({ error: 'Payload muito grande.' })
    return
  }

  if (error instanceof SyntaxError && 'body' in error) {
    res.status(400).json({ error: 'JSON invalido.' })
    return
  }

  if (error.message === 'Origem nao permitida pelo CORS.') {
    res.status(403).json({ error: error.message })
    return
  }

  res.status(500).json({ error: 'Erro interno.' })
}

module.exports = {
  corsOptions,
  errorHandler,
  securityHeaders,
  notFound
}
