const variants = {
  primary: 'bg-gradient-to-r from-brand to-brandDark text-white shadow-[0_16px_36px_rgba(0,127,120,0.28)] hover:shadow-[0_18px_44px_rgba(0,127,120,0.34)]',
  secondary: 'bg-white/90 text-ink border border-line hover:border-brand/50 hover:bg-white',
  dark: 'bg-ink text-white shadow-soft hover:bg-[#0b1429]',
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
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-extrabold tracking-[-0.01em] transition duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
