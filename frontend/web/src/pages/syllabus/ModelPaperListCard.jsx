import { BookOpen, FileText, Pencil, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../../components/ui'

export default function ModelPaperListCard({ papers, basePath = '/plus1/english' }) {
  const navigate = useNavigate()

  return (
    <div className="relative pt-3">
      <span className="absolute top-0 left-3 z-10 -translate-y-1/2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide bg-brand-subtle text-text-primary border border-brand">
        NEW
      </span>

      <Card padding="none" className="overflow-hidden shadow-card">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <div className="w-8 h-8 rounded flex items-center justify-center shrink-0 bg-brand-subtle">
            <BookOpen size={16} strokeWidth={1.8} className="text-brand" />
          </div>
          <p className="text-sm font-bold text-text-primary">Model Exam Papers</p>
        </div>

        {papers.map((paper, i) => (
          <div
            key={paper.id}
            className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3.5${i > 0 ? ' border-t border-border' : ''}`}
          >
            <span className="shrink-0 px-2.5 py-0.5 rounded-full text-xs font-bold text-white bg-brand-teal">
              {paper.label}
            </span>

            <p className="flex-1 min-w-0 text-sm font-medium text-text-primary truncate">
              {paper.title}
            </p>

            <div className="flex gap-1.5 shrink-0">
              <button
                onClick={() => navigate(`${basePath}/final-exam-prep/paper/${paper.id}`)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-semibold text-brand border border-brand bg-surface-alt hover:bg-brand-subtle transition-colors duration-fast"
              >
                <FileText size={12} strokeWidth={1.8} />
                <span className="hidden sm:inline">View Paper</span>
              </button>
              <button
                onClick={() => navigate(`${basePath}/model-exam/${paper.modelId}`)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-semibold text-brand border border-brand bg-surface-alt hover:bg-brand-subtle transition-colors duration-fast"
              >
                <Pencil size={12} strokeWidth={1.8} />
                <span className="hidden sm:inline">Practice</span>
              </button>
            </div>

            <ChevronRight size={15} className="text-text-tertiary shrink-0" />
          </div>
        ))}

        <div className="px-5 py-3 border-t border-border flex justify-center">
          <span
            className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-medium text-brand"
            style={{ background: 'var(--brand-subtle)', border: '1px solid color-mix(in srgb, var(--brand) 25%, transparent)' }}
          >
            AI-curated practice sets aligned with the latest exam pattern
          </span>
        </div>
      </Card>
    </div>
  )
}
