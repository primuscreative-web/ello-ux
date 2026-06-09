import { BadgeCheck, CalendarDays, CreditCard, Link as LinkIcon, MessageCircle, QrCode, Share2, ShieldCheck, Star, Wallet } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { StatusPill } from '../../components/ui/StatusPill'
import { getProfessionalById } from '../../services/elloService'
import { extractProfileIdFromSlug } from '../../utils/publicProfile'

const portfolioCards = [
  { title: 'Portfolio', text: 'Trabalhos, estilos e resultados recentes.' },
  { title: 'Agenda', text: 'Horarios, visitas, sessoes ou datas disponiveis.' },
  { title: 'Pagamento', text: 'Pix, credito, debito e carteira ELLO.' }
]

export function PublicBio() {
  const { slug } = useParams()
  const [professional, setProfessional] = useState(null)
  const [error, setError] = useState('')
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

  return (
    <main className="onboarding-light min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f4fbf1_55%,#eef8ea_100%)] px-4 py-5 text-ink">
      <section className="mx-auto grid max-w-md gap-4">
        <header className="overflow-hidden rounded-[2.25rem] border border-line bg-white shadow-premium">
          <div className="bg-gradient-to-br from-[#e9f9e7] via-white to-[#fff4e5] p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-3xl font-black tracking-[-0.055em] text-brandDark">ELLO</span>
              <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand shadow-soft" type="button" aria-label="Compartilhar">
                <Share2 size={19} />
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

        <div className="grid gap-3">
          <Link to={`/cliente/orcamento/${professional.id}`}>
            <Button className="min-h-14 w-full rounded-[1.35rem]">
              <MessageCircle size={18} /> Pedir orcamento
            </Button>
          </Link>
          <Link to={`/cliente/orcamento/${professional.id}`}>
            <Button className="min-h-14 w-full rounded-[1.35rem]" variant="secondary">
              <CalendarDays size={18} /> Agendar atendimento
            </Button>
          </Link>
        </div>

        <section className="grid gap-3">
          {portfolioCards.map((item) => (
            <article className="rounded-[1.5rem] border border-line bg-white p-4 shadow-soft" key={item.title}>
              <p className="text-lg font-extrabold tracking-[-0.03em] text-[#071319]">{item.title}</p>
              <p className="mt-1 text-sm font-semibold leading-6 text-[#667085]">{item.text}</p>
            </article>
          ))}
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

        <footer className="grid gap-2 pb-4 text-center">
          <p className="inline-flex items-center justify-center gap-2 text-xs font-extrabold text-muted">
            <LinkIcon size={14} /> Link publico ELLO
          </p>
          <Link className="text-sm font-extrabold text-brandDark" to="/">Criar meu perfil profissional</Link>
        </footer>
      </section>
    </main>
  )
}
