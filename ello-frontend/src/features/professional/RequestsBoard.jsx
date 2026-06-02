import { useEffect, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { StatusPill } from '../../components/ui/StatusPill'
import { getRequests } from '../../services/elloService'

const statusTone = {
  'Novo pedido': 'brand',
  'Aguardando resposta': 'warning',
  'Orcamento enviado': 'neutral',
  Aceito: 'success',
  'Em andamento': 'brand',
  Concluido: 'success',
  Cancelado: 'danger'
}

export function RequestsBoard() {
  const [items, setItems] = useState([])

  useEffect(() => {
    getRequests().then(setItems)
  }, [])

  return (
    <main className="min-h-screen px-5 py-6 text-ink">
      <section className="mx-auto grid max-w-6xl gap-6">
        <div className="rounded-[2rem] bg-white p-5 shadow-premium md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Pedidos</p>
          <h1 className="mt-2 text-3xl font-extrabold md:text-5xl">Oportunidades e servicos.</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-muted">Acompanhe pedidos desde a chegada ate a conclusao.</p>
        </div>

        <div className="grid gap-3">
          {items.map((request) => (
            <article className="grid gap-4 rounded-[1.5rem] bg-white p-5 shadow-soft md:grid-cols-[1fr_auto] md:items-center" key={request.id}>
              <div className="grid gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill tone={statusTone[request.status]}>{request.status}</StatusPill>
                  <span className="text-xs font-bold text-muted">{request.id} - {request.date}</span>
                </div>
                <h2 className="text-xl font-extrabold">{request.service}</h2>
                <p className="text-sm font-medium text-muted">{request.client} - {request.value}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary">Detalhes</Button>
                <Button>Responder</Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
