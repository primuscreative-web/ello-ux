require('dotenv').config()

const cors = require('cors')
const express = require('express')
const authRoutes = require('./routes/auth')
const healthRoutes = require('./routes/health')
const professionalRoutes = require('./routes/professionals')
const quoteRoutes = require('./routes/quotes')
const signupRoutes = require('./routes/signups')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/health', healthRoutes)
app.use('/professionals', professionalRoutes)
app.use('/quotes', quoteRoutes)
app.use('/signups', signupRoutes)

app.get('/', (_req, res) => {
  res.json({ message: 'ELLO API rodando' })
})

module.exports = app
