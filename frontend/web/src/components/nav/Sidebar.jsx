import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronRight, ChevronDown, X } from 'lucide-react'
import { getSubject, getSubjectList, getCategoryList } from '../../data/syllabus'

function YearPill({ year, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1.5 rounded-full text-sm font-semibold
        transition-all duration-[var(--duration-fast)] border
        ${active
          ? 'bg-accent text-white border-accent'
          : 'bg-bg-2 text-ink-2 border-line hover:border-accent'}
      `}
    >
      {year === 'plus1' ? '+1' : '+2'}
    </button>
  )
}

function SubjectRow({ subject, isOpen, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between
        px-3 py-2.5 rounded-xl text-sm font-semibold
        transition-all duration-[var(--duration-fast)]
        ${isActive
          ? 'bg-accent-soft text-accent-ink'
          : 'text-ink-2 hover:bg-bg-sunk'}
      `}
    >
      <span>{subject.label}</span>
      {isOpen
        ? <ChevronDown size={15} className="text-ink-4" />
        : <ChevronRight size={15} className="text-ink-4" />}
    </button>
  )
}

function CategoryRow({ category, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-2.5
        pl-6 pr-3 py-2 rounded-lg text-sm
        transition-all duration-[var(--duration-fast)]
        ${isActive
          ? 'bg-accent-soft text-accent-ink font-semibold'
          : 'text-ink-3 hover:bg-bg-sunk hover:text-ink'}
      `}
    >
      <span>{category.icon}</span>
      <span>{category.label}</span>
    </button>
  )
}

function UnitRow({ unit, isOpen, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`
        w-full flex items-center gap-2.5
        pl-5 pr-3 py-2 rounded-lg
        transition-all duration-[var(--duration-fast)]
        ${isOpen ? 'text-ink' : 'text-ink-3 hover:bg-bg-sunk hover:text-ink'}
      `}
    >
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
        style={{ background: unit.color }}
      >
        {unit.id}
      </span>
      <span className={`flex-1 text-left text-[13px] ${isOpen ? 'font-semibold' : ''}`}>
        {unit.title}
      </span>
      {isOpen
        ? <ChevronDown size={13} className="text-ink-4 shrink-0" />
        : <ChevronRight size={13} className="text-ink-4 shrink-0" />}
    </button>
  )
}

function LessonSidebarRow({ lesson, unit, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-2 pl-10 pr-3 py-1.5 rounded-lg text-left
        transition-all duration-[var(--duration-fast)]
        ${isActive ? 'bg-bg-sunk' : 'hover:bg-bg-sunk'}
      `}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0 mt-px"
        style={{ background: isActive ? unit.color : 'var(--ink-4)' }}
      />
      <p
        className={`flex-1 min-w-0 text-[12px] leading-snug truncate ${isActive ? 'font-semibold' : ''}`}
        style={{ color: isActive ? unit.color : 'var(--ink-3)' }}
      >
        {lesson.title}
      </p>
    </button>
  )
}

function findActiveUnitId(subjectData, lessonSlug) {
  if (!subjectData?.units) return null
  if (lessonSlug) {
    const hit = subjectData.units.find(u => u.lessons.some(l => l.slug === lessonSlug))
    if (hit) return hit.id
  }
  return subjectData.units[0].id
}

export default function Sidebar({ mobile = false, onClose }) {
  const navigate  = useNavigate()
  const { year = 'plus1', subject, category, lesson } = useParams()
  const [openSubject, setOpenSubject] = useState(subject || null)

  const subjects           = getSubjectList(year)
  const currentSubjectData = subject ? getSubject(year, subject) : null

  const [openUnit, setOpenUnit] = useState(() =>
    findActiveUnitId(currentSubjectData, lesson)
  )

  function handleYear(y) {
    navigate(`/${y}`)
    if (mobile && onClose) onClose()
  }

  function handleSubject(y, s) {
    setOpenSubject(openSubject === s ? null : s)
    const newSubjectData = getSubject(y, s)
    setOpenUnit(findActiveUnitId(newSubjectData, null))
    navigate(`/${y}/${s}`)
  }

  function handleCategory(y, s, c) {
    navigate(`/${y}/${s}/${c}`)
    if (mobile && onClose) onClose()
  }

  function handleUnit(unit) {
    setOpenUnit(prev => prev === unit.id ? null : unit.id)
  }

  function handleLesson(y, s, l) {
    navigate(`/${y}/${s}/${l.category}/${l.slug}/text`)
    if (mobile && onClose) onClose()
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-line-soft">
        <div>
          <p className="text-sm font-bold text-ink">Tamil Nadu Board</p>
          <p className="text-xs text-ink-4 mt-0.5">State Syllabus</p>
        </div>
        {mobile && (
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center
                       rounded-full hover:bg-bg-sunk text-ink-3"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Year toggle */}
      <div className="flex gap-2 px-4 py-3 border-b border-line-soft">
        <YearPill year="plus1" active={year === 'plus1'} onClick={() => handleYear('plus1')} />
        <YearPill year="plus2" active={year === 'plus2'} onClick={() => handleYear('plus2')} />
      </div>

      {/* Subject + Unit/Category tree */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1 scrollbar-none">
        {subjects.map(s => {
          const isSubjectOpen   = openSubject === s.slug
          const isSubjectActive = subject === s.slug
          const subjectData     = getSubject(year, s.slug)
          const hasUnits        = Boolean(subjectData?.units)

          return (
            <div key={s.slug}>
              <SubjectRow
                subject={s}
                isOpen={isSubjectOpen}
                isActive={isSubjectActive}
                onClick={() => handleSubject(year, s.slug)}
              />

              {isSubjectOpen && (
                <div className="mt-1 mb-2 space-y-0.5">
                  {hasUnits ? (
                    subjectData.units.map(unit => (
                      <div key={unit.id}>
                        <UnitRow
                          unit={unit}
                          isOpen={openUnit === unit.id}
                          onToggle={() => handleUnit(unit)}
                        />
                        {openUnit === unit.id && (
                          <div className="mt-0.5 mb-1 space-y-0.5">
                            {unit.lessons.map(l => (
                              <LessonSidebarRow
                                key={l.slug}
                                lesson={l}
                                unit={unit}
                                isActive={lesson === l.slug}
                                onClick={() => handleLesson(year, s.slug, l)}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    getCategoryList(year, s.slug).map(c => (
                      <CategoryRow
                        key={c.slug}
                        category={c}
                        isActive={subject === s.slug && category === c.slug}
                        onClick={() => handleCategory(year, s.slug, c.slug)}
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-line-soft">
        <p className="text-xs text-ink-4 text-center">
          TNBSE · {year === 'plus1' ? '+1' : '+2'} Syllabus
        </p>
      </div>
    </div>
  )
}
