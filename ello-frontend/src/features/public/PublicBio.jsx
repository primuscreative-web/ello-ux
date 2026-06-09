import { BadgeCheck, CalendarCheck2, CalendarDays, Clock3, CreditCard, Image, Link as LinkIcon, MessageCircle, QrCode, Share2, ShieldCheck, Sparkles, Star, Wallet } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { StatusPill } from '../../components/ui/StatusPill'
import { professionalAreas } from '../../data/elloData'
import { getProfessionalById } from '../../services/elloService'
import { getSessionToken } from '../../services/session'
import { extractProfileIdFromSlug } from '../../utils/publicProfile'

const themeByArea = [
  { match: ['beleza', 'estetica', 'cuidados'], tone: 'client', label: 'visual', gradient: 'from-[#eefbe8] via-white to-[#fff3df]' },
  { match: ['saude', 'bem-estar', 'terapias'], tone: 'wellness', label: 'sessao', gradient: 'from-[#eff9ed] via-white to-[#e9f5ff]' },
  { match: ['casa', 'reforma', 'construcao'], tone: 'home', label: 'obra', gradient: 'from-[#fff6e9] via-white to-[#edf7e8]' },
  { match: ['alimentacao', 'gastronomia'], tone: 'food', label: 'pedido', gradient: 'from-[#fff4e5] via-white to-[#edf8e9]' },
  { match: ['educacao', 'aulas'], tone: 'learning', label: 'aula', gradient: 'from-[#eef8ff] via-white to-[#edf7e8]' }
]

const defaultSlots = ['Hoje', 'Amanha', 'Esta semana']

