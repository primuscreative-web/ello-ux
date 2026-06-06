require('dotenv').config()

const cors = require('cors')
const express = require('express')
const { isProduction } = require('./config/env')
const { rateLimit } = require('./middleware/rateLimit')
const { requestContext } = require('./middleware/requestContext')
const { corsOptions, errorHandler, notFound, securityHeaders } = require('./middleware/security')
const authRoutes = require('./routes/auth')
const healthRoutes = require('./routes/health')
const professionalRoutes = require('./routes/professionals')
const quoteRoutes = require('./routes/quotes')
const signupRoutes = require('./routes/signups')

const app = express()

if (isProduction()) {
  app.set('trust proxy', 1)
}

app.disable('x-powered-by')
app.use(securityHeaders)
app.use(requestContext)
app.use(cors(corsOptions()))
app.use(express.json({ limit: '64kb' }))
app.use(rateLimit({ limit: 180, windowMs: 60_000 }))

app.use('/auth', authRoutes)
app.use('/health', healthRoutes)
app.use('/professionals', professionalRoutes)
app.use('/quotes', quoteRoutes)
app.use('/signups', signupRoutes)

app.get('/', (_req, res) => {
  res.json({ message: 'ELLO API rodando' })
})

app.use(notFound)
app.use(errorHandler)

module.exports = app
