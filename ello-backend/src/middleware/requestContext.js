const crypto = require('crypto')
const logger = require('../lib/logger')

function createRequestId() {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return crypto.randomBytes(16).toString('hex')
}

function requestContext(req, res, next) {
  const startedAt = Date.now()
  const requestId = req.get('X-Request-Id') || createRequestId()

  req.id = requestId
  res.setHeader('X-Request-Id', requestId)

  res.on('finish', () => {
    const durationMs = Date.now() - startedAt
    const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info'

    logger[level]('request.completed', {
      requestId,
      method: req.method,
      path: req.originalUrl || req.url,
      statusCode: res.statusCode,
      durationMs
    })
  })

  next()
}

module.exports = { requestContext }
