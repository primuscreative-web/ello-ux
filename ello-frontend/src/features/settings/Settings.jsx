import { useEffect, useMemo, useState } from 'react'
import {
  BadgeCheck,
  Bell,
  Check,
  ChevronRight,
  EyeOff,
  FileCheck2,
  Headphones,
  LockKeyhole,
  LogOut,
  MailCheck,
  MapPin,
  Moon,
  ShieldCheck,
  Smartphone,
  Sun,
  UserRound,
  WalletCards
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BottomNav } from '../../components/navigation/BottomNav'
import { BackButton } from '../../components/ui/BackButton'
import { Button } from '../../components/ui/Button'
import { useTheme } from '../../providers/useTheme'
import { clearSession, getSession } from '../../services/session'

const PREFERENCES_KEY = 'ello.settings.preferences'

const defaultPreferences = {
  quoteAlerts: true,
  chatAlerts: true,
  hidePhone: true,
  locationPrecision: true,
  billingReceipts: true
}

const accountRows = [
  { icon: UserRound, label: 'Conta', text: 'Nome, email e tipo de perfil.', status: 'Ativa' },
  { icon: LockKeyhole, label: 'Sessao segura', text: 'Token local protegido neste dispositivo.', status: 'OK' },
  { icon: ShieldCheck, label: 'Verificacao', text: 'Documentos e selos preparados para producao.', status: 'Pendente' }
]

const preferenceRows = [
  { key: 'quoteAlerts', icon: Bell, label: 'Alertas de orcamento', text: 'Novos pedidos, respostas e aceite.' },
  { key: 'chatAlerts', icon: MailCheck, label: 'Mensagens importantes', text: 'Conversas ligadas aos pedidos.' },
  { key: 'hidePhone', icon: EyeOff, label: 'Telefone protegido', text: 'Mostra contato apenas quando fizer sentido.' },
  { key: 'locationPrecision', icon: MapPin, label: 'Localizacao aproximada', text: 'Usa bairro ou cidade em vez de endereco completo.' },
  { key: 'billingReceipts', icon: WalletCards, label: 'Comprovantes e recibos', text: 'Mantem historico organizado para suporte.' }
]

const supportRows = [
  { icon: Headphones, label: 'Suporte ELLO', text: 'Atendimento e disputa de pedidos.' },
  { icon: FileCheck2, label: 'Termos e privacidade', text: 'Politicas prontas para publicar antes do lancamento.' },
  { icon: BadgeCheck, label: 'Padrao de confianca', text: 'Verificacao, auditoria e historico do atendimento.' }
]

function readPreferences() {
  try {
    return { ...defaultPreferences, ...JSON.parse(window.localStorage.getItem(PREFERENCES_KEY)) }
  } catch {
    return defaultPreferences
  }
}

