import { motion } from 'framer-motion'

export function EmptyState({ action, description, icon: Icon, title }) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="premium-surface grid justify-items-center gap-3 rounded-[1.8rem] p-7 text-center"
      initial={{ opacity: 0, y: 16 }}
    >
      {Icon ? (
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
          <Icon size={24} />
        </span>
      ) : null}
      <h2 className="text-2xl font-extrabold tracking-[-0.04em]">{title}</h2>
      <p className="max-w-md text-sm font-medium leading-6 text-muted">{description}</p>
      {action}
    </motion.div>
  )
}
