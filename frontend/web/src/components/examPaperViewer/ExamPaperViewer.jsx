import { useState, useEffect, useRef, useCallback } from 'react'
import { getPaperById } from '../../data/examPapers/examPaperRegistry'
import ViewerHeader           from './ViewerHeader'
import PageSurface            from './PageSurface'
import ViewerNavControls      from './ViewerNavControls'
import ViewerSideArrow        from './ViewerSideArrow'
import ViewerThumbnailOverlay from './ViewerThumbnailOverlay'

function buildSpreads(totalPages) {
  const spreads = [[1]]
  for (let p = 2; p <= totalPages; p += 2) {
    if (p + 1 <= totalPages) {
      spreads.push([p, p + 1])
    } else {
      spreads.push([p])
    }
  }
  return spreads
}

function PaperNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-4xl mb-4">📄</p>
      <h2 className="text-lg font-bold text-ink mb-2">Paper Not Available</h2>
      <p className="text-sm text-ink-2">
        This exam paper hasn't been added yet. Check back soon.
      </p>
    </div>
  )
}

const ZOOM_MIN = 0.5
const ZOOM_MAX = 2.0
const ZOOM_STEP = 0.1

export default function ExamPaperViewer({ paperId, backPath }) {
  const paper = getPaperById(paperId)

  const [spreadIndex,    setSpreadIndex]    = useState(0)
  const [zoomLevel,      setZoomLevel]      = useState(1.0)
  const [isFullscreen,   setIsFullscreen]   = useState(false)
  const [showThumbnails, setShowThumbnails] = useState(false)
  const [visible,        setVisible]        = useState(true)

  const goNextRef = useRef(null)
  const goPrevRef = useRef(null)

  const spreads       = paper ? buildSpreads(paper.totalPages) : []
  const currentSpread = spreads[spreadIndex] ?? []
  const isTwoPage     = currentSpread.length === 2
  const isFirst       = spreadIndex === 0
  const isLast        = spreadIndex === spreads.length - 1

  const pageLabel = (() => {
    if (!currentSpread.length) return ''
    const total = paper?.totalPages ?? 0
    return currentSpread.length === 1
      ? `${currentSpread[0]} / ${total}`
      : `${currentSpread[0]}–${currentSpread[currentSpread.length - 1]} / ${total}`
  })()

  const navigate = useCallback((targetIndex) => {
    if (!paper) return
    setVisible(false)
    setTimeout(() => {
      setSpreadIndex(targetIndex)
      setVisible(true)
    }, 150)
  }, [paper])

  const goNext = useCallback(() => {
    if (!isLast) navigate(spreadIndex + 1)
  }, [isLast, navigate, spreadIndex])

  const goPrev = useCallback(() => {
    if (!isFirst) navigate(spreadIndex - 1)
  }, [isFirst, navigate, spreadIndex])

  useEffect(() => { goNextRef.current = goNext }, [goNext])
  useEffect(() => { goPrevRef.current = goPrev }, [goPrev])

  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goNextRef.current?.() }
      if (e.key === 'ArrowLeft')                   { e.preventDefault(); goPrevRef.current?.() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const touchStartX = useRef(null)
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd   = (e) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (delta < -50) goNextRef.current?.()
    if (delta >  50) goPrevRef.current?.()
    touchStartX.current = null
  }

  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setIsFullscreen(false)
    }
  }, [])

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  if (!paper) return <PaperNotFound />

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 58px)' /* 58px = DashboardShell sticky header */ }}>
      {/* White header — content unchanged; override its bottom margin without touching ViewerHeader */}
      <div className="bg-bg px-4 sm:px-10 [&>div]:mb-0 shrink-0">
        <ViewerHeader paper={paper} backPath={backPath} />
      </div>

      {/* Dark flipbook area — arrows positioned relative to this container */}
      <div
        className="relative flex-1 overflow-y-auto overflow-x-hidden"
        style={{ background: '#1c1c1c' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <ViewerSideArrow direction="left"  onClick={goPrev} disabled={isFirst} />
        <ViewerSideArrow direction="right" onClick={goNext} disabled={isLast}  />

        {/* Paper surface with fade transition */}
        <div
          className="px-16 py-10 transition-opacity"
          style={{ opacity: visible ? 1 : 0, transitionDuration: '150ms' }}
        >
          {isTwoPage ? (
            <div className="flex flex-col xl:flex-row gap-6 w-full max-w-[1200px] mx-auto">
              {currentSpread.map((pageNum) => {
                const page    = paper.pages[pageNum - 1]
                const pageLast = pageNum === paper.totalPages
                return (
                  <PageSurface
                    key={pageNum}
                    page={page}
                    isLast={pageLast}
                    inSpread
                    onStartPractice={() => console.log('TODO: Start Practice')}
                  />
                )
              })}
            </div>
          ) : (
            <div
              className="max-w-[860px] mx-auto w-full"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
            >
              {currentSpread.map((pageNum) => {
                const page    = paper.pages[pageNum - 1]
                const pageLast = pageNum === paper.totalPages
                return (
                  <PageSurface
                    key={pageNum}
                    page={page}
                    isLast={pageLast}
                    onStartPractice={() => console.log('TODO: Start Practice')}
                  />
                )
              })}
            </div>
          )}
        </div>

        {showThumbnails && (
          <ViewerThumbnailOverlay
            paper={paper}
            currentPageIndex={currentSpread[0] - 1}
            onSelect={(pageIdx) => {
              const targetSpreadIdx = spreads.findIndex(s => s.includes(pageIdx + 1))
              if (targetSpreadIdx !== -1) navigate(targetSpreadIdx)
              setShowThumbnails(false)
            }}
            onClose={() => setShowThumbnails(false)}
          />
        )}
      </div>

      <ViewerNavControls
        pageLabel={pageLabel}
        isFirst={isFirst}
        isLast={isLast}
        onFirst={() => navigate(0)}
        onPrev={goPrev}
        onNext={goNext}
        onLast={() => navigate(spreads.length - 1)}
        zoomLevel={zoomLevel}
        onZoomIn={() => setZoomLevel(z => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(1)))}
        onZoomOut={() => setZoomLevel(z => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(1)))}
        isFullscreen={isFullscreen}
        onFullscreen={handleFullscreen}
        onOpenThumbnails={() => setShowThumbnails(t => !t)}
      />
    </div>
  )
}
