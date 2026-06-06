import { CalendarCheck2, CheckCircle2, ImagePlus, ShieldCheck, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BottomNav } from '../../components/navigation/BottomNav'
import { BackButton } from '../../components/ui/BackButton'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { createQuoteRequest, getProfessionalById } from '../../services/elloService'
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
  const [professional, setProfessional] = useState(null)
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    getProfessionalById(id).then(setProfessional)
  }, [id])

  async function submit(event) {
    event.preventDefault()
    const values = getFormValues(event.currentTarget)
    const nextErrors = collectErrors(quoteRules, values)

    setFormError('')
    setErrors(nextErrors)
    if (hasErrors(nextErrors)) return

    setSubmitting(true)
    try {
      await createQuoteRequest({ ...values, professionalId: id })
      setSent(true)
      window.setTimeout(() => navigate('/cliente/pedidos'), 700)
    } catch (error) {
      setErrors(error.errors || {})
      setFormError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen px-5 pb-28 pt-6 text-ink md:py-6">
      <form noValidate onSubmit={submit} className="mx-auto grid max-w-4xl gap-6 rounded-[2rem] bg-card p-5 shadow-premium md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="grid gap-2">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Solicitar orcamento</p>
            <h1 className="text-3xl font-extrabold md:text-5xl">
              {professional ? `Conte para ${professional.name} o que voce precisa.` : 'Conte o que voce precisa.'}
            </h1>
            <p className="text-sm font-medium leading-6 text-muted">Quanto mais claro o pedido, melhor o profissional consegue responder.</p>
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
            placeholder="Ex: preciso pintar uma sala de 20m2 com pequenos reparos na parede."
          />
          {errors.description ? <span className="text-xs font-bold text-rose-600">{errors.description}</span> : null}
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <Input error={errors.desiredDate} label="Data desejada" name="desiredDate" type="date" />
          <Input error={errors.location} label="Cidade e bairro" name="location" placeholder="Ex: Recife, Boa Viagem" />
          <Input error={errors.budget} label="Faixa de investimento" name="budget" placeholder="Ex: ate R$ 300" />
          <Input label="Preferencia de contato" name="contactPreference" placeholder="Ex: chat da ELLO, manha" />
        </div>

        <button className="flex min-h-24 items-center gap-4 rounded-[1.5rem] border border-dashed border-brand/40 bg-brand/5 p-4 text-left" type="button">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand shadow-soft">
            <ImagePlus size={24} />
          </span>
          <span>
            <strong className="block text-sm">Fotos ajudam no orcamento</strong>
            <span className="text-sm font-medium text-muted">Nesta primeira versao, esse anexo fica representado na interface.</span>
          </span>
        </button>

        <Button disabled={submitting} type="submit" className="w-full sm:w-auto">
          {sent ? <CheckCircle2 size={18} /> : null}
          {sent ? 'Pedido enviado' : submitting ? 'Enviando pedido...' : 'Enviar pedido'}
        </Button>
        {formError ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{formError}</p> : null}
      </form>
      <BottomNav mode="client" />
    </main>
  )
}
