const steps = [
  { key: 'Pedido', labels: ['Novo pedido', 'Aguardando resposta'] },
  { key: 'Orcamento', labels: ['Orcamento enviado'] },
  { key: 'Aceite', labels: ['Aceito', 'Em andamento'] },
  { key: 'Final', labels: ['Concluido', 'Cancelado'] }
]

function currentIndex(status) {
  if (status === 'Cancelado') return steps.length - 1
  const index = steps.findIndex((step) => step.labels.includes(status))
  return index >= 0 ? index : 0
}

export function OrderTimeline({ status }) {
  const activeIndex = currentIndex(status)

  return (
    <div className="grid gap-2 pt-2" aria-label={`Etapa atual: ${status}`}>
      <div className="grid grid-cols-4 gap-1.5">
        {steps.map((step, index) => {
          const active = index <= activeIndex
          const canceled = status === 'Cancelado' && index === steps.length - 1

          return (
            <span
              className={`h-2 rounded-full ${canceled ? 'bg-rose-500' : active ? 'bg-brand' : 'bg-line'}`}
              key={step.key}
            />
          )
        })}
      </div>
      <div className="grid grid-cols-4 text-[10px] font-extrabold uppercase tracking-[0.12em] text-muted">
        {steps.map((step, index) => (
          <span className={index <= activeIndex ? 'text-brand' : ''} key={step.key}>
            {step.key}
          </span>
        ))}
      </div>
    </div>
  )
}
