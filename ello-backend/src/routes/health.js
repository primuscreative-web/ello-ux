const { Router } = require('express')
const { getStoreSummary } = require('../data/store')

const router = Router()

router.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'ELLO API',
    version: '0.2.0',
    storage: 'json-file',
    records: getStoreSummary()
  })
})

module.exports = router
