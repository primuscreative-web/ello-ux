import { Bell, Heart, Search, ShieldCheck, SlidersHorizontal, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BottomNav } from '../../components/navigation/BottomNav'
import { EmptyState } from '../../components/ui/EmptyState'
import { ProfessionalCardSkeleton } from '../../components/ui/Skeleton'
import { categories } from '../../data/elloData'
import { getProfessionals } from '../../services/elloService'
import { firstName, getCurrentProfile } from '../../services/currentProfile'
import { getFavoriteIds } from '../../services/localExperience'
import { ProfessionalCard } from './ProfessionalCard'

export function ClientFeed() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [search, setSearch] = useState('')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [results, setResults] = useState({ items: [], loading: true })
  const profile = getCurrentProfile()
  const { items, loading } = results
  const favoriteIds = getFavoriteIds()
  const visibleItems = favoritesOnly ? items.filter((item) => favoriteIds.includes(item.id)) : items

  function selectCategory(category) {
    setResults((current) => ({ ...current, loading: true }))
    setActiveCategory(category)
  }

  function updateSearch(value) {
    setResults((current) => ({ ...current, loading: true }))
    setSearch(value)
  }

  useEffect(() => {
    let alive = true
    getProfessionals({ search, category: activeCategory }).then((nextItems) => {
      if (!alive) return
      setResults({ items: nextItems, loading: false })
    })

    return () => {
      alive = false
    }
  }, [activeCategory, search])

  useEffect(() => {
    function syncFavorites() {
      setResults((current) => ({ ...current }))
    }

    window.addEventListener('ello:favorites-changed', syncFavorites)
    return () => window.removeEventListener('ello:favorites-changed', syncFavorites)
  }, [])

  return (
    <main className="min-h-screen px-4 pb-28 pt-4 text-ink md:px-8 md:pb-10 md:pt-8">
      <div className="mx-auto grid w-full max-w-[88rem] gap-6 xl:grid-cols-[17rem_minmax(0,1fr)_20rem]">
        <motion.aside
          animate={{ opacity: 1, x: 0 }}
          className="hidden rounded-[2rem] border border-line bg-white p-5 shadow-soft xl:block"
          initial={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-3xl font-extrabold tracking-[-0.04em] text-brandDark">ELLO</div>
          <p className="mt-3 text-sm font-medium leading-6 text-muted">Descubra profissionais no Brasil com sinais de confianca antes do primeiro contato.</p>
          <div className="mt-8 grid gap-2">
            {categories.map((category) => (
              <button
                className={`rounded-2xl px-4 py-3 text-left text-sm font-extrabold transition ${activeCategory === category ? 'bg-brand text-white shadow-soft' : 'text-muted hover:bg-cloud hover:text-ink'}`}
                key={category}
                onClick={() => selectCategory(category)}
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
            className="sticky top-0 z-10 -mx-4 grid gap-4 border-b border-line bg-white px-4 py-5 text-ink shadow-soft md:static md:mx-0 md:rounded-[2.25rem] md:border md:p-6"
            initial={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-muted">Ola, {firstName(profile.fullName)}</p>
                <h1 className="mt-1 text-balance text-3xl font-extrabold leading-[1.02] tracking-[-0.05em] md:text-5xl">O que voce precisa hoje?</h1>
              </div>
              <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-cloud text-brand shadow-soft" type="button">
                <Bell size={20} />
              </button>
            </div>

            <label className="flex min-h-14 items-center gap-3 rounded-2xl border border-line bg-cloud px-4 shadow-soft">
              <Search size={20} className="text-brand" />
              <input
                className="w-full bg-transparent text-sm font-bold text-ink outline-none placeholder:font-semibold placeholder:text-muted/60"
                onChange={(event) => updateSearch(event.target.value)}
                placeholder="Buscar servico, profissional, cidade ou bairro..."
                value={search}
              />
            </label>

            <div className="grid gap-3 rounded-[1.35rem] border border-line bg-brand/5 p-3 md:grid-cols-3">
              {[
                { icon: ShieldCheck, label: 'Profissionais com sinais de confianca' },
                { icon: Sparkles, label: 'Orcamento mais claro em poucos passos' },
                { icon: Heart, label: `${favoriteIds.length} favoritos salvos` }
              ].map((item) => {
                const Icon = item.icon
                return (
                  <span className="flex items-center gap-2 text-xs font-extrabold text-muted" key={item.label}>
                    <Icon size={16} className="text-brand" />
                    {item.label}
                  </span>
                )
              })}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <button
                  className={`shrink-0 rounded-2xl px-4 py-2 text-sm font-extrabold transition ${activeCategory === category ? 'bg-brand text-white shadow-soft' : 'bg-cloud text-muted hover:bg-brand/10 hover:text-brandDark'}`}
                  key={category}
                  onClick={() => selectCategory(category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
              <button
                className={`shrink-0 rounded-2xl px-4 py-2 text-sm font-extrabold transition ${favoritesOnly ? 'bg-coral text-white shadow-soft' : 'bg-cloud text-muted hover:bg-brand/10 hover:text-brandDark'}`}
                onClick={() => setFavoritesOnly((current) => !current)}
                type="button"
              >
                Favoritos
              </button>
            </div>
          </motion.div>

          <motion.div
            animate="show"
            className="grid gap-4 lg:grid-cols-2"
            initial="hidden"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          >
            {loading ? [0, 1, 2, 3].map((item) => (
              <ProfessionalCardSkeleton key={item} />
            )) : visibleItems.map((professional) => (
              <ProfessionalCard key={professional.id} professional={professional} />
            ))}
          </motion.div>

          {!loading && visibleItems.length === 0 ? (
            <EmptyState
              action={(
                <button
                  className="rounded-2xl bg-brand px-5 py-3 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(16,184,170,0.24)]"
                  onClick={() => {
                    setResults((current) => ({ ...current, loading: true }))
                    setFavoritesOnly(false)
                    setActiveCategory('Todos')
                    setSearch('')
                  }}
                  type="button"
                >
                  Limpar busca
                </button>
              )}
              description={favoritesOnly ? 'Toque no coracao de um profissional para salvar aqui.' : 'Tente buscar por uma categoria maior, cidade, bairro ou tipo de servico. A ELLO foi pensada para crescer no Brasil inteiro.'}
              icon={SlidersHorizontal}
              title={favoritesOnly ? 'Nenhum favorito ainda.' : 'Nenhum profissional encontrado.'}
            />
          ) : null}
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
          <div className="rounded-[2rem] bg-brand p-5 text-white shadow-premium">
            <p className="text-sm font-bold text-white/65">ELLO protege</p>
            <p className="mt-2 text-3xl font-extrabold tracking-[-0.04em]">Confianca em cada etapa.</p>
          </div>
          <div className="premium-surface rounded-[2rem] p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">Como escolher</p>
            <div className="mt-4 grid gap-3">
              {['Compare avaliacoes recentes', 'Veja prazo de resposta', 'Prefira proposta por escrito'].map((tip) => (
                <div className="flex items-center gap-3 rounded-2xl border border-line bg-card p-3" key={tip}>
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <ShieldCheck size={16} />
                  </span>
                  <span className="text-sm font-bold text-muted">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>

      <BottomNav mode="client" />
    </main>
  )
}
