import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function ViewerHeader({ paper, backPath, onStartPractice }) {
  const navigate = useNavigate()
  const meta = [
    ['Time Allowed', paper.duration],
    ['Maximum Marks', paper.maximumMarks],
    ['Total Pages', paper.totalPages],
  ]

  return (
    <div className="mb-8 pb-6 border-b border-line-soft">
      {/* Row 1 — Breadcrumb */}
      <nav className="flex items-center gap-1 text-[13px] text-ink-2 mb-4 flex-wrap">
        <span>Courses</span>
        <ChevronRight size={12} className="text-ink-4" />
        <span>{paper.classLabel}</span>
        <ChevronRight size={12} className="text-ink-4" />
        <span>{paper.subject}</span>
        <ChevronRight size={12} className="text-ink-4" />
        <button onClick={() => navigate(backPath)} className="hover:text-brand-teal transition-colors duration-fast">
          Final Exam Prep
        </button>
        <ChevronRight size={12} className="text-ink-4" />
        <span className="text-ink font-medium">{paper.title}</span>
      </nav>

      {/* Row 2 — Title + Actions */}
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h1 className="text-[26px] font-bold text-ink leading-tight">{paper.title}</h1>
          <p className="text-[15px] text-ink-2 mt-1">{paper.classLabel} — {paper.subject}</p>
        </div>
        <div className="flex gap-2 shrink-0 items-center pt-1">
          <button
            onClick={() => navigate(backPath)}
            className="px-4 py-2 text-sm font-semibold text-ink-2 border border-line-soft rounded-button bg-bg-2 hover:bg-bg-sunk transition-colors duration-fast whitespace-nowrap"
          >
            ← Back to Final Exam Prep
          </button>
          <button
            onClick={() => onStartPractice?.()}
            className="px-4 py-2 text-sm font-semibold text-white bg-brand-teal rounded-button hover:bg-brand-teal-hover transition-colors duration-fast whitespace-nowrap"
          >
            Start Practice →
          </button>
        </div>
      </div>

      {/* Row 3 — Metadata */}
      <div className="flex items-center flex-wrap mt-3 text-[14px] text-ink-2">
        {meta.flatMap(([label, value], i) => [
          <span key={label}><span className="font-medium">{label}:</span> {value}</span>,
          i < meta.length - 1 ? <span key={`s${i}`} className="mx-3 text-ink-4 select-none">•</span> : null,
        ])}
      </div>
    </div>
  )
}
