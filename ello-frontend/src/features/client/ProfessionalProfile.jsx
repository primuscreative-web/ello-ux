import { AlertTriangle, ArrowLeft, BadgeCheck, CalendarDays, Flag, MessageCircle, ShieldCheck, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BottomNav } from '../../components/navigation/BottomNav'
import { Button } from '../../components/ui/Button'
import { FavoriteButton } from '../../components/ui/FavoriteButton'
import { StatusPill } from '../../components/ui/StatusPill'
import { getProfessionalById } from '../../services/elloService'
import { createTrustReport, getProfessionalReviews } from '../../services/localExperience'

const toneClass = {
  brand: 'from-brand/18 to-brand/5 text-brand',
  gold: 'from-gold/20 to-gold/5 text-gold',
  sky: 'from-sky to-white text-ink'
}

export function ProfessionalProfile() {
  const { id } = useParams()
  const [professional, setProfessional] = useState(null)
  const [reviews, setReviews] = useState([])
  const [reportOpen, setReportOpen] = useState(false)
  const [reportSent, setReportSent] = useState(false)

  useEffect(() => {
    getProfessionalById(id).then((item) => {
      setProfessional(item)
      setReviews(getProfessionalReviews(item.id))
    })
  }, [id])

  function submitReport(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    createTrustReport({
      type: 'professional',
      targetId: professional.id,
      reason: form.get('reason'),
      details: form.get('details')
    })
    setReportSent(true)
    window.setTimeout(() => {
      setReportOpen(false)
      setReportSent(false)
    }, 1000)
  }

  if (!professional) {
    return <main className="min-h-screen p-6 text-ink">Carregando perfil...</main>
  }

  return (
    <main className="min-h-screen px-4 pb-28 pt-5 text-ink md:px-8 md:pb-8">
      <section className="mx-auto grid max-w-6xl gap-5 md:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-card shadow-premium">
          <div className={`relative min-h-64 bg-gradient-to-br ${professional.accent} p-5`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.82),transparent_15rem)]" />
            <div className="relative flex items-start justify-between gap-3">
              <Link className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-bold text-ink shadow-soft" to="/cliente/feed">
                <ArrowLeft size={16} /> Voltar
              </Link>
              <FavoriteButton professionalId={professional.id} />
            </div>
            <div className="relative mt-20 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill tone="brand">{professional.category}</StatusPill>
                  {professional.verified ? <StatusPill tone="success">Verificado</StatusPill> : null}
                </div>
                <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.055em] md:text-6xl">{professional.name}</h1>
                <p className="mt-2 text-sm font-bold text-muted">{professional.neighborhood}, {professional.city}</p>
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-white/86 px-4 py-3 text-sm font-bold text-ink shadow-soft backdrop-blur">
                <Star size={18} className="fill-gold text-gold" />
                {professional.rating} em {professional.completedJobsLabel || `${professional.jobs} servicos`}
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-5 md:p-8">
            <p className="max-w-3xl text-base font-medium leading-7 text-muted">{professional.bio}</p>

            <div className="grid gap-3 md:grid-cols-3">
              {(professional.trustSignals || []).map((signal) => (
                <div className="rounded-[1.35rem] border border-line bg-cloud/60 p-4" key={signal}>
                  <ShieldCheck size={22} className="text-brand" />
                  <p className="mt-3 text-sm font-extrabold">{signal}</p>
                </div>
              ))}
            </div>

            <section className="grid gap-3">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand">Portfolio</p>
                  <h2 className="mt-1 text-2xl font-extrabold tracking-[-0.04em]">Trabalhos recentes.</h2>
                </div>
                <span className="text-xs font-bold text-muted">{professional.portfolio.length} exemplos</span>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {(professional.recentWork || []).map((item) => (
                  <div className={`min-h-36 rounded-[1.5rem] border border-line bg-gradient-to-br p-4 ${toneClass[item.tone] || toneClass.brand}`} key={item.title}>
                    <p className="text-lg font-extrabold tracking-[-0.03em]">{item.title}</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-muted">{item.result}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand">Avaliacoes</p>
                <h2 className="mt-1 text-2xl font-extrabold tracking-[-0.04em]">O que clientes dizem.</h2>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {reviews.map((review) => (
                  <article className="rounded-[1.4rem] border border-line bg-cloud/60 p-4" key={review.id}>
                    <div className="flex items-center justify-between gap-3">
                      <strong>{review.name}</strong>
                      <span className="inline-flex items-center gap-1 text-sm font-extrabold text-ink">
                        <Star size={15} className="fill-gold text-gold" /> {review.rating}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-medium leading-6 text-muted">{review.text}</p>
                    <p className="mt-3 text-xs font-bold text-muted">{review.createdAt}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>

        <aside className="grid content-start gap-4">
          <div className="ios-dark-panel grid gap-4 rounded-[2rem] p-5 text-white shadow-premium">
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
            <Link to={`/cliente/orcamento/${professional.id}`}>
              <Button variant="secondary" className="w-full">
                <MessageCircle size={18} /> Enviar mensagem
              </Button>
            </Link>
          </div>

          <div className="premium-surface rounded-[1.7rem] p-5">
            <p className="flex items-center gap-2 text-sm font-extrabold text-brand">
              <BadgeCheck size={18} /> Protecao ELLO
            </p>
            <p className="mt-3 text-sm font-medium leading-6 text-muted">Combine detalhes no chat, mantenha proposta por escrito e avalie depois do atendimento.</p>
            <button className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-coral" onClick={() => setReportOpen((current) => !current)} type="button">
              <Flag size={16} /> Denunciar perfil
            </button>
          </div>

          {reportOpen ? (
            <form className="premium-surface grid gap-3 rounded-[1.7rem] p-5" onSubmit={submitReport}>
              <p className="flex items-center gap-2 text-sm font-extrabold text-ink">
                <AlertTriangle size={17} className="text-coral" /> Ajude a manter a ELLO segura
              </p>
              <select className="min-h-12 rounded-2xl border border-line bg-card px-4 text-sm font-bold text-ink" name="reason">
                <option>Informacao falsa</option>
                <option>Comportamento inadequado</option>
                <option>Cobranca suspeita</option>
                <option>Outro motivo</option>
              </select>
              <textarea className="min-h-24 rounded-2xl border border-line bg-card px-4 py-3 text-sm font-semibold text-ink" name="details" placeholder="Descreva rapidamente o ocorrido." />
              <Button type="submit">{reportSent ? 'Recebido' : 'Enviar denuncia'}</Button>
            </form>
          ) : null}
        </aside>
      </section>
      <BottomNav mode="client" />
    </main>
  )
}
