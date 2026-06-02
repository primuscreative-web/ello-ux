import { BriefcaseBusiness, MessageCircle, Search, SlidersHorizontal, UserCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
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
    <main className="min-h-screen px-4 pb-24 pt-4 text-ink md:px-8 md:pb-10 md:pt-8">
      <div className="mx-auto grid w-full max-w-[86rem] gap-6 xl:grid-cols-[17rem_minmax(0,1fr)_19rem]">
        <aside className="hidden rounded-[2rem] bg-ink p-5 text-white shadow-premium xl:block">
          <div className="text-2xl font-extrabold tracking-[-0.04em]">ELLO</div>
          <p className="mt-3 text-sm font-medium leading-6 text-white/58">Descubra profissionais por perto com sinais de confianca antes do primeiro contato.</p>
          <div className="mt-8 grid gap-2">
            {categories.map((category) => (
              <button
                className={`rounded-2xl px-4 py-3 text-left text-sm font-extrabold transition ${activeCategory === category ? 'bg-white text-ink' : 'text-white/62 hover:bg-white/10 hover:text-white'}`}
                key={category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </aside>

        <section className="grid min-w-0 gap-5">
          <div className="sticky top-0 z-10 -mx-4 grid gap-4 border-b border-white/70 bg-white/74 px-4 py-4 backdrop-blur-2xl md:static md:mx-0 md:rounded-[2rem] md:border md:p-6 md:shadow-soft">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand">Feed</p>
                <h1 className="text-balance text-3xl font-extrabold leading-[1.02] tracking-[-0.04em] md:text-5xl">Profissionais perto de voce</h1>
              </div>
              <button className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-ink text-white shadow-soft md:flex">
                <SlidersHorizontal size={20} />
              </button>
            </div>
            <label className="flex min-h-14 items-center gap-3 rounded-2xl border border-line bg-white px-4 shadow-soft">
              <Search size={20} className="text-brand" />
              <input className="w-full bg-transparent text-sm font-bold outline-none placeholder:font-semibold placeholder:text-muted/70" placeholder="Buscar manicure, pintor, bairro..." value={search} onChange={(event) => setSearch(event.target.value)} />
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1 xl:hidden">
              {categories.map((category) => (
                <button
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-extrabold transition ${activeCategory === category ? 'bg-brand text-white shadow-[0_12px_28px_rgba(0,127,120,0.24)]' : 'bg-white text-muted shadow-[0_8px_24px_rgba(16,26,51,0.06)]'}`}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {items.map((professional) => (
              <ProfessionalCard key={professional.id} professional={professional} />
            ))}
          </div>
        </section>

        <aside className="hidden content-start gap-4 xl:grid">
          <div className="premium-surface rounded-[2rem] p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">Hoje em Macae</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.035em]">Pedidos bem descritos recebem resposta mais rapida.</h2>
            <p className="mt-3 text-sm font-medium leading-6 text-muted">Inclua fotos, bairro e prazo para receber orcamentos mais precisos.</p>
          </div>
          <div className="rounded-[2rem] bg-gradient-to-br from-brand to-ink p-5 text-white shadow-premium">
            <p className="text-sm font-bold text-white/65">ELLO protege</p>
            <p className="mt-2 text-3xl font-extrabold tracking-[-0.04em]">Confiança em cada etapa.</p>
          </div>
        </aside>
      </div>

      <nav className="fixed inset-x-4 bottom-3 z-20 grid grid-cols-4 rounded-[1.35rem] border border-white/16 bg-ink/96 p-1.5 text-[11px] font-extrabold text-white shadow-premium backdrop-blur md:hidden">
        <button className="grid justify-items-center gap-0.5 rounded-2xl bg-white px-2 py-1.5 text-ink"><Search size={16} /> Feed</button>
        <button className="grid justify-items-center gap-0.5 px-2 py-1.5 text-white/60"><BriefcaseBusiness size={16} /> Pedidos</button>
        <button className="grid justify-items-center gap-0.5 px-2 py-1.5 text-white/60"><MessageCircle size={16} /> Chat</button>
        <button className="grid justify-items-center gap-0.5 px-2 py-1.5 text-white/60"><UserCircle size={16} /> Perfil</button>
      </nav>
    </main>
  )
}
