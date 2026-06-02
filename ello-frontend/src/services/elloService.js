import {
  categories,
  onboardingSlides,
  professionalStats,
  professionals,
  requests
} from '../data/elloData'

const wait = (ms = 180) => new Promise((resolve) => window.setTimeout(resolve, ms))

export async function getOnboardingSlides() {
  await wait()
  return onboardingSlides
}

export async function getCategories() {
  await wait()
  return categories
}

export async function getProfessionals({ search = '', category = 'Todos' } = {}) {
  await wait()
  const normalizedSearch = search.toLowerCase().trim()

  return professionals.filter((professional) => {
    const matchesCategory = category === 'Todos' || professional.category === category
    const matchesSearch =
      !normalizedSearch ||
      professional.name.toLowerCase().includes(normalizedSearch) ||
      professional.category.toLowerCase().includes(normalizedSearch) ||
      professional.city.toLowerCase().includes(normalizedSearch) ||
      professional.neighborhood.toLowerCase().includes(normalizedSearch) ||
      professional.bio.toLowerCase().includes(normalizedSearch) ||
      professional.keywords.some((keyword) => keyword.includes(normalizedSearch))

    return matchesCategory && matchesSearch
  })
}

export async function getProfessionalById(id) {
  await wait()
  return professionals.find((professional) => professional.id === id) || professionals[0]
}

export async function getProfessionalStats() {
  await wait()
  return professionalStats
}

export async function getRequests() {
  await wait()
  return requests
}
