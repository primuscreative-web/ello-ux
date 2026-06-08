import { ArrowDownLeft, Clock, ShieldCheck, Wallet } from 'lucide-react'
import { motion } from 'framer-motion'
import { BottomNav } from '../../components/navigation/BottomNav'
import { BackButton } from '../../components/ui/BackButton'

export function ProfessionalWallet() {
  return (
    <main className="theme-professional min-h-screen px-4 pb-28 pt-5 text-ink sm:px-6 md:py-8">
      <section className="mx-auto grid max-w-4xl gap-5">
        <motion.header
          animate={{ opacity: 1, y: 0 }}
          className="ios-dark-panel rounded-[2.25rem] p-6 text-white shadow-premium sm:p-8"
          initial={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/55">Carteira</p>
              <h1 className="mt-2 text-4xl font-extrabold leading-[1] tracking-[-0.05em] sm:text-5xl">Recebimentos ELLO.</h1>
              <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-white/68">
                Acompanhe ganhos, repasses e historico financeiro quando os pagamentos forem ativados.
              </p>
            </div>
            <BackButton fallback="/profissional/central" className="border-white/10 bg-white/10 text-white hover:bg-white hover:text-ink" />
          </div>
        </motion.header>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Saldo disponivel', value: 'R$ 0,00', icon: Wallet },
            { label: 'A receber', value: 'R$ 0,00', icon: Clock },
            { label: 'Saques', value: 'Em breve', icon: ArrowDownLeft }
          ].map((item) => {
            const Icon = item.icon
            return (
              <article className="premium-surface rounded-[1.6rem] p-5" key={item.label}>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <Icon size={21} />
                </span>
                <p className="mt-4 text-sm font-extrabold text-muted">{item.label}</p>
                <p className="mt-2 text-3xl font-extrabold tracking-[-0.04em]">{item.value}</p>
              </article>
            )
          })}
        </div>

        <article className="rounded-[1.8rem] border border-line bg-white p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <ShieldCheck size={21} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold tracking-[-0.03em]">Carteira protegida</h2>
              <p className="mt-1 text-sm font-semibold leading-6 text-muted">
                Esta area esta pronta para receber pagamentos, comprovantes e saques quando a ELLO ativar o modulo financeiro.
              </p>
            </div>
          </div>
        </article>
      </section>

      <BottomNav mode="professional" />
    </main>
  )
}
