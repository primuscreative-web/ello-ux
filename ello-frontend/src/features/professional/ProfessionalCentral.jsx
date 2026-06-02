import { BriefcaseBusiness, CalendarDays, ImagePlus, MessageCircle, Settings, Wallet } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { getProfessionalStats } from '../../services/elloService'

const actions = [
  { label: 'Editar perfil', text: 'Atualize sua vitrine publica.', href: '/profissional/perfil', icon: BriefcaseBusiness },
  { label: 'Atualizar portfolio', text: 'Adicione fotos que vendem seu trabalho.', href: '/profissional/perfil', icon: ImagePlus },
  { label: 'Ver pedidos', text: 'Responda oportunidades recentes.', href: '/profissional/pedidos', icon: MessageCircle },
  { label: 'Configurar agenda', text: 'Mostre quando voce pode atender.', href: '/profissional/perfil', icon: CalendarDays }
]

export function ProfessionalCentral() {
  const [stats, setStats] = useState([])

  useEffect(() => {
    getProfessionalStats().then(setStats)
  }, [])

  return (
    <main className="min-h-screen px-4 pb-24 pt-5 text-ink md:px-8 md:pb-8">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[17rem_1fr]">
        <aside className="hidden rounded-[1.75rem] bg-ink p-5 text-white shadow-premium md:block">
          <h2 className="text-2xl font-extrabold">ELLO Pro</h2>
          <nav className="mt-8 grid gap-2 text-sm font-bold">
            <Link className="rounded-2xl bg-white px-4 py-3 text-ink" to="/profissional/central">Central</Link>
            <Link className="rounded-2xl px-4 py-3 text-white/70 hover:bg-white/10" to="/profissional/pedidos">Pedidos</Link>
            <span className="rounded-2xl px-4 py-3 text-white/45">Chat</span>
            <span className="rounded-2xl px-4 py-3 text-white/45">Carteira</span>
            <Link className="rounded-2xl px-4 py-3 text-white/70 hover:bg-white/10" to="/profissional/perfil">Perfil</Link>
            <span className="rounded-2xl px-4 py-3 text-white/45">Configuracoes</span>
          </nav>
        </aside>

        <section className="grid gap-6">
          <div className="flex flex-col gap-4 rounded-[2rem] bg-white p-5 shadow-premium md:flex-row md:items-end md:justify-between md:p-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Central</p>
              <h1 className="text-3xl font-extrabold md:text-5xl">Seu negocio em movimento.</h1>
              <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-muted">Acompanhe pedidos, perfil, agenda e sinais de crescimento em um painel simples.</p>
            </div>
            <Button variant="secondary">
              <Wallet size={18} /> Carteira em breve
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <article className="rounded-[1.5rem] bg-white p-5 shadow-soft" key={stat.label}>
                <p className="text-sm font-bold text-muted">{stat.label}</p>
                <p className="mt-3 text-3xl font-extrabold">{stat.value}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {actions.map((action) => {
              const Icon = action.icon
              return (
                <Link className="group rounded-[1.75rem] bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-premium" key={action.label} to={action.href}>
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                      <Icon size={24} />
                    </span>
                    <span>
                      <strong className="block text-lg">{action.label}</strong>
                      <span className="mt-1 block text-sm font-medium leading-6 text-muted">{action.text}</span>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          <article className="rounded-[1.75rem] bg-gradient-to-br from-brand to-ink p-5 text-white shadow-premium">
            <div className="flex items-center gap-3">
              <Settings size={22} />
              <h2 className="text-xl font-extrabold">Dica de visibilidade</h2>
            </div>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-6 text-white/75">Perfis com pelo menos 3 fotos, preco claro e resposta rapida tendem a receber mais pedidos.</p>
          </article>
        </section>
      </div>
    </main>
  )
}
