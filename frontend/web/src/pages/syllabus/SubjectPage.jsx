import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, BookOpen, MessageCircle, LayoutGrid } from 'lucide-react'
import { getSubject, getCategoryList, SYLLABUS } from '../../data/syllabus'
import { buildBreadcrumbs } from '../../lib/nav'
import { Card } from '../../components/ui'
import { Breadcrumb } from '../../components/nav'
import NotFound from './NotFound'

const TYPE_ICON = {
  prose:         (color) => <BookOpen    size={16} strokeWidth={1.8} style={{ color }} />,
  poem:          (color) => <MessageCircle size={16} strokeWidth={1.8} style={{ color }} />,
  supplementary: (color) => <LayoutGrid  size={16} strokeWidth={1.8} style={{ color }} />,
}

// ── Lesson row inside expanded unit ──────────────────────────────────────────
function LessonRow({ lesson, unit, year, subject }) {
  const navigate = useNavigate()
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex items-center gap-3.5 px-[18px] py-[13px]"
      style={{
        borderTop: `1px solid ${unit.color}33`,
        background: hov ? unit.light : 'transparent',
        transition: 'background 0.15s',
      }}
    >
      {/* Icon */}
      <div
        className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0"
        style={{ background: unit.light, border: `1px solid ${unit.color}55` }}
      >
        {TYPE_ICON[lesson.tag]?.(unit.color)}
      </div>

      {/* Type + title */}
      <div className="flex-1 min-w-0">
        <p
          className="text-[10px] font-bold tracking-[0.08em] uppercase mb-0.5"
          style={{ color: unit.color }}
        >
          {lesson.type}
        </p>
        <p className="text-sm font-semibold text-ink leading-snug truncate">
          {lesson.title}
        </p>
      </div>

      {/* Learn / Practice buttons */}
      <div className="flex gap-1.5 shrink-0">
        <button
          onClick={() => navigate(`/${year}/${subject}/${lesson.category}/${lesson.slug}`)}
          className="px-3.5 py-1.5 rounded-[14px] text-white text-xs font-semibold transition-opacity"
          style={{ background: unit.color, opacity: hov ? 1 : 0.88 }}
        >
          Learn
        </button>
        <button
          onClick={() => navigate(`/${year}/${subject}/${lesson.category}/${lesson.slug}/practice`)}
          className="px-3.5 py-1.5 rounded-[14px] text-xs font-semibold"
          style={{
            border: `1.5px solid ${unit.color}`,
            color: unit.color,
            background: 'var(--bg-2)',
          }}
        >
          Practice
        </button>
      </div>
    </div>
  )
}

// ── Accordion unit card ───────────────────────────────────────────────────────
function UnitCard({ unit, isOpen, onToggle, year, subject }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      style={{
        borderRadius: 18,
        overflow: 'hidden',
        background: 'var(--bg-2)',
        border: `1.5px solid ${isOpen ? unit.color : hov ? unit.color + '77' : 'var(--line)'}`,
        boxShadow: isOpen
          ? `0 8px 32px ${unit.color}18`
          : hov ? `0 4px 16px ${unit.color}12` : '0 1px 4px rgba(0,0,0,0.04)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
    >
      {/* Header */}
      <div
        onClick={onToggle}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="flex items-center gap-4 px-[22px] py-[18px] cursor-pointer"
        style={{
          background: isOpen ? unit.light : 'var(--bg-2)',
          transition: 'background 0.2s',
        }}
      >
        {/* Number badge */}
        <div
          className="w-[46px] h-[46px] rounded-[13px] flex items-center justify-center shrink-0"
          style={{ background: unit.color, boxShadow: `0 3px 10px ${unit.color}44` }}
        >
          <span className="text-white font-extrabold text-[15px] tracking-tight">
            {unit.id}
          </span>
        </div>

        {/* Title + type pills */}
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-ink mb-1.5">{unit.title}</p>
          <div className="flex gap-1.5 flex-wrap">
            {unit.lessons.map(l => (
              <span
                key={l.tag}
                className="text-[11px] font-medium px-2 py-0.5 rounded-[10px]"
                style={{ color: unit.color, background: unit.light, border: `1px solid ${unit.color}55` }}
              >
                {l.type}
              </span>
            ))}
          </div>
        </div>

        {/* Chevron */}
        <ChevronRight
          size={18}
          style={{
            color: unit.color,
            flexShrink: 0,
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease',
          }}
        />
      </div>

      {/* Expanded lesson rows */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            {unit.lessons.map(lesson => (
              <LessonRow
                key={lesson.slug}
                lesson={lesson}
                unit={unit}
                year={year}
                subject={subject}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── SubjectPage ───────────────────────────────────────────────────────────────
export default function SubjectPage() {
  const { year, subject } = useParams()
  const navigate          = useNavigate()
  const subjectData       = getSubject(year, subject)
  const categories        = getCategoryList(year, subject)
  const crumbs            = buildBreadcrumbs(year, subject, null, null, null, SYLLABUS)

  const [openUnit, setOpenUnit] = useState(
    subjectData?.units ? subjectData.units[0].id : null
  )

  if (!subjectData) return <NotFound message={`Subject "${subject}" not found`} />

  // ── Unit accordion layout (English) ──
  if (subjectData.units) {
    return (
      <div>
        <Breadcrumb crumbs={crumbs} />

        <div className="mb-8">
          <h1 className="font-serif text-[28px] font-normal text-ink mb-1">
            {subjectData.label}
          </h1>
          <p className="text-sm text-ink-3">Select a unit to explore its lessons</p>
        </div>

        <div className="flex flex-col gap-3 max-w-[680px]">
          {subjectData.units.map(unit => (
            <UnitCard
              key={unit.id}
              unit={unit}
              isOpen={openUnit === unit.id}
              onToggle={() => setOpenUnit(prev => prev === unit.id ? null : unit.id)}
              year={year}
              subject={subject}
            />
          ))}
        </div>
      </div>
    )
  }

  // ── Category cards layout (Maths, Science, etc.) ──
  return (
    <div>
      <Breadcrumb crumbs={crumbs} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink">{subjectData.label}</h1>
        <p className="text-sm text-ink-3 mt-1">Choose a category</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {categories.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card
              interactive
              padding="lg"
              onClick={() => navigate(`/${year}/${subject}/${c.slug}`)}
            >
              <div className="text-3xl mb-3">{c.icon}</div>
              <p className="font-semibold text-ink">{c.label}</p>
              <p className="text-xs text-ink-4 mt-1">
                {c.lessons.length} lesson{c.lessons.length !== 1 ? 's' : ''}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
