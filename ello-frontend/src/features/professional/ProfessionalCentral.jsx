import { BriefcaseBusiness, CalendarDays, CheckCircle2, ChevronRight, ImagePlus, MessageCircle, Settings, ShieldCheck, TrendingUp, Wallet } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BottomNav } from '../../components/navigation/BottomNav'
import { Button } from '../../components/ui/Button'
import { StatusPill } from '../../components/ui/StatusPill'
import { trustChecklist } from '../../data/elloData'
import { getProfessionalStats, getRequests } from '../../services/elloService'
import { firstName, getCurrentProfile } from '../../services/currentProfile'

const actions = [
  { label: 'Editar perfil', text: 'Atualize sua vitrine publica.', href: '/profissional/perfil', icon: BriefcaseBusiness },
  { label: 'Atualizar portfolio', text: 'Adicione fotos que vendem seu trabalho.', href: '/profissional/perfil', icon: ImagePlus },
  { label: 'Ver pedidos', text: 'Responda oportunidades recentes.', href: '/profissional/pedidos', icon: MessageCircle },
  { label: 'Configurar agenda', text: 'Mostre quando voce pode atender.', href: '/profissional/perfil', icon: CalendarDays }
]

export function ProfessionalCentral() {
  const [stats, setStats] = useState([])
  const [requests, setRequests] = useState([])
  const profile = getCurrentProfile()

  useEffect(() => {
    getProfessionalStats().then(setStats)
    getRequests().then(setRequests)
  }, [])

  return (
    <main className="theme-professional min-h-screen px-4 pb-28 pt-4 text-ink md:p-8">
      <div className="mx-auto grid w-full max-w-[88rem] gap-6 xl:grid-cols-[17rem_minmax(0,1fr)]">
        <motion.aside
          animate={{ opacity: 1, x: 0 }}
          className="ios-dark-panel hidden min-h-[calc(100vh-4rem)] rounded-[2rem] p-6 text-white xl:block"
          initial={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl font-extrabold tracking-[-0.06em]">ELLO Pro</h2>
          <p className="mt-2 text-sm font-medium text-white/50">Central de operacao</p>
          <nav className="mt-8 grid gap-2 text-sm font-extrabold">
            <Link className="rounded-2xl bg-brand px-4 py-3 text-white shadow-[0_14px_34px_rgba(16,184,170,0.25)]" to="/profissional/central">Central</Link>
            <Link className="rounded-2xl px-4 py-3 text-white/70 hover:bg-white/10" to="/profissional/pedidos">Pedidos</Link>
            <span className="rounded-2xl px-4 py-3 text-white/45">Chat</span>
            <span className="rounded-2xl px-4 py-3 text-white/45">Carteira</span>
            <Link className="rounded-2xl px-4 py-3 text-white/70 hover:bg-white/10" to="/profissional/perfil">Perfil</Link>
            <Link className="rounded-2xl px-4 py-3 text-white/70 hover:bg-white/10" to="/profissional/configuracoes">Configuracoes</Link>
          </nav>
          <div className="ios-surface-dark mt-10 rounded-[1.5rem] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">Perfil</p>
            <p className="mt-2 text-4xl font-extrabold tracking-[-0.05em]">92%</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div animate={{ width: '92%' }} className="h-full rounded-full bg-brand" initial={{ width: 0 }} transition={{ delay: 0.35, duration: 0.8 }} />
            </div>
            <p className="mt-3 text-xs font-medium leading-5 text-white/56">Complete portfolio e disponibilidade para aumentar conversao.</p>
          </div>
          <div className="ios-surface-dark mt-4 rounded-[1.5rem] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">Confianca</p>
            <div className="mt-3 grid gap-2">
              {trustChecklist.slice(0, 3).map((item) => (
                <p className="flex items-center gap-2 text-xs font-bold text-white/64" key={item.label}>
                  <CheckCircle2 size={14} className={item.done ? 'text-brand' : 'text-white/30'} />
                  {item.label}
                </p>
              ))}
            </div>
          </div>
        </motion.aside>

        <section className="grid min-w-0 gap-6">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="ios-dark-panel grid gap-5 rounded-[2.25rem] p-5 text-white md:grid-cols-[1fr_auto] md:items-end md:p-8"
            initial={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <p className="text-sm font-semibold text-white/75">Ola, {firstName(profile.publicName || profile.fullName)}</p>
              <h1 className="mt-1 text-balance text-4xl font-extrabold leading-[1.02] tracking-[-0.05em] md:text-6xl">Seu negocio hoje.</h1>
              <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-white/72">
                {profile.specialty ? `${profile.specialty} em ${profile.city || 'sua regiao'}. ` : ''}
                Acompanhe demanda, reputacao e a saude do perfil em uma central pronta para crescer.
              </p>
            </div>
            <Button variant="secondary">
              <Wallet size={18} /> Carteira em breve
            </Button>
          </motion.div>

          <motion.div
            animate="show"
            className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
            initial="hidden"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
          >
            {stats.map((stat, index) => (
              <motion.article
                className="premium-surface rounded-[1.6rem] p-5"
                key={stat.label}
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -4 }}
              >
                <p className="text-sm font-extrabold text-muted">{stat.label}</p>
                <div className="mt-4 flex items-end justify-between">
                  <p className="text-4xl font-extrabold tracking-[-0.05em]">{stat.value}</p>
                  <span className={`flex h-9 w-9 items-center justify-center rounded-2xl ${index === 3 ? 'bg-gold/18 text-gold' : 'bg-brand/10 text-brand'}`}>
                    <TrendingUp size={18} />
                  </span>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="grid gap-4">
              <div className="grid gap-4 lg:grid-cols-2">
                {actions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      initial={{ opacity: 0, y: 18 }}
                      key={action.label}
                      transition={{ delay: 0.12 + index * 0.04 }}
                      whileHover={{ y: -4 }}
                    >
                      <Link className="group premium-surface block rounded-[1.7rem] p-5" to={action.href}>
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
                    </motion.div>
                  )
                })}
              </div>

              <article className="rounded-[1.8rem] bg-brand p-6 text-white shadow-premium">
                <div className="flex items-center gap-3">
                  <Settings size={22} />
                  <h2 className="text-xl font-extrabold">Dica de visibilidade</h2>
                </div>
                <p className="mt-3 max-w-3xl text-sm font-medium leading-6 text-white/75">Perfis com pelo menos 3 fotos, preco claro e resposta rapida tendem a receber mais pedidos.</p>
              </article>

              <section className="premium-surface rounded-[1.8rem] p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">Pronto para vender</p>
                    <h2 className="mt-1 text-2xl font-extrabold tracking-[-0.04em]">Checklist de perfil.</h2>
                  </div>
                  <ShieldCheck className="text-brand" size={26} />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {trustChecklist.map((item) => (
                    <div className="flex items-center gap-3 rounded-2xl border border-line bg-card p-3" key={item.label}>
                      <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${item.done ? 'bg-brand/10 text-brand' : 'bg-cloud text-muted'}`}>
                        <CheckCircle2 size={18} />
                      </span>
                      <span className="text-sm font-extrabold text-muted">{item.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <motion.aside
              animate={{ opacity: 1, x: 0 }}
              className="premium-surface grid content-start gap-4 rounded-[1.8rem] p-5"
              initial={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.42, delay: 0.12 }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold tracking-[-0.03em]">Pedidos recentes</h2>
                <Link className="text-sm font-extrabold text-brand" to="/profissional/pedidos">Ver todos</Link>
              </div>
              {requests.slice(0, 3).map((request) => (
                <motion.div className="rounded-[1.25rem] border border-line bg-white p-4" key={request.id} whileHover={{ x: 3 }}>
                  <StatusPill tone={request.status === 'Novo pedido' ? 'brand' : request.status === 'Em andamento' ? 'success' : 'warning'}>{request.status}</StatusPill>
                  <p className="mt-3 text-sm font-extrabold text-ink">{request.service}</p>
                  <p className="mt-1 text-xs font-semibold text-muted">{request.client} - {request.date}</p>
                </motion.div>
              ))}
            </motion.aside>
          </div>
        </section>
      </div>
      <BottomNav mode="professional" />
    </main>
  )
}
