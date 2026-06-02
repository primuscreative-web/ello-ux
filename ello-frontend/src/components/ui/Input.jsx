export function Input({ label, helper, className = '', ...props }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      <span className="px-1">{label}</span>
      <input
        className={`min-h-12 rounded-2xl border border-line bg-white/90 px-4 text-sm font-semibold text-ink shadow-[0_1px_0_rgba(20,33,61,0.04)] transition placeholder:font-medium placeholder:text-muted/65 focus:border-brand focus:bg-white ${className}`}
        {...props}
      />
      {helper ? <span className="text-xs font-medium text-muted">{helper}</span> : null}
    </label>
  )
}
