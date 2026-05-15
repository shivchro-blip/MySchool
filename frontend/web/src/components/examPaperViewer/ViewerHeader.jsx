import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function ViewerHeader({ paper, backPath }) {
  const navigate = useNavigate()

  return (
    <div className="mb-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-[11px] text-ink-2 mb-3 flex-wrap">
        <span>Courses</span>
        <ChevronRight size={12} className="text-ink-4" />
        <span>{paper.classLabel}</span>
        <ChevronRight size={12} className="text-ink-4" />
        <span>{paper.subject}</span>
        <ChevronRight size={12} className="text-ink-4" />
        <button
          onClick={() => navigate(backPath)}
          className="hover:text-brand-teal transition-colors duration-fast"
        >
          Final Exam Prep
        </button>
        <ChevronRight size={12} className="text-ink-4" />
        <span className="text-ink font-medium">{paper.title}</span>
      </nav>

      {/* Title row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-ink">{paper.title}</h1>
          <p className="text-sm text-ink-2 mt-0.5">
            {paper.classLabel} {paper.subject}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
            {[
              ['Time Allowed', paper.duration],
              ['Maximum Marks', paper.maximumMarks],
              ['Total Pages', paper.totalPages],
            ].map(([label, value]) => (
              <span key={label} className="text-[11px] text-ink-2">
                <span className="font-medium">{label}:</span> {value}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => navigate(backPath)}
            className="px-3 py-1.5 text-xs font-semibold text-ink-2 border border-line-soft rounded-button bg-bg-2 hover:bg-bg-sunk transition-colors duration-fast"
          >
            ← Back to Final Exam Prep
          </button>
          <button
            onClick={() => console.log('TODO: Start Practice')}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-brand-teal rounded-button hover:bg-brand-teal-hover transition-colors duration-fast"
          >
            Start Practice
          </button>
        </div>
      </div>
    </div>
  )
}
