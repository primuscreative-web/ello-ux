import { FileCheck2, Headphones, LockKeyhole, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BottomNav } from '../../components/navigation/BottomNav'
import { BackButton } from '../../components/ui/BackButton'

const sections = [
  {
    icon: LockKeyhole,
    title: 'Privacidade',
    text: 'Dados sensiveis ficam fora do cliente publico. Chaves privadas e auditoria pertencem ao backend.'
  },
  {
    icon: ShieldCheck,
    title: 'Seguranca nos pedidos',
    text: 'Combine valores, prazo e detalhes pelo chat para manter historico e reduzir conflitos.'
  },
  {
    icon: Headphones,
    title: 'Suporte',
    text: 'Denuncias e disputas entram em uma fila de revisao para o painel administrativo.'
  },
  {
    icon: FileCheck2,
    title: 'Termos',
    text: 'Antes do lancamento oficial, esta tela deve receber os textos juridicos finais da ELLO.'
  }
]

export function TrustSupport() {
  return (
    <main className="min-h-screen px-4 pb-28 pt-5 text-ink sm:px-6 md:py-8">
      <section className="mx-auto grid max-w-5xl gap-5">
        <div className="ios-dark-panel rounded-[2.25rem] p-6 text-white shadow-premium md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand">Confianca ELLO</p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.05em] md:text-6xl">Suporte, termos e privacidade.</h1>
              <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-white/62">Um app popular precisa ser simples de usar e claro quando algo der errado.</p>
            </div>
            <BackButton fallback="/cliente/configuracoes" className="border-white/10 bg-white/10 text-white hover:bg-white hover:text-ink" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <article className="premium-surface rounded-[1.7rem] p-5" key={section.title}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <Icon size={23} />
                </span>
                <h2 className="mt-4 text-2xl font-extrabold tracking-[-0.04em]">{section.title}</h2>
                <p className="mt-2 text-sm font-medium leading-6 text-muted">{section.text}</p>
              </article>
            )
          })}
        </div>

        <div className="rounded-[1.7rem] border border-line bg-card p-5 shadow-soft">
          <p className="text-sm font-extrabold text-ink">Proximo passo juridico</p>
          <p className="mt-2 text-sm font-medium leading-6 text-muted">No deploy oficial, substituir este conteudo por termos, politica de privacidade, politica de cancelamento e regras de uso dos profissionais.</p>
          <Link className="mt-4 inline-flex min-h-12 items-center rounded-2xl bg-brand px-5 text-sm font-extrabold text-white" to="/admin">
            Abrir painel admin demo
          </Link>
        </div>
      </section>
      <BottomNav mode="client" />
    </main>
  )
}
