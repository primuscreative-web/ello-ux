const jsonStore = require('./jsonStore')

function loadStoreDriver() {
  const driver = String(process.env.ELLO_STORE_DRIVER || 'json').trim().toLowerCase()

  if (driver === 'json') {
    return jsonStore
  }

  if (driver === 'supabase') {
    return require('./supabaseStore')
  }

  throw new Error(`ELLO_STORE_DRIVER invalido: ${driver}`)
}

module.exports = loadStoreDriver()
