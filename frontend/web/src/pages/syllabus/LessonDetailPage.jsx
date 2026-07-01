import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  getLesson, getSubjectChapters, SYLLABUS, LESSON_SECTIONS,
} from '../../data/syllabus'
import { buildBreadcrumbs } from '../../lib/nav'
import { Card, PageHeader } from '../../components/ui'
import { Breadcrumb } from '../../components/nav'
import contentRegistry from '../../content/registry'
import ContentComingSoon from './ContentComingSoon'
import NotFound from './NotFound'

const CATEGORY_EYEBROW = {
  prose:         { label: '📖 Prose',         color: 'var(--brand)' },
  poetry:        { label: '✍️ Poem',           color: 'var(--brand)' },
  supplementary: { label: '📑 Supplementary', color: 'var(--brand)' },
}

export default function LessonDetailPage() {
  const { year, subject, category, lesson } = useParams()
  const navigate                            = useNavigate()
  // Resolve from categorised lessons (English) or the chapters array (Maths).
  const lessonData = getLesson(year, subject, category, lesson)
    || getSubjectChapters(year, subject).find(c => c.slug === lesson)
    || null
  const crumbs     = buildBreadcrumbs(year, subject, category, lesson, null, SYLLABUS)

  if (!lessonData) return <NotFound message={`Lesson "${lesson}" not found`} />

  // No registered content module → honest "coming soon" instead of a section
  // grid whose every tab leads to a fake skeleton. Applies to any unregistered
  // lesson (Maths chapters, Science lessons, etc.).
  if (!contentRegistry.has(lesson)) {
    return <ContentComingSoon title={lessonData.title} crumbs={crumbs} />
  }

  return (
    <div>
      <div className="bg-surface border border-border rounded-xl px-6 py-5 mb-8">
        <PageHeader
          breadcrumb={<Breadcrumb crumbs={crumbs} />}
          categoryEyebrow={CATEGORY_EYEBROW[category]}
          title={lessonData.title}
          subtitle="Choose a section to begin"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {LESSON_SECTIONS.map((section, i) => (
          <motion.div
            key={section.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card
              interactive
              padding="md"
              onClick={() =>
                navigate(`/${year}/${subject}/${category}/${lesson}/${section.slug}`)
              }
              className="h-full"
            >
              <div className="text-2xl mb-2.5">{section.icon}</div>
              <p className="text-sm font-bold text-text-primary">{section.label}</p>
              <p className="text-xs text-text-tertiary mt-1 leading-snug">
                {section.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
