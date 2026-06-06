import { BadgeCheck, Camera, CheckCircle2, Clock, ImagePlus, ShieldCheck, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { BottomNav } from '../../components/navigation/BottomNav'
import { BackButton } from '../../components/ui/BackButton'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { trustChecklist } from '../../data/elloData'

export function ProfessionalProfileEditor() {
  const [saved, setSaved] = useState(false)

  function submit(event) {
    event.preventDefault()
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1400)
  }

  return (
    <main className="min-h-screen px-5 pb-28 pt-6 text-ink md:py-6">
      <form onSubmit={submit} className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="grid gap-6 rounded-[2rem] bg-card p-5 shadow-premium md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="grid gap-2">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Perfil profissional</p>
              <h1 className="text-3xl font-extrabold tracking-[-0.04em] md:text-5xl">Ajuste sua vitrine nacional.</h1>
              <p className="max-w-2xl text-sm font-medium leading-6 text-muted">Organize identidade publica, area de atendimento, portfolio e precos para clientes entenderem rapidamente seu trabalho.</p>
            </div>
            <BackButton fallback="/profissional/central" />
          </div>

          <div className="grid gap-4 md:grid-cols-[18rem_1fr]">
            <button className="flex min-h-72 flex-col items-center justify-center gap-3 rounded-[1.75rem] border border-dashed border-brand/40 bg-brand/5 text-center transition hover:bg-brand/10" type="button">
              <Camera size={32} className="text-brand" />
              <span className="text-sm font-bold">Foto, banner e galeria</span>
              <span className="max-w-44 text-xs font-medium text-muted">Upload real entra quando conectarmos o Storage oficial.</span>
            </button>

            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Nome publico" defaultValue="Ana Martins" />
              <Input label="Categoria" defaultValue="Beleza" />
              <Input label="Servicos oferecidos" defaultValue="Manicure, alongamento e acabamento" />
              <Input label="Tipo de cobranca" defaultValue="por atendimento" />
              <Input label="Preco base" defaultValue="R$ 45" />
              <Input label="Cidade base" defaultValue="Sao Paulo" />
              <Input label="Regioes atendidas" defaultValue="Pinheiros, Jardins, online" />
              <Input label="Tempo medio de resposta" defaultValue="20 min" />
            </div>
          </div>

          <label className="grid gap-2 text-sm font-semibold text-ink">
            <span>Descricao</span>
            <textarea className="min-h-32 rounded-2xl border border-line bg-card px-4 py-3 text-sm text-ink focus:border-brand" defaultValue="Especialista em unhas naturais, alongamento e acabamento delicado para eventos e rotina." />
          </label>

          <div className="grid gap-4 md:grid-cols-3">
            {['Unhas gel minimalistas', 'Francesinha premium', 'Antes e depois'].map((item) => (
              <button className="min-h-32 rounded-[1.5rem] border border-line bg-cloud/70 p-4 text-left transition hover:border-brand/40" key={item} type="button">
                <ImagePlus size={22} className="text-brand" />
                <span className="mt-4 block text-sm font-extrabold">{item}</span>
                <span className="mt-1 block text-xs font-semibold text-muted">Slot de portfolio</span>
              </button>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Disponibilidade principal" defaultValue="Hoje, 14h as 19h" />
            <Input label="Materiais incluidos" defaultValue="Base, acabamento e higienizacao" />
            <Input label="Documento profissional" defaultValue="Enviado para verificacao" />
            <Input label="Chave de pagamento" defaultValue="Configurar depois" />
          </div>

          <Button type="submit" className="w-full sm:w-auto">
            {saved ? <CheckCircle2 size={18} /> : null}
            {saved ? 'Alteracoes salvas' : 'Salvar perfil'}
          </Button>
        </section>

        <aside className="grid content-start gap-4">
          <div className="ios-dark-panel rounded-[2rem] p-5 text-white shadow-premium">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Previa publica</p>
            <div className="mt-5 flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-ink text-sm font-extrabold">AM</span>
              <div>
                <p className="text-xl font-extrabold">Ana Martins</p>
                <p className="text-sm font-bold text-white/55">Beleza - Sao Paulo</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              <p className="flex items-center gap-2 text-sm font-bold text-white/70"><BadgeCheck size={17} className="text-brand" /> Documento em analise</p>
              <p className="flex items-center gap-2 text-sm font-bold text-white/70"><Clock size={17} className="text-brand" /> Responde em 20 min</p>
              <p className="flex items-center gap-2 text-sm font-bold text-white/70"><Sparkles size={17} className="text-brand" /> Portfolio com 3 exemplos</p>
            </div>
          </div>

          <div className="premium-surface rounded-[1.7rem] p-5">
            <p className="flex items-center gap-2 text-sm font-extrabold text-brand">
              <ShieldCheck size={18} /> Checklist de publicacao
            </p>
            <div className="mt-4 grid gap-2">
              {trustChecklist.map((item) => (
                <div className="flex items-center gap-3 rounded-2xl border border-line bg-card p-3" key={item.label}>
                  <CheckCircle2 size={18} className={item.done ? 'text-brand' : 'text-muted/45'} />
                  <span className="text-sm font-bold text-muted">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </form>
      <BottomNav mode="professional" />
    </main>
  )
}
