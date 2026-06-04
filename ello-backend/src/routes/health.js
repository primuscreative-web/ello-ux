const { Router } = require('express')
const { getStoreSummary } = require('../data/store')

const router = Router()

router.get('/', async (_req, res) => {
  res.json({
    status: 'ok',
    service: 'ELLO API',
    version: '0.2.0',
    storage: process.env.ELLO_STORE_DRIVER === 'supabase' ? 'supabase' : 'json-file',
    records: await getStoreSummary()
  })
})

module.exports = router
