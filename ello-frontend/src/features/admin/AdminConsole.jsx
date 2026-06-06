import { AlertTriangle, BadgeCheck, ClipboardList, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BackButton } from '../../components/ui/BackButton'
import { StatusPill } from '../../components/ui/StatusPill'
import { professionals, requests } from '../../data/elloData'
import { getTrustReports } from '../../services/localExperience'

export function AdminConsole() {
  const reports = getTrustReports()
  const metrics = [
    { icon: UsersRound, label: 'Profissionais demo', value: professionals.length },
    { icon: ClipboardList, label: 'Pedidos demo', value: requests.length },
    { icon: AlertTriangle, label: 'Denuncias locais', value: reports.length },
    { icon: BadgeCheck, label: 'Perfis verificados', value: professionals.filter((item) => item.verified).length }
  ]

  return (
    <main className="min-h-screen px-4 py-5 text-ink sm:px-6 md:py-8">
      <section className="mx-auto grid max-w-6xl gap-5">
        <div className="ios-dark-panel rounded-[2.25rem] p-6 text-white shadow-premium md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand">Admin ELLO</p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.05em] md:text-6xl">Operacao e confianca.</h1>
              <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-white/62">Painel inicial para revisao de profissionais, pedidos sensiveis e denuncias.</p>
            </div>
            <BackButton fallback="/configuracoes" className="border-white/10 bg-white/10 text-white hover:bg-white hover:text-ink" />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <article className="premium-surface rounded-[1.5rem] p-5" key={metric.label}>
                <Icon size={22} className="text-brand" />
                <p className="mt-4 text-3xl font-extrabold">{metric.value}</p>
                <p className="mt-1 text-sm font-bold text-muted">{metric.label}</p>
              </article>
            )
          })}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="premium-surface rounded-[1.7rem] p-5">
            <h2 className="text-2xl font-extrabold tracking-[-0.04em]">Fila de profissionais</h2>
            <div className="mt-4 grid gap-3">
              {professionals.map((professional) => (
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-card p-4" key={professional.id}>
                  <div>
                    <p className="font-extrabold">{professional.name}</p>
                    <p className="text-sm font-bold text-muted">{professional.category} - {professional.city}</p>
                  </div>
                  <StatusPill tone={professional.verified ? 'success' : 'warning'}>{professional.verified ? 'Verificado' : 'Analisar'}</StatusPill>
                </div>
              ))}
            </div>
          </section>

          <section className="premium-surface rounded-[1.7rem] p-5">
            <h2 className="text-2xl font-extrabold tracking-[-0.04em]">Denuncias recentes</h2>
            <div className="mt-4 grid gap-3">
              {reports.length === 0 ? (
                <p className="rounded-2xl border border-line bg-card p-4 text-sm font-bold text-muted">Nenhuma denuncia local registrada.</p>
              ) : reports.map((report) => (
                <div className="rounded-2xl border border-line bg-card p-4" key={report.id}>
                  <StatusPill tone="warning">{report.status}</StatusPill>
                  <p className="mt-3 text-sm font-extrabold">{report.reason}</p>
                  <p className="mt-1 text-sm font-medium text-muted">{report.details || 'Sem detalhes.'}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <Link className="text-sm font-extrabold text-brand" to="/cliente/feed">Voltar para o app</Link>
      </section>
    </main>
  )
}
