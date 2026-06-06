import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { isFavoriteProfessional, toggleFavoriteProfessional } from '../../services/localExperience'

export function FavoriteButton({ professionalId, className = '' }) {
  const [active, setActive] = useState(() => isFavoriteProfessional(professionalId))

  useEffect(() => {
    function sync() {
      setActive(isFavoriteProfessional(professionalId))
    }

    window.addEventListener('ello:favorites-changed', sync)
    return () => window.removeEventListener('ello:favorites-changed', sync)
  }, [professionalId])

  function toggle(event) {
    event.preventDefault()
    event.stopPropagation()
    const favorites = toggleFavoriteProfessional(professionalId)
    setActive(favorites.includes(professionalId))
  }

  return (
    <button
      aria-label={active ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition ${active ? 'border-coral/30 bg-coral text-white shadow-[0_12px_30px_rgba(255,114,94,0.26)]' : 'border-white/75 bg-white/80 text-ink hover:border-coral/30 hover:text-coral'} ${className}`}
      onClick={toggle}
      type="button"
    >
      <Heart size={19} className={active ? 'fill-current' : ''} />
    </button>
  )
}
