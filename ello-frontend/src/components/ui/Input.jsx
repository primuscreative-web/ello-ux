export function Input({ label, helper, error, className = '', ...props }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      <span className="px-1">{label}</span>
      <input
        aria-invalid={error ? 'true' : 'false'}
        className={`min-h-12 rounded-2xl border bg-white/90 px-4 text-sm font-semibold text-ink shadow-[0_1px_0_rgba(20,33,61,0.04)] transition placeholder:font-medium placeholder:text-muted/65 focus:bg-white ${error ? 'border-rose-300 focus:border-rose-500' : 'border-line focus:border-brand'} ${className}`}
        {...props}
      />
      {error ? <span className="text-xs font-bold text-rose-600">{error}</span> : null}
      {!error && helper ? <span className="text-xs font-medium text-muted">{helper}</span> : null}
    </label>
  )
}
