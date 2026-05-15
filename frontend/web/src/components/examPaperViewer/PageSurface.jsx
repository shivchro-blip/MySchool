import BlockRenderer from './BlockRenderer'

export default function PageSurface({ page, isLast = false, onStartPractice }) {
  return (
    <div
      className="bg-white rounded border border-ink-4/20 shadow-[0_2px_8px_rgba(0,0,0,0.07)] flex flex-col"
      style={{ width: 340, minHeight: 480, padding: '28px 28px 20px' }}
    >
      <div className="flex-1">
        {page.blocks.map((block, i) => (
          <BlockRenderer key={i} block={block} />
        ))}
      </div>

      {isLast && (
        <div className="mt-6 pt-4 border-t border-ink-4/20">
          <button
            onClick={() => {
              console.log('TODO: Start Practice for this paper')
              onStartPractice?.()
            }}
            className="w-full py-2.5 px-4 bg-brand-teal text-white text-xs font-semibold rounded-button hover:bg-brand-teal-hover transition-colors duration-fast"
          >
            Start Practice for this Paper →
          </button>
        </div>
      )}

      <p className="text-[10px] text-ink-4 text-center mt-3">
        — {page.pageNumber} —
      </p>
    </div>
  )
}
