import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  getLesson, getCategory, SYLLABUS, LESSON_SECTIONS,
} from '../../data/syllabus'
import { buildBreadcrumbs } from '../../lib/nav'
import { Card } from '../../components/ui'
import { Breadcrumb } from '../../components/nav'
import NotFound from './NotFound'

export default function LessonDetailPage() {
  const { year, subject, category, lesson } = useParams()
  const navigate                            = useNavigate()
  const lessonData                          = getLesson(year, subject, category, lesson)
  const categoryData                        = getCategory(year, subject, category)
  const crumbs                              = buildBreadcrumbs(year, subject, category, lesson, null, SYLLABUS)

  if (!lessonData) return <NotFound message={`Lesson "${lesson}" not found`} />

  return (
    <div>
      <Breadcrumb crumbs={crumbs} />

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{categoryData?.icon}</span>
          <span className="text-xs font-semibold text-accent uppercase tracking-wide">
            {categoryData?.label}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-ink leading-snug">
          {lessonData.title}
        </h1>
        <p className="text-sm text-ink-3 mt-1">
          Choose a section to begin
        </p>
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
              <p className="text-sm font-bold text-ink">{section.label}</p>
              <p className="text-xs text-ink-4 mt-1 leading-snug">
                {section.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
