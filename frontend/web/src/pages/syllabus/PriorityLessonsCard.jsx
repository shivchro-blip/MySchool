import { BookOpen, Flame, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../../components/ui'
import { finalExamPrepPriorityLessons } from '../../data/finalExamPrepData'

const PRIORITY_BADGE = {
  high:   { bg: 'bg-danger', label: 'High' },
  medium: { bg: 'bg-warn',   label: 'Medium' },
}

const CATEGORY_SLUG = {
  'Prose':         'prose',
  'Poems':         'poetry',
  'Supplementary': 'supplementary',
}

function lessonPath(basePath, lesson) {
  const slug = CATEGORY_SLUG[lesson.category]
  return slug ? `${basePath}/${slug}` : basePath
}

export default function PriorityLessonsCard({ lessons: lessonsProp, basePath = '/plus1/english' }) {
  const lessons  = lessonsProp ?? finalExamPrepPriorityLessons
  const navigate = useNavigate()
  return (
    <Card padding="none" className="overflow-hidden shadow-card">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-line-soft">
        <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0 bg-brand-teal-soft">
          <Flame size={16} strokeWidth={1.8} className="text-brand-teal" />
        </div>
        <p className="text-sm font-bold text-ink">High-Priority Lessons</p>
      </div>

      {lessons.map((lesson, i) => {
        const badge = PRIORITY_BADGE[lesson.priority]
        const path  = lessonPath(basePath, lesson)
        return (
          <div
            key={lesson.id}
            role="button"
            tabIndex={0}
            onClick={() => navigate(path)}
            onKeyDown={e => e.key === 'Enter' && navigate(path)}
            className={`flex items-center gap-3 px-4 sm:px-5 py-3.5 cursor-pointer hover:bg-bg-sunk transition-colors duration-fast${i > 0 ? ' border-t border-line-soft' : ''}`}
          >
            <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0 bg-brand-teal-soft">
              <BookOpen size={15} strokeWidth={1.8} className="text-brand-teal" />
            </div>

            <p className="flex-1 min-w-0 text-sm font-medium text-ink truncate">
              {lesson.category} — {lesson.title}
            </p>

            <span className={`shrink-0 px-2 py-0.5 rounded-pill text-[11px] font-bold text-white ${badge.bg}`}>
              {badge.label}
            </span>

            <ChevronRight size={15} className="text-ink-4 shrink-0" />
          </div>
        )
      })}
    </Card>
  )
}
