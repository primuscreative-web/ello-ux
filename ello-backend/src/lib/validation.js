function isPresent(value) {
  return String(value || '').trim().length > 0
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ''))
}

function validatePayload(payload, rules) {
  return Object.entries(rules).reduce((errors, [field, validators]) => {
    const message = validators.map((validator) => validator(payload[field], payload)).find(Boolean)
    return message ? { ...errors, [field]: message } : errors
  }, {})
}

function normalizePayload(payload, fields) {
  return fields.reduce((nextPayload, field) => {
    if (typeof nextPayload[field] === 'string') {
      return { ...nextPayload, [field]: nextPayload[field].trim() }
    }

    return nextPayload
  }, { ...payload })
}

function required(message) {
  return (value) => (isPresent(value) ? '' : message)
}

function email(message) {
  return (value) => (isEmail(value) ? '' : message)
}

function minLength(length, message) {
  return (value) => (String(value || '').length >= length ? '' : message)
}

function maxLength(length, message) {
  return (value) => (String(value || '').trim().length <= length ? '' : message)
}

function matches(otherField, message) {
  return (value, payload) => (value === payload[otherField] ? '' : message)
}

module.exports = {
  email,
  matches,
  maxLength,
  minLength,
  normalizePayload,
  required,
  validatePayload
}