export function Settings() {
  const { isDark, setTheme, theme } = useTheme()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const session = getSession()
  const mode = pathname.startsWith('/cliente') || session?.user?.role === 'client' ? 'client' : 'professional'
  const fallback = mode === 'client' ? '/cliente/feed' : '/profissional/central'
  const [preferences, setPreferences] = useState(readPreferences)
  const enabledCount = useMemo(() => Object.values(preferences).filter(Boolean).length, [preferences])
  const accountLabel = session?.user?.email || (mode === 'client' ? 'Cliente ELLO' : 'Profissional ELLO')

  useEffect(() => {
    window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences))
  }, [preferences])

  function togglePreference(key) {
    setPreferences((current) => ({ ...current, [key]: !current[key] }))
  }

  function handleLogout() {
    clearSession()
    navigate('/entrar')
  }

  return (
    <main className="min-h-screen px-4 pb-28 pt-5 text-ink sm:px-6 md:py-8">
      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.84fr_1.16fr]">
        <motion.aside
          animate={{ opacity: 1, x: 0 }}
          className="ios-dark-panel grid self-start overflow-hidden rounded-[2.25rem] p-6 text-white shadow-premium sm:p-8"
          initial={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="text-3xl font-extrabold tracking-[-0.05em]">ELLO</div>
            <BackButton fallback={fallback} className="border-white/10 bg-white/10 text-white hover:bg-white hover:text-ink" />
          </div>

          <div className="grid gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-white/12 bg-white/10 text-brand backdrop-blur">
              <Smartphone size={30} />
            </span>
            <h1 className="text-balance text-5xl font-extrabold leading-[0.98] tracking-[-0.055em]">
              Controle simples. Conta protegida.
            </h1>
            <p className="max-w-md text-sm font-medium leading-6 text-white/64">
              Ajustes claros para cliente e profissional usarem a ELLO com confianca, rapidez e menos atrito.
            </p>
          </div>

          <div className="grid gap-3">
            <div className="ios-surface-dark rounded-[1.5rem] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/42">Tema atual</p>
              <p className="mt-2 text-3xl font-extrabold">{isDark ? 'Escuro' : 'Claro'}</p>
              <p className="mt-1 text-xs font-medium leading-5 text-white/56">Preferencia salva neste dispositivo.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="ios-surface-dark rounded-[1.25rem] p-4">
                <p className="text-2xl font-extrabold">{enabledCount}/5</p>
                <p className="mt-1 text-xs font-bold text-white/52">Preferencias ativas</p>
              </div>
              <div className="ios-surface-dark rounded-[1.25rem] p-4">
                <p className="text-2xl font-extrabold">ID</p>
                <p className="mt-1 truncate text-xs font-bold text-white/52">{session?.user?.id || 'Sessao local'}</p>
              </div>
            </div>
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
            <h2 className="text-3xl font-extrabold tracking-[-0.04em] md:text-5xl">Aparencia, seguranca e preferencias.</h2>
            <p className="max-w-2xl text-sm font-medium leading-6 text-muted">{accountLabel}</p>
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
                    className={`grid min-h-36 rounded-[1.5rem] border p-4 text-left transition ${active ? 'border-brand bg-brand text-white shadow-[0_18px_44px_rgba(16,184,170,0.24)]' : 'border-line bg-card text-ink hover:border-brand/40'}`}
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

          <div className="grid gap-3 rounded-[1.75rem] border border-line bg-card p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-extrabold tracking-[-0.03em]">Conta e confianca</h3>
                <p className="mt-1 text-sm font-medium text-muted">Status essencial para uso publico.</p>
              </div>
              <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-extrabold text-brand">Protegida</span>
            </div>

            <div className="grid gap-3">
              {accountRows.map((row) => {
                const Icon = row.icon
                return (
                  <div className="flex items-center gap-4 rounded-[1.35rem] border border-line bg-cloud/50 p-4" key={row.label}>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                      <Icon size={22} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <strong className="block text-base">{row.label}</strong>
                      <span className="mt-1 block text-sm font-medium text-muted">{row.text}</span>
                    </span>
                    <span className="rounded-full border border-line bg-card px-3 py-1 text-xs font-extrabold text-muted">{row.status}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid gap-3 rounded-[1.75rem] border border-line bg-card p-4">
            <div>
              <h3 className="text-xl font-extrabold tracking-[-0.03em]">Preferencias</h3>
              <p className="mt-1 text-sm font-medium text-muted">Controles salvos neste dispositivo.</p>
            </div>
            {preferenceRows.map((row) => {
              const Icon = row.icon
              const active = preferences[row.key]
              return (
                <button
                  className="group flex items-center gap-4 rounded-[1.35rem] border border-line bg-cloud/50 p-4 text-left transition hover:border-brand/40"
                  key={row.key}
                  onClick={() => togglePreference(row.key)}
                  type="button"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <Icon size={22} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <strong className="block text-base">{row.label}</strong>
                    <span className="mt-1 block text-sm font-medium text-muted">{row.text}</span>
                  </span>
                  <span className={`flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition ${active ? 'bg-brand' : 'bg-line'}`}>
                    <span className={`h-6 w-6 rounded-full bg-white shadow-soft transition ${active ? 'translate-x-6' : 'translate-x-0'}`} />
                  </span>
                </button>
              )
            })}
          </div>

          <div className="grid gap-3 rounded-[1.75rem] border border-line bg-card p-4">
            {supportRows.map((row) => {
              const Icon = row.icon
              return (
                <Link className="group flex items-center gap-4 rounded-[1.35rem] border border-line bg-cloud/50 p-4 text-left transition hover:-translate-y-0.5 hover:border-brand/40" key={row.label} to="/suporte">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <Icon size={22} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <strong className="block text-base">{row.label}</strong>
                    <span className="mt-1 block text-sm font-medium text-muted">{row.text}</span>
                  </span>
                  <ChevronRight size={18} className="text-muted transition group-hover:translate-x-1 group-hover:text-brand" />
                </Link>
              )
            })}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="secondary" onClick={() => setTheme(isDark ? 'light' : 'dark')} className="w-full sm:w-auto">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
              Alternar para modo {isDark ? 'claro' : 'escuro'}
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="w-full border border-line text-coral hover:bg-coral/10 hover:text-coral sm:w-auto">
              <LogOut size={18} />
              Sair da conta
            </Button>
          </div>
        </motion.div>
      </section>
      <BottomNav mode={mode} />
    </main>
  )
}
