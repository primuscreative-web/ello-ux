import { Bell, Check, ChevronRight, LockKeyhole, Moon, ShieldCheck, Smartphone, Sun, UserRound } from 'lucide-react'
import { motion } from 'framer-motion'
import { BackButton } from '../../components/ui/BackButton'
import { Button } from '../../components/ui/Button'
import { useTheme } from '../../providers/useTheme'

const rows = [
  { icon: UserRound, label: 'Conta', text: 'Dados pessoais, email e seguranca.' },
  { icon: Bell, label: 'Notificacoes', text: 'Pedidos, mensagens e novidades.' },
  { icon: LockKeyhole, label: 'Privacidade', text: 'Controle visibilidade e dados.' },
  { icon: ShieldCheck, label: 'Verificacao', text: 'Documentos e selos de confianca.' }
]

export function Settings() {
  const { isDark, setTheme, theme } = useTheme()

  return (
    <main className="min-h-screen px-4 py-5 text-ink sm:px-6 md:py-8">
      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.86fr_1.14fr]">
        <motion.aside
          animate={{ opacity: 1, x: 0 }}
          className="ios-dark-panel grid content-between gap-8 rounded-[2.25rem] p-6 text-white shadow-premium sm:p-8"
          initial={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="text-3xl font-extrabold tracking-[-0.05em]">ELLO</div>
            <BackButton fallback="/profissional/central" className="border-white/10 bg-white/10 text-white hover:bg-white hover:text-ink" />
          </div>

          <div className="grid gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-white/12 bg-white/10 text-brand backdrop-blur">
              <Smartphone size={30} />
            </span>
            <h1 className="text-balance text-5xl font-extrabold leading-[0.98] tracking-[-0.055em]">Seu app do seu jeito.</h1>
            <p className="max-w-md text-sm font-medium leading-6 text-white/64">
              A ELLO precisa ser popular: simples, clara e confortavel em qualquer hora do dia.
            </p>
          </div>

          <div className="ios-surface-dark rounded-[1.5rem] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/42">Tema atual</p>
            <p className="mt-2 text-3xl font-extrabold">{isDark ? 'Escuro' : 'Claro'}</p>
            <p className="mt-1 text-xs font-medium leading-5 text-white/56">Preferencia salva neste dispositivo.</p>
          </div>
        </motion.aside>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel grid gap-5 rounded-[2.25rem] p-5 sm:p-8"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid gap-2">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand">Configuracoes</p>
            <h2 className="text-3xl font-extrabold tracking-[-0.04em] md:text-5xl">Aparencia e controle.</h2>
            <p className="max-w-2xl text-sm font-medium leading-6 text-muted">
              Alterne entre modo claro e escuro. O app aplica a escolha imediatamente e mantém a preferencia salva.
            </p>
          </div>

          <div className="grid gap-3 rounded-[1.75rem] border border-line bg-card p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-extrabold tracking-[-0.03em]">Tema do app</h3>
                <p className="mt-1 text-sm font-medium text-muted">Escolha a leitura mais confortavel.</p>
              </div>
              <span className="hidden rounded-full bg-brand/10 px-3 py-1 text-xs font-extrabold text-brand sm:inline-flex">
                {theme === 'dark' ? 'Noite' : 'Dia'}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: Sun, label: 'Claro', value: 'light', text: 'Melhor para uso durante o dia.' },
                { icon: Moon, label: 'Escuro', value: 'dark', text: 'Mais confortavel a noite.' }
              ].map((option) => {
                const Icon = option.icon
                const active = theme === option.value

                return (
                  <button
                    className={`grid min-h-36 rounded-[1.5rem] border p-4 text-left transition ${active ? 'border-brand bg-brand text-white shadow-[0_18px_44px_rgba(16,184,170,0.24)]' : 'border-line bg-white text-ink hover:border-brand/40'}`}
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    type="button"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${active ? 'bg-white/16 text-white' : 'bg-brand/10 text-brand'}`}>
                        <Icon size={24} />
                      </span>
                      {active ? <Check size={20} /> : null}
                    </span>
                    <span className="mt-auto">
                      <strong className="block text-xl">{option.label}</strong>
                      <span className={`mt-1 block text-sm font-medium leading-5 ${active ? 'text-white/72' : 'text-muted'}`}>{option.text}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid gap-3">
            {rows.map((row) => {
              const Icon = row.icon
              return (
                <button className="group flex items-center gap-4 rounded-[1.5rem] border border-line bg-card p-4 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-brand/40" key={row.label} type="button">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <Icon size={22} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <strong className="block text-base">{row.label}</strong>
                    <span className="mt-1 block text-sm font-medium text-muted">{row.text}</span>
                  </span>
                  <ChevronRight size={18} className="text-muted transition group-hover:translate-x-1 group-hover:text-brand" />
                </button>
              )
            })}
          </div>

          <Button variant="secondary" onClick={() => setTheme(isDark ? 'light' : 'dark')} className="w-full sm:w-auto">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            Alternar para modo {isDark ? 'claro' : 'escuro'}
          </Button>
        </motion.div>
      </section>
    </main>
  )
}
