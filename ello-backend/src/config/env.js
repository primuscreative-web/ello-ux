const REQUIRED_PRODUCTION_ENV = [
  'ELLO_ALLOWED_ORIGINS',
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
]

function getStoreDriver() {
  return String(process.env.ELLO_STORE_DRIVER || 'json').trim().toLowerCase()
}

function isProduction() {
  return process.env.NODE_ENV === 'production'
}

function validateProductionEnv() {
  if (!isProduction()) return

  const missing = []

  if (getStoreDriver() !== 'supabase') {
    missing.push('ELLO_STORE_DRIVER=supabase')
  }

  for (const key of REQUIRED_PRODUCTION_ENV) {
    if (!process.env[key]) {
      missing.push(key)
    }
  }

  if (missing.length > 0) {
    throw new Error(`Configuracao de producao incompleta: ${missing.join(', ')}`)
  }
}

module.exports = {
  getStoreDriver,
  isProduction,
  validateProductionEnv
}
