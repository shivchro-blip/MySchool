import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, LayoutGrid, ZoomIn, ZoomOut, Maximize, Minimize } from 'lucide-react'

const PILL_BTN = `w-8 h-8 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-fast`

export default function ViewerNavControls({
  pageLabel,
  isFirst,
  isLast,
  onFirst,
  onPrev,
  onNext,
  onLast,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  isFullscreen,
  onFullscreen,
  onOpenThumbnails,
}) {
  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 px-3 py-2 rounded-pill"
      style={{
        bottom: 'calc(88px + env(safe-area-inset-bottom, 0px))',
        background: 'rgba(28,28,28,0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
      }}
    >
      {/* Grid / thumbnails */}
      <button onClick={onOpenThumbnails} className={PILL_BTN} aria-label="Page thumbnails">
        <LayoutGrid size={16} />
      </button>

      <div className="w-px h-4 bg-white/20 mx-1" />

      {/* Navigation */}
      <button onClick={onFirst} disabled={isFirst} className={PILL_BTN} aria-label="First page">
        <ChevronsLeft size={16} />
      </button>
      <button onClick={onPrev} disabled={isFirst} className={PILL_BTN} aria-label="Previous page">
        <ChevronLeft size={16} />
      </button>

      <span className="text-xs font-medium text-white/80 min-w-[52px] text-center select-none px-1">
        {pageLabel}
      </span>

      <button onClick={onNext} disabled={isLast} className={PILL_BTN} aria-label="Next page">
        <ChevronRight size={16} />
      </button>
      <button onClick={onLast} disabled={isLast} className={PILL_BTN} aria-label="Last page">
        <ChevronsRight size={16} />
      </button>

      <div className="w-px h-4 bg-white/20 mx-1" />

      {/* Zoom */}
      <button onClick={onZoomOut} disabled={zoomLevel <= 0.5} className={PILL_BTN} aria-label="Zoom out">
        <ZoomOut size={16} />
      </button>
      <span className="text-xs font-medium text-white/60 min-w-[36px] text-center select-none">
        {Math.round(zoomLevel * 100)}%
      </span>
      <button onClick={onZoomIn} disabled={zoomLevel >= 2.0} className={PILL_BTN} aria-label="Zoom in">
        <ZoomIn size={16} />
      </button>

      <div className="w-px h-4 bg-white/20 mx-1" />

      {/* Fullscreen */}
      <button onClick={onFullscreen} className={PILL_BTN} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
        {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
      </button>
    </div>
  )
}
