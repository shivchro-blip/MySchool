import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, BookOpen, Calculator, FlaskConical } from 'lucide-react'
import { getYear, getSubjectList, SYLLABUS } from '../../data/syllabus'
import { buildBreadcrumbs } from '../../lib/nav'
import { Breadcrumb } from '../../components/nav'
import NotFound from './NotFound'

// Per-subject color identity — used here and must match SubjectPage unit tones
const SUBJECT_PALETTE = {
  english: {
    main:    '#2A7B6F',
    bg:      'rgba(42,123,111,0.07)',
    bgHover: 'rgba(42,123,111,0.13)',
    border:  'rgba(42,123,111,0.22)',
    iconBg:  'rgba(42,123,111,0.13)',
    label:   '#1d5c53',
    meta:    'rgba(42,123,111,0.72)',
    shadow:  'rgba(42,123,111,0.14)',
    Icon:    BookOpen,
  },
  maths: {
    main:    '#5c6bc0',
    bg:      'rgba(92,107,192,0.07)',
    bgHover: 'rgba(92,107,192,0.13)',
    border:  'rgba(92,107,192,0.22)',
    iconBg:  'rgba(92,107,192,0.13)',
    label:   '#3a4898',
    meta:    'rgba(92,107,192,0.72)',
    shadow:  'rgba(92,107,192,0.14)',
    Icon:    Calculator,
  },
  science: {
    main:    '#d97020',
    bg:      'rgba(217,112,32,0.07)',
    bgHover: 'rgba(217,112,32,0.13)',
    border:  'rgba(217,112,32,0.22)',
    iconBg:  'rgba(217,112,32,0.13)',
    label:   '#a8530f',
    meta:    'rgba(217,112,32,0.72)',
    shadow:  'rgba(217,112,32,0.14)',
    Icon:    FlaskConical,
  },
}

const FALLBACK_PALETTE = {
  main: '#6b7280', bg: 'rgba(107,114,128,0.07)', bgHover: 'rgba(107,114,128,0.13)',
  border: 'rgba(107,114,128,0.22)', iconBg: 'rgba(107,114,128,0.13)',
  label: '#374151', meta: 'rgba(107,114,128,0.72)', shadow: 'rgba(107,114,128,0.14)',
  Icon: BookOpen,
}

function SubjectCard({ s, year, navigate }) {
  const [hovered, setHovered] = useState(false)
  const pal = SUBJECT_PALETTE[s.slug] ?? FALLBACK_PALETTE
  const { Icon } = pal

  const catCount = Object.keys(s.categories ?? {}).length
  const unitCount = s.units?.length ?? 0
  const meta = unitCount
    ? `${catCount} categories · ${unitCount} units`
    : `${catCount} categories`

  return (
    <div
      onClick={() => navigate(`/${year}/${s.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:    hovered ? pal.bgHover : pal.bg,
        border:        `1.5px solid ${pal.border}`,
        borderRadius:  14,
        padding:       16,
        cursor:        'pointer',
        transition:    'all 0.12s ease',
        transform:     hovered ? 'translateY(-2px)' : 'none',
        boxShadow:     hovered
          ? `0 4px 14px ${pal.shadow}`
          : '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Icon badge */}
          <div style={{
            width: 40, height: 40,
            borderRadius: 10,
            background: pal.iconBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon size={20} color={pal.main} strokeWidth={1.8} />
          </div>

          <div>
            <p style={{ fontWeight: 600, color: pal.label, fontSize: 15, margin: 0 }}>
              {s.label}
            </p>
            <p style={{ fontSize: 12, color: pal.meta, marginTop: 2, margin: '2px 0 0' }}>
              {meta}
            </p>
          </div>
        </div>

        <ChevronRight size={18} color={pal.main} style={{ opacity: hovered ? 1 : 0.7, flexShrink: 0 }} />
      </div>
    </div>
  )
}

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
            <SubjectCard s={s} year={year} navigate={navigate} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
