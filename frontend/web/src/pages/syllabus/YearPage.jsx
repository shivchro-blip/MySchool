import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { getYear, getSubjectList, SYLLABUS } from '../../data/syllabus'
import { buildBreadcrumbs } from '../../lib/nav'
import { Card } from '../../components/ui'
import { Breadcrumb } from '../../components/nav'
import NotFound from './NotFound'

export default function YearPage() {
  const { year = 'plus1' } = useParams()
  const navigate  = useNavigate()
  const yearData  = getYear(year)
  const subjects  = getSubjectList(year)
  const crumbs    = buildBreadcrumbs(year, null, null, null, null, SYLLABUS)

  if (!yearData) return <NotFound message={`Year "${year}" not found`} />

  return (
    <div>
      <Breadcrumb crumbs={crumbs} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink">
          {yearData.fullLabel}
        </h1>
        <p className="text-sm text-ink-3 mt-1">
          Select a subject to begin
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {subjects.map((s, i) => (
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card
              interactive
              padding="md"
              onClick={() => navigate(`/${year}/${s.slug}`)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-ink">{s.label}</p>
                  <p className="text-xs text-ink-4 mt-0.5">
                    {Object.keys(s.categories).length} categories{s.units?.length ? ` · ${s.units.length} units` : ''}
                  </p>
                </div>
                <ChevronRight size={18} className="text-ink-4" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
