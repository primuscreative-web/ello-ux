const { Router } = require('express')
const { loginUser } = require('../data/store')
const { email, maxLength, normalizePayload, required, validatePayload } = require('../lib/validation')
const { requireAuth } = require('../middleware/auth')
const { rateLimit } = require('../middleware/rateLimit')

const router = Router()

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

router.get('/me', requireAuth, (req, res) => {
  res.json({ data: { user: req.user } })
})

module.exports = router
