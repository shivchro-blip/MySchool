import BlockRenderer from './BlockRenderer'

export default function PageSurface({ page, isLast = false, onStartPractice, inSpread = false }) {
  const sizeClasses = inSpread
    ? 'flex-1 min-w-0 py-12 px-[52px]'
    : 'w-full py-14 px-16'

  return (
    <div className={`bg-[#FFFEF9] border border-[#E8E4DC] shadow-[0_4px_32px_rgba(0,0,0,0.10)] rounded-[4px] flex flex-col ${sizeClasses}`}>
      <div className="flex-1">
        {page.blocks.map((block, i) => (
          <BlockRenderer key={i} block={block} />
        ))}
      </div>

      {isLast && (
        <div className="mt-6 pt-4 border-t border-[#E8E4DC]">
          <button
            onClick={() => onStartPractice?.()}
            className="w-full py-2.5 px-4 bg-brand-teal text-white text-sm font-semibold rounded-button hover:bg-brand-teal-hover transition-colors duration-fast"
          >
            Start Practice for this Paper →
          </button>
        </div>
      )}

      <p className="text-[13px] text-ink-4 text-center mt-10">
        — {page.pageNumber} —
      </p>
    </div>
  )
}
