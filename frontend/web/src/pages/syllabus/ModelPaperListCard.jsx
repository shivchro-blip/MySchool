import { useState } from 'react'
import { BookOpen, FileText, Pencil, ChevronRight, History } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../../components/ui'
import Badge from '../../components/ui/Badge'

function fmtDate(iso) {
  return new Date(iso).toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function pct(score, total) {
  return total > 0 ? Math.round((score / total) * 100) : 0
}

function AttemptHistoryPanel({ paperId }) {
  const stored = localStorage.getItem(
    `exam_coach_sessions_${paperId}`
  )
  const sessions = stored
    ? [...JSON.parse(stored)].reverse()
    : []

  if (sessions.length === 0) {
    return (
      <div className="px-5 py-4 text-center border-t"
        style={{ borderColor: 'var(--border)' }}>
        <p className="text-[13px] text-text-secondary">
          No attempts yet — click Practice to get started.
        </p>
      </div>
    )
  }

  return (
    <div className="px-5 py-3 border-t space-y-2"
      style={{ borderColor: 'var(--border)', background: 'var(--surface-alt)' }}>
      <p className="text-[10px] font-bold uppercase tracking-wide text-text-tertiary mb-2">
        {sessions.length} attempt{sessions.length !== 1 ? 's' : ''}
      </p>
      {sessions.map((s, i) => {
        const sessionNum = sessions.length - i
        const percentage = pct(s.score, s.total)
        const tone = percentage >= 70 ? 'good' : 'warn'
        const numCls = percentage >= 70
          ? 'bg-good-soft text-good-ink'
          : 'bg-warn-soft text-warn'
        return (
          <div key={i}
            className="flex items-center justify-between gap-3 py-2 border-b last:border-0"
            style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 ${numCls}`}>
                {sessionNum}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-semibold text-text-primary">
                    Attempt {sessionNum}
                  </span>
                  <Badge tone={tone}>{percentage}%</Badge>
                </div>
                <p className="text-[11px] text-text-secondary">
                  {fmtDate(s.date)}
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[14px] font-bold text-text-primary">
                {s.score}/{s.total} MCQ
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function ModelPaperListCard({ papers, basePath = '/plus1/english' }) {
  const navigate = useNavigate()
  const [openHistoryId, setOpenHistoryId] = useState(null)

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
          <div key={paper.id}>
            <div
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
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-button text-[11px] font-semibold text-brand-teal border border-brand-teal bg-surface-alt hover:bg-brand-teal-soft transition-colors duration-fast"
                >
                  <FileText size={12} strokeWidth={1.8} />
                  <span className="hidden sm:inline">View Paper</span>
                </button>
                <button
                  onClick={() => navigate(`${basePath}/model-exam/${paper.modelId}`)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-button text-[11px] font-semibold text-brand-teal border border-brand-teal bg-surface-alt hover:bg-brand-teal-soft transition-colors duration-fast"
                >
                  <Pencil size={12} strokeWidth={1.8} />
                  <span className="hidden sm:inline">Practice</span>
                </button>
                <button
                  onClick={() => setOpenHistoryId(
                    openHistoryId === paper.id ? null : paper.id
                  )}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-semibold border transition-colors"
                  style={{
                    color: openHistoryId === paper.id
                      ? 'var(--brand)' : 'var(--text-secondary)',
                    borderColor: openHistoryId === paper.id
                      ? 'var(--brand)' : 'var(--border)',
                    background: 'var(--surface)'
                  }}
                >
                  <History size={12} />
                  <span className="hidden sm:inline">History</span>
                </button>
              </div>

              <ChevronRight size={15} className="text-text-tertiary shrink-0" />
            </div>
            {openHistoryId === paper.id && (
              <AttemptHistoryPanel paperId={paper.id} />
            )}
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
