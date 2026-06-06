const jsonStore = require('./jsonStore')
const { getStoreDriver } = require('../config/env')

function loadStoreDriver() {
  const driver = getStoreDriver()

  if (driver === 'json') {
    return jsonStore
  }

  if (driver === 'supabase') {
    return require('./supabaseStore')
  }

  throw new Error(`ELLO_STORE_DRIVER invalido: ${driver}`)
}

module.exports = loadStoreDriver()
