import { ImagePlus, LockKeyhole, SendHorizonal, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BottomNav } from '../../components/navigation/BottomNav'
import { BackButton } from '../../components/ui/BackButton'
import { Button } from '../../components/ui/Button'
import { getQuoteMessages, sendQuoteMessage } from '../../services/elloService'
import { getSession } from '../../services/session'

export function QuoteChat() {
  const { id } = useParams()
  const session = getSession()
  const [messages, setMessages] = useState([])
  const [body, setBody] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const fallback = session?.user?.role === 'professional' ? '/profissional/pedidos' : '/cliente/pedidos'
  const quickReplies = session?.user?.role === 'professional'
    ? ['Consigo atender nessa data.', 'Posso enviar uma proposta com material incluso.', 'Preciso de uma foto para estimar melhor.']
    : ['Qual o melhor horario?', 'O material esta incluso?', 'Pode me enviar o valor final?']

  useEffect(() => {
    getQuoteMessages(id).then(setMessages).catch((err) => setError(err.message))
  }, [id])

  async function submit(event) {
    event.preventDefault()
    const text = body.trim()
    if (!text) return

    setError('')
    setSending(true)
    try {
      const message = await sendQuoteMessage(id, { body: text })
      setMessages((current) => [...current, message])
      setBody('')
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="min-h-screen px-4 pb-28 pt-5 text-ink sm:px-6 md:py-8">
      <section className="mx-auto grid max-w-4xl overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/80 shadow-premium backdrop-blur-2xl">
        <header className="ios-dark-panel p-5 text-white md:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand">Conversa do pedido</p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] md:text-5xl">Chat com contexto.</h1>
              <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-white/62">
                Use esta conversa para combinar detalhes, tirar duvidas e alinhar o proximo passo.
              </p>
            </div>
            <BackButton fallback={fallback} className="border-white/10 bg-white/10 text-white hover:bg-white hover:text-ink" />
          </div>
        </header>

        <div className="grid min-h-[28rem] content-end gap-3 p-4 md:p-6">
          <div className="rounded-[1.35rem] border border-brand/20 bg-brand/8 p-4">
            <p className="flex items-center gap-2 text-sm font-extrabold text-brand">
              <LockKeyhole size={17} /> Conversa com contexto do pedido
            </p>
            <p className="mt-1 text-sm font-medium leading-6 text-muted">Mantenha combinados, valores e prazos por escrito para facilitar suporte e avaliacao depois.</p>
          </div>

          {messages.length === 0 ? (
            <div className="mx-auto max-w-sm rounded-[1.5rem] bg-brand/8 p-5 text-center">
              <p className="text-lg font-extrabold">Nenhuma mensagem ainda.</p>
              <p className="mt-2 text-sm font-medium leading-6 text-muted">Comece com uma pergunta simples sobre prazo, endereco ou material.</p>
            </div>
          ) : null}

          {messages.map((message) => {
            const mine = message.senderUserId === session?.user?.id

            return (
              <article className={`max-w-[82%] rounded-[1.35rem] px-4 py-3 shadow-soft ${mine ? 'ml-auto bg-brand text-white' : 'mr-auto bg-card text-ink'}`} key={message.id}>
                <p className={`text-xs font-extrabold uppercase tracking-[0.16em] ${mine ? 'text-white/58' : 'text-brand'}`}>
                  {mine ? 'Voce' : message.senderRole === 'professional' ? 'Profissional' : 'Cliente'}
                </p>
                <p className={`mt-1 text-sm font-semibold leading-6 ${mine ? 'text-white' : 'text-muted'}`}>{message.body}</p>
              </article>
            )
          })}
        </div>

        <div className="grid gap-2 border-t border-line bg-card px-4 py-3 md:px-5">
          <div className="flex gap-2 overflow-x-auto">
            {quickReplies.map((reply) => (
              <button
                className="shrink-0 rounded-full border border-line bg-cloud px-3 py-2 text-xs font-extrabold text-muted transition hover:border-brand/40 hover:text-brand"
                key={reply}
                onClick={() => setBody(reply)}
                type="button"
              >
                <Sparkles size={13} className="mr-1 inline text-brand" />
                {reply}
              </button>
            ))}
          </div>
        </div>

        <form className="grid gap-3 border-t border-line bg-card p-4 md:grid-cols-[auto_1fr_auto] md:p-5" onSubmit={submit}>
          <button className="flex min-h-12 items-center justify-center rounded-2xl border border-line bg-white px-4 text-brand transition hover:border-brand/40" type="button">
            <ImagePlus size={19} />
          </button>
          <label className="sr-only" htmlFor="chat-message">Mensagem</label>
          <input
            className="min-h-12 rounded-2xl border border-line bg-white px-4 text-sm font-semibold text-ink outline-none transition placeholder:text-muted/60 focus:border-brand"
            id="chat-message"
            onChange={(event) => setBody(event.target.value)}
            placeholder="Escreva uma mensagem..."
            value={body}
          />
          <Button disabled={sending || !body.trim()} type="submit">
            <SendHorizonal size={18} />
            {sending ? 'Enviando...' : 'Enviar'}
          </Button>
          {error ? <p className="text-sm font-bold text-rose-600 md:col-span-2">{error}</p> : null}
        </form>
      </section>
      <BottomNav mode={session?.user?.role === 'professional' ? 'professional' : 'client'} />
    </main>
  )
}
