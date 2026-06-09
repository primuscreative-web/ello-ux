import { CalendarCheck2, CheckCircle2, ImagePlus, ShieldCheck, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { BottomNav } from '../../components/navigation/BottomNav'
import { BackButton } from '../../components/ui/BackButton'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { createQuoteRequest, getProfessionalById } from '../../services/elloService'
import { getSessionToken } from '../../services/session'
import { collectErrors, getFormValues, hasErrors, required } from '../../utils/validation'

const quoteRules = {
  description: [(value) => required(value, 'Descreva o servico que voce precisa.')],
  desiredDate: [(value) => required(value, 'Informe uma data desejada.')],
  location: [(value) => required(value, 'Informe cidade e bairro.')],
  budget: [(value) => required(value, 'Informe uma faixa de investimento.')]
}

export function QuoteRequest() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [professional, setProfessional] = useState(null)
  const [loadError, setLoadError] = useState('')
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const isLogged = Boolean(getSessionToken())
  const selectedService = searchParams.get('service') || ''
  const selectedDate = searchParams.get('date') || ''
  const action = searchParams.get('action') || 'quote'
  const nextPath = `${location.pathname}${location.search}`
  const authPath = `/entrar?next=${encodeURIComponent(nextPath)}`
  const signupPath = `/cadastro/cliente?next=${encodeURIComponent(nextPath)}`
  const isDateInputValue = /^\d{4}-\d{2}-\d{2}$/.test(selectedDate)

  useEffect(() => {
    getProfessionalById(id).then(setProfessional).catch((error) => setLoadError(error.message))
  }, [id])

  async function submit(event) {
    event.preventDefault()
    if (!isLogged) {
      navigate(authPath)
      return
    }
    const values = getFormValues(event.currentTarget)
    const nextErrors = collectErrors(quoteRules, values)

    setFormError('')
    setErrors(nextErrors)
    if (hasErrors(nextErrors)) return

    setSubmitting(true)
    try {
      const quote = await createQuoteRequest({ ...values, professionalId: id })
      setSent(true)
      window.setTimeout(() => navigate(`/pedidos/${quote.id}/chat`), 700)
    } catch (error) {
      setErrors(error.errors || {})
      setFormError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (!isLogged) {
    return (
      <main className="onboarding-light min-h-screen px-5 py-6 text-ink">
        <section className="mx-auto grid max-w-xl gap-5 rounded-[2rem] border border-line bg-white p-6 shadow-premium">
          <BackButton fallback={`/p/${id}`} />
          <div className="grid gap-2">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-brandDark">Continuar agendamento</p>
            <h1 className="text-3xl font-black tracking-[-0.045em] text-[#071319]">Entre para falar com este profissional.</h1>
            <p className="text-sm font-semibold leading-6 text-[#667085]">
              A conta guarda chat, proposta, horario combinado, pagamento e avaliacao em um so lugar.
            </p>
          </div>
          {selectedService ? (
            <div className="rounded-[1.4rem] bg-cloud p-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brandDark">Pedido selecionado</p>
              <p className="mt-2 text-lg font-extrabold text-[#071319]">{selectedService}</p>
              <p className="text-sm font-bold text-[#667085]">{selectedDate || 'Data a combinar'}</p>
            </div>
          ) : null}
          <div className="grid gap-3 sm:grid-cols-2">
            <Link to={authPath}>
              <Button className="w-full">Entrar</Button>
            </Link>
            <Link to={signupPath}>
              <Button className="w-full" variant="secondary">Criar conta cliente</Button>
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-5 pb-28 pt-6 text-ink md:py-6">
      <form noValidate onSubmit={submit} className="mx-auto grid max-w-4xl gap-6 rounded-[2rem] bg-card p-5 shadow-premium md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="grid gap-2">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Solicitar orcamento</p>
            <h1 className="text-3xl font-extrabold md:text-5xl">
              {professional ? `${action === 'schedule' ? 'Agende com' : 'Converse com'} ${professional.name}.` : loadError ? 'Profissional nao encontrado.' : 'Conte o que voce precisa.'}
            </h1>
            <p className="text-sm font-medium leading-6 text-muted">
              {selectedService ? `Servico escolhido: ${selectedService}. ` : ''}
              Quanto mais claro o pedido, melhor o profissional consegue responder.
            </p>
            {loadError ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{loadError}</p> : null}
          </div>
          <BackButton fallback="/cliente/feed" />
        </div>

        <div className="grid gap-3 rounded-[1.5rem] border border-line bg-cloud/60 p-4 md:grid-cols-3">
          {[
            { icon: Sparkles, text: 'Explique o resultado esperado' },
            { icon: CalendarCheck2, text: 'Informe data e flexibilidade' },
            { icon: ShieldCheck, text: 'Combine pelo chat da ELLO' }
          ].map((item) => {
            const Icon = item.icon
            return (
              <span className="flex items-center gap-2 text-sm font-extrabold text-muted" key={item.text}>
                <Icon size={18} className="text-brand" />
                {item.text}
              </span>
            )
          })}
        </div>

        <label className="grid gap-2 text-sm font-semibold text-ink">
          <span>Descricao do servico</span>
          <textarea
            aria-invalid={errors.description ? 'true' : 'false'}
            className={`min-h-36 rounded-2xl border bg-white px-4 py-3 text-sm text-ink focus:bg-white ${errors.description ? 'border-rose-300 focus:border-rose-500' : 'border-line focus:border-brand'}`}
            name="description"
            defaultValue={selectedService ? `Tenho interesse em ${selectedService}. Quero combinar detalhes, disponibilidade e valor.` : ''}
            placeholder="Ex: preciso pintar uma sala de 20m2 com pequenos reparos na parede."
          />
          {errors.description ? <span className="text-xs font-bold text-rose-600">{errors.description}</span> : null}
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <Input error={errors.desiredDate} label="Data desejada" name="desiredDate" type="date" defaultValue={isDateInputValue ? selectedDate : ''} />
          <Input error={errors.location} label="Cidade e bairro" name="location" placeholder="Ex: Recife, Boa Viagem" />
          <Input error={errors.budget} label="Faixa de investimento" name="budget" placeholder="Ex: ate R$ 300" />
          <Input label="Preferencia de contato" name="contactPreference" placeholder="Ex: chat da ELLO, manha" defaultValue={selectedDate && !isDateInputValue ? `${selectedDate} pelo chat da ELLO` : 'Chat da ELLO'} />
        </div>

        <button className="flex min-h-24 items-center gap-4 rounded-[1.5rem] border border-dashed border-brand/40 bg-brand/5 p-4 text-left" type="button">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand shadow-soft">
            <ImagePlus size={24} />
          </span>
          <span>
            <strong className="block text-sm">Fotos ajudam no orcamento</strong>
            <span className="text-sm font-medium text-muted">Descreva as fotos no pedido para o profissional estimar melhor.</span>
          </span>
        </button>

        <Button disabled={submitting || Boolean(loadError)} type="submit" className="w-full sm:w-auto">
          {sent ? <CheckCircle2 size={18} /> : null}
          {sent ? 'Pedido enviado' : submitting ? 'Enviando pedido...' : 'Enviar pedido'}
        </Button>
        {formError ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{formError}</p> : null}
      </form>
      <BottomNav mode="client" />
    </main>
  )
}
