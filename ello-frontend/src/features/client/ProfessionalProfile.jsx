import { ArrowLeft, CalendarDays, MessageCircle, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { StatusPill } from '../../components/ui/StatusPill'
import { getProfessionalById } from '../../services/elloService'

export function ProfessionalProfile() {
  const { id } = useParams()
  const [professional, setProfessional] = useState(null)

  useEffect(() => {
    getProfessionalById(id).then(setProfessional)
  }, [id])

  if (!professional) {
    return <main className="min-h-screen p-6 text-ink">Carregando perfil...</main>
  }

  return (
    <main className="min-h-screen px-4 pb-24 pt-5 text-ink md:px-8 md:pb-8">
      <section className="mx-auto grid max-w-6xl gap-5 md:grid-cols-[1fr_22rem]">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-premium">
          <div className="h-56 bg-gradient-to-br from-brand via-sky to-gold p-5">
            <Link className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-bold text-ink" to="/cliente/feed">
              <ArrowLeft size={16} /> Voltar
            </Link>
          </div>
          <div className="grid gap-6 p-5 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <StatusPill tone="brand">{professional.category}</StatusPill>
                <h1 className="mt-3 text-4xl font-extrabold md:text-6xl">{professional.name}</h1>
                <p className="mt-2 text-sm font-bold text-muted">{professional.neighborhood}, {professional.city}</p>
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-cloud px-4 py-3 text-sm font-bold text-ink">
                <Star size={18} className="fill-gold text-gold" />
                {professional.rating} em {professional.jobs} servicos
              </div>
            </div>

            <p className="max-w-3xl text-base font-medium leading-7 text-muted">{professional.bio}</p>

            <div className="grid gap-3 md:grid-cols-3">
              {professional.portfolio.map((item) => (
                <div className="min-h-32 rounded-[1.5rem] bg-gradient-to-br from-cloud to-sky p-4 text-sm font-extrabold text-ink" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="grid content-start gap-4 rounded-[2rem] bg-ink p-5 text-white shadow-premium">
          <div>
            <p className="text-sm font-bold text-white/60">Preco</p>
            <p className="mt-1 text-2xl font-extrabold">{professional.price}</p>
            <p className="text-sm font-semibold text-white/60">{professional.chargeType}</p>
          </div>
          <div className="rounded-[1.5rem] bg-white/10 p-4">
            <p className="flex items-center gap-2 text-sm font-bold"><CalendarDays size={18} /> Disponibilidade</p>
            <p className="mt-2 text-sm font-medium text-white/70">{professional.availability}</p>
          </div>
          <Link to={`/cliente/orcamento/${professional.id}`}>
            <Button className="w-full">Solicitar orcamento</Button>
          </Link>
          <Button variant="secondary" className="w-full">
            <MessageCircle size={18} /> Conversar
          </Button>
        </aside>
      </section>
    </main>
  )
}
