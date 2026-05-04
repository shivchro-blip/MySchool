export default function SkeletonCard() {
  return (
    <div className="bg-bg-2 rounded-md border border-line-soft p-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-bg-sunk rounded-md shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-bg-sunk rounded-md w-2/3" />
          <div className="h-3 bg-bg-sunk rounded-md w-1/3" />
        </div>
      </div>
    </div>
  )
}
