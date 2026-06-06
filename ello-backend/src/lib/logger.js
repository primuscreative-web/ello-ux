const SENSITIVE_KEYS = new Set([
  'authorization',
  'cookie',
  'password',
  'confirmpassword',
  'token',
  'access_token',
  'refresh_token',
  'servicekey',
  'service_role'
])

function redact(value) {
  if (Array.isArray(value)) {
    return value.map(redact)
  }

  if (!value || typeof value !== 'object') {
    return value
  }

  return Object.entries(value).reduce((safe, [key, item]) => {
    safe[key] = SENSITIVE_KEYS.has(key.toLowerCase()) ? '[redacted]' : redact(item)
    return safe
  }, {})
}

function write(level, message, context = {}) {
  const entry = {
    level,
    message,
    time: new Date().toISOString(),
    ...redact(context)
  }

  const output = JSON.stringify(entry)

  if (level === 'error') {
    console.error(output)
    return
  }

  if (level === 'warn') {
    console.warn(output)
    return
  }

  console.log(output)
}

module.exports = {
  redact,
  info: (message, context) => write('info', message, context),
  warn: (message, context) => write('warn', message, context),
  error: (message, context) => write('error', message, context)
}
