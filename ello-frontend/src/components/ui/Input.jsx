export function Input({ label, helper, className = '', ...props }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-ink">
      <span>{label}</span>
      <input
        className={`min-h-12 rounded-2xl border border-line bg-white px-4 text-sm text-ink shadow-[0_1px_0_rgba(20,33,61,0.04)] transition placeholder:text-muted/70 focus:border-brand ${className}`}
        {...props}
      />
      {helper ? <span className="text-xs font-medium text-muted">{helper}</span> : null}
    </label>
  )
}
