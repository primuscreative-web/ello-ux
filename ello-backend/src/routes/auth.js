const { Router } = require('express')
const { loginUser } = require('../data/store')
const { email, maxLength, normalizePayload, required, validatePayload } = require('../lib/validation')
const { requireAuth } = require('../middleware/auth')
const { rateLimit } = require('../middleware/rateLimit')

const router = Router()
const allowedRedirectOrigins = [
  'http://localhost:5173',
  'http://localhost:5180',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5180',
  'https://ello-ux.vercel.app',
  ...(process.env.ELLO_ALLOWED_ORIGINS || '').split(',').map((origin) => origin.trim()).filter(Boolean)
]

const loginRules = {
  email: [required('Informe seu email.'), email('Informe um email valido.'), maxLength(160, 'Email muito longo.')],
  password: [required('Informe sua senha.'), maxLength(128, 'Senha muito longa.')]
}

router.post('/login', rateLimit({ limit: 12, windowMs: 60_000 }), async (req, res) => {
  const payload = normalizePayload(req.body, ['email'])
  const errors = validatePayload(payload, loginRules)

  if (Object.keys(errors).length > 0) {
    res.status(422).json({ errors })
    return
  }

  try {
    res.json({ data: await loginUser(payload) })
  } catch (error) {
    res.status(401).json({ error: error.message, errors: error.errors || {} })
  }
})

router.get('/google', rateLimit({ limit: 20, windowMs: 60_000 }), (req, res) => {
  const supabaseUrl = process.env.SUPABASE_URL
  const redirectTo = String(req.query.redirectTo || '')

  if (!supabaseUrl) {
    res.status(503).json({ error: 'OAuth indisponivel neste ambiente.' })
    return
  }

  let redirectUrl
  try {
    redirectUrl = new URL(redirectTo)
  } catch {
    res.status(422).json({ error: 'URL de retorno invalida.' })
    return
  }

  if (!allowedRedirectOrigins.includes(redirectUrl.origin)) {
    res.status(403).json({ error: 'URL de retorno nao permitida.' })
    return
  }

  const url = new URL('/auth/v1/authorize', supabaseUrl)
  url.searchParams.set('provider', 'google')
  url.searchParams.set('redirect_to', redirectUrl.toString())

  res.json({ data: { url: url.toString() } })
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ data: { user: req.user } })
})

module.exports = router
