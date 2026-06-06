const app = require('./src/app')
const { validateProductionEnv } = require('./src/config/env')
const port = process.env.PORT || 3001

validateProductionEnv()

app.listen(port, () => {
  console.log(`ELLO API running on http://localhost:${port}`)
})
