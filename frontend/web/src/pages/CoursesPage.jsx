import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate, useSearchParams }              from 'react-router-dom'
import { motion }                                    from 'framer-motion'
import PropTypes                                     from 'prop-types'
import { ChevronRight }                              from 'lucide-react'
import { getSubjects, getChapters }                  from '../api/syllabus'
import { useUser }                                   from '../auth/useUser'
import { PageShell }                                 from '../components/layout/index.js'
import { Eyebrow, SkeletonCard }                     from '../components/ui/index.js'

// ── Subject color (stable by ID — hash so order changes don't shift hues) ─────
function subjectHue(subjectId) {
  const s = String(subjectId)
  let sum = 0
  for (let i = 0; i < s.length; i++) sum = (sum + s.charCodeAt(i) * (i + 1)) % 300
  return 30 + sum
}

// ── SubjectPill ───────────────────────────────────────────────────────────────

function SubjectPill({ subject, active, onSelect }) {
  const hue = subjectHue(subject.id)
  return (
    <button
      onClick={onSelect}
      aria-pressed={active}
      className={`h-9 px-4 rounded-full text-sm font-semibold whitespace-nowrap shrink-0 flex items-center gap-2 transition-all duration-[var(--duration-fast)] border ${
        active
          ? 'bg-bg-2 border-line text-ink'
          : 'bg-bg-sunk border-transparent text-ink-2'
      }`}
    >
      {active && (
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: `oklch(0.50 0.10 ${hue})` }}
          aria-hidden="true"
        />
      )}
      {subject.name}
    </button>
  )
}

SubjectPill.propTypes = {
  subject:  PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }).isRequired,
  active:   PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
}

// ── SubjectRailItem ───────────────────────────────────────────────────────────

