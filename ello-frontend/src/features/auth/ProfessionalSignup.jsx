import { ArrowRight, Camera, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackButton } from '../../components/ui/BackButton'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

const steps = ['Conta', 'Atendimento', 'Confianca', 'Vitrine']

export function ProfessionalSignup() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()
  const isLast = step === steps.length - 1

  function submit(event) {
    event.preventDefault()

    if (!isLast) {
      setStep((current) => current + 1)
      return
    }

    navigate('/profissional/central')
  }

  return (
    <main className="min-h-screen px-4 py-5 text-ink sm:px-6 md:py-8">
      <form onSubmit={submit} className="mx-auto grid max-w-6xl gap-0 overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/82 shadow-premium backdrop-blur-2xl lg:grid-cols-[19rem_minmax(0,1fr)]">
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
                className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-extrabold transition ${index === step ? 'bg-white text-ink' : index < step ? 'bg-white/12 text-white' : 'text-white/42'}`}
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
            <Input label="Nome completo" placeholder="Seu nome completo" required />
            <Input label="Data de nascimento" type="date" required />
            <Input label="Area de atuacao" placeholder="Ex: manicure, pintor, motorista" required />
            <Input label="Email" type="email" placeholder="voce@email.com" required />
            <Input label="Senha" type="password" placeholder="Minimo 8 caracteres" required />
            <Input label="Confirmar senha" type="password" placeholder="Repita sua senha" required />
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-4 rounded-[1.6rem] border border-line bg-white p-4 md:grid-cols-2">
            <Input label="Experiencia" placeholder="Ex: 5 anos" required />
            <Input label="Cidade principal" placeholder="Ex: Sao Paulo, Recife, Goiania" required />
            <Input label="Regioes atendidas" placeholder="Bairros, cidades proximas ou online" required />
            <Input label="Tem materiais proprios?" placeholder="Sim, parcialmente ou nao" />
            <Input label="Disponibilidade" placeholder="Dias e horarios principais" />
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-4 rounded-[1.6rem] border border-line bg-white p-4 md:grid-cols-2">
            <Input label="CPF ou CNPJ" placeholder="Digite seu documento" required />
            <Input label="Telefone profissional" placeholder="DDD + numero" required />
            <Input label="Cidade fiscal" placeholder="Sua cidade de cadastro" required />
            <Input label="Nome publico" placeholder="Como clientes vao ver voce" />
            <Input label="Chave Pix ou banco" placeholder="Para pagamentos futuros" />
            <Input label="Documento de apoio" placeholder="Registro, certificado ou referencia" />
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
              <Input label="Descricao" placeholder="Conte o que voce faz melhor" required />
              <Input label="Preco base" placeholder="Ex: R$ 120" required />
              <Input label="Tipo de cobranca" placeholder="por hora, diaria, metro ou atendimento" required />
              <Input label="Portfolio" placeholder="Ex: antes e depois, obra finalizada" />
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
