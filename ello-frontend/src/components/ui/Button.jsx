import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-gradient-to-r from-brand to-brandDark text-white shadow-[0_18px_44px_rgba(16,184,170,0.3)] hover:shadow-[0_20px_54px_rgba(16,184,170,0.38)]',
  secondary: 'bg-white/90 text-ink border border-line hover:border-brand/50 hover:bg-white shadow-[0_10px_28px_rgba(7,19,25,0.08)]',
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
    <motion.button
      type={type}
      whileHover={props.disabled ? undefined : { y: -2 }}
      whileTap={props.disabled ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-extrabold tracking-[-0.01em] transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
