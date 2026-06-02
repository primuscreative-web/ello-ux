const toneMap = {
  neutral: 'bg-cloud text-muted',
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-rose-50 text-rose-700',
  brand: 'bg-brand/10 text-brand'
}

export function StatusPill({ children, tone = 'neutral' }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${toneMap[tone]}`}>
      {children}
    </span>
  )
}
