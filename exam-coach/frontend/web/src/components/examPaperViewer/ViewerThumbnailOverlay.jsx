import { X } from 'lucide-react'

export default function ViewerThumbnailOverlay({ paper, currentPageIndex, onSelect, onClose }) {
  return (
    <div
      className="absolute inset-0 z-40 overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div className="relative max-w-[900px] mx-auto px-6 py-10" onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-fast"
          aria-label="Close thumbnails"
        >
          <X size={18} />
        </button>

        <h2 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-6">All Pages</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {paper.pages.map((page, idx) => {
            const isCurrent = idx === currentPageIndex
            return (
              <button
                key={page.pageNumber}
                onClick={() => onSelect(idx)}
                className={`relative flex flex-col rounded-[4px] overflow-hidden border-2 transition-all duration-fast focus:outline-none
                  ${isCurrent
                    ? 'border-brand-teal shadow-[0_0_0_2px_rgba(42,123,111,0.5)]'
                    : 'border-white/10 hover:border-white/30'
                  }`}
              >
                {/* Miniature page preview */}
                <div
                  className="bg-[#FFFEF9] w-full"
                  style={{ aspectRatio: '0.707', overflow: 'hidden', position: 'relative' }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span className="text-[10px] text-ink-4 font-medium px-2 text-center leading-tight">
                      {page.blocks[0]?.content ?? `Page ${page.pageNumber}`}
                    </span>
                  </div>
                </div>

                {/* Page number label */}
                <div
                  className={`py-1.5 text-[11px] font-semibold text-center select-none
                    ${isCurrent ? 'bg-brand-teal text-white' : 'bg-black/60 text-white/70'}`}
                >
                  {page.pageNumber}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
