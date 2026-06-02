require('dotenv').config()

const cors = require('cors')
const express = require('express')
const healthRoutes = require('./src/routes/health')
const professionalRoutes = require('./src/routes/professionals')

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/health', healthRoutes)
app.use('/professionals', professionalRoutes)

app.get('/', (_req, res) => {
  res.json({ message: 'ELLO API rodando' })
})

app.listen(port, () => {
  console.log(`ELLO API running on http://localhost:${port}`)
})
