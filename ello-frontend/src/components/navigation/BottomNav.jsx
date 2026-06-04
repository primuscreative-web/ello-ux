import { BriefcaseBusiness, Home, MessageCircle, Plus, Settings, Store, UserRound } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const navByMode = {
  client: [
    { label: 'Inicio', href: '/cliente/feed', icon: Home },
    { label: 'Pedidos', href: '/cliente/pedidos', icon: BriefcaseBusiness },
    { label: 'Pedir', href: '/cliente/feed', icon: Plus, featured: true },
    { label: 'Chat', href: '/cliente/pedidos', icon: MessageCircle },
    { label: 'Ajustes', href: '/cliente/configuracoes', icon: Settings }
  ],
  professional: [
    { label: 'Central', href: '/profissional/central', icon: Store },
    { label: 'Pedidos', href: '/profissional/pedidos', icon: BriefcaseBusiness },
    { label: 'Perfil', href: '/profissional/perfil', icon: UserRound, featured: true },
    { label: 'Chat', href: '/profissional/pedidos', icon: MessageCircle },
    { label: 'Ajustes', href: '/profissional/configuracoes', icon: Settings }
  ]
}

function isActive(pathname, item, mode) {
  if (item.featured) return pathname === item.href
  if (item.label === 'Chat') return pathname.includes('/chat')
  if (mode === 'client' && item.href === '/cliente/pedidos') return pathname === item.href
  if (mode === 'professional' && item.href === '/profissional/pedidos') return pathname === item.href
  return pathname === item.href
}

export function BottomNav({ mode = 'client' }) {
  const { pathname } = useLocation()
  const items = navByMode[mode] || navByMode.client

  return (
    <nav className="ios-tabbar fixed inset-x-4 bottom-3 z-20 grid grid-cols-5 rounded-[1.55rem] p-1.5 text-[10px] font-extrabold text-white md:hidden">
      {items.map((item) => {
        const Icon = item.icon
        const active = isActive(pathname, item, mode)

        if (item.featured) {
          return (
            <Link className="-mt-5 grid justify-items-center gap-0.5 text-white" key={item.label} to={item.href}>
              <span className={`flex h-14 w-14 items-center justify-center rounded-full shadow-[0_18px_42px_rgba(16,184,170,0.38)] transition ${active ? 'bg-white text-brand' : 'bg-gradient-to-br from-brand to-sky text-ink'}`}>
                <Icon size={28} />
              </span>
              <span className="sr-only">{item.label}</span>
            </Link>
          )
        }

        return (
          <Link
            className={`grid justify-items-center gap-0.5 rounded-2xl px-2 py-1.5 transition ${active ? 'bg-brand text-white' : 'text-white/58 hover:bg-white/8 hover:text-white'}`}
            key={item.label}
            to={item.href}
          >
            <Icon size={16} />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
