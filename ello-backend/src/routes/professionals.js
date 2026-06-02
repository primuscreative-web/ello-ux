const { Router } = require('express')
const { professionals } = require('../data/mockData')

const router = Router()

router.get('/', (req, res) => {
  const search = String(req.query.search || '').toLowerCase()
  const category = String(req.query.category || '').toLowerCase()

  const filtered = professionals.filter((professional) => {
    const matchesSearch =
      !search ||
      professional.name.toLowerCase().includes(search) ||
      professional.category.toLowerCase().includes(search) ||
      professional.neighborhood.toLowerCase().includes(search) ||
      professional.keywords.some((keyword) => keyword.includes(search))

    const matchesCategory =
      !category || professional.category.toLowerCase() === category

    return matchesSearch && matchesCategory
  })

  res.json({ data: filtered })
})

router.get('/:id', (req, res) => {
  const professional = professionals.find((item) => item.id === req.params.id)

  if (!professional) {
    res.status(404).json({ error: 'Profissional nao encontrado' })
    return
  }

  res.json({ data: professional })
})

module.exports = router
