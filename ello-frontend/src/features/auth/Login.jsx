import { CheckCircle2, LogIn } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { BackButton } from '../../components/ui/BackButton'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { getGoogleAuthUrl, login } from '../../services/elloService'
import { saveSession } from '../../services/session'
import { collectErrors, getFormValues, hasErrors, required, validEmail } from '../../utils/validation'

const loginRules = {
  email: [validEmail],
  password: [(value) => required(value, 'Informe sua senha.')]
}

function safeNextPath(value) {
  if (!value || !String(value).startsWith('/') || String(value).startsWith('//')) return ''
  return value
}

export function Login() {
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [done, setDone] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const nextPath = safeNextPath(searchParams.get('next'))

  function completeLogin(session) {
    saveSession(session)
    setDone(true)
    window.setTimeout(() => {
      navigate(nextPath || (session.user.role === 'professional' ? '/profissional/central' : '/cliente/feed'))
    }, 350)
  }

  async function submit(event) {
    event.preventDefault()
    const values = getFormValues(event.currentTarget)
    const nextErrors = collectErrors(loginRules, values)

    setFormError('')
    setErrors(nextErrors)
    if (hasErrors(nextErrors)) return

    setSubmitting(true)
    try {
      const session = await login(values)
      completeLogin(session)
    } catch (error) {
      setErrors(error.errors || {})
      setFormError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  async function enterWithGoogle() {
    setFormError('')
    setGoogleLoading(true)

    try {
      const callback = `${window.location.origin}/auth/callback${nextPath ? `?next=${encodeURIComponent(nextPath)}` : ''}`
      const { url } = await getGoogleAuthUrl(callback)
      window.location.assign(url)
    } catch (error) {
      setGoogleLoading(false)
      setFormError(error.message)
    }
  }

  return (
    <main className="min-h-screen px-4 py-5 text-ink sm:px-6 md:py-8">
      <form noValidate onSubmit={submit} className="mx-auto grid max-w-5xl overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/82 shadow-premium backdrop-blur-2xl lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative isolate grid content-between gap-8 overflow-hidden bg-[#eff9ed] p-6 text-ink sm:p-8">
          <div className="absolute inset-0 bg-[linear-gradient(145deg,#eff9ed,#ffffff_48%,#e2f6df)]" />
          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="text-3xl font-extrabold tracking-[-0.04em]">ELLO</div>
            <BackButton fallback="/comecar" className="border-line bg-white text-ink hover:border-brand/50 hover:text-brandDark" />
          </div>
          <div className="relative z-10 grid gap-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brandDark">Entrar</p>
            <h1 className="text-balance text-4xl font-extrabold leading-[1] tracking-[-0.045em] sm:text-5xl">Continue de onde parou.</h1>
            <p className="max-w-md text-sm font-medium leading-6 text-muted">Acesse sua conta para acompanhar pedidos, perfil, orcamentos e oportunidades.</p>
          </div>
          <div className="relative z-10 rounded-[1.35rem] border border-line bg-white p-4 text-sm font-semibold leading-6 text-muted shadow-soft">
            Sua conta acompanha pedidos, conversas e perfil em um so lugar.
          </div>
        </section>

        <section className="grid content-center gap-6 p-5 sm:p-8">
          <div className="grid gap-2">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand">Acesso</p>
            <h2 className="text-3xl font-extrabold tracking-[-0.04em] md:text-5xl">Entre na ELLO.</h2>
            <p className="text-sm font-medium leading-6 text-muted">
              Use o email e senha cadastrados como cliente ou profissional.
              {nextPath ? ' Depois voce volta automaticamente para concluir o agendamento.' : ''}
            </p>
          </div>

          <button
            className="flex min-h-12 w-full items-center justify-center gap-3 rounded-2xl border border-line bg-white px-5 text-sm font-extrabold text-ink shadow-soft transition hover:border-brand/50 hover:bg-cloud disabled:cursor-not-allowed disabled:opacity-60"
            disabled={googleLoading || submitting}
            onClick={enterWithGoogle}
            type="button"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/10 text-sm font-black text-brandDark">G</span>
            {googleLoading ? 'Abrindo Google...' : 'Entrar com Google'}
          </button>

          <div className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.18em] text-muted">
            <span className="h-px flex-1 bg-line" />
            ou
            <span className="h-px flex-1 bg-line" />
          </div>

          <div className="grid gap-4 rounded-[1.6rem] border border-line bg-white p-4">
            <Input error={errors.email} label="Email" name="email" placeholder="voce@email.com" type="email" />
            <Input error={errors.password} label="Senha" name="password" placeholder="Sua senha" type="password" />
          </div>

          <Button disabled={submitting} type="submit" className="w-full sm:w-auto">
            {done ? <CheckCircle2 size={18} /> : <LogIn size={18} />}
            {done ? 'Entrada confirmada' : submitting ? 'Entrando...' : 'Entrar'}
          </Button>
          {nextPath ? (
            <Link className="text-center text-sm font-extrabold text-brandDark" to={`/cadastro/cliente?next=${encodeURIComponent(nextPath)}`}>
              Criar conta cliente para continuar
            </Link>
          ) : null}
          {formError ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{formError}</p> : null}
        </section>
      </form>
    </main>
  )
}
