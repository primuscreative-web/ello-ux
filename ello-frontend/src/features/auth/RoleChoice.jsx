import { ArrowRight, BriefcaseBusiness, Search, ShieldCheck, UserRoundCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { BackButton } from '../../components/ui/BackButton'

export function RoleChoice() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen p-4 text-ink sm:p-6">
      <section className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/76 shadow-premium backdrop-blur-2xl lg:grid-cols-[0.86fr_1.14fr]">
        <div className="relative isolate overflow-hidden bg-ink p-6 text-white sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_16%,rgba(0,127,120,0.65),transparent_22rem),linear-gradient(145deg,#101a33,#045753_64%,#061225)]" />
          <div className="relative z-10 flex h-full min-h-[24rem] flex-col justify-between">
            <div className="flex items-center justify-between gap-3">
              <div className="text-3xl font-extrabold tracking-[-0.04em]">ELLO</div>
              <BackButton fallback="/" className="border-white/10 bg-white/10 text-white hover:bg-white hover:text-ink" />
            </div>
            <div className="grid gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-white/15 bg-white/10 backdrop-blur">
                <ShieldCheck size={30} />
              </div>
              <h1 className="text-balance text-5xl font-extrabold leading-[0.98] tracking-[-0.05em]">Escolha sua jornada.</h1>
              <p className="max-w-md text-sm font-medium leading-6 text-white/68">
                Cliente e profissional entram no mesmo ecossistema, mas cada um recebe uma experiencia feita para sua rotina.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[1.25rem] bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-extrabold">4.9</p>
                <p className="text-xs font-bold text-white/55">media simulada</p>
              </div>
              <div className="rounded-[1.25rem] bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-extrabold">Brasil</p>
                <p className="text-xs font-bold text-white/55">visao nacional</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid content-center gap-5 p-5 sm:p-8 lg:p-10">
          <div className="grid gap-2">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand">Comece agora</p>
            <h2 className="text-balance text-4xl font-extrabold leading-[1.04] tracking-[-0.04em] md:text-5xl">Como voce quer usar a ELLO?</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <button
              className="group grid min-h-72 gap-5 rounded-[2rem] border border-line bg-white p-6 text-left shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-premium"
              onClick={() => navigate('/cadastro/cliente')}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky text-brand">
                <Search size={28} />
              </div>
              <div>
                <h3 className="text-3xl font-extrabold tracking-[-0.04em]">Sou cliente</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-muted">Encontrar, comparar e solicitar servicos na minha cidade com informacoes claras.</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-extrabold text-brand">
                Entrar como cliente <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </span>
            </button>

            <button
              className="group grid min-h-72 gap-5 rounded-[2rem] bg-gradient-to-br from-brand to-ink p-6 text-left text-white shadow-premium transition duration-300 hover:-translate-y-1"
              onClick={() => navigate('/cadastro/profissional')}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/14 text-gold">
                <UserRoundCheck size={28} />
              </div>
              <div>
                <h3 className="text-3xl font-extrabold tracking-[-0.04em]">Sou profissional</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-white/70">Divulgar meu trabalho, receber pedidos e construir reputacao em escala nacional.</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-extrabold text-gold">
                Entrar como profissional <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </span>
            </button>
          </div>

          <div className="flex items-center gap-3 rounded-[1.5rem] bg-brand/8 p-4 text-sm font-bold text-muted">
            <BriefcaseBusiness size={18} className="text-brand" />
            <span className="flex-1">A decisao pode mudar depois, mas o cadastro inicial fica mais rapido com o caminho certo.</span>
            <button className="text-brand" onClick={() => navigate('/entrar')} type="button">Ja tenho conta</button>
          </div>
        </div>
      </section>
    </main>
  )
}
