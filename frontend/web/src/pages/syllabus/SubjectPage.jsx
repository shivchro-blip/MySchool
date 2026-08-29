import { useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, BookOpen, MessageCircle, LayoutGrid } from 'lucide-react'
import { getSubject, getCategoryList, SYLLABUS } from '../../data/syllabus'
import { getCachedProfile } from '../../api/users'
import { getAllowedYearKey, isSubjectAllowed } from '../../lib/userAccess'
import { buildBreadcrumbs } from '../../lib/nav'
import { Card, PageHeader } from '../../components/ui'
import { Breadcrumb } from '../../components/nav'
import NotFound from './NotFound'
import FinalExamPrepEntryCard from './FinalExamPrepEntryCard'

const UNIT_STYLE = { color: '#1B4B82', light: 'var(--accent-soft)' }

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
        borderTop: `1px solid ${UNIT_STYLE.color}33`,
        background: hov ? UNIT_STYLE.light : 'transparent',
        transition: 'background 0.15s',
      }}
    >
      {/* Icon */}
      <div
        className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0"
        style={{ background: UNIT_STYLE.light, border: `1px solid ${UNIT_STYLE.color}55` }}
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
      className={isOpen ? 'unit-card-expanded' : ''}
      style={{
        borderRadius: 18,
        overflow: 'hidden',
        background: 'var(--bg-2)',
        border: `1.5px solid ${isOpen ? UNIT_STYLE.color : hov ? UNIT_STYLE.color + '77' : 'var(--line)'}`,
        boxShadow: isOpen
          ? `0 8px 32px ${UNIT_STYLE.color}18`
          : hov ? `0 4px 16px ${UNIT_STYLE.color}12` : 'var(--shadow-sm)',
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
          background: isOpen ? UNIT_STYLE.light : 'var(--bg-2)',
          transition: 'background 0.2s',
        }}
      >
        {/* Number badge */}
        <div
          className="w-[46px] h-[46px] rounded-[13px] flex items-center justify-center shrink-0"
          style={{ background: 'var(--brand-teal)', boxShadow: '0 3px 10px #2A7B6F44' }}
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
        background: 'color-mix(in srgb, var(--brand-blue) 6%, var(--bg-2))',
        border: `1.5px solid ${UNIT_STYLE.color}${hov ? '55' : '22'}`,
        boxShadow: hov ? `0 6px 24px ${UNIT_STYLE.color}18` : `0 2px 8px ${UNIT_STYLE.color}0a`,
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span
        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold mb-2"
        style={{
          border: `1.5px solid ${UNIT_STYLE.color}66`,
          color: UNIT_STYLE.color,
          background: 'color-mix(in srgb, var(--brand-blue) 8%, var(--bg-2))',
        }}
      >
        Previous Year Papers
      </span>

      <p className="text-base font-bold leading-snug mb-1" style={{ color: UNIT_STYLE.color }}>
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
            style={{ background: UNIT_STYLE.color, color: 'var(--surface)', opacity: hov ? 1 : 0.88 }}
          >
            {ey}
          </button>
        ))}
      </div>
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
          <div className="max-w-[680px]">
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

  // ── Chapter row (Computer Applications grid) ─────────────────────────────────
function ChapterRow({ ch, year, subject }) {
  const navigate = useNavigate()
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex items-center gap-3.5 px-[18px] py-[13px]"
      style={{
        borderRadius: 14,
        border: `1px solid ${UNIT_STYLE.color}33`,
        background: hov ? UNIT_STYLE.light : 'var(--bg-2)',
        transition: 'background 0.15s',
      }}
    >
      <div
        className="w-[46px] h-[46px] rounded-[13px] flex items-center justify-center shrink-0"
        style={{ background: UNIT_STYLE.color }}
      >
        <span className="text-white font-extrabold text-[15px] tracking-tight">
          {ch.number}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary leading-snug truncate">
          {ch.title}
        </p>
        <p className="text-[12px] font-semibold tracking-[0.08em] uppercase mt-0.5 syllabus-lesson-type">
          Theory
        </p>
      </div>

      <div className="flex gap-1.5 shrink-0">
        <button
          onClick={() => navigate(`/${year}/${subject}/chapters/${ch.slug}`)}
          className="px-3.5 py-1.5 rounded-[14px] text-white text-xs font-semibold transition-opacity"
          style={{ background: UNIT_STYLE.color, opacity: hov ? 1 : 0.88 }}
        >
          Learn
        </button>
        <button
          onClick={() => navigate(`/${year}/${subject}/chapters/${ch.slug}/practice`)}
          className="px-3.5 py-1.5 rounded-[14px] text-xs font-semibold"
          style={{
            border: `1.5px solid ${UNIT_STYLE.color}`,
            color: UNIT_STYLE.color,
            background: 'var(--bg-2)',
          }}
        >
          Practice
        </button>
      </div>
    </div>
  )
}

// ── Chapter list layout (subjects authored as type:'chapters', e.g. Maths) ──
  if (subjectData.chapters) {
    return (
      <div>
        <PageHeader
          breadcrumb={<Breadcrumb crumbs={crumbs} />}
          title={subjectData.label}
          subtitle="Select a chapter"
        />

        <div className="max-w-[680px]">
          {/* Final Exam Prep */}
          {(subject === 'computer-applications' && (year === 'plus2' || year === 'plus1')) ||
          (subject === 'computer-science' && (year === 'plus2' || year === 'plus1')) ||
          (subject === 'computer-applications-tamil' && (year === 'plus2' || year === 'plus1')) ||
          (subject === 'computer-science-tamil' && year === 'plus2') ? (
            <FinalExamPrepEntryCard
              dest={`/${year}/${subject}/final-exam-prep`}
              classLabel={year === 'plus2' ? 'Class 12' : 'Class 11'}
              subjectLabel={
                subject === 'computer-science' ? 'Computer Science' :
                subject === 'computer-applications-tamil' ? 'Computer Applications (தமிழ்)' :
                subject === 'computer-science-tamil' ? 'Computer Science (தமிழ்)' :
                'Computer Applications'
              }
            />
          ) : (
            <div
              className="flex items-center gap-4 sm:gap-6 px-5 py-4 sm:px-6 sm:py-5 mb-3 border border-border"
              style={{ borderRadius: 18, background: 'var(--surface)' }}
            >
              <div className="flex-1 min-w-0">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold mb-2 text-text-tertiary border border-border">
                  Final Exam Prep
                </span>
                <p className="text-base font-bold leading-snug mb-1 text-text-tertiary">
                  Final Exam Prep — Coming Soon
                </p>
                <p className="text-xs leading-relaxed max-w-[440px] text-text-tertiary">
                  Past papers and smart revision plans for {subjectData.label} will be available here.
                </p>
              </div>
            </div>
          )}

          {/* Previous Year Papers — placeholder */}
          <div
            className="px-5 py-4 sm:px-6 sm:py-5 mb-3 border border-border"
            style={{ borderRadius: 18, background: 'var(--surface)' }}
          >
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold mb-2 text-text-tertiary border border-border">
              Previous Year Papers
            </span>
            <p className="text-base font-bold leading-snug mb-1 text-text-tertiary">
              Previous Year Papers — Coming Soon
            </p>
            <p className="text-xs leading-relaxed max-w-[440px] text-text-tertiary">
              Annual exam papers for Computer Applications will be added soon.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {subjectData.chapters.map((ch, i) => (
            <motion.div
              key={ch.slug}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <ChapterRow ch={ch} year={year} subject={subject} />
            </motion.div>
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
