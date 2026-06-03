const crypto = require('crypto')

const KEY_LENGTH = 64
const HASH_PREFIX = 'scrypt'

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(String(password), salt, KEY_LENGTH).toString('hex')

  return `${HASH_PREFIX}$${salt}$${hash}`
}

function verifyPassword(password, storedHash) {
  if (!storedHash) return false

  const [scheme, salt, hash] = String(storedHash).split('$')

  if (scheme !== HASH_PREFIX || !salt || !hash) {
    return storedHash === password
  }

  const candidate = crypto.scryptSync(String(password), salt, KEY_LENGTH)
  const expected = Buffer.from(hash, 'hex')

  return expected.length === candidate.length && crypto.timingSafeEqual(expected, candidate)
}

module.exports = {
  hashPassword,
  verifyPassword
}
