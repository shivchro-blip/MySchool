import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  getLesson, getSubjectChapters, SYLLABUS,
} from '../../data/syllabus'
import { buildBreadcrumbs } from '../../lib/nav'
import NotFound from './NotFound'

import contentRegistry from '../../content/registry'
import LearnRichPage   from '../LearnRichPage'
import ContentComingSoon from './ContentComingSoon'

export default function SectionPage() {
  const { year, subject, category, lesson } = useParams()
  const lessonData = getLesson(year, subject, category, lesson)
    || getSubjectChapters(year, subject).find(c => c.slug === lesson)
    || null
  const crumbs     = buildBreadcrumbs(year, subject, category, lesson, null, SYLLABUS)

  // undefined = loading; null = no rich content; object = rich content loaded
  // Init synchronously: lessons without rich content skip the loading state entirely.
  const [richContent, setRichContent] = useState(
    () => contentRegistry.has(lesson) ? undefined : null
  )

  useEffect(() => {
    if (!contentRegistry.has(lesson)) {
      setRichContent(null)
      return
    }
    setRichContent(undefined)
    let cancelled = false
    contentRegistry.load(lesson).then(c => { if (!cancelled) setRichContent(c) })
    return () => { cancelled = true }
  }, [lesson])

  if (!lessonData) return <NotFound message={`Lesson "${lesson}" not found`} />

  if (richContent === undefined) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ fontSize: 13, color: 'var(--text-muted, #9CA3AF)' }}>Loading…</div>
      </div>
    )
  }

  if (richContent !== null) {
    return <LearnRichPage content={richContent} chapterSlug={lesson} />
  }

  // richContent === null → no registered content module for this lesson.
  // Honest empty-state instead of fake loading skeletons.
  return <ContentComingSoon title={lessonData.title} crumbs={crumbs} />
}
