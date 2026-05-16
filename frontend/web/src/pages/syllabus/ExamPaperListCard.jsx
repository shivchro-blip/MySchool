import { FileText, Pencil, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../../components/ui'
import { finalExamPrepPapers } from '../../data/finalExamPrepData'

export default function ExamPaperListCard({ papers: papersProp, basePath = '/plus1/english' }) {
  const papers = papersProp ?? finalExamPrepPapers
  const navigate = useNavigate()
  return (
    <Card padding="none" className="overflow-hidden shadow-card">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-line-soft">
        <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0 bg-brand-teal-soft">
          <FileText size={16} strokeWidth={1.8} className="text-brand-teal" />
        </div>
        <p className="text-sm font-bold text-ink">Past Annual Exam Papers</p>
      </div>

      {papers.map((paper, i) => (
        <div
          key={paper.id}
          className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3.5${i > 0 ? ' border-t border-line-soft' : ''}`}
        >
          <span className="shrink-0 px-2.5 py-0.5 rounded-pill text-xs font-bold text-white bg-brand-teal">
            {paper.year}
          </span>

          <p className="flex-1 min-w-0 text-sm font-medium text-ink truncate">
            {paper.title}
          </p>

          <div className="flex gap-1.5 shrink-0">
            <button
              onClick={() => navigate(`${basePath}/final-exam-prep/paper/${paper.id}`)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-button text-[11px] font-semibold text-brand-teal border border-brand-teal bg-bg-2 hover:bg-brand-teal-soft transition-colors duration-fast"
            >
              <FileText size={12} strokeWidth={1.8} />
              <span className="hidden sm:inline">View Paper</span>
            </button>
            <button
              onClick={() => console.log('TODO: practice', paper.id)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-button text-[11px] font-semibold text-brand-teal border border-brand-teal bg-bg-2 hover:bg-brand-teal-soft transition-colors duration-fast"
            >
              <Pencil size={12} strokeWidth={1.8} />
              <span className="hidden sm:inline">Practice</span>
            </button>
          </div>

          <ChevronRight size={15} className="text-ink-4 shrink-0" />
        </div>
      ))}
    </Card>
  )
}
