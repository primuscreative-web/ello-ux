import { Camera, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackButton } from '../../components/ui/BackButton'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { collectErrors, getFormValues, hasErrors, matchingPassword, required, validEmail, validPassword } from '../../utils/validation'

const clientRules = {
  fullName: [(value) => required(value, 'Informe seu nome completo.')],
  birthDate: [(value) => required(value, 'Informe sua data de nascimento.')],
  city: [(value) => required(value, 'Informe sua cidade principal.')],
  email: [validEmail],
  password: [validPassword],
  confirmPassword: [(_, values) => matchingPassword(values.password, values.confirmPassword)]
}

export function ClientSignup() {
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  function submit(event) {
    event.preventDefault()
    const values = getFormValues(event.currentTarget)
    const nextErrors = collectErrors(clientRules, values)

    setErrors(nextErrors)
    if (hasErrors(nextErrors)) return

    setDone(true)
    window.setTimeout(() => navigate('/cliente/feed'), 500)
  }

  return (
    <main className="min-h-screen px-4 py-5 text-ink sm:px-6 md:py-8">
      <form noValidate onSubmit={submit} className="mx-auto grid max-w-6xl overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/82 shadow-premium backdrop-blur-2xl lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative isolate grid content-between gap-8 overflow-hidden bg-ink p-6 text-white sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(0,127,120,0.7),transparent_22rem),linear-gradient(145deg,#101a33,#055b57_65%,#071224)]" />
          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="text-3xl font-extrabold tracking-[-0.04em]">ELLO</div>
            <BackButton fallback="/comecar" className="border-white/10 bg-white/10 text-white hover:bg-white hover:text-ink" />
          </div>
          <div className="relative z-10 grid gap-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/48">Cadastro cliente</p>
            <h1 className="text-balance text-4xl font-extrabold leading-[1] tracking-[-0.045em] sm:text-5xl">Encontre servicos em qualquer cidade.</h1>
            <p className="max-w-md text-sm font-medium leading-6 text-white/68">Crie sua conta, informe sua base de atendimento e entre no feed nacional da ELLO.</p>
          </div>
          <div className="relative z-10 grid grid-cols-2 gap-3">
            <div className="rounded-[1.35rem] bg-white/10 p-4 backdrop-blur">
              <p className="text-2xl font-extrabold">1</p>
              <p className="text-xs font-bold text-white/55">cadastro curto</p>
            </div>
            <div className="rounded-[1.35rem] bg-white/10 p-4 backdrop-blur">
              <p className="text-2xl font-extrabold">Brasil</p>
              <p className="text-xs font-bold text-white/55">busca nacional</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 p-5 sm:p-8">
          <div className="grid gap-2">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand">Dados essenciais</p>
            <h2 className="text-2xl font-extrabold tracking-[-0.035em]">Vamos preparar seu acesso.</h2>
            <p className="text-sm font-medium leading-6 text-muted">Campos separados por contexto para voce entender exatamente o que esta preenchendo.</p>
          </div>

          <button className="flex min-h-24 items-center gap-4 rounded-[1.5rem] border border-dashed border-brand/40 bg-brand/5 p-4 text-left transition hover:border-brand/70 hover:bg-brand/8" type="button">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand shadow-soft">
              <Camera size={24} />
            </span>
            <span>
              <strong className="block text-sm">Foto de perfil</strong>
              <span className="text-sm font-medium text-muted">Opcional agora. Ajuda profissionais a reconhecerem seu pedido.</span>
            </span>
          </button>

          <div className="grid gap-5">
            <div className="grid gap-4 rounded-[1.6rem] border border-line bg-white p-4 md:grid-cols-2">
              <Input error={errors.fullName} label="Nome completo" name="fullName" placeholder="Seu nome completo" />
              <Input error={errors.birthDate} label="Data de nascimento" name="birthDate" type="date" />
              <Input error={errors.city} label="Cidade principal" name="city" placeholder="Ex: Sao Paulo, Recife, Curitiba" />
              <Input label="Bairro ou regiao" name="region" placeholder="Ex: Pinheiros, Boa Viagem, Batel" />
            </div>
            <div className="grid gap-4 rounded-[1.6rem] border border-line bg-white p-4 md:grid-cols-2">
              <Input error={errors.email} label="Email" name="email" type="email" placeholder="voce@email.com" />
              <Input error={errors.password} label="Senha" name="password" type="password" placeholder="Minimo 8 caracteres" />
              <Input error={errors.confirmPassword} label="Confirmar senha" name="confirmPassword" type="password" placeholder="Repita sua senha" />
              <Input label="Interesses" name="interests" placeholder="Ex: casa, beleza, eventos, transporte" />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <BackButton fallback="/comecar" label="Escolher outro perfil" className="justify-center" />
            <Button type="submit" className="w-full sm:w-auto">
              {done ? <CheckCircle2 size={18} /> : null}
              {done ? 'Cadastro criado' : 'Entrar no feed'}
            </Button>
          </div>
        </section>
      </form>
    </main>
  )
}
