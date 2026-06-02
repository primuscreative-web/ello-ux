import { CheckCircle2, ImagePlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BackButton } from '../../components/ui/BackButton'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { getProfessionalById } from '../../services/elloService'

export function QuoteRequest() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [professional, setProfessional] = useState(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    getProfessionalById(id).then(setProfessional)
  }, [id])

  function submit(event) {
    event.preventDefault()
    setSent(true)
    window.setTimeout(() => navigate('/cliente/feed'), 700)
  }

  return (
    <main className="min-h-screen px-5 py-6 text-ink">
      <form onSubmit={submit} className="mx-auto grid max-w-3xl gap-6 rounded-[2rem] bg-white p-5 shadow-premium md:p-8">
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

        <label className="grid gap-2 text-sm font-semibold text-ink">
          <span>Descricao do servico</span>
          <textarea className="min-h-36 rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink focus:border-brand" placeholder="Ex: preciso pintar uma sala de 20m2 com pequenos reparos na parede." required />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Data desejada" type="date" required />
          <Input label="Cidade e bairro" placeholder="Ex: Recife, Boa Viagem" required />
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

        <Button type="submit" className="w-full sm:w-auto">
          {sent ? <CheckCircle2 size={18} /> : null}
          {sent ? 'Pedido enviado' : 'Enviar pedido'}
        </Button>
      </form>
    </main>
  )
}
