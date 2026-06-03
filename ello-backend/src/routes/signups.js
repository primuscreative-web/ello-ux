const { Router } = require('express')
const { createClientSignup, createProfessionalSignup } = require('../data/store')
const { email, matches, minLength, required, validatePayload } = require('../lib/validation')

const router = Router()

const clientRules = {
  fullName: [required('Informe seu nome completo.')],
  birthDate: [required('Informe sua data de nascimento.')],
  city: [required('Informe sua cidade principal.')],
  email: [required('Informe seu email.'), email('Informe um email valido.')],
  password: [required('Crie uma senha.'), minLength(8, 'Use pelo menos 8 caracteres.')],
  confirmPassword: [required('Confirme sua senha.'), matches('password', 'As senhas precisam ser iguais.')]
}

const professionalRules = {
  fullName: [required('Informe seu nome completo.')],
  birthDate: [required('Informe sua data de nascimento.')],
  specialty: [required('Informe sua area de atuacao.')],
  email: [required('Informe seu email.'), email('Informe um email valido.')],
  password: [required('Crie uma senha.'), minLength(8, 'Use pelo menos 8 caracteres.')],
  confirmPassword: [required('Confirme sua senha.'), matches('password', 'As senhas precisam ser iguais.')],
  experience: [required('Informe sua experiencia.')],
  city: [required('Informe sua cidade principal.')],
  coverage: [required('Informe onde voce atende.')],
  document: [required('Informe CPF ou CNPJ.')],
  phone: [required('Informe um telefone profissional.')],
  fiscalCity: [required('Informe sua cidade fiscal.')],
  description: [required('Descreva seu trabalho.')],
  basePrice: [required('Informe um preco base.')],
  chargeType: [required('Informe como voce cobra.')]
}

router.post('/clients', (req, res) => {
  const errors = validatePayload(req.body, clientRules)

  if (Object.keys(errors).length > 0) {
    res.status(422).json({ errors })
    return
  }

  try {
    res.status(201).json({ data: createClientSignup(req.body) })
  } catch (error) {
    const status = error.code === 'EMAIL_EXISTS' ? 409 : 500
    res.status(status).json({ error: error.message, errors: error.errors || {} })
  }
})

router.post('/professionals', (req, res) => {
  const errors = validatePayload(req.body, professionalRules)

  if (Object.keys(errors).length > 0) {
    res.status(422).json({ errors })
    return
  }

  try {
    res.status(201).json({ data: createProfessionalSignup(req.body) })
  } catch (error) {
    const status = error.code === 'EMAIL_EXISTS' ? 409 : 500
    res.status(status).json({ error: error.message, errors: error.errors || {} })
  }
})

module.exports = router
