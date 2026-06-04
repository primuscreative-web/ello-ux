const { Router } = require('express')
const { getProfessionalById, listProfessionals } = require('../data/store')

const router = Router()

router.get('/', async (req, res) => {
  const search = String(req.query.search || '')
  const category = String(req.query.category || '')

  res.json({ data: await listProfessionals({ search, category }) })
})

router.get('/:id', async (req, res) => {
  const professional = await getProfessionalById(req.params.id)

  if (!professional) {
    res.status(404).json({ error: 'Profissional nao encontrado' })
    return
  }

  res.json({ data: professional })
})

module.exports = router
