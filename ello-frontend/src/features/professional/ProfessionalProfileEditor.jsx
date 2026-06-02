import { Camera, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { BackButton } from '../../components/ui/BackButton'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export function ProfessionalProfileEditor() {
  const [saved, setSaved] = useState(false)

  function submit(event) {
    event.preventDefault()
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1200)
  }

  return (
    <main className="min-h-screen px-5 py-6 text-ink">
      <form onSubmit={submit} className="mx-auto grid max-w-5xl gap-6 rounded-[2rem] bg-white p-5 shadow-premium md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="grid gap-2">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Perfil profissional</p>
            <h1 className="text-3xl font-extrabold md:text-5xl">Ajuste sua vitrine nacional.</h1>
            <p className="max-w-2xl text-sm font-medium leading-6 text-muted">Organize identidade publica, area de atendimento, portfolio e precos para clientes entenderem rapidamente seu trabalho.</p>
          </div>
          <BackButton fallback="/profissional/central" />
        </div>

        <div className="grid gap-4 md:grid-cols-[18rem_1fr]">
          <button className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-[1.75rem] border border-dashed border-brand/40 bg-brand/5 text-center" type="button">
            <Camera size={32} className="text-brand" />
            <span className="text-sm font-bold">Foto, banner e galeria</span>
            <span className="max-w-44 text-xs font-medium text-muted">Interface preparada para uploads na proxima etapa.</span>
          </button>

          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Nome publico" defaultValue="Ana Martins" />
            <Input label="Categoria" defaultValue="Beleza" />
            <Input label="Servicos oferecidos" defaultValue="Manicure, alongamento e acabamento" />
            <Input label="Tipo de cobranca" defaultValue="por atendimento" />
            <Input label="Preco base" defaultValue="R$ 45" />
            <Input label="Cidade base" defaultValue="Sao Paulo" />
            <Input label="Regioes atendidas" defaultValue="Pinheiros, Jardins, online" />
            <Input label="Portfolio" defaultValue="Unhas gel, francesinha, antes e depois" />
          </div>
        </div>

        <label className="grid gap-2 text-sm font-semibold text-ink">
          <span>Descricao</span>
          <textarea className="min-h-32 rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink focus:border-brand" defaultValue="Especialista em unhas naturais, alongamento e acabamento delicado para eventos e rotina." />
        </label>

        <Button type="submit" className="w-full sm:w-auto">
          {saved ? <CheckCircle2 size={18} /> : null}
          {saved ? 'Alteracoes salvas' : 'Salvar perfil'}
        </Button>
      </form>
    </main>
  )
}
