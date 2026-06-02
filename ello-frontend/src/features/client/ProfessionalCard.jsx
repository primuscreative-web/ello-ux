import { Clock, MapPin, ShieldCheck, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

export function ProfessionalCard({ professional }) {
  return (
    <article className="group overflow-hidden rounded-[1.7rem] border border-white/80 bg-white shadow-[0_18px_54px_rgba(16,26,51,0.1)] transition duration-300 hover:-translate-y-1 hover:shadow-premium">
      <div className={`relative min-h-44 overflow-hidden bg-gradient-to-br ${professional.accent} p-4`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.9),transparent_11rem),linear-gradient(135deg,rgba(16,26,51,0.04),transparent)]" />
        <div className="relative flex h-full min-h-36 flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/78 p-2 pr-4 shadow-soft backdrop-blur">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-sm font-extrabold text-white">
                {professional.avatar}
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand">{professional.category}</p>
                <h2 className="text-xl font-extrabold tracking-[-0.03em] text-ink">{professional.name}</h2>
              </div>
            </div>
            <div className="rounded-2xl bg-ink px-3 py-2 text-right text-xs font-extrabold leading-tight text-white shadow-soft">
              {professional.price}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {professional.chips.map((chip) => (
              <span className="rounded-full border border-white/80 bg-white/76 px-3 py-1 text-xs font-bold text-ink/75 backdrop-blur" key={chip}>
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-4">
        <div className="flex flex-wrap gap-3 text-sm font-bold text-muted">
          <span className="inline-flex items-center gap-1 text-ink"><Star size={16} className="fill-gold text-gold" /> {professional.rating}</span>
          <span className="inline-flex items-center gap-1"><MapPin size={16} /> {professional.neighborhood}</span>
          <span className="inline-flex items-center gap-1"><Clock size={16} /> {professional.responseTime}</span>
          <span className="inline-flex items-center gap-1 text-brand"><ShieldCheck size={16} /> Perfil {professional.profileHealth}%</span>
        </div>

        <p className="text-sm font-medium leading-6 text-muted">{professional.bio}</p>

        <div className="grid grid-cols-[0.9fr_1.1fr] gap-3">
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
