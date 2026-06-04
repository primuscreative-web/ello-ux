const { Router } = require('express')
const { createQuote, createQuoteMessage, listQuoteMessages, listQuotesForUser, respondToQuote, updateQuoteStatus } = require('../data/store')
const { maxLength, normalizePayload, required, validatePayload } = require('../lib/validation')
const { requireAuth } = require('../middleware/auth')

const router = Router()

const quoteRules = {
  professionalId: [required('Informe o profissional.'), maxLength(80, 'Profissional invalido.')],
  description: [required('Descreva o servico que voce precisa.'), maxLength(800, 'Descricao muito longa.')],
  desiredDate: [required('Informe uma data desejada.')],
  location: [required('Informe cidade e bairro.'), maxLength(160, 'Local muito longo.')]
}

const responseRules = {
  responsePrice: [required('Informe o valor do orcamento.'), maxLength(40, 'Valor muito longo.')],
  responseEta: [required('Informe o prazo estimado.'), maxLength(80, 'Prazo muito longo.')],
  responseMessage: [required('Envie uma mensagem para o cliente.'), maxLength(800, 'Mensagem muito longa.')]
}

const messageRules = {
  body: [required('Escreva uma mensagem.'), maxLength(1000, 'Mensagem muito longa.')]
}

const statusRules = {
  status: [required('Informe o novo status.'), maxLength(40, 'Status invalido.')]
}

router.get('/', requireAuth, (req, res) => {
  res.json({ data: listQuotesForUser(req.user) })
})

router.post('/', requireAuth, (req, res) => {
  const payload = normalizePayload(req.body, ['professionalId', 'description', 'desiredDate', 'location'])
  const errors = validatePayload(payload, quoteRules)

  if (Object.keys(errors).length > 0) {
    res.status(422).json({ errors })
    return
  }

  res.status(201).json({ data: createQuote(payload, req.user) })
})

router.patch('/:id/response', requireAuth, (req, res) => {
  const payload = normalizePayload(req.body, ['responsePrice', 'responseEta', 'responseMessage'])
  const errors = validatePayload(payload, responseRules)

  if (Object.keys(errors).length > 0) {
    res.status(422).json({ errors })
    return
  }

  try {
    res.json({ data: respondToQuote(req.params.id, payload, req.user) })
  } catch (error) {
    const status = error.code === 'QUOTE_NOT_FOUND' ? 404 : error.code === 'FORBIDDEN' ? 403 : 500
    res.status(status).json({ error: error.message })
  }
})

router.patch('/:id/status', requireAuth, (req, res) => {
  const payload = normalizePayload(req.body, ['status'])
  const errors = validatePayload(payload, statusRules)

  if (Object.keys(errors).length > 0) {
    res.status(422).json({ errors })
    return
  }

  try {
    res.json({ data: updateQuoteStatus(req.params.id, payload, req.user) })
  } catch (error) {
    const status = error.code === 'QUOTE_NOT_FOUND' ? 404 : error.code === 'FORBIDDEN' ? 403 : error.code === 'INVALID_STATUS' ? 422 : 500
    res.status(status).json({ error: error.message })
  }
})

router.get('/:id/messages', requireAuth, (req, res) => {
  try {
    res.json({ data: listQuoteMessages(req.params.id, req.user) })
  } catch (error) {
    const status = error.code === 'QUOTE_NOT_FOUND' ? 404 : 500
    res.status(status).json({ error: error.message })
  }
})

router.post('/:id/messages', requireAuth, (req, res) => {
  const payload = normalizePayload(req.body, ['body'])
  const errors = validatePayload(payload, messageRules)

  if (Object.keys(errors).length > 0) {
    res.status(422).json({ errors })
    return
  }

  try {
    res.status(201).json({ data: createQuoteMessage(req.params.id, payload, req.user) })
  } catch (error) {
    const status = error.code === 'QUOTE_NOT_FOUND' ? 404 : 500
    res.status(status).json({ error: error.message })
  }
})

module.exports = router
