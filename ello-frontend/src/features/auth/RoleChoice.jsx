import { ArrowRight, Search, UserRoundCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

export function RoleChoice() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen px-5 py-6 text-ink">
      <section className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-5xl content-center gap-6">
        <div className="grid gap-3">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Comece pela sua jornada</p>
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">Como voce quer usar a ELLO?</h1>
          <p className="max-w-2xl text-base font-medium leading-7 text-muted">
            Escolha o caminho certo agora. Voce pode explorar servicos como cliente ou montar sua presenca profissional.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <button
            className="group grid min-h-64 gap-5 rounded-[1.75rem] border border-line bg-white p-6 text-left shadow-soft transition hover:-translate-y-1 hover:shadow-premium"
            onClick={() => navigate('/cadastro/cliente')}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky text-brand">
              <Search size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold">Sou cliente</h2>
              <p className="mt-2 text-sm font-medium leading-6 text-muted">Quero encontrar, comparar e solicitar servicos perto de mim.</p>
            </div>
            <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-brand">
              Entrar como cliente <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </span>
          </button>

          <button
            className="group grid min-h-64 gap-5 rounded-[1.75rem] border border-line bg-ink p-6 text-left text-white shadow-premium transition hover:-translate-y-1"
            onClick={() => navigate('/cadastro/profissional')}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/12 text-gold">
              <UserRoundCheck size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold">Sou profissional</h2>
              <p className="mt-2 text-sm font-medium leading-6 text-white/70">Quero divulgar meu trabalho, receber pedidos e construir reputacao.</p>
            </div>
            <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-gold">
              Entrar como profissional <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </section>
    </main>
  )
}
