import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BackButton } from '../../components/ui/BackButton'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { StatusPill } from '../../components/ui/StatusPill'
import { getRequests, respondToQuote } from '../../services/elloService'

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
  const [activeId, setActiveId] = useState('')
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    getRequests().then(setItems)
  }, [])

  async function submitResponse(event, requestId) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const payload = Object.fromEntries(form.entries())

    setFormError('')
    setSubmitting(true)
    try {
      const quote = await respondToQuote(requestId, payload)
      setItems((current) => current.map((item) => (
        item.id === requestId
          ? {
              ...item,
              status: quote.status,
              value: quote.responsePrice,
              responseEta: quote.responseEta,
              responseMessage: quote.responseMessage
            }
          : item
      )))
      setActiveId('')
    } catch (error) {
      setFormError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen px-5 py-6 text-ink">
      <section className="mx-auto grid max-w-6xl gap-6">
        <div className="flex flex-col gap-4 rounded-[2rem] bg-white p-5 shadow-premium md:flex-row md:items-start md:justify-between md:p-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Pedidos</p>
            <h1 className="mt-2 text-3xl font-extrabold md:text-5xl">Oportunidades e servicos.</h1>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-muted">Acompanhe pedidos desde a chegada ate a conclusao.</p>
          </div>
          <BackButton fallback="/profissional/central" />
        </div>

        <div className="grid gap-3">
          {items.map((request) => (
            <article className="grid gap-4 rounded-[1.5rem] bg-white p-5 shadow-soft" key={request.id}>
              <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                <div className="grid gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusPill tone={statusTone[request.status]}>{request.status}</StatusPill>
                    <span className="text-xs font-bold text-muted">{request.id} - {request.date}</span>
                  </div>
                  <h2 className="text-xl font-extrabold">{request.service}</h2>
                  <p className="text-sm font-medium text-muted">{request.client} - {request.value}</p>
                  {request.responseMessage ? (
                    <p className="rounded-2xl bg-brand/8 px-4 py-3 text-sm font-semibold text-muted">
                      {request.responseMessage} Prazo: {request.responseEta}.
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-line bg-white/90 px-5 text-sm font-extrabold tracking-[-0.01em] text-ink shadow-[0_10px_28px_rgba(7,19,25,0.08)] transition duration-200 hover:-translate-y-0.5 hover:border-brand/50 hover:bg-white"
                    to={`/pedidos/${request.id}/chat`}
                  >
                    Chat
                  </Link>
                  <Button onClick={() => setActiveId((current) => (current === request.id ? '' : request.id))}>
                    {activeId === request.id ? 'Fechar' : 'Responder'}
                  </Button>
                </div>
              </div>

              {activeId === request.id ? (
                <form className="grid gap-4 rounded-[1.35rem] border border-line bg-cloud/70 p-4 md:grid-cols-3" onSubmit={(event) => submitResponse(event, request.id)}>
                  <Input label="Valor" name="responsePrice" placeholder="Ex: R$ 180" />
                  <Input label="Prazo" name="responseEta" placeholder="Ex: amanha as 14h" />
                  <Input label="Mensagem" name="responseMessage" placeholder="Explique sua proposta" />
                  <div className="md:col-span-3">
                    <Button disabled={submitting} type="submit" className="w-full md:w-auto">
                      {submitting ? 'Enviando...' : 'Enviar orcamento'}
                    </Button>
                    {formError ? <p className="mt-3 text-sm font-bold text-rose-600">{formError}</p> : null}
                  </div>
                </form>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
