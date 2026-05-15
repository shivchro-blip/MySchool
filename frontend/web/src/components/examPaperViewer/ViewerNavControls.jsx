export default function ViewerNavControls({ spreads, spreadIndex, onPrev, onNext }) {
  const spread = spreads[spreadIndex] ?? []
  const totalPages = spreads.flat().length

  const label = spread.length === 1
    ? `Page ${spread[0]} of ${totalPages}`
    : `Pages ${spread[0]}–${spread[spread.length - 1]} of ${totalPages}`

  return (
    <div className="flex items-center justify-center gap-6 mt-6 pb-4">
      <button
        onClick={onPrev}
        disabled={spreadIndex === 0}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-ink-2 border border-line-soft rounded-button hover:bg-bg-sunk disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-fast"
      >
        ← Previous
      </button>

      <span className="text-xs text-ink-2 font-medium min-w-[140px] text-center">
        {label}
      </span>

      <button
        onClick={onNext}
        disabled={spreadIndex === spreads.length - 1}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-ink-2 border border-line-soft rounded-button hover:bg-bg-sunk disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-fast"
      >
        Next →
      </button>
    </div>
  )
}
