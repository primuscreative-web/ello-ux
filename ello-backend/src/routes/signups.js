const { Router } = require('express')
const { createClientSignup, createProfessionalSignup } = require('../data/store')
const { email, matches, maxLength, minLength, normalizePayload, required, validatePayload } = require('../lib/validation')
const { rateLimit } = require('../middleware/rateLimit')

const router = Router()

const clientRules = {
  fullName: [required('Informe seu nome completo.'), maxLength(120, 'Nome muito longo.')],
  birthDate: [required('Informe sua data de nascimento.')],
  city: [required('Informe sua cidade principal.'), maxLength(80, 'Cidade muito longa.')],
  email: [required('Informe seu email.'), email('Informe um email valido.'), maxLength(160, 'Email muito longo.')],
  password: [required('Crie uma senha.'), minLength(8, 'Use pelo menos 8 caracteres.'), maxLength(128, 'Senha muito longa.')],
  confirmPassword: [required('Confirme sua senha.'), matches('password', 'As senhas precisam ser iguais.')]
}

const professionalRules = {
  fullName: [required('Informe seu nome completo.'), maxLength(120, 'Nome muito longo.')],
  birthDate: [required('Informe sua data de nascimento.')],
  specialty: [required('Informe sua area de atuacao.'), maxLength(80, 'Area muito longa.')],
  email: [required('Informe seu email.'), email('Informe um email valido.'), maxLength(160, 'Email muito longo.')],
  password: [required('Crie uma senha.'), minLength(8, 'Use pelo menos 8 caracteres.'), maxLength(128, 'Senha muito longa.')],
  confirmPassword: [required('Confirme sua senha.'), matches('password', 'As senhas precisam ser iguais.')],
  experience: [required('Informe sua experiencia.'), maxLength(80, 'Experiencia muito longa.')],
  city: [required('Informe sua cidade principal.'), maxLength(80, 'Cidade muito longa.')],
  coverage: [required('Informe onde voce atende.'), maxLength(160, 'Cobertura muito longa.')],
  document: [required('Informe CPF ou CNPJ.'), maxLength(24, 'Documento muito longo.')],
  phone: [required('Informe um telefone profissional.'), maxLength(24, 'Telefone muito longo.')],
  fiscalCity: [required('Informe sua cidade fiscal.'), maxLength(80, 'Cidade fiscal muito longa.')],
  description: [required('Descreva seu trabalho.'), maxLength(600, 'Descricao muito longa.')],
  basePrice: [required('Informe um preco base.'), maxLength(40, 'Preco muito longo.')],
  chargeType: [required('Informe como voce cobra.'), maxLength(80, 'Tipo de cobranca muito longo.')]
}

router.post('/clients', rateLimit({ limit: 20, windowMs: 60_000 }), (req, res) => {
  const payload = normalizePayload(req.body, ['fullName', 'city', 'email', 'region', 'interests'])
  const errors = validatePayload(payload, clientRules)

  if (Object.keys(errors).length > 0) {
    res.status(422).json({ errors })
    return
  }

  try {
    res.status(201).json({ data: createClientSignup(payload) })
  } catch (error) {
    const status = error.code === 'EMAIL_EXISTS' ? 409 : 500
    res.status(status).json({ error: error.message, errors: error.errors || {} })
  }
})

router.post('/professionals', rateLimit({ limit: 20, windowMs: 60_000 }), (req, res) => {
  const payload = normalizePayload(req.body, [
    'fullName', 'specialty', 'email', 'experience', 'city', 'coverage', 'document',
    'phone', 'fiscalCity', 'description', 'basePrice', 'chargeType', 'materials',
    'availability', 'publicName', 'paymentKey', 'supportDocument', 'portfolio'
  ])
  const errors = validatePayload(payload, professionalRules)

  if (Object.keys(errors).length > 0) {
    res.status(422).json({ errors })
    return
  }

  try {
    res.status(201).json({ data: createProfessionalSignup(payload) })
  } catch (error) {
    const status = error.code === 'EMAIL_EXISTS' ? 409 : 500
    res.status(status).json({ error: error.message, errors: error.errors || {} })
  }
})

module.exports = router
