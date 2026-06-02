const { Router } = require('express')

const router = Router()

router.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'ELLO API',
    version: '0.1.0'
  })
})

module.exports = router
