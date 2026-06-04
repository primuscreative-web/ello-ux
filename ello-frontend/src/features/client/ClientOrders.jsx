import { MessageCircle, SearchCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BottomNav } from '../../components/navigation/BottomNav'
import { BackButton } from '../../components/ui/BackButton'
import { StatusPill } from '../../components/ui/StatusPill'
import { getRequests } from '../../services/elloService'

const statusTone = {
  'Novo pedido': 'brand',
  'Orcamento enviado': 'success',
  Aceito: 'success',
  Cancelado: 'danger'
}

export function ClientOrders() {
  const [items, setItems] = useState([])

  useEffect(() => {
    getRequests().then(setItems)
  }, [])

  return (
    <main className="min-h-screen px-4 pb-28 pt-5 text-ink sm:px-6 md:py-8">
      <section className="mx-auto grid max-w-5xl gap-5">
        <div className="ios-dark-panel rounded-[2.25rem] p-6 text-white shadow-premium md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand">Cliente</p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.05em] md:text-6xl">Meus pedidos.</h1>
              <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-white/62">
                Acompanhe orcamentos enviados, respostas dos profissionais e proximas etapas.
              </p>
            </div>
            <BackButton fallback="/cliente/feed" className="border-white/10 bg-white/10 text-white hover:bg-white hover:text-ink" />
          </div>
        </div>

        <div className="grid gap-3">
          {items.map((request) => (
            <article className="premium-surface grid gap-4 rounded-[1.6rem] p-5 md:grid-cols-[1fr_auto] md:items-center" key={request.id}>
              <div className="grid gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill tone={statusTone[request.status] || 'neutral'}>{request.status}</StatusPill>
                  <span className="text-xs font-bold text-muted">{request.professionalName || 'Profissional ELLO'} - {request.date}</span>
                </div>
                <h2 className="text-xl font-extrabold">{request.service}</h2>
                <p className="text-sm font-medium text-muted">Local: {request.client}</p>
                {request.responseMessage ? (
                  <div className="mt-2 rounded-[1.25rem] bg-brand/8 p-4">
                    <p className="text-sm font-extrabold text-brand">{request.value} - {request.responseEta}</p>
                    <p className="mt-1 text-sm font-medium leading-6 text-muted">{request.responseMessage}</p>
                  </div>
                ) : (
                  <p className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-muted">
                    <SearchCheck size={17} className="text-brand" />
                    Aguardando resposta do profissional.
                  </p>
                )}
              </div>
              <Link
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-line bg-white/90 px-5 text-sm font-extrabold tracking-[-0.01em] text-ink shadow-[0_10px_28px_rgba(7,19,25,0.08)] transition duration-200 hover:-translate-y-0.5 hover:border-brand/50 hover:bg-white"
                to={`/pedidos/${request.id}/chat`}
              >
                <MessageCircle size={18} /> Conversar
              </Link>
            </article>
          ))}

          {items.length === 0 ? (
            <div className="premium-surface rounded-[1.6rem] p-6 text-center">
              <p className="text-xl font-extrabold">Nenhum pedido ainda.</p>
              <p className="mt-2 text-sm font-medium text-muted">Quando voce solicitar um orcamento, ele aparece aqui.</p>
            </div>
          ) : null}
        </div>
      </section>
      <BottomNav mode="client" />
    </main>
  )
}
