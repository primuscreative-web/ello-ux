const app = require('../src/app')
const { validateProductionEnv } = require('../src/config/env')

validateProductionEnv()

module.exports = app
