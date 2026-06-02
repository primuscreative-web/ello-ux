import { ArrowRight, Camera, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

const steps = ['Dados', 'Perguntas', 'Confianca', 'Perfil']

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
    <main className="min-h-screen px-5 py-6 text-ink">
      <form onSubmit={submit} className="mx-auto grid max-w-4xl gap-6 rounded-[2rem] bg-white p-5 shadow-premium md:p-8">
        <div className="grid gap-3">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Cadastro profissional</p>
          <h1 className="text-3xl font-extrabold md:text-5xl">Monte sua presenca na ELLO.</h1>
          <div className="grid grid-cols-4 gap-2">
            {steps.map((item, index) => (
              <span className={`h-2 rounded-full ${index <= step ? 'bg-brand' : 'bg-line'}`} key={item} />
            ))}
          </div>
        </div>

        {step === 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Nome" placeholder="Seu nome completo" required />
            <Input label="Data de nascimento" type="date" required />
            <Input label="Area de atuacao" placeholder="Ex: manicure, pintor, motorista" required />
            <Input label="Email" type="email" placeholder="voce@email.com" required />
            <Input label="Senha" type="password" required />
            <Input label="Confirmar senha" type="password" required />
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Experiencia" placeholder="Ex: 5 anos" required />
            <Input label="Atende quais bairros?" placeholder="Cavaleiros, Centro, Imbetiba" required />
            <Input label="Tem materiais proprios?" placeholder="Sim, parcialmente ou nao" />
            <Input label="Disponibilidade" placeholder="Dias e horarios principais" />
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="CPF ou CNPJ" placeholder="Digite seu documento" required />
            <Input label="Cidade" placeholder="Macae" required />
            <Input label="Bairro" placeholder="Seu bairro principal" required />
            <Input label="Nome publico" placeholder="Como clientes vao ver voce" />
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
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Descricao" placeholder="Conte o que voce faz melhor" required />
              <Input label="Preco base" placeholder="Ex: R$ 120" required />
              <Input label="Tipo de cobranca" placeholder="por hora, diaria, metro ou atendimento" required />
              <Input label="Portfolio" placeholder="Ex: antes e depois, obra finalizada" />
            </div>
          </div>
        ) : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button type="button" variant="ghost" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>
            Voltar
          </Button>
          <Button type="submit">
            {isLast ? <CheckCircle2 size={18} /> : <ArrowRight size={18} />}
            {isLast ? 'Abrir central' : 'Continuar'}
          </Button>
        </div>
      </form>
    </main>
  )
}
