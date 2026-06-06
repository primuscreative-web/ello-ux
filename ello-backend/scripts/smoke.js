const app = require('../src/app')

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

async function request(base, method, path, payload, token, extraHeaders = {}) {
  const response = await fetch(`${base}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...extraHeaders
    },
    body: payload === undefined ? undefined : JSON.stringify(payload)
  })
  const body = await response.json().catch(() => ({}))

  return { body, response }
}

async function run() {
  const server = app.listen(0)
  const base = `http://127.0.0.1:${server.address().port}`

  try {
    const health = await request(base, 'GET', '/health', undefined, '', { Origin: 'http://127.0.0.1:5180' })
    assert(health.response.ok, `health failed ${health.response.status}`)
    assert(health.response.headers.get('x-frame-options') === 'DENY', 'missing x-frame-options header')

    const blockedOrigin = await request(base, 'GET', '/health', undefined, '', { Origin: 'https://invalid.example' })
    assert(blockedOrigin.response.status === 403, `CORS should block invalid origin, got ${blockedOrigin.response.status}`)

    const suffix = Date.now()
    const client = await request(base, 'POST', '/signups/clients', {
      fullName: 'Cliente Smoke',
      birthDate: '1994-01-01',
      city: 'Brasil',
      email: `cliente.smoke.${suffix}@ello.test`,
      password: '12345678',
      confirmPassword: '12345678'
    })
    assert(client.response.ok, `client signup failed ${client.response.status}`)
    assert(client.body.data?.token, 'client token missing')

    const professional = await request(base, 'POST', '/signups/professionals', {
      fullName: 'Pro Smoke',
      birthDate: '1990-01-01',
      specialty: 'Casa',
      email: `pro.smoke.${suffix}@ello.test`,
      password: '12345678',
      confirmPassword: '12345678',
      experience: '5 anos',
      city: 'Brasil',
      coverage: 'Nacional',
      document: '12345678900',
      phone: '11999999999',
      fiscalCity: 'Brasil',
      description: 'Atendimento completo.',
      basePrice: 'R$ 150',
      chargeType: 'Servico'
    })
    assert(professional.response.ok, `professional signup failed ${professional.response.status}`)
    assert(professional.body.data?.token, 'professional token missing')

    const pros = await request(base, 'GET', '/professionals?category=Beleza')
    assert(pros.response.ok && pros.body.data.length > 0, 'professionals discovery failed')

    const quote = await request(base, 'POST', '/quotes', {
      professionalId: pros.body.data[0].id,
      description: 'Servico residencial',
      desiredDate: '2026-06-07',
      location: 'Sao Paulo, SP'
    }, client.body.data.token)
    assert(quote.response.ok, `quote create failed ${quote.response.status}`)

    const firstMessage = await request(base, 'POST', `/quotes/${quote.body.data.id}/messages`, {
      body: 'Ola, podemos combinar horario?'
    }, client.body.data.token)
    assert(firstMessage.response.ok, `client message failed ${firstMessage.response.status}`)

    const response = await request(base, 'PATCH', `/quotes/${quote.body.data.id}/response`, {
      responsePrice: 'R$ 180',
      responseEta: 'Amanha as 14h',
      responseMessage: 'Consigo atender com material basico incluso.'
    }, professional.body.data.token)
    assert(response.response.ok, `quote response failed ${response.response.status}`)

    const secondMessage = await request(base, 'POST', `/quotes/${quote.body.data.id}/messages`, {
      body: 'Fechado, ate amanha.'
    }, professional.body.data.token)
    assert(secondMessage.response.ok, `professional message failed ${secondMessage.response.status}`)

    const messages = await request(base, 'GET', `/quotes/${quote.body.data.id}/messages`, undefined, client.body.data.token)
    assert(messages.response.ok && messages.body.data.length === 2, 'message list failed')

    const accepted = await request(base, 'PATCH', `/quotes/${quote.body.data.id}/status`, {
      status: 'Aceito'
    }, client.body.data.token)
    assert(accepted.response.ok && accepted.body.data.status === 'Aceito', 'quote accept failed')

    console.log(JSON.stringify({
      ok: true,
      storage: health.body.records ? health.body.storage : 'unknown',
      quoteId: quote.body.data.id,
      messages: messages.body.data.length,
      status: accepted.body.data.status
    }, null, 2))
  } finally {
    server.close()
  }
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
