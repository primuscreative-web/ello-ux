import { ArrowRight, BriefcaseBusiness, CheckCircle2, MapPin, MessageCircle, ShieldCheck, Sparkles, Star, Wallet } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { onboardingSlides } from '../../data/elloData'

const visualByType = {
  client: {
    Icon: MapPin,
    eyebrow: 'Para clientes',
    color: 'from-[#e9f9e7] via-white to-[#dff4dd]',
    rows: [
      { icon: Sparkles, label: 'Servico encontrado', value: 'Agora' },
      { icon: Star, label: 'Perfil confiavel', value: 'Novo' },
      { icon: MessageCircle, label: 'Pedido enviado', value: '1 min' }
    ]
  },
  professional: {
    Icon: BriefcaseBusiness,
    eyebrow: 'Para profissionais',
    color: 'from-[#fff0dc] via-white to-[#ffe4c2]',
    rows: [
      { icon: BriefcaseBusiness, label: 'Vitrine ativa', value: 'Brasil' },
      { icon: MessageCircle, label: 'Novos pedidos', value: 'Hoje' },
      { icon: Wallet, label: 'Carteira ELLO', value: 'Pro' }
    ]
  },
  trust: {
    Icon: ShieldCheck,
    eyebrow: 'Combinado claro',
    color: 'from-[#eaf8ee] via-white to-[#fff6e9]',
    rows: [
      { icon: MessageCircle, label: 'Chat do pedido', value: 'Seguro' },
      { icon: Wallet, label: 'Pagamento', value: 'App' },
      { icon: CheckCircle2, label: 'Avaliacao final', value: 'Feito' }
    ]
  }
}

function OnboardingImage({ slide }) {
  const visual = visualByType[slide.image] || visualByType.client
  const Icon = visual.Icon

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className={`relative mx-auto aspect-[0.76] w-full max-w-[19.5rem] overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br ${visual.color} p-5 shadow-premium sm:max-w-[21rem]`}
      exit={{ opacity: 0, scale: 0.98, y: -16 }}
      initial={{ opacity: 0, scale: 0.96, y: 18 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-x-5 top-5 flex items-center justify-between">
        <span className="text-2xl font-black tracking-[-0.05em] text-ink">ELLO</span>
        <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-extrabold text-brandDark shadow-soft">
          {visual.eyebrow}
        </span>
      </div>

      <div className="absolute left-5 right-5 top-18 rounded-[1.65rem] bg-white p-4 shadow-soft">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/12 text-brandDark">
          <Icon size={28} />
        </span>
        <h2 className="mt-4 text-xl font-black leading-[1] tracking-[-0.05em] text-ink">{slide.title}</h2>
      </div>

      <div className="absolute bottom-5 left-5 right-5 grid gap-2">
        {visual.rows.map((item, index) => {
          const RowIcon = item.icon
          return (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 rounded-[1.15rem] border border-line bg-white/90 p-3 shadow-[0_10px_28px_rgba(37,49,43,0.07)]"
              initial={{ opacity: 0, x: 16 }}
              key={item.label}
              transition={{ delay: 0.12 + index * 0.05, duration: 0.28 }}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <RowIcon size={18} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-extrabold text-ink">{item.label}</span>
              </span>
              <span className="rounded-full bg-cloud px-3 py-1.5 text-xs font-extrabold text-brandDark">{item.value}</span>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export function Onboarding() {
  const [active, setActive] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const navigate = useNavigate()
  const slide = onboardingSlides[active]
  const isLast = active === onboardingSlides.length - 1

  function goNext() {
    if (isLast) {
      navigate('/comecar')
      return
    }

    setActive((current) => current + 1)
  }

  function goPrevious() {
    setActive((current) => Math.max(0, current - 1))
  }

  function handleTouchEnd(event) {
    if (touchStart === null) return
    const delta = touchStart - event.changedTouches[0].clientX

    if (delta > 42) goNext()
    if (delta < -42) goPrevious()
    setTouchStart(null)
  }

  return (
    <main className="onboarding-light min-h-screen overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4fbf1_58%,#eef8ea_100%)] px-4 py-5 text-ink sm:px-6">
      <section className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-md flex-col justify-between gap-4">
        <header className="flex items-center justify-between text-[#071319]">
          <span className="text-3xl font-black tracking-[-0.055em] text-brandDark">ELLO</span>
          <span className="rounded-full border border-line bg-white px-3 py-2 text-xs font-extrabold text-muted shadow-soft">
            Brasil
          </span>
        </header>

        <div
          className="grid flex-1 content-center"
          onTouchEnd={handleTouchEnd}
          onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
        >
          <AnimatePresence mode="wait">
            <OnboardingImage key={slide.title} slide={slide} />
          </AnimatePresence>
        </div>

        <footer className="grid gap-3 pb-2">
          <div className="grid gap-3 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                initial={{ opacity: 0, y: 10 }}
                key={slide.title}
                transition={{ duration: 0.25 }}
              >
                <h1 className="text-balance text-3xl font-black leading-[0.98] tracking-[-0.055em] text-[#071319] sm:text-4xl">{slide.title}</h1>
                <p className="mx-auto mt-2 max-w-xs text-sm font-semibold leading-6 text-[#667085] sm:text-base">{slide.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-2">
            {onboardingSlides.map((item, index) => (
              <button
                aria-label={`Ir para slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${index === active ? 'w-9 bg-brand' : 'w-2.5 bg-line'}`}
                key={item.title}
                onClick={() => setActive(index)}
                type="button"
              />
            ))}
          </div>

          <Button className="min-h-14 rounded-[1.35rem]" onClick={goNext}>
            {isLast ? 'Entrar ou cadastrar' : 'Continuar'}
            <ArrowRight size={18} />
          </Button>
        </footer>
      </section>
    </main>
  )
}
