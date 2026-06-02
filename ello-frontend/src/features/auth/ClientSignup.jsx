import { Camera, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export function ClientSignup() {
  const [done, setDone] = useState(false)
  const navigate = useNavigate()

  function submit(event) {
    event.preventDefault()
    setDone(true)
    window.setTimeout(() => navigate('/cliente/feed'), 500)
  }

  return (
    <main className="min-h-screen px-5 py-6 text-ink">
      <form onSubmit={submit} className="mx-auto grid max-w-3xl gap-6 rounded-[2rem] bg-white p-5 shadow-premium md:p-8">
        <div className="grid gap-2">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Cadastro cliente</p>
          <h1 className="text-3xl font-extrabold md:text-5xl">Seu acesso para encontrar servicos.</h1>
          <p className="text-sm font-medium leading-6 text-muted">Cadastro curto para entrar direto no feed de profissionais.</p>
        </div>

        <button className="flex min-h-28 items-center gap-4 rounded-[1.5rem] border border-dashed border-brand/40 bg-brand/5 p-4 text-left" type="button">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand shadow-soft">
            <Camera size={26} />
          </span>
          <span>
            <strong className="block text-sm">Foto de perfil</strong>
            <span className="text-sm font-medium text-muted">Adicione agora ou complete depois.</span>
          </span>
        </button>

        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Nome" placeholder="Seu nome completo" required />
          <Input label="Data de nascimento" type="date" required />
          <Input label="Email" type="email" placeholder="voce@email.com" required />
          <Input label="Senha" type="password" placeholder="Minimo 8 caracteres" required />
          <Input label="Confirmar senha" type="password" placeholder="Repita sua senha" required />
          <Input label="Bio curta" placeholder="Ex: moro em Macae e busco servicos para casa" />
        </div>

        <Button type="submit" className="w-full md:w-auto">
          {done ? <CheckCircle2 size={18} /> : null}
          {done ? 'Cadastro criado' : 'Entrar no feed'}
        </Button>
      </form>
    </main>
  )
}
