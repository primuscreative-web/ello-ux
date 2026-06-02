import { BriefcaseBusiness, MessageCircle, Search, UserCircle } from 'lucide-react'
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
    <main className="min-h-screen px-4 pb-24 pt-5 text-ink md:px-8 md:pb-8">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[18rem_1fr]">
        <aside className="hidden rounded-[1.75rem] bg-white p-5 shadow-soft md:block">
          <h2 className="text-lg font-extrabold">Filtros</h2>
          <div className="mt-4 grid gap-2">
            {categories.map((category) => (
              <button
                className={`rounded-2xl px-4 py-3 text-left text-sm font-bold ${activeCategory === category ? 'bg-brand text-white' : 'bg-cloud text-muted'}`}
                key={category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </aside>

        <section className="grid gap-5">
          <div className="sticky top-0 z-10 grid gap-4 bg-cloud/80 py-2 backdrop-blur md:static md:bg-transparent">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Feed</p>
              <h1 className="text-3xl font-extrabold md:text-5xl">Profissionais perto de voce</h1>
            </div>
            <label className="flex min-h-14 items-center gap-3 rounded-2xl bg-white px-4 shadow-soft">
              <Search size={20} className="text-muted" />
              <input className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-muted" placeholder="Buscar manicure, pintor, bairro..." value={search} onChange={(event) => setSearch(event.target.value)} />
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1 md:hidden">
              {categories.map((category) => (
                <button
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${activeCategory === category ? 'bg-brand text-white' : 'bg-white text-muted'}`}
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
      </div>

      <nav className="fixed inset-x-4 bottom-2 z-20 grid grid-cols-4 rounded-[1.25rem] bg-ink p-1 text-[11px] font-bold text-white shadow-premium md:hidden">
        <button className="grid justify-items-center gap-0.5 rounded-2xl bg-white px-2 py-1.5 text-ink"><Search size={16} /> Feed</button>
        <button className="grid justify-items-center gap-0.5 px-2 py-1.5 text-white/60"><BriefcaseBusiness size={16} /> Pedidos</button>
        <button className="grid justify-items-center gap-0.5 px-2 py-1.5 text-white/60"><MessageCircle size={16} /> Chat</button>
        <button className="grid justify-items-center gap-0.5 px-2 py-1.5 text-white/60"><UserCircle size={16} /> Perfil</button>
      </nav>
    </main>
  )
}
