import { Clock, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

export function ProfessionalCard({ professional }) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-soft">
      <div className="h-40 bg-gradient-to-br from-sky via-white to-brand/20 p-4">
        <div className="flex h-full items-end justify-between gap-3">
          <div className="rounded-2xl bg-white/90 px-4 py-3 shadow-soft">
            <p className="text-xs font-bold text-muted">{professional.category}</p>
            <h2 className="text-xl font-extrabold text-ink">{professional.name}</h2>
          </div>
          <div className="max-w-32 rounded-2xl bg-ink px-3 py-2 text-right text-sm font-bold text-white">{professional.price}</div>
        </div>
      </div>
      <div className="grid gap-4 p-4">
        <div className="flex flex-wrap gap-3 text-sm font-semibold text-muted">
          <span className="inline-flex items-center gap-1"><Star size={16} className="fill-gold text-gold" /> {professional.rating}</span>
          <span className="inline-flex items-center gap-1"><MapPin size={16} /> {professional.neighborhood}</span>
          <span className="inline-flex items-center gap-1"><Clock size={16} /> {professional.responseTime}</span>
        </div>
        <p className="text-sm font-medium leading-6 text-muted">{professional.bio}</p>
        <div className="grid grid-cols-2 gap-3">
          <Link to={`/cliente/profissionais/${professional.id}`}>
            <Button variant="secondary" className="w-full">Ver perfil</Button>
          </Link>
          <Link to={`/cliente/orcamento/${professional.id}`}>
            <Button className="w-full">Solicitar</Button>
          </Link>
        </div>
      </div>
    </article>
  )
}
