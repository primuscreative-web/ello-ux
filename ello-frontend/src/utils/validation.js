export function getFormValues(form) {
  return Object.fromEntries(new FormData(form).entries())
}

export function required(value, message = 'Campo obrigatorio.') {
  return String(value || '').trim() ? '' : message
}

export function validEmail(value) {
  if (!String(value || '').trim()) return 'Informe seu email.'
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Informe um email valido.'
}

export function validPassword(value) {
  if (!value) return 'Crie uma senha.'
  return String(value).length >= 8 ? '' : 'Use pelo menos 8 caracteres.'
}

export function matchingPassword(password, confirmation) {
  if (!confirmation) return 'Confirme sua senha.'
  return password === confirmation ? '' : 'As senhas precisam ser iguais.'
}

export function collectErrors(rules, values) {
  return Object.entries(rules).reduce((errors, [field, validators]) => {
    const message = validators.map((validator) => validator(values[field], values)).find(Boolean)
    return message ? { ...errors, [field]: message } : errors
  }, {})
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0
}
