import { ArrowDownLeft, BadgePercent, Banknote, Clock, CreditCard, QrCode, Repeat2, ShieldCheck, Sparkles, Wallet } from 'lucide-react'
import { motion } from 'framer-motion'
import { BottomNav } from '../../components/navigation/BottomNav'
import { BackButton } from '../../components/ui/BackButton'

const balanceCards = [
  { label: 'Saldo disponivel', value: 'R$ 0,00', icon: Wallet, text: 'Pronto para saque quando o gateway estiver ativo.' },
  { label: 'A receber', value: 'R$ 0,00', icon: Clock, text: 'Pagamentos aguardando conclusao do servico.' },
  { label: 'Saques', value: 'Em breve', icon: ArrowDownLeft, text: 'Transferencia para banco ou chave Pix.' }
]

const paymentRails = [
  { icon: QrCode, title: 'Pix', text: 'Pagamento rapido para servicos avulsos e sinais.' },
  { icon: CreditCard, title: 'Credito e debito', text: 'Cliente paga no app e o valor entra na carteira.' },
  { icon: Repeat2, title: 'Pix automatico', text: 'Para clientes recorrentes como terapia, aulas e planos.' }
]

const moneyRules = [
  'Pagamento pelo app gera historico, comprovante e protecao ELLO.',
  'Pagamento por fora pode ser combinado, mas sem mediacao financeira.',
  'Servicos grandes podem usar sinal, etapas e liberacao por conclusao.',
  'Destaques e planos Pro entram depois como receita recorrente da ELLO.'
]

export function ProfessionalWallet() {
  return (
    <main className="theme-professional min-h-screen px-4 pb-28 pt-5 text-ink sm:px-6 md:py-8">
      <section className="mx-auto grid max-w-5xl gap-5">
        <motion.header
          animate={{ opacity: 1, y: 0 }}
          className="ios-dark-panel rounded-[2.25rem] p-6 text-white shadow-premium sm:p-8"
          initial={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/55">Carteira ELLO</p>
              <h1 className="mt-2 text-4xl font-extrabold leading-[1] tracking-[-0.05em] sm:text-5xl">Receba pelo app.</h1>
              <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-white/68">
                Pix, credito, debito e recorrencia preparados para conectar ao gateway e repassar automaticamente ao profissional.
              </p>
            </div>
            <BackButton fallback="/profissional/central" className="border-white/10 bg-white/10 text-white hover:bg-white hover:text-ink" />
          </div>
        </motion.header>

        <div className="grid gap-4 sm:grid-cols-3">
          {balanceCards.map((item) => {
            const Icon = item.icon
            return (
              <article className="premium-surface rounded-[1.6rem] p-5" key={item.label}>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <Icon size={21} />
                </span>
                <p className="mt-4 text-sm font-extrabold text-muted">{item.label}</p>
                <p className="mt-2 text-3xl font-extrabold tracking-[-0.04em]">{item.value}</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-muted">{item.text}</p>
              </article>
            )
          })}
        </div>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[1.8rem] border border-line bg-white p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <ShieldCheck size={21} />
              </span>
              <div>
                <h2 className="text-xl font-extrabold tracking-[-0.03em]">Pagamento Seguro ELLO</h2>
                <p className="mt-1 text-sm font-semibold leading-6 text-muted">
                  O cliente paga no app, o pedido fica registrado e o profissional acompanha o repasse na carteira.
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {paymentRails.map((item) => {
                const Icon = item.icon
                return (
                  <div className="rounded-[1.35rem] bg-cloud p-4" key={item.title}>
                    <Icon size={22} className="text-brand" />
                    <p className="mt-3 text-sm font-extrabold text-ink">{item.title}</p>
                    <p className="mt-1 text-xs font-semibold leading-5 text-muted">{item.text}</p>
                  </div>
                )
              })}
            </div>
          </article>

          <article className="rounded-[1.8rem] border border-line bg-white p-5 shadow-soft">
            <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
              <Banknote size={16} /> Regras do dinheiro
            </p>
            <div className="mt-4 grid gap-3">
              {moneyRules.map((rule) => (
                <p className="rounded-2xl bg-cloud px-4 py-3 text-sm font-bold leading-6 text-muted" key={rule}>{rule}</p>
              ))}
            </div>
          </article>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-[1.8rem] bg-brand p-5 text-white shadow-premium">
            <BadgePercent size={24} />
            <h2 className="mt-4 text-2xl font-extrabold tracking-[-0.04em]">Taxas claras</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-white/74">
              A ELLO pode cobrar taxa apenas quando houver pagamento pelo app, alem dos destaques e planos Pro no futuro.
            </p>
          </article>
          <article className="rounded-[1.8rem] bg-ink p-5 text-white shadow-premium">
            <Sparkles size={24} className="text-brand" />
            <h2 className="mt-4 text-2xl font-extrabold tracking-[-0.04em]">Destaques e impulsos</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-white/68">
              Perfis e publicacoes poderao ganhar alcance por cidade, area, data e categoria, no estilo iFood e OLX.
            </p>
          </article>
        </section>
      </section>

      <BottomNav mode="professional" />
    </main>
  )
}
