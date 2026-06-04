import { Bell, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BottomNav } from '../../components/navigation/BottomNav'
import { categories } from '../../data/elloData'
import { getProfessionals } from '../../services/elloService'
import { ProfessionalCard } from './ProfessionalCard'

export function ClientFeed() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [search, setSearch] = useState('')
  const [items, setItems] = useState([])

  useEffect(() => {
    getProfessionals({ search, category: activeCategory }).then(setItems)
  }, [activeCategory, search])

  return (
    <main className="min-h-screen px-4 pb-28 pt-4 text-ink md:px-8 md:pb-10 md:pt-8">
      <div className="mx-auto grid w-full max-w-[88rem] gap-6 xl:grid-cols-[17rem_minmax(0,1fr)_20rem]">
        <motion.aside
          animate={{ opacity: 1, x: 0 }}
          className="ios-dark-panel hidden rounded-[2rem] p-5 text-white xl:block"
          initial={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-3xl font-extrabold tracking-[-0.06em]">ELLO</div>
          <p className="mt-3 text-sm font-medium leading-6 text-white/58">Descubra profissionais no Brasil com sinais de confianca antes do primeiro contato.</p>
          <div className="mt-8 grid gap-2">
            {categories.map((category) => (
              <button
                className={`rounded-2xl px-4 py-3 text-left text-sm font-extrabold transition ${activeCategory === category ? 'bg-brand text-white shadow-[0_14px_34px_rgba(16,184,170,0.25)]' : 'text-white/62 hover:bg-white/10 hover:text-white'}`}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </motion.aside>

        <section className="grid min-w-0 gap-5">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-0 z-10 -mx-4 grid gap-4 border-b border-white/10 bg-ink px-4 py-5 text-white shadow-premium md:static md:mx-0 md:rounded-[2.25rem] md:border md:p-6"
            initial={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white/62">Ola, Ana</p>
                <h1 className="mt-1 text-balance text-3xl font-extrabold leading-[1.02] tracking-[-0.05em] md:text-5xl">O que voce precisa hoje?</h1>
              </div>
              <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-white shadow-soft" type="button">
                <Bell size={20} />
              </button>
            </div>

            <label className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 shadow-soft backdrop-blur">
              <Search size={20} className="text-brand" />
              <input
                className="w-full bg-transparent text-sm font-bold text-white outline-none placeholder:font-semibold placeholder:text-white/45"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar servico, profissional, cidade ou bairro..."
                value={search}
              />
            </label>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <button
                  className={`shrink-0 rounded-2xl px-4 py-2 text-sm font-extrabold transition ${activeCategory === category ? 'bg-brand text-white shadow-[0_12px_28px_rgba(16,184,170,0.28)]' : 'bg-white/8 text-white/62 hover:bg-white/14 hover:text-white'}`}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            animate="show"
            className="grid gap-4 lg:grid-cols-2"
            initial="hidden"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          >
            {items.map((professional) => (
              <ProfessionalCard key={professional.id} professional={professional} />
            ))}
          </motion.div>
        </section>

        <motion.aside
          animate={{ opacity: 1, x: 0 }}
          className="hidden content-start gap-4 xl:grid"
          initial={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        >
          <div className="premium-surface rounded-[2rem] p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">Brasil hoje</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.035em]">Pedidos bem descritos recebem resposta mais rapida.</h2>
            <p className="mt-3 text-sm font-medium leading-6 text-muted">Inclua fotos, cidade, regiao e prazo para receber orcamentos mais precisos.</p>
          </div>
          <div className="animated-glow rounded-[2rem] bg-gradient-to-br from-brand to-ink p-5 text-white shadow-premium">
            <p className="text-sm font-bold text-white/65">ELLO protege</p>
            <p className="mt-2 text-3xl font-extrabold tracking-[-0.04em]">Confianca em cada etapa.</p>
          </div>
        </motion.aside>
      </div>

      <BottomNav mode="client" />
    </main>
  )
}
