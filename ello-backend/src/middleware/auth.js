const { getUserByToken } = require('../data/store')

function getBearerToken(req) {
  const header = String(req.headers.authorization || '')
  const [type, token] = header.split(' ')

  if (type !== 'Bearer' || !token || token.length > 256) {
    return ''
  }

  return token
}

function requireAuth(req, res, next) {
  const user = getUserByToken(getBearerToken(req))

  if (!user) {
    res.status(401).json({ error: 'Sessao invalida.' })
    return
  }

  req.user = user
  next()
}

module.exports = {
  getBearerToken,
  requireAuth
}
