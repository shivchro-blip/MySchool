import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import {
  getCategory, getLessonList, getSubject, SYLLABUS,
} from '../../data/syllabus'
import { buildBreadcrumbs } from '../../lib/nav'
import { Card, PageHeader } from '../../components/ui'
import { Breadcrumb } from '../../components/nav'
import NotFound from './NotFound'

export default function LessonListPage() {
  const { year, subject, category } = useParams()
  const navigate                    = useNavigate()
  const categoryData                = getCategory(year, subject, category)
  const lessons                     = getLessonList(year, subject, category)
  const subjectData                 = getSubject(year, subject)
  const crumbs                      = buildBreadcrumbs(year, subject, category, null, null, SYLLABUS)

  if (!categoryData) return <NotFound message={`Category "${category}" not found`} />

  return (
    <div>
      <PageHeader
        breadcrumb={<Breadcrumb crumbs={crumbs} />}
        title={categoryData.label}
        subtitle={`${subjectData?.label} · ${lessons.length} lesson${lessons.length !== 1 ? 's' : ''}`}
      />

      <div className="space-y-2">
        {lessons.map((lesson, i) => (
          <motion.div
            key={lesson.slug}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card
              interactive
              padding="md"
              onClick={() => navigate(`/${year}/${subject}/${category}/${lesson.slug}`)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-alt flex items-center
                                justify-center text-xs font-bold text-text-secondary shrink-0">
                  {i + 1}
                </div>
                <p className="flex-1 text-sm font-semibold text-text-primary leading-snug">
                  {lesson.title}
                </p>
                <ChevronRight size={16} className="text-text-tertiary shrink-0" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
