import { BookOpen, FileText, Pencil, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../../components/ui'

export default function ModelPaperListCard({ papers, basePath = '/plus1/english' }) {
  const navigate = useNavigate()

  return (
    <div className="relative pt-3">
      <span className="absolute top-0 left-3 z-10 -translate-y-1/2 inline-flex items-center px-2 py-0.5 rounded-pill text-[10px] font-bold tracking-wide bg-good-soft text-good-ink border border-good">
        NEW
      </span>

      <Card padding="none" className="overflow-hidden shadow-card">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-line-soft">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0 bg-brand-teal-soft">
            <BookOpen size={16} strokeWidth={1.8} className="text-brand-teal" />
          </div>
          <p className="text-sm font-bold text-ink">Model Exam Papers</p>
        </div>

        {papers.map((paper, i) => (
          <div
            key={paper.id}
            className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3.5${i > 0 ? ' border-t border-line-soft' : ''}`}
          >
            <span className="shrink-0 px-2.5 py-0.5 rounded-pill text-xs font-bold text-white bg-brand-teal">
              {paper.label}
            </span>

            <div className="flex gap-1.5 shrink-0">
              <button
                onClick={() => navigate(`${basePath}/final-exam-prep/paper/${paper.id}`)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-button text-[11px] font-semibold text-brand-teal border border-brand-teal bg-bg-2 hover:bg-brand-teal-soft transition-colors duration-fast"
              >
                <FileText size={12} strokeWidth={1.8} />
                <span className="hidden sm:inline">View Paper</span>
              </button>
              <button
                onClick={() => navigate(`${basePath}/model-exam/${paper.modelId}`)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-button text-[11px] font-semibold text-brand-teal border border-brand-teal bg-bg-2 hover:bg-brand-teal-soft transition-colors duration-fast"
              >
                <Pencil size={12} strokeWidth={1.8} />
                <span className="hidden sm:inline">Practice</span>
              </button>
            </div>

            <ChevronRight size={15} className="text-ink-4 shrink-0" />
          </div>
        ))}

        <div className="px-5 py-3 border-t border-line-soft flex justify-center">
          <span
            className="inline-flex items-center px-3.5 py-1.5 rounded-pill text-[11px] font-medium text-brand-teal"
            style={{ background: 'var(--brand-teal-soft)', border: '1px solid color-mix(in srgb, var(--brand) 25%, transparent)' }}
          >
            AI-curated practice sets aligned with the latest exam pattern
          </span>
        </div>
      </Card>
    </div>
  )
}
