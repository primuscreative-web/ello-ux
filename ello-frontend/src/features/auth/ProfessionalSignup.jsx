import { ArrowRight, Camera, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackButton } from '../../components/ui/BackButton'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { collectErrors, getFormValues, hasErrors, matchingPassword, required, validEmail, validPassword } from '../../utils/validation'

const steps = ['Conta', 'Atendimento', 'Confianca', 'Vitrine']
const stepRules = [
  {
    fullName: [(value) => required(value, 'Informe seu nome completo.')],
    birthDate: [(value) => required(value, 'Informe sua data de nascimento.')],
    specialty: [(value) => required(value, 'Informe sua area de atuacao.')],
    email: [validEmail],
    password: [validPassword],
    confirmPassword: [(_, values) => matchingPassword(values.password, values.confirmPassword)]
  },
  {
    experience: [(value) => required(value, 'Informe sua experiencia.')],
    city: [(value) => required(value, 'Informe sua cidade principal.')],
    coverage: [(value) => required(value, 'Informe onde voce atende.')]
  },
  {
    document: [(value) => required(value, 'Informe CPF ou CNPJ.')],
    phone: [(value) => required(value, 'Informe um telefone profissional.')],
    fiscalCity: [(value) => required(value, 'Informe sua cidade fiscal.')]
  },
  {
    description: [(value) => required(value, 'Descreva seu trabalho.')],
    basePrice: [(value) => required(value, 'Informe um preco base.')],
    chargeType: [(value) => required(value, 'Informe como voce cobra.')]
  }
]

