import { useState } from 'react'
import { getPaperById } from '../../data/examPapers/examPaperRegistry'
import ViewerHeader      from './ViewerHeader'
import PageSurface       from './PageSurface'
import ViewerNavControls from './ViewerNavControls'

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

export default function ExamPaperViewer({ paperId, backPath }) {
  const paper = getPaperById(paperId)
  const [spreadIndex, setSpreadIndex] = useState(0)

  if (!paper) return <PaperNotFound />

  const spreads       = buildSpreads(paper.totalPages)
  const currentSpread = spreads[spreadIndex]
  const isTwoPage     = currentSpread.length === 2

  return (
    <div className="px-4 sm:px-10 max-w-[1200px] mx-auto">
      <ViewerHeader paper={paper} backPath={backPath} />

      {isTwoPage ? (
        <div className="flex flex-col xl:flex-row gap-6 w-full">
          {currentSpread.map((pageNum) => {
            const page   = paper.pages[pageNum - 1]
            const isLast = pageNum === paper.totalPages
            return (
              <PageSurface
                key={pageNum}
                page={page}
                isLast={isLast}
                inSpread
                onStartPractice={() => console.log('TODO: Start Practice')}
              />
            )
          })}
        </div>
      ) : (
        <div className="max-w-[860px] mx-auto w-full">
          {currentSpread.map((pageNum) => {
            const page   = paper.pages[pageNum - 1]
            const isLast = pageNum === paper.totalPages
            return (
              <PageSurface
                key={pageNum}
                page={page}
                isLast={isLast}
                onStartPractice={() => console.log('TODO: Start Practice')}
              />
            )
          })}
        </div>
      )}

      <ViewerNavControls
        spreads={spreads}
        spreadIndex={spreadIndex}
        onPrev={() => setSpreadIndex(i => Math.max(0, i - 1))}
        onNext={() => setSpreadIndex(i => Math.min(spreads.length - 1, i + 1))}
      />
    </div>
  )
}