function normalize(value = '') {
  return String(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function getAreaConfig(professional) {
  const category = normalize(professional.category)
  const area = professionalAreas.find((item) => {
    const haystack = normalize(`${item.area} ${item.examples.join(' ')}`)
    return haystack.split(/\s+/).some((word) => word.length > 3 && category.includes(word)) || category.includes(normalize(item.area).split(',')[0])
  }) || professionalAreas[professionalAreas.length - 1]
  const theme = themeByArea.find((item) => item.match.some((word) => category.includes(normalize(word)))) || themeByArea[0]

  return { area, theme }
}

function getServiceOptions(professional, area) {
  const categoryName = String(professional.category || 'Atendimento').split(' - ')[0]
  const base = [
    { title: categoryName, detail: professional.chargeType || 'A combinar', price: professional.price || 'Valor a combinar' },
    { title: area.tools[0] || 'Atendimento', detail: professional.availability || 'Agenda a combinar', price: professional.price || 'Sob consulta' },
    { title: area.tools[1] || 'Orcamento', detail: 'Pedido personalizado pelo chat', price: 'Sob medida' }
  ]

  return base.filter((item, index, list) => list.findIndex((candidate) => candidate.title === item.title) === index).slice(0, 3)
}

function buildQuotePath(professional, service, action, date = '') {
  const params = new URLSearchParams({
    source: 'bio',
    action,
    service: service?.title || professional.category || 'Atendimento'
  })
  if (date) params.set('date', date)

  return `/cliente/orcamento/${professional.id}?${params.toString()}`
}

function buildEntryPath(next) {
  return getSessionToken() ? next : `/entrar?next=${encodeURIComponent(next)}`
}

export function PublicBio() {
  const { slug } = useParams()
  const [professional, setProfessional] = useState(null)
  const [error, setError] = useState('')
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0)
  const [selectedDate, setSelectedDate] = useState(defaultSlots[0])
  const [shared, setShared] = useState(false)
  const id = extractProfileIdFromSlug(slug)

  useEffect(() => {
    getProfessionalById(id).then(setProfessional).catch((err) => setError(err.message))
  }, [id])

  if (error) {
    return (
      <main className="grid min-h-screen place-items-center px-4 py-8 text-ink">
        <section className="max-w-md rounded-[2rem] bg-white p-6 text-center shadow-premium">
          <h1 className="text-3xl font-extrabold tracking-[-0.04em]">Link nao encontrado.</h1>
          <p className="mt-2 text-sm font-semibold leading-6 text-muted">{error}</p>
          <Link className="mt-5 inline-flex min-h-12 items-center justify-center rounded-2xl bg-brand px-5 text-sm font-extrabold text-white" to="/">
            Abrir ELLO
          </Link>
        </section>
      </main>
    )
  }

  if (!professional) {
    return <main className="min-h-screen p-6 text-ink">Carregando link publico...</main>
  }

  const { area, theme } = getAreaConfig(professional)
  const serviceOptions = getServiceOptions(professional, area)
  const selectedService = serviceOptions[selectedServiceIndex] || serviceOptions[0]
  const schedulePath = buildQuotePath(professional, selectedService, 'schedule', selectedDate)
  const chatPath = buildQuotePath(professional, selectedService, 'chat')
  const portfolioItems = professional.recentWork?.length ? professional.recentWork : serviceOptions.map((service, index) => ({
    title: service.title,
    result: index === 0 ? 'Veja referencias e combine detalhes pelo chat.' : `Formato: ${service.detail}`
  }))

  async function shareProfile() {
    const url = window.location.href
    const title = `${professional.name} na ELLO`

    try {
      if (navigator.share) {
        await navigator.share({ title, text: `Agende com ${professional.name} pela ELLO.`, url })
      } else {
        await navigator.clipboard.writeText(url)
      }
      setShared(true)
      window.setTimeout(() => setShared(false), 1400)
    } catch {
      setShared(false)
    }
  }

  return (
    <main className="onboarding-light min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f4fbf1_55%,#eef8ea_100%)] px-4 py-5 text-ink">
      <section className="mx-auto grid max-w-md gap-4 lg:max-w-5xl lg:grid-cols-[minmax(0,1fr)_24rem]">
        <header className="overflow-hidden rounded-[2.25rem] border border-line bg-white shadow-premium">
          <div className={`bg-gradient-to-br ${theme.gradient} p-5`}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-3xl font-black tracking-[-0.055em] text-brandDark">ELLO</span>
              <button className="flex h-11 min-w-11 items-center justify-center gap-2 rounded-full bg-white px-3 text-brand shadow-soft" onClick={shareProfile} type="button" aria-label="Compartilhar">
                <Share2 size={19} />
                {shared ? <span className="text-xs font-extrabold text-brandDark">Copiado</span> : null}
              </button>
            </div>
            <div className="mt-12 flex items-end gap-4">
              <span className="flex h-20 w-20 items-center justify-center rounded-[1.6rem] bg-brand text-2xl font-black text-white shadow-soft">
                {professional.avatar}
              </span>
              <div className="min-w-0 flex-1">
                <StatusPill tone="brand">{professional.category}</StatusPill>
                <h1 className="mt-2 text-3xl font-black leading-[1] tracking-[-0.055em] text-[#071319]">{professional.name}</h1>
                <p className="mt-1 text-sm font-bold text-[#667085]">{professional.neighborhood}, {professional.city}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-5">
            <p className="text-sm font-semibold leading-6 text-[#667085]">{professional.bio || 'Perfil profissional ELLO com agenda, portfolio, orcamento e pagamento em um so lugar.'}</p>
            <div className="grid grid-cols-3 gap-2">
              <span className="rounded-2xl bg-cloud p-3 text-center text-[#071319]">
                <Star size={17} className="mx-auto fill-brand text-brand" />
                <span className="mt-1 block text-xs font-extrabold">{Number(professional.rating) > 0 ? professional.rating.toFixed(1) : 'Novo'}</span>
              </span>
              <span className="rounded-2xl bg-cloud p-3 text-center text-[#071319]">
                <CalendarDays size={17} className="mx-auto text-brand" />
                <span className="mt-1 block text-xs font-extrabold">{professional.availability || 'A combinar'}</span>
              </span>
              <span className="rounded-2xl bg-cloud p-3 text-center text-[#071319]">
                <Wallet size={17} className="mx-auto text-brand" />
                <span className="mt-1 block text-xs font-extrabold">Carteira</span>
              </span>
            </div>
          </div>
        </header>

        <section className="grid gap-3 lg:order-3 lg:col-span-2">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brandDark">Portfolio</p>
              <h2 className="text-2xl font-black tracking-[-0.04em] text-[#071319]">Trabalhos e formatos.</h2>
            </div>
            <span className="rounded-full bg-white px-3 py-2 text-xs font-extrabold text-[#667085] shadow-soft">{area.examples.slice(0, 2).join(' / ')}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {portfolioItems.map((item, index) => (
              <article className="min-h-40 rounded-[1.5rem] border border-line bg-white p-4 shadow-soft" key={`${item.title}-${index}`}>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <Image size={19} />
                </span>
                <p className="mt-5 text-lg font-extrabold tracking-[-0.03em] text-[#071319]">{item.title}</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-[#667085]">{item.result}</p>
              </article>
            ))}
          </div>
        </section>

        <aside className="grid gap-4 lg:row-span-2">
          <section className="rounded-[1.7rem] border border-line bg-white p-5 shadow-premium">
            <p className="flex items-center gap-2 text-sm font-extrabold text-brandDark">
              <Sparkles size={18} className="text-brand" /> Escolha o servico
            </p>
            <div className="mt-4 grid gap-2">
              {serviceOptions.map((service, index) => (
                <button
                  className={`rounded-[1.25rem] border p-4 text-left transition ${index === selectedServiceIndex ? 'border-brand bg-brand/10' : 'border-line bg-cloud/70 hover:border-brand/50'}`}
                  key={service.title}
                  onClick={() => setSelectedServiceIndex(index)}
                  type="button"
                >
                  <span className="block text-sm font-extrabold text-[#071319]">{service.title}</span>
                  <span className="mt-1 block text-xs font-bold leading-5 text-[#667085]">{service.detail}</span>
                  <span className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-xs font-extrabold text-brandDark">{service.price}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-[1.7rem] border border-line bg-white p-5 shadow-premium">
            <p className="flex items-center gap-2 text-sm font-extrabold text-brandDark">
              <CalendarCheck2 size={18} className="text-brand" /> Agendamento rapido
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {defaultSlots.map((slot) => (
                <button
                  className={`min-h-12 rounded-2xl px-2 text-xs font-extrabold transition ${selectedDate === slot ? 'bg-brand text-white' : 'bg-cloud text-[#667085]'}`}
                  key={slot}
                  onClick={() => setSelectedDate(slot)}
                  type="button"
                >
                  {slot}
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-[1.25rem] bg-cloud p-4">
              <p className="flex items-center gap-2 text-sm font-extrabold text-[#071319]"><Clock3 size={17} className="text-brand" /> {professional.availability || 'Horario a combinar'}</p>
              <p className="mt-1 text-xs font-semibold leading-5 text-[#667085]">O profissional confirma o horario no chat antes do pagamento.</p>
            </div>
            <div className="mt-4 grid gap-3">
              <Link to={buildEntryPath(schedulePath)}>
                <Button className="min-h-14 w-full rounded-[1.35rem]">
                  <CalendarDays size={18} /> Iniciar agendamento
                </Button>
              </Link>
              <Link to={buildEntryPath(chatPath)}>
                <Button className="min-h-14 w-full rounded-[1.35rem]" variant="secondary">
                  <MessageCircle size={18} /> Conversar antes
                </Button>
              </Link>
            </div>
          </section>

          <section className="rounded-[1.7rem] border border-line bg-white p-5 shadow-soft">
            <p className="flex items-center gap-2 text-sm font-extrabold text-brandDark">
              <ShieldCheck size={18} className="text-brand" /> Pagamento Seguro ELLO
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { icon: QrCode, label: 'Pix' },
                { icon: CreditCard, label: 'Cartao' },
                { icon: BadgeCheck, label: 'Avaliacao' }
              ].map((item) => {
                const Icon = item.icon
                return (
                  <span className="grid justify-items-center gap-1 rounded-2xl bg-cloud px-2 py-3 text-[11px] font-extrabold text-muted" key={item.label}>
                    <Icon size={17} className="text-brand" />
                    {item.label}
                  </span>
                )
              })}
            </div>
          </section>
        </aside>

        <section className="grid gap-3 lg:order-4 lg:col-span-2">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brandDark">Ferramentas deste profissional</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {area.tools.slice(0, 6).map((tool) => (
              <span className="rounded-2xl border border-line bg-white px-4 py-3 text-sm font-extrabold text-[#667085] shadow-soft" key={tool}>{tool}</span>
            ))}
          </div>
        </section>

        <footer className="grid gap-2 pb-4 text-center lg:order-5 lg:col-span-2">
          <p className="inline-flex items-center justify-center gap-2 text-xs font-extrabold text-muted">
            <LinkIcon size={14} /> Link publico ELLO
          </p>
          <Link className="text-sm font-extrabold text-brandDark" to="/">Criar meu perfil profissional</Link>
        </footer>
      </section>
    </main>
  )
}
