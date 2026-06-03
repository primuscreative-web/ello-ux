const { Router } = require('express')
const { loginUser } = require('../data/store')
const { email, required, validatePayload } = require('../lib/validation')
const { requireAuth } = require('../middleware/auth')

const router = Router()

const loginRules = {
  email: [required('Informe seu email.'), email('Informe um email valido.')],
  password: [required('Informe sua senha.')]
}

router.post('/login', (req, res) => {
  const errors = validatePayload(req.body, loginRules)

  if (Object.keys(errors).length > 0) {
    res.status(422).json({ errors })
    return
  }

  try {
    res.json({ data: loginUser(req.body) })
  } catch (error) {
    res.status(401).json({ error: error.message, errors: error.errors || {} })
  }
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ data: { user: req.user } })
})

module.exports = router