export function ProfessionalSignup() {
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState({})
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const isLast = step === steps.length - 1

  function updateDraft(event) {
    const { name, value } = event.target
    if (!name) return
    setDraft((current) => ({ ...current, [name]: value }))
  }

  function submit(event) {
    event.preventDefault()
    const values = { ...draft, ...getFormValues(event.currentTarget) }
    const nextErrors = collectErrors(stepRules[step], values)

    setErrors(nextErrors)
    if (hasErrors(nextErrors)) return

    if (!isLast) {
      setStep((current) => current + 1)
      setErrors({})
      return
    }

    navigate('/profissional/central')
  }

  return (
    <main className="min-h-screen px-4 py-5 text-ink sm:px-6 md:py-8">
      <form noValidate onChange={updateDraft} onSubmit={submit} className="mx-auto grid max-w-6xl gap-0 overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/82 shadow-premium backdrop-blur-2xl lg:grid-cols-[19rem_minmax(0,1fr)]">
        <aside className="grid gap-6 bg-ink p-6 text-white sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <div className="text-3xl font-extrabold tracking-[-0.04em]">ELLO Pro</div>
            <BackButton fallback="/comecar" className="border-white/10 bg-white/10 text-white hover:bg-white hover:text-ink lg:hidden" />
          </div>
          <div className="grid gap-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/44">Cadastro profissional</p>
            <h1 className="text-balance text-4xl font-extrabold leading-[1] tracking-[-0.045em]">Sua vitrine para o Brasil.</h1>
            <p className="text-sm font-medium leading-6 text-white/62">Organize conta, atendimento, confianca e portfolio em etapas curtas.</p>
          </div>
          <div className="grid gap-2">
            {steps.map((item, index) => (
              <button
                className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-extrabold transition disabled:cursor-not-allowed ${index === step ? 'bg-white text-ink' : index < step ? 'bg-white/12 text-white' : 'text-white/42'}`}
                disabled={index > step}
                key={item}
                onClick={() => setStep(index)}
                type="button"
              >
                <span className={`flex h-7 w-7 items-center justify-center rounded-xl text-xs ${index <= step ? 'bg-brand text-white' : 'bg-white/10 text-white/50'}`}>{index + 1}</span>
                {item}
              </button>
            ))}
          </div>
        </aside>

        <section className="grid gap-6 p-5 sm:p-8">
          <div className="grid gap-2">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand">Etapa {step + 1} de {steps.length}</p>
            <h2 className="text-3xl font-extrabold tracking-[-0.04em] md:text-5xl">{steps[step]}</h2>
            <div className="grid grid-cols-4 gap-2 pt-2">
              {steps.map((item, index) => (
                <span className={`h-2 rounded-full ${index <= step ? 'bg-brand' : 'bg-line'}`} key={item} />
              ))}
            </div>
          </div>

          {step === 0 ? (
          <div className="grid gap-4 rounded-[1.6rem] border border-line bg-white p-4 md:grid-cols-2">
            <Input error={errors.fullName} label="Nome completo" name="fullName" placeholder="Seu nome completo" defaultValue={draft.fullName || ''} />
            <Input error={errors.birthDate} label="Data de nascimento" name="birthDate" type="date" defaultValue={draft.birthDate || ''} />
            <Input error={errors.specialty} label="Area de atuacao" name="specialty" placeholder="Ex: manicure, pintor, motorista" defaultValue={draft.specialty || ''} />
            <Input error={errors.email} label="Email" name="email" type="email" placeholder="voce@email.com" defaultValue={draft.email || ''} />
            <Input error={errors.password} label="Senha" name="password" type="password" placeholder="Minimo 8 caracteres" defaultValue={draft.password || ''} />
            <Input error={errors.confirmPassword} label="Confirmar senha" name="confirmPassword" type="password" placeholder="Repita sua senha" defaultValue={draft.confirmPassword || ''} />
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-4 rounded-[1.6rem] border border-line bg-white p-4 md:grid-cols-2">
            <Input error={errors.experience} label="Experiencia" name="experience" placeholder="Ex: 5 anos" defaultValue={draft.experience || ''} />
            <Input error={errors.city} label="Cidade principal" name="city" placeholder="Ex: Sao Paulo, Recife, Goiania" defaultValue={draft.city || ''} />
            <Input error={errors.coverage} label="Regioes atendidas" name="coverage" placeholder="Bairros, cidades proximas ou online" defaultValue={draft.coverage || ''} />
            <Input label="Tem materiais proprios?" name="materials" placeholder="Sim, parcialmente ou nao" defaultValue={draft.materials || ''} />
            <Input label="Disponibilidade" name="availability" placeholder="Dias e horarios principais" defaultValue={draft.availability || ''} />
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-4 rounded-[1.6rem] border border-line bg-white p-4 md:grid-cols-2">
            <Input error={errors.document} label="CPF ou CNPJ" name="document" placeholder="Digite seu documento" defaultValue={draft.document || ''} />
            <Input error={errors.phone} label="Telefone profissional" name="phone" placeholder="DDD + numero" defaultValue={draft.phone || ''} />
            <Input error={errors.fiscalCity} label="Cidade fiscal" name="fiscalCity" placeholder="Sua cidade de cadastro" defaultValue={draft.fiscalCity || ''} />
            <Input label="Nome publico" name="publicName" placeholder="Como clientes vao ver voce" defaultValue={draft.publicName || ''} />
            <Input label="Chave Pix ou banco" name="paymentKey" placeholder="Para pagamentos futuros" defaultValue={draft.paymentKey || ''} />
            <Input label="Documento de apoio" name="supportDocument" placeholder="Registro, certificado ou referencia" defaultValue={draft.supportDocument || ''} />
          </div>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-4">
            <button className="flex min-h-28 items-center gap-4 rounded-[1.5rem] border border-dashed border-brand/40 bg-brand/5 p-4 text-left" type="button">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand shadow-soft">
                <Camera size={26} />
              </span>
              <span>
                <strong className="block text-sm">Foto, banner e portfolio</strong>
                <span className="text-sm font-medium text-muted">Adicione imagens para transmitir credibilidade.</span>
              </span>
            </button>
            <div className="grid gap-4 rounded-[1.6rem] border border-line bg-white p-4 md:grid-cols-2">
              <Input error={errors.description} label="Descricao" name="description" placeholder="Conte o que voce faz melhor" defaultValue={draft.description || ''} />
              <Input error={errors.basePrice} label="Preco base" name="basePrice" placeholder="Ex: R$ 120" defaultValue={draft.basePrice || ''} />
              <Input error={errors.chargeType} label="Tipo de cobranca" name="chargeType" placeholder="por hora, diaria, metro ou atendimento" defaultValue={draft.chargeType || ''} />
              <Input label="Portfolio" name="portfolio" placeholder="Ex: antes e depois, obra finalizada" defaultValue={draft.portfolio || ''} />
            </div>
          </div>
        ) : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={() => setStep((current) => Math.max(0, current - 1))}>
              Voltar etapa
            </Button>
          ) : (
            <span />
          )}
          <Button type="submit">
            {isLast ? <CheckCircle2 size={18} /> : <ArrowRight size={18} />}
            {isLast ? 'Abrir central' : 'Continuar'}
          </Button>
        </div>
        </section>
      </form>
    </main>
  )
}
