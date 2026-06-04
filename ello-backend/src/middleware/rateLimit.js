function getClientKey(req) {
  return req.ip || req.socket?.remoteAddress || 'unknown'
}

function rateLimit({ limit = 120, windowMs = 60_000 } = {}) {
  const buckets = new Map()

  return (req, res, next) => {
    const now = Date.now()
    const key = getClientKey(req)
    const current = buckets.get(key)

    if (!current || current.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs })
      next()
      return
    }

    current.count += 1

    if (current.count > limit) {
      res.setHeader('Retry-After', Math.ceil((current.resetAt - now) / 1000))
      res.status(429).json({ error: 'Muitas tentativas. Aguarde um momento e tente novamente.' })
      return
    }

    next()
  }
}

module.exports = {
  rateLimit
}
