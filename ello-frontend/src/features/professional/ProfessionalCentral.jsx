import { BriefcaseBusiness, CalendarDays, ChevronRight, ImagePlus, MessageCircle, Settings, TrendingUp, Wallet } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { StatusPill } from '../../components/ui/StatusPill'
import { getProfessionalStats, getRequests } from '../../services/elloService'

const actions = [
  { label: 'Editar perfil', text: 'Atualize sua vitrine publica.', href: '/profissional/perfil', icon: BriefcaseBusiness },
  { label: 'Atualizar portfolio', text: 'Adicione fotos que vendem seu trabalho.', href: '/profissional/perfil', icon: ImagePlus },
  { label: 'Ver pedidos', text: 'Responda oportunidades recentes.', href: '/profissional/pedidos', icon: MessageCircle },
  { label: 'Configurar agenda', text: 'Mostre quando voce pode atender.', href: '/profissional/perfil', icon: CalendarDays }
]

export function ProfessionalCentral() {
  const [stats, setStats] = useState([])
  const [requests, setRequests] = useState([])

  useEffect(() => {
    getProfessionalStats().then(setStats)
    getRequests().then(setRequests)
  }, [])

  return (
    <main className="min-h-screen p-4 text-ink md:p-8">
      <div className="mx-auto grid w-full max-w-[86rem] gap-6 xl:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="hidden min-h-[calc(100vh-4rem)] rounded-[2rem] bg-ink p-6 text-white shadow-premium xl:block">
          <h2 className="text-3xl font-extrabold tracking-[-0.05em]">ELLO Pro</h2>
          <p className="mt-2 text-sm font-medium text-white/50">Central de operacao</p>
          <nav className="mt-8 grid gap-2 text-sm font-extrabold">
            <Link className="rounded-2xl bg-white px-4 py-3 text-ink" to="/profissional/central">Central</Link>
            <Link className="rounded-2xl px-4 py-3 text-white/70 hover:bg-white/10" to="/profissional/pedidos">Pedidos</Link>
            <span className="rounded-2xl px-4 py-3 text-white/45">Chat</span>
            <span className="rounded-2xl px-4 py-3 text-white/45">Carteira</span>
            <Link className="rounded-2xl px-4 py-3 text-white/70 hover:bg-white/10" to="/profissional/perfil">Perfil</Link>
            <span className="rounded-2xl px-4 py-3 text-white/45">Configuracoes</span>
          </nav>
          <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/8 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">Perfil</p>
            <p className="mt-2 text-3xl font-extrabold">92%</p>
            <p className="mt-1 text-xs font-medium leading-5 text-white/56">Complete portfolio e disponibilidade para aumentar conversao.</p>
          </div>
        </aside>

        <section className="grid min-w-0 gap-6">
          <div className="grid gap-4 rounded-[2rem] bg-gradient-to-br from-white via-white to-sky/60 p-5 shadow-premium md:grid-cols-[1fr_auto] md:items-end md:p-8">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand">Central</p>
              <h1 className="text-balance text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] md:text-6xl">Seu negocio em movimento.</h1>
              <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-muted">Acompanhe demanda, reputacao e a saude do seu perfil com uma visao pronta para crescer.</p>
            </div>
            <Button variant="secondary">
              <Wallet size={18} /> Carteira em breve
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <article className="premium-surface rounded-[1.6rem] p-5" key={stat.label}>
                <p className="text-sm font-extrabold text-muted">{stat.label}</p>
                <div className="mt-4 flex items-end justify-between">
                  <p className="text-4xl font-extrabold tracking-[-0.05em]">{stat.value}</p>
                  <span className={`flex h-9 w-9 items-center justify-center rounded-2xl ${index === 3 ? 'bg-gold/18 text-gold' : 'bg-brand/10 text-brand'}`}>
                    <TrendingUp size={18} />
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="grid gap-4">
              <div className="grid gap-4 lg:grid-cols-2">
                {actions.map((action) => {
                  const Icon = action.icon
                  return (
                    <Link className="group premium-surface rounded-[1.7rem] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-premium" key={action.label} to={action.href}>
                      <div className="flex items-center gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                          <Icon size={24} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <strong className="block text-lg tracking-[-0.02em]">{action.label}</strong>
                          <span className="mt-1 block text-sm font-medium leading-6 text-muted">{action.text}</span>
                        </span>
                        <ChevronRight size={18} className="text-muted transition group-hover:translate-x-1 group-hover:text-brand" />
                      </div>
                    </Link>
                  )
                })}
              </div>

              <article className="rounded-[1.8rem] bg-gradient-to-br from-brand to-ink p-6 text-white shadow-premium">
                <div className="flex items-center gap-3">
                  <Settings size={22} />
                  <h2 className="text-xl font-extrabold">Dica de visibilidade</h2>
                </div>
                <p className="mt-3 max-w-3xl text-sm font-medium leading-6 text-white/75">Perfis com pelo menos 3 fotos, preco claro e resposta rapida tendem a receber mais pedidos.</p>
              </article>
            </div>

            <aside className="premium-surface grid content-start gap-4 rounded-[1.8rem] p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold tracking-[-0.03em]">Pedidos recentes</h2>
                <Link className="text-sm font-extrabold text-brand" to="/profissional/pedidos">Ver todos</Link>
              </div>
              {requests.slice(0, 3).map((request) => (
                <div className="rounded-[1.25rem] border border-line bg-white p-4" key={request.id}>
                  <StatusPill tone={request.status === 'Novo pedido' ? 'brand' : request.status === 'Em andamento' ? 'success' : 'warning'}>{request.status}</StatusPill>
                  <p className="mt-3 text-sm font-extrabold text-ink">{request.service}</p>
                  <p className="mt-1 text-xs font-semibold text-muted">{request.client} - {request.date}</p>
                </div>
              ))}
            </aside>
          </div>
        </section>
      </div>
    </main>
  )
}
