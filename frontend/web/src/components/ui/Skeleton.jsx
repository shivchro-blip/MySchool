export function SkeletonLine({ className = '' }) {
  return (
    <div className={`h-3 bg-bg-sunk rounded-md animate-pulse ${className}`} />
  )
}

export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine key={i} className={i === lines - 1 ? 'w-3/4' : 'w-full'} />
      ))}
    </div>
  )
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`bg-bg-2 rounded-md border border-line-soft p-4 animate-pulse ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-bg-sunk rounded-md shrink-0" />
        <div className="flex-1 space-y-2">
          <SkeletonLine className="w-2/3" />
          <SkeletonLine className="w-1/3" />
        </div>
      </div>
    </div>
  )
}
