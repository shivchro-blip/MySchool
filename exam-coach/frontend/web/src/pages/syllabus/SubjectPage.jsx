import { useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, BookOpen, MessageCircle, LayoutGrid } from 'lucide-react'
import { getSubject, getCategoryList, SYLLABUS } from '../../data/syllabus'
import registry from '../../content/registry'
import practiceRegistry from '../../content/practiceRegistry'
import { getCachedProfile } from '../../api/users'
import { getAllowedYearKey, isSubjectAllowed } from '../../lib/userAccess'
import { buildBreadcrumbs } from '../../lib/nav'
import { Card, PageHeader } from '../../components/ui'
import { Breadcrumb } from '../../components/nav'
import NotFound from './NotFound'
import FinalExamPrepEntryCard from './FinalExamPrepEntryCard'

const UNIT_STYLE = { color: 'var(--lesson-accent)', light: 'var(--lesson-accent-soft)' }

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
        borderTop: '1px solid var(--lesson-accent-a20)',
        background: hov ? UNIT_STYLE.light : 'transparent',
        transition: 'background 0.15s',
      }}
    >
      {/* Icon */}
      <div
        className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0"
        style={{ background: UNIT_STYLE.light, border: '1px solid var(--lesson-accent-a33)' }}
      >
        {TYPE_ICON[lesson.tag]?.(UNIT_STYLE.color)}
      </div>

      {/* Type + title */}
      <div className="flex-1 min-w-0">
        <p
          className="text-[12px] font-semibold tracking-[0.08em] uppercase mb-0.5 syllabus-lesson-type"
        >
          {lesson.type}
        </p>
        <p className="text-sm font-semibold text-text-primary leading-snug truncate">
          {lesson.title}
        </p>
      </div>

      {/* Learn / Practice buttons */}
      <div className="flex gap-1.5 shrink-0">
        <button
          onClick={() => navigate(`/${year}/${subject}/${lesson.category}/${lesson.slug}`)}
          className="px-3.5 py-1.5 rounded-[14px] text-white text-xs font-semibold transition-opacity"
          style={{ background: UNIT_STYLE.color, opacity: hov ? 1 : 0.88 }}
        >
          Learn
        </button>
        <button
          onClick={() => navigate(`/${year}/${subject}/${lesson.category}/${lesson.slug}/practice`)}
          className="px-3.5 py-1.5 rounded-[14px] text-xs font-semibold"
          style={{
            border: `1.5px solid ${UNIT_STYLE.color}`,
            color: UNIT_STYLE.color,
            background: 'var(--surface-alt)',
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
        background: 'var(--surface-alt)',
        border: `1.5px solid ${isOpen ? 'var(--lesson-accent)' : hov ? 'var(--lesson-accent-a47)' : 'var(--line)'}`,
        boxShadow: isOpen
          ? '0 8px 32px var(--lesson-accent-a10)'
          : hov ? '0 4px 16px var(--lesson-accent-a07)' : 'var(--shadow-sm)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        gridColumn: isOpen ? '1 / -1' : 'auto',
      }}
    >
      {/* Header */}
      <div
        onClick={onToggle}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="flex items-center gap-4 px-[22px] py-[18px] cursor-pointer"
        style={{
          background: isOpen ? UNIT_STYLE.light : 'var(--surface-alt)',
          transition: 'background 0.2s',
        }}
      >
        {/* Number badge */}
        <div
          className="w-[46px] h-[46px] rounded-[13px] flex items-center justify-center shrink-0"
          style={{ background: 'var(--lesson-accent)', boxShadow: '0 3px 10px var(--lesson-accent-a27)' }}
        >
          <span className="text-white font-extrabold text-[15px] tracking-tight">
            {unit.id}
          </span>
        </div>

        {/* Title + type pills */}
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-text-primary mb-1.5">{unit.title}</p>
          <div className="flex gap-1.5 flex-wrap">
            {unit.lessons.map(l => (
              <span
                key={l.tag}
                className="text-[11px] font-medium px-2 py-0.5 rounded-[10px] syllabus-unit-pill"
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
            color: UNIT_STYLE.color,
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

// ── Previous Year Exam Papers card ───────────────────────────────────────────
const EXAM_YEARS = ['2025', '2024', '2023', '2022']

function ExamPapersCard({ year }) {
  const navigate = useNavigate()
  const [hov, setHov] = useState(false)

  return (
    <div
      className="px-5 py-4 sm:px-6 sm:py-5 mb-3"
      style={{
        borderRadius: 18,
        background: 'color-mix(in srgb, var(--brand-blue) 6%, var(--surface-alt))',
        border: `1.5px solid ${hov ? 'var(--lesson-accent-a33)' : 'var(--lesson-accent-a13)'}`,
        boxShadow: hov ? '0 6px 24px var(--lesson-accent-a10)' : '0 2px 8px var(--lesson-accent-a07)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span
        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold mb-2"
        style={{
          border: '1.5px solid var(--lesson-accent-a40)',
          color: 'var(--lesson-accent)',
          background: 'color-mix(in srgb, var(--brand-blue) 8%, var(--surface-alt))',
        }}
      >
        Previous Year Papers
      </span>

      <p className="text-base font-bold leading-snug mb-1" style={{ color: 'var(--lesson-accent)' }}>
        Practice with Real Exam Papers
      </p>
      <p className="text-xs leading-relaxed mb-3 max-w-[440px]" style={{ color: 'var(--text-secondary)' }}>
        Attempt full annual exam papers and get instant feedback on your answers.
      </p>

      <div className="flex gap-2 flex-wrap">
        {EXAM_YEARS.map(ey => (
          <button
            key={ey}
            onClick={() => navigate(`/${year}/english/exam/${ey}`)}
            className="px-4 py-1.5 rounded-[14px] text-sm font-semibold transition-opacity"
            style={ey === '2025'
              ? { background: 'var(--lesson-accent)', color: 'var(--surface)', opacity: hov ? 1 : 0.88 }
              : { background: 'transparent', color: 'var(--lesson-accent)', border: '1.5px solid var(--lesson-accent-a47)', opacity: hov ? 1 : 0.88 }
            }
          >
            {ey}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Chapter row for Maths ─────────────────────────────────────────────────────
function ChapterRow({ chapter, year, subject, hasLearn, hasPractice }) {
  const navigate = useNavigate()
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex items-center gap-3.5 px-[18px] py-[13px]"
      style={{
        borderTop: '1px solid var(--lesson-accent-a20)',
        background: hov ? UNIT_STYLE.light : 'transparent',
        transition: 'background 0.15s',
      }}
    >
      {/* Number badge */}
      <div
        className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0 text-[13px] font-extrabold"
        style={{ background: UNIT_STYLE.light, border: '1px solid var(--lesson-accent-a33)', color: 'var(--lesson-accent)' }}
      >
        {chapter.number}
      </div>

      {/* Label + title */}
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-semibold tracking-[0.08em] uppercase mb-0.5 syllabus-lesson-type">
          Mathematics
        </p>
        <p className="text-sm font-semibold text-text-primary leading-snug">
          {chapter.title}
        </p>
      </div>

      {/* Learn / Practice buttons */}
      <div className="flex gap-1.5 shrink-0">
        <button
          onClick={() => hasLearn && navigate(`/courses/${year}/${subject}/${chapter.slug}`)}
          disabled={!hasLearn}
          className="px-3.5 py-1.5 rounded-[14px] text-white text-xs font-semibold transition-opacity"
          style={{
            background: UNIT_STYLE.color,
            opacity: hasLearn ? (hov ? 1 : 0.88) : 0.35,
            cursor: hasLearn ? 'pointer' : 'not-allowed',
          }}
        >
          Learn
        </button>
        <button
          onClick={() => hasPractice && navigate(`/courses/${year}/${subject}/${chapter.slug}/practice`)}
          disabled={!hasPractice}
          className="px-3.5 py-1.5 rounded-[14px] text-xs font-semibold"
          style={{
            border: `1.5px solid ${hasPractice ? UNIT_STYLE.color : 'var(--line)'}`,
            color: hasPractice ? UNIT_STYLE.color : 'var(--text-tertiary)',
            background: 'var(--surface-alt)',
            opacity: hasPractice ? 1 : 0.45,
            cursor: hasPractice ? 'pointer' : 'not-allowed',
          }}
        >
          Practice
        </button>
      </div>
    </div>
  )
}

// ── Volume divider ────────────────────────────────────────────────────────────
function VolumeDivider({ label }) {
  return (
    <div
      className="flex items-center gap-3 px-[18px] py-[9px]"
      style={{ borderTop: '1px solid var(--lesson-accent-a20)' }}
    >
      <div className="flex-1 h-px" style={{ background: 'var(--line)' }} />
      <span
        className="text-[11px] font-semibold tracking-[0.1em] uppercase"
        style={{ color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}
      >
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: 'var(--line)' }} />
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

  const [profile, setProfile]           = useState(null)
  const [profileLoaded, setProfileLoaded] = useState(false)

  useEffect(() => {
    getCachedProfile().then(p => { setProfile(p); setProfileLoaded(true) })
  }, [])

  const [openUnit, setOpenUnit] = useState(
    subjectData?.units ? subjectData.units[0].id : null
  )

  if (!subjectData) return <NotFound message={`Subject "${subject}" not found`} />

  // Redirect if the year or subject is not in the user's selections
  const allowedYearKey = getAllowedYearKey(profile)
  if (profileLoaded) {
    if (allowedYearKey && year !== allowedYearKey) {
      return <Navigate to={`/${allowedYearKey}`} replace />
    }
    if (!isSubjectAllowed(profile, subject)) {
      return <Navigate to={`/${year}`} replace />
    }
  }

  // ── Unit accordion layout (English) ──
  if (subjectData.units) {
    return (
      <div>
        <PageHeader
          breadcrumb={<Breadcrumb crumbs={crumbs} />}
          title={subjectData.label}
          subtitle="Select a unit to explore its lessons"
        />

        {subject === 'english' && (year === 'plus1' || year === 'plus2') && (
          <div>
            <FinalExamPrepEntryCard
              dest={`/${year}/english/final-exam-prep`}
              classLabel={year === 'plus2' ? 'Class 12' : 'Class 11'}
            />
            <ExamPapersCard year={year} />
          </div>
        )}

        <div className="unit-grid">
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

  // ── Chapters layout (Maths) ──
  if (subjectData.type === 'chapters') {
    const chapters = subjectData.chapters ?? []
    const vol1 = chapters.filter(c => c.volume === 1)
    const vol2 = chapters.filter(c => c.volume === 2)

    return (
      <div>
        <PageHeader
          breadcrumb={<Breadcrumb crumbs={crumbs} />}
          title={subjectData.label}
          subtitle="Select a chapter to study"
        />

        <div
          style={{
            borderRadius: 18,
            overflow: 'hidden',
            background: 'var(--surface-alt)',
            border: '1.5px solid var(--lesson-accent)',
            boxShadow: '0 8px 32px var(--lesson-accent-a10)',
          }}
        >
          <VolumeDivider label="Volume I" />
          {vol1.map(ch => (
            <ChapterRow
              key={ch.slug}
              chapter={ch}
              year={year}
              subject={subject}
              hasLearn={!!registry[ch.slug]}
              hasPractice={!!practiceRegistry[ch.slug]}
            />
          ))}

          <VolumeDivider label="Volume II" />
          {vol2.map(ch => (
            <ChapterRow
              key={ch.slug}
              chapter={ch}
              year={year}
              subject={subject}
              hasLearn={!!registry[ch.slug]}
              hasPractice={!!practiceRegistry[ch.slug]}
            />
          ))}
        </div>
      </div>
    )
  }

  // ── Category cards layout (Maths, Science, etc.) ──
  return (
    <div>
      <PageHeader
        breadcrumb={<Breadcrumb crumbs={crumbs} />}
        title={subjectData.label}
        subtitle="Choose a category"
      />

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
              <p className="font-semibold text-text-primary">{c.label}</p>
              <p className="text-xs text-text-tertiary mt-1">
                {c.lessons.length} lesson{c.lessons.length !== 1 ? 's' : ''}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
