import { ArrowRight, BriefcaseBusiness, CheckCircle2, MapPin, ShieldCheck, Sparkles, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { onboardingSlides } from '../../data/elloData'

const iconMap = {
  client: MapPin,
  professional: BriefcaseBusiness,
  trust: CheckCircle2
}

export function Onboarding() {
  const [active, setActive] = useState(0)
  const navigate = useNavigate()
  const slide = onboardingSlides[active]
  const Icon = iconMap[slide.image]

  function next() {
    if (active < onboardingSlides.length - 1) {
      setActive((current) => current + 1)
      return
    }

    navigate('/comecar')
  }

  return (
    <main className="min-h-screen overflow-hidden p-4 text-ink sm:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/70 shadow-premium backdrop-blur-2xl lg:grid-cols-[1.08fr_0.92fr]">
        <section className="relative isolate min-h-[23rem] overflow-hidden bg-ink p-5 text-white sm:min-h-[31rem] sm:p-8 lg:min-h-full lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,127,120,0.58),transparent_25rem),radial-gradient(circle_at_80%_18%,rgba(255,114,94,0.24),transparent_20rem),linear-gradient(140deg,#101a33_0%,#075e59_58%,#071224_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.12))]" />
          <div className="absolute bottom-8 left-8 right-8 hidden h-28 rounded-[2rem] border border-white/10 bg-white/8 backdrop-blur md:block" />

          <div className="relative z-10 flex h-full min-h-[22rem] flex-col justify-between sm:min-h-[30rem]">
            <div className="flex items-center justify-between">
              <div className="text-3xl font-extrabold tracking-[-0.04em]">ELLO</div>
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white/80 backdrop-blur">
                Brasil inteiro
              </div>
            </div>

            <motion.div
              key={slide.title}
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="grid gap-4 sm:gap-5"
            >
              <div className="grid max-w-lg gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-[1.15rem] border border-white/15 bg-white/12 text-white shadow-soft backdrop-blur sm:h-16 sm:w-16 sm:rounded-[1.35rem]">
                  <Icon size={26} strokeWidth={1.8} />
                </span>
                <h1 className="text-balance text-4xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                  {slide.title}
                </h1>
              </div>

              <div className="grid max-w-xl gap-3 rounded-[1.35rem] border border-white/12 bg-white/10 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:grid-cols-[1fr_auto] sm:items-center sm:rounded-[1.75rem] sm:p-4">
                <p className="text-sm font-medium leading-6 text-white/78">{slide.text}</p>
                <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm font-extrabold text-ink">
                  <Star size={16} className="fill-gold text-gold" />
                  4.9
                </div>
              </div>
            </motion.div>

            <div className="hidden gap-3 sm:grid sm:grid-cols-3">
              {[
                ['Cliente', 'Encontra rapido'],
                ['Profissional', 'Ganha vitrine'],
                ['Brasil', 'Escala nacional']
              ].map(([label, value]) => (
                <div className="rounded-[1.25rem] border border-white/10 bg-white/10 p-4 backdrop-blur" key={label}>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">{label}</p>
                  <p className="mt-2 text-lg font-extrabold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid content-between gap-5 p-5 sm:gap-8 sm:p-8 lg:p-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full bg-brand/10 px-3 py-2 text-xs font-extrabold text-brand">
              <Sparkles size={15} />
              Primeiro acesso
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-muted">
              <ShieldCheck size={15} className="text-brand" />
              Marketplace nacional
            </div>
          </div>

          <div className="grid gap-4 sm:gap-6">
            <div className="grid gap-4">
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-brand">ELLO</p>
              <h2 className="hidden text-balance text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] sm:block sm:text-5xl">
                Servicos do seu bairro com alcance de produto nacional.
              </h2>
              <p className="hidden max-w-xl text-base font-medium leading-7 text-muted sm:block">
                Uma experiencia feita para quem contrata e para quem trabalha: descoberta, reputacao e pedidos em um fluxo simples para qualquer cidade.
              </p>
            </div>

            <div className="grid gap-2 sm:gap-3">
              {onboardingSlides.map((item, index) => (
                <button
                  aria-label={`Ir para ${item.title}`}
                  className={`grid rounded-[1.1rem] border p-3 text-left transition sm:rounded-[1.35rem] sm:p-4 ${index === active ? 'border-brand bg-brand text-white shadow-[0_18px_44px_rgba(0,127,120,0.24)]' : 'border-line bg-white/80 text-ink hover:border-brand/40'}`}
                  key={item.title}
                  onClick={() => setActive(index)}
                >
                  <span className="text-sm font-extrabold">{item.title}</span>
                  <span className={`mt-1 hidden text-xs font-semibold leading-5 sm:block ${index === active ? 'text-white/72' : 'text-muted'}`}>{item.text}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            <Button onClick={next} className="min-h-14">
              {active === onboardingSlides.length - 1 ? 'Comecar' : 'Continuar'}
              <ArrowRight size={18} />
            </Button>
            <Button variant="ghost" onClick={() => navigate('/comecar')}>
              Ja tenho conta
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}
