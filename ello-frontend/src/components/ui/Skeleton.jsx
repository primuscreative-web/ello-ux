export function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse rounded-2xl bg-line/70 ${className}`} />
  )
}

export function ProfessionalCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-[1.7rem] border border-white/80 bg-white shadow-[0_18px_54px_rgba(7,19,25,0.08)]">
      <Skeleton className="h-44 rounded-none" />
      <div className="grid gap-4 p-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
        </div>
      </div>
    </article>
  )
}

export function OrderCardSkeleton() {
  return (
    <article className="premium-surface grid gap-4 rounded-[1.6rem] p-5 md:grid-cols-[1fr_auto] md:items-center">
      <div className="grid gap-3">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-4 w-52" />
      </div>
      <Skeleton className="h-12 w-full md:w-40" />
    </article>
  )
}
