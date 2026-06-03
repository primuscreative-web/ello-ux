import { CheckCircle2, LogIn } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackButton } from '../../components/ui/BackButton'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { login } from '../../services/elloService'
import { saveSession } from '../../services/session'
import { collectErrors, getFormValues, hasErrors, required, validEmail } from '../../utils/validation'

const loginRules = {
  email: [validEmail],
  password: [(value) => required(value, 'Informe sua senha.')]
}

export function Login() {
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const navigate = useNavigate()

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
      saveSession(session)
      setDone(true)
      window.setTimeout(() => {
        navigate(session.user.role === 'professional' ? '/profissional/central' : '/cliente/feed')
      }, 350)
    } catch (error) {
      setErrors(error.errors || {})
      setFormError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen px-4 py-5 text-ink sm:px-6 md:py-8">
      <form noValidate onSubmit={submit} className="mx-auto grid max-w-5xl overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/82 shadow-premium backdrop-blur-2xl lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative isolate grid content-between gap-8 overflow-hidden bg-ink p-6 text-white sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(0,127,120,0.7),transparent_22rem),linear-gradient(145deg,#101a33,#055b57_65%,#071224)]" />
          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="text-3xl font-extrabold tracking-[-0.04em]">ELLO</div>
            <BackButton fallback="/comecar" className="border-white/10 bg-white/10 text-white hover:bg-white hover:text-ink" />
          </div>
          <div className="relative z-10 grid gap-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/48">Entrar</p>
            <h1 className="text-balance text-4xl font-extrabold leading-[1] tracking-[-0.045em] sm:text-5xl">Continue de onde parou.</h1>
            <p className="max-w-md text-sm font-medium leading-6 text-white/68">Acesse sua conta para acompanhar pedidos, perfil, orcamentos e oportunidades.</p>
          </div>
          <div className="relative z-10 rounded-[1.35rem] bg-white/10 p-4 text-sm font-semibold leading-6 text-white/65 backdrop-blur">
            A sessao local usa token de desenvolvimento. A proxima etapa sera trocar isso por auth de producao.
          </div>
        </section>

        <section className="grid content-center gap-6 p-5 sm:p-8">
          <div className="grid gap-2">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand">Acesso</p>
            <h2 className="text-3xl font-extrabold tracking-[-0.04em] md:text-5xl">Entre na ELLO.</h2>
            <p className="text-sm font-medium leading-6 text-muted">Use o email e senha cadastrados como cliente ou profissional.</p>
          </div>

          <div className="grid gap-4 rounded-[1.6rem] border border-line bg-white p-4">
            <Input error={errors.email} label="Email" name="email" placeholder="voce@email.com" type="email" />
            <Input error={errors.password} label="Senha" name="password" placeholder="Sua senha" type="password" />
          </div>

          <Button disabled={submitting} type="submit" className="w-full sm:w-auto">
            {done ? <CheckCircle2 size={18} /> : <LogIn size={18} />}
            {done ? 'Entrada confirmada' : submitting ? 'Entrando...' : 'Entrar'}
          </Button>
          {formError ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{formError}</p> : null}
        </section>
      </form>
    </main>
  )
}
