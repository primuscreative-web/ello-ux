const variants = {
  primary: 'bg-brand text-white shadow-soft hover:bg-brandDark',
  secondary: 'bg-white text-ink border border-line hover:border-brand/50',
  ghost: 'bg-transparent text-muted hover:text-ink hover:bg-white/70'
}

export function Button({
  children,
  className = '',
  variant = 'primary',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-bold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
