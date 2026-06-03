const { Router } = require('express')
const { getUserByToken, loginUser } = require('../data/store')
const { email, required, validatePayload } = require('../lib/validation')

const router = Router()

const loginRules = {
  email: [required('Informe seu email.'), email('Informe um email valido.')],
  password: [required('Informe sua senha.')]
}

function getBearerToken(req) {
  const header = String(req.headers.authorization || '')
  const [type, token] = header.split(' ')

  return type === 'Bearer' ? token : ''
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

router.get('/me', (req, res) => {
  const user = getUserByToken(getBearerToken(req))

  if (!user) {
    res.status(401).json({ error: 'Sessao invalida.' })
    return
  }

  res.json({ data: { user } })
})

module.exports = router
