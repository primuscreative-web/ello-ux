const { Router } = require('express')
const { createQuote, createQuoteMessage, listQuoteMessages, listQuotesForUser, respondToQuote } = require('../data/store')
const { required, validatePayload } = require('../lib/validation')
const { requireAuth } = require('../middleware/auth')

const router = Router()

const quoteRules = {
  professionalId: [required('Informe o profissional.')],
  description: [required('Descreva o servico que voce precisa.')],
  desiredDate: [required('Informe uma data desejada.')],
  location: [required('Informe cidade e bairro.')]
}

const responseRules = {
  responsePrice: [required('Informe o valor do orcamento.')],
  responseEta: [required('Informe o prazo estimado.')],
  responseMessage: [required('Envie uma mensagem para o cliente.')]
}

const messageRules = {
  body: [required('Escreva uma mensagem.')]
}

router.get('/', requireAuth, (req, res) => {
  res.json({ data: listQuotesForUser(req.user) })
})

router.post('/', requireAuth, (req, res) => {
  const errors = validatePayload(req.body, quoteRules)

  if (Object.keys(errors).length > 0) {
    res.status(422).json({ errors })
    return
  }

  res.status(201).json({ data: createQuote(req.body, req.user) })
})

router.patch('/:id/response', requireAuth, (req, res) => {
  const errors = validatePayload(req.body, responseRules)

  if (Object.keys(errors).length > 0) {
    res.status(422).json({ errors })
    return
  }

  try {
    res.json({ data: respondToQuote(req.params.id, req.body, req.user) })
  } catch (error) {
    const status = error.code === 'QUOTE_NOT_FOUND' ? 404 : error.code === 'FORBIDDEN' ? 403 : 500
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
  const errors = validatePayload(req.body, messageRules)

  if (Object.keys(errors).length > 0) {
    res.status(422).json({ errors })
    return
  }

  try {
    res.status(201).json({ data: createQuoteMessage(req.params.id, req.body, req.user) })
  } catch (error) {
    const status = error.code === 'QUOTE_NOT_FOUND' ? 404 : 500
    res.status(status).json({ error: error.message })
  }
})

module.exports = router