function SubjectRailItem({ subject, active, onSelect }) {
  const hue = subjectHue(subject.id)
  return (
    <button
      onClick={onSelect}
      aria-pressed={active}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-left transition-all duration-[var(--duration-fast)] border ${
        active
          ? 'bg-bg-2 border-line text-ink font-semibold'
          : 'border-transparent text-ink-2 hover:bg-bg-sunk'
      }`}
    >
      <span
        className="w-2.5 h-2.5 rounded-full shrink-0"
        style={{ background: `oklch(0.50 0.10 ${hue})` }}
        aria-hidden="true"
      />
      <span className="flex-1 min-w-0 truncate">{subject.name}</span>
    </button>
  )
}

SubjectRailItem.propTypes = {
  subject:  PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }).isRequired,
  active:   PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
}

// ── UnitCard ──────────────────────────────────────────────────────────────────

function UnitCard({ unit, isFirst, hue, onClick, index }) {
  const softColor = `oklch(0.93 0.04 ${hue})`
  const inkColor  = `oklch(0.40 0.10 ${hue})`
  const barColor  = `oklch(0.50 0.10 ${hue})`

  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.18 }}
      onClick={onClick}
      className={`w-full text-left bg-bg-2 rounded-md p-4 transition-all duration-[var(--duration-fast)] hover:-translate-y-0.5 active:scale-[0.99] border ${
        isFirst ? 'border-accent ring-[1.5px] ring-accent' : 'border-line-soft'
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0 mt-0.5"
          style={{ background: softColor, color: inkColor }}
        >
          Unit {unit.n}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-ink leading-snug">
            {unit.chapters.length} {unit.chapters.length === 1 ? 'text' : 'texts'}
          </p>
          <p className="text-[11px] text-ink-3 mt-0.5 line-clamp-1">
            {unit.chapters.map((ch) => ch.title).join(' · ')}
          </p>
        </div>
        <ChevronRight size={16} className="text-ink-4 shrink-0 mt-0.5" aria-hidden="true" />
      </div>

      <div
        className="mt-3 h-1 bg-bg-sunk rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Unit ${unit.n} progress`}
      >
        <div
          className="h-full rounded-full"
          style={{ width: '0%', background: barColor }}
        />
      </div>
      <p className="text-[11px] text-ink-3 mt-1">
        0 / {unit.chapters.length} completed
      </p>
    </motion.button>
  )
}

UnitCard.propTypes = {
  unit:    PropTypes.shape({ n: PropTypes.number, chapters: PropTypes.array }).isRequired,
  isFirst: PropTypes.bool,
  hue:     PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  index:   PropTypes.number.isRequired,
}

// ── CoursesPage ───────────────────────────────────────────────────────────────

export default function CoursesPage() {
  const navigate                        = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const user                            = useUser()

  const [subjects,        setSubjects]        = useState([])
  const [chapters,        setChapters]        = useState([])
  const [loadingSubjects, setLoadingSubjects] = useState(true)
  const [loadingChapters, setLoadingChapters] = useState(false)
  const [error,           setError]           = useState('')

  useEffect(() => {
    getSubjects()
      .then((all) => {
        setSubjects(all)
        setSearchParams((prev) => {
          if (!prev.get('subject') && all.length > 0) {
            return { subject: all[0].slug }
          }
          return prev
        }, { replace: true })
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoadingSubjects(false))
  }, [setSearchParams])

  const selectedSlug    = searchParams.get('subject')
  const selectedSubject = subjects.find((s) => s.slug === selectedSlug) ?? subjects[0] ?? null

  useEffect(() => {
    if (!selectedSubject?.slug) return
    setLoadingChapters(true)
    setChapters([])
    getChapters(selectedSubject.slug)
      .then(setChapters)
      .catch((e) => setError(e.message))
      .finally(() => setLoadingChapters(false))
  }, [selectedSubject?.slug])

  const units = useMemo(() => {
    const map = {}
    chapters.forEach((ch) => {
      const u = Math.ceil((ch.number || 1) / 3)
      if (!map[u]) map[u] = []
      map[u].push(ch)
    })
    return Object.entries(map)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([n, chs]) => ({ n: Number(n), chapters: chs }))
  }, [chapters])

  const selectSubject = useCallback((slug) => {
    setSearchParams({ subject: slug })
  }, [setSearchParams])

  const goToChapterList = useCallback(() => {
    if (!selectedSubject) return
    navigate(
      `/courses/${encodeURIComponent(selectedSubject.class)}/${selectedSubject.slug}`,
      { state: { subjectName: selectedSubject.name, subjectClass: selectedSubject.class } },
    )
  }, [navigate, selectedSubject])

  const hue = selectedSubject ? subjectHue(selectedSubject.id) : 200

  return (
    <PageShell noPad>
      <div className="flex flex-col min-[900px]:flex-row">

        {/* ── Phone: eyebrow + horizontal pill strip ────────────────────── */}
        <div className="min-[900px]:hidden px-4 pt-5 pb-0">
          <Eyebrow className="mb-3">Class {user.classLevel} · {user.boardLabel}</Eyebrow>

          {loadingSubjects ? (
            <div className="flex gap-2 pb-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-9 w-24 bg-bg-sunk rounded-full animate-pulse shrink-0" />
              ))}
            </div>
          ) : (
            <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-none">
              {subjects.map((s) => (
                <SubjectPill
                  key={s.id}
                  subject={s}
                  active={s.slug === selectedSlug}
                  onSelect={() => selectSubject(s.slug)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Desktop: subject rail ──────────────────────────────────────── */}
        <div
          className="hidden min-[900px]:flex flex-col shrink-0 border-r border-line-soft overflow-y-auto p-6"
          style={{ width: 'var(--rail-subject)' }}
        >
          <Eyebrow className="mb-1">Class {user.classLevel} · {user.boardLabel}</Eyebrow>
          <h2 className="font-serif text-[22px] font-semibold text-ink mb-4 mt-1">
            Your subjects
          </h2>

          {loadingSubjects ? (
            <div className="space-y-2">
              {[1, 2].map((i) => (
                <div key={i} className="h-10 bg-bg-sunk rounded-md animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {subjects.map((s) => (
                <SubjectRailItem
                  key={s.id}
                  subject={s}
                  active={s.slug === selectedSlug}
                  onSelect={() => selectSubject(s.slug)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Detail area ────────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0 px-4 min-[900px]:px-8 pt-4 min-[900px]:pt-6">

          {error && (
            <div role="alert" className="bg-warn-soft border border-warn rounded-md p-4 mb-5 text-sm text-warn">
              {error}
            </div>
          )}

          {selectedSubject && (
            <>
              {/* Breadcrumb */}
              <p className="font-mono text-[11px] text-ink-3 mb-3">
                {user.boardLabel} › {selectedSubject.name}
              </p>

              {/* H1 */}
              <h1 className="font-serif text-[28px] min-[900px]:text-[40px] font-semibold text-ink leading-tight mb-4">
                {selectedSubject.name}
              </h1>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'Units', value: loadingChapters ? '—' : units.length },
                  { label: 'Texts', value: loadingChapters ? '—' : chapters.length },
                  { label: 'Done',  value: '0%' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-bg-2 rounded-md p-3 border border-line-soft text-center">
                    <p className="font-serif text-xl min-[900px]:text-[28px] font-semibold text-ink leading-none mb-1">
                      {stat.value}
                    </p>
                    <Eyebrow>{stat.label}</Eyebrow>
                  </div>
                ))}
              </div>

              {/* Units section */}
              <Eyebrow className="mb-3 block">All units</Eyebrow>

              {loadingChapters ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
                </div>
              ) : units.length === 0 ? (
                <p className="text-sm text-ink-3 py-8 text-center">
                  No chapters found for this subject.
                </p>
              ) : (
                <div className="space-y-2 min-[1200px]:grid min-[1200px]:grid-cols-2 min-[1200px]:gap-3 min-[1200px]:space-y-0">
                  {units.map((unit, idx) => (
                    <UnitCard
                      key={unit.n}
                      unit={unit}
                      index={idx}
                      isFirst={idx === 0}
                      hue={hue}
                      onClick={goToChapterList}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </PageShell>
  )
}
