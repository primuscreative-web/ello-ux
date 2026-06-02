import { ArrowRight, BriefcaseBusiness, CheckCircle2, MapPin, Sparkles } from 'lucide-react'
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
    <main className="min-h-screen overflow-hidden px-5 py-6 text-ink sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col justify-between rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-premium backdrop-blur md:grid md:grid-cols-[1fr_0.95fr] md:items-center md:gap-10 md:p-10">
        <section className="relative flex min-h-[22rem] items-center justify-center overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-brand via-brandDark to-ink p-8 text-white md:min-h-[38rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_18rem)]" />
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="relative grid w-full max-w-sm gap-6"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-white/16 backdrop-blur">
              <Icon size={40} strokeWidth={1.8} />
            </div>
            <div className="grid gap-4 rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-bold text-white/75">
                <Sparkles size={16} />
                ELLO conecta
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white p-4 text-ink shadow-soft">
                  <p className="text-xs font-bold text-muted">Cliente</p>
                  <p className="mt-2 text-lg font-extrabold leading-tight">precisa resolver</p>
                </div>
                <div className="rounded-2xl bg-coral p-4 text-white shadow-soft">
                  <p className="text-xs font-bold text-white/75">Profissional</p>
                  <p className="mt-2 text-lg font-extrabold leading-tight">quer aparecer</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="flex flex-1 flex-col justify-end gap-8 pt-8 md:justify-center md:pt-0">
          <div className="grid gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">ELLO</p>
            <motion.h1
              key={slide.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-extrabold leading-[1.02] md:text-6xl"
            >
              {slide.title}
            </motion.h1>
            <motion.p
              key={slide.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl text-base font-medium leading-7 text-muted md:text-lg"
            >
              {slide.text}
            </motion.p>
          </div>

          <div className="flex items-center gap-2">
            {onboardingSlides.map((item, index) => (
              <button
                aria-label={`Ir para ${item.title}`}
                className={`h-2.5 rounded-full transition-all ${index === active ? 'w-9 bg-brand' : 'w-2.5 bg-line'}`}
                key={item.title}
                onClick={() => setActive(index)}
              />
            ))}
          </div>

          <div className="grid gap-3 sm:max-w-sm">
            <Button onClick={next}>
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
