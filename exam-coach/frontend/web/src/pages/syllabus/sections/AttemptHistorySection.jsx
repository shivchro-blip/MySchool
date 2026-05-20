import { useParams, useNavigate } from 'react-router-dom'
import Badge from '../../../components/ui/Badge'

function fmtDate(iso) {
  return new Date(iso).toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function pct(score, total) {
  return total > 0 ? Math.round((score / total) * 100) : 0
}

export default function AttemptHistorySection({ lessonSlug: propLessonSlug } = {}) {
  const { lesson: paramLesson, year, subject, category } = useParams()
  const lesson = propLessonSlug || paramLesson
  const navigate = useNavigate()

  const stored   = localStorage.getItem(`exam_coach_sessions_${lesson}`)
  const sessions = stored ? [...JSON.parse(stored)].reverse() : []

  if (sessions.length === 0) {
    return (
      <div className="bg-bg-2 border border-line rounded-xl p-8 text-center">
        <div className="text-3xl mb-3">🕐</div>
        <p className="text-[15px] font-semibold text-ink mb-1">No attempts yet</p>
        <p className="text-[13px] text-ink-3 mb-5">
          Complete a practice exam to see your history here.
        </p>
        <button
          onClick={() => navigate(`/${year}/${subject}/${category}/${lesson}/practice`)}
          className="px-4 py-2 rounded-xl text-[13px] font-semibold text-white
                     transition-colors"
          style={{ background: 'var(--accent)' }}
        >
          🔥 Practice
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-bold uppercase tracking-wide text-ink-3">
        {sessions.length} session{sessions.length !== 1 ? 's' : ''} completed
      </p>

      {sessions.map((s, i) => {
        const sessionNum = sessions.length - i
        const percentage = pct(s.score, s.total)
        const tone = percentage >= 70 ? 'good' : 'warn'
        const numCls = percentage >= 70
          ? 'bg-good-soft text-good-ink'
          : 'bg-warn-soft text-warn'
        return (
          <div
            key={i}
            className="bg-bg-2 border border-line rounded-xl p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0 ${numCls}`}>
                  {sessionNum}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[13px] font-semibold text-ink">Session {sessionNum}</span>
                    <Badge tone={tone}>{percentage}%</Badge>
                  </div>
                  <p className="text-[11px] text-ink-3">{fmtDate(s.date)}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[16px] font-bold text-ink">{s.score}/{s.total} MCQ</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
