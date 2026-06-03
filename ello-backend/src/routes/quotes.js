const { Router } = require('express')
const { createQuote, listQuotes } = require('../data/store')
const { required, validatePayload } = require('../lib/validation')

const router = Router()

const quoteRules = {
  professionalId: [required('Informe o profissional.')],
  description: [required('Descreva o servico que voce precisa.')],
  desiredDate: [required('Informe uma data desejada.')],
  location: [required('Informe cidade e bairro.')]
}

router.get('/', (_req, res) => {
  res.json({ data: listQuotes() })
})

router.post('/', (req, res) => {
  const errors = validatePayload(req.body, quoteRules)

  if (Object.keys(errors).length > 0) {
    res.status(422).json({ errors })
    return
  }

  res.status(201).json({ data: createQuote(req.body) })
})

module.exports = router
