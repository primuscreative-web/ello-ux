import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function BackButton({ fallback = '/', label = 'Voltar', className = '' }) {
  const navigate = useNavigate()

  function goBack() {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate(fallback)
  }

  return (
    <button
      className={`inline-flex min-h-11 items-center gap-2 rounded-2xl border border-line bg-white/86 px-4 text-sm font-extrabold text-ink shadow-soft transition hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand ${className}`}
      onClick={goBack}
      type="button"
    >
      <ArrowLeft size={17} />
      {label}
    </button>
  )
}
