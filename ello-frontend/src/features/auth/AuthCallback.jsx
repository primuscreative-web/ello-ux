import { CheckCircle2, Loader2, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { getCurrentUserWithToken } from '../../services/elloService'
import { saveSession } from '../../services/session'

function readAccessToken() {
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''))
  const query = new URLSearchParams(window.location.search)
  return hash.get('access_token') || query.get('access_token') || ''
}

function safeNextPath(value) {
  if (!value || !String(value).startsWith('/') || String(value).startsWith('//')) return ''
  return value
}

export function AuthCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const nextPath = safeNextPath(searchParams.get('next'))
  const [state, setState] = useState({ status: 'loading', message: 'Confirmando acesso com Google...' })

  useEffect(() => {
    let alive = true

    async function finishGoogleLogin() {
      const token = readAccessToken()

      if (!token) {
        setState({ status: 'error', message: 'Nao encontramos a confirmacao do Google. Tente entrar novamente.' })
        return
      }

      try {
        const { user } = await getCurrentUserWithToken(token)
        if (!alive) return
        saveSession({ token, user })
        setState({ status: 'success', message: 'Entrada confirmada.' })
        window.setTimeout(() => {
          navigate(nextPath || (user.role === 'professional' ? '/profissional/central' : '/cliente/feed'), { replace: true })
        }, 450)
      } catch {
        if (!alive) return
        setState({
          status: 'needsProfile',
          message: 'Google conectado. Agora escolha se voce entra como cliente ou profissional para criar seu perfil ELLO.'
        })
      }
    }

    finishGoogleLogin()
    return () => {
      alive = false
    }
  }, [navigate, nextPath])

  const Icon = state.status === 'loading' ? Loader2 : state.status === 'success' ? CheckCircle2 : UserPlus

  return (
    <main className="grid min-h-screen place-items-center px-4 py-8 text-ink">
      <section className="grid max-w-md gap-5 rounded-[2rem] border border-line bg-white p-6 text-center shadow-premium">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
          <Icon size={26} className={state.status === 'loading' ? 'animate-spin' : ''} />
        </span>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand">Google</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em]">Acesso ELLO</h1>
          <p className="mt-2 text-sm font-semibold leading-6 text-muted">{state.message}</p>
        </div>
        {state.status === 'needsProfile' || state.status === 'error' ? (
          <div className="grid gap-3">
            <Button className="w-full" onClick={() => navigate('/comecar', { replace: true })}>
              Escolher cadastro
            </Button>
            <Link className="text-sm font-extrabold text-brandDark" to="/entrar">Voltar para login</Link>
          </div>
        ) : null}
      </section>
    </main>
  )
}
