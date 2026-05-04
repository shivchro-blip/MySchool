import { useState, useEffect, useCallback }       from 'react'
import { useNavigate }                             from 'react-router-dom'
import { motion, AnimatePresence }                 from 'framer-motion'
import PropTypes                                   from 'prop-types'
import { BookOpen, Headphones, Lock, Pencil }      from 'lucide-react'
import { getSubjects, getChapters }                from '../api/syllabus'
import { useUser }                                 from '../auth/useUser'
import { getProgress, getContinueChapter, getReviewCards } from '../mocks/examCoach'
import { PageShell }                               from '../components/layout/index.js'
import {
  Card, Button, Eyebrow, ScoreRing,
  SkeletonCard,
} from '../components/ui/index.js'

// ── Helpers ───────────────────────────────────────────────────────────────────

function deriveGreeting(name) {
  const h = new Date().getHours()
  const salute = h <= 4  ? 'Up late'
               : h <= 11 ? 'Good morning'
               : h <= 17 ? 'Good afternoon'
               : 'Good evening'
  return `${salute}, ${name}`
}

function deriveDateLabel() {
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long',
  }).format(new Date())
}

// ── ContinueCard ──────────────────────────────────────────────────────────────

function ContinueCard({ chapter, onLearn, onPractice }) {
  if (!chapter) return null
  return (
    <Card className="relative overflow-hidden" padding="lg">
      <span
        className="absolute -right-4 -bottom-6 font-serif text-[96px] leading-none text-ink/[0.04] select-none pointer-events-none"
        aria-hidden="true"
      >
        {chapter.number}
      </span>

      <Eyebrow className="mb-2">Continue reading</Eyebrow>

      <h2 className="font-serif text-xl font-semibold text-ink leading-snug mb-3">
        {chapter.title}
      </h2>

      <div className="mb-4">
        <div
          role="progressbar"
          aria-valuenow={chapter.progressPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Chapter progress"
          className="h-1.5 bg-bg-sunk rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-accent rounded-full"
            style={{ width: `${chapter.progressPct}%` }}
          />
        </div>
        <p className="text-[11px] text-ink-3 mt-1.5">{chapter.progressPct}% complete</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="accent" size="sm" onClick={() => onLearn(chapter)}>
          <BookOpen size={13} aria-hidden="true" />
          Resume
        </Button>
        <Button variant="secondary" size="sm" onClick={() => onPractice(chapter)}>
          <Pencil size={13} aria-hidden="true" />
          Practice
        </Button>
        <Button variant="ghost" size="sm" disabled aria-label="Listen (coming soon)">
          <Headphones size={13} aria-hidden="true" />
          Listen
        </Button>
      </div>
    </Card>
  )
}

ContinueCard.propTypes = {
  chapter: PropTypes.shape({
    id:          PropTypes.string.isRequired,
    slug:        PropTypes.string.isRequired,
    title:       PropTypes.string.isRequired,
    number:      PropTypes.number,
    progressPct: PropTypes.number,
  }),
  onLearn:    PropTypes.func.isRequired,
  onPractice: PropTypes.func.isRequired,
}

// ── GoalCard ──────────────────────────────────────────────────────────────────

function GoalCard({ progress }) {
  const minsLeft = Math.max(0, progress.goalMinutes - progress.todayMinutes)
  return (
    <Card padding="lg">
      <div className="flex items-center gap-4 mb-4">
        <ScoreRing
          awarded={progress.todayMinutes}
          total={progress.goalMinutes}
          size={72}
          caption="min"
        />
        <div>
          <p className="text-lg font-semibold text-ink leading-tight">{minsLeft} min to go</p>
          <p className="text-[11px] text-ink-3 mt-0.5">Daily goal</p>
          <Button variant="ghost" size="sm" className="mt-2 -ml-1.5">Adjust</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-line-soft text-center">
        <div>
          <p className="text-lg font-semibold text-ink">{progress.streakDays}</p>
          <Eyebrow>Streak</Eyebrow>
        </div>
        <div>
          <p className="text-lg font-semibold text-ink">{progress.avgScore || '—'}</p>
          <Eyebrow>Avg %</Eyebrow>
        </div>
        <div>
          <p className="text-lg font-semibold text-ink">{progress.chaptersDone}</p>
          <Eyebrow>Done</Eyebrow>
        </div>
      </div>
    </Card>
  )
}

GoalCard.propTypes = {
  progress: PropTypes.shape({
    streakDays:   PropTypes.number,
    avgScore:     PropTypes.number,
    chaptersDone: PropTypes.number,
    goalMinutes:  PropTypes.number,
    todayMinutes: PropTypes.number,
  }).isRequired,
}

// ── SpacedReviewRow ───────────────────────────────────────────────────────────

function SpacedReviewRow({ cards }) {
  return (
    <div className="bg-bg-sunk rounded-md px-4 py-3 flex items-center gap-3 flex-wrap">
      <Eyebrow className="shrink-0">{cards.length} due</Eyebrow>
      <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
        {cards.map((word) => (
          <span
            key={word}
            className="inline-flex items-center px-2 py-0.5 rounded-full bg-bg-2 border border-line-soft text-[11px] text-ink-2 font-medium"
          >
            {word}
          </span>
        ))}
      </div>
      <Button variant="soft" size="sm" disabled className="shrink-0">
        Start review
      </Button>
    </div>
  )
}

SpacedReviewRow.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.string).isRequired,
}

// ── ChapterRow ────────────────────────────────────────────────────────────────

const ACCENT_BAR = {
  prose:      'bg-accent',
  poem:       'bg-purple-400',
  grammar:    'bg-emerald-500',
  vocabulary: 'bg-amber-400',
}

function ChapterRow({ chapter, index, onLearn, onPractice }) {
  const isLocked = index > 0
  const [showLockMsg, setShowLockMsg] = useState(false)
  const bar = ACCENT_BAR[chapter.content_type] || ACCENT_BAR.prose

  useEffect(() => {
    if (!showLockMsg) return
    const dismiss = () => setShowLockMsg(false)
    const timer = setTimeout(dismiss, 5000)
    const raf = requestAnimationFrame(() => {
      document.addEventListener('click', dismiss, { once: true })
    })
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(raf)
      document.removeEventListener('click', dismiss)
    }
  }, [showLockMsg])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.035, duration: 0.18 }}
    >
      <Card padding="none" className="overflow-hidden">
        <div
          className={isLocked ? 'cursor-pointer' : undefined}
          onClick={isLocked ? () => setShowLockMsg(true) : undefined}
        >
          <div className="flex">
            <div
              className={`w-1 self-stretch shrink-0 ${bar} ${isLocked ? 'opacity-30' : ''}`}
              aria-hidden="true"
            />
            <div className="flex flex-1 items-center gap-4 px-4 py-3.5 min-w-0">
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold leading-tight break-words ${isLocked ? 'text-ink-3' : 'text-ink'}`}>
                  Ch {chapter.number}. {chapter.title}
                </p>
                <p className="text-[11px] text-ink-4 mt-0.5 capitalize">
                  {chapter.content_type}
                </p>
              </div>

              {isLocked ? (
                <Lock size={16} className="text-ink-4 shrink-0" aria-label="Locked" />
              ) : (
                <div className="flex gap-2 shrink-0">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); onLearn(chapter) }}
                    aria-label={`Learn ${chapter.title}`}
                  >
                    <BookOpen size={13} aria-hidden="true" />
                    Learn
                  </Button>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); onPractice(chapter) }}
                    aria-label={`Practice ${chapter.title}`}
                  >
                    <Pencil size={13} aria-hidden="true" />
                    Practice
                  </Button>
                </div>
              )}
            </div>
          </div>

          <AnimatePresence>
            {showLockMsg && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden"
              >
                <p className="text-[11px] text-ink-3 px-5 pb-3 ml-1">
                  Complete the previous chapter to unlock this one.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  )
}

ChapterRow.propTypes = {
  chapter: PropTypes.shape({
    id:           PropTypes.string.isRequired,
    title:        PropTypes.string.isRequired,
    content_type: PropTypes.string.isRequired,
    number:       PropTypes.number,
  }).isRequired,
  index:      PropTypes.number.isRequired,
  onLearn:    PropTypes.func.isRequired,
  onPractice: PropTypes.func.isRequired,
}

// ── HomePage ──────────────────────────────────────────────────────────────────

export default function HomePage() {
  const navigate = useNavigate()
  const user     = useUser()
  const progress = getProgress()
  const continueChapter = getContinueChapter()
  const reviewCards     = getReviewCards()

  const [chapters, setChapters] = useState([])
  const [subject,  setSubject]  = useState(null)
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState('')

  const loadData = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const subjects = await getSubjects()
      if (!subjects?.length) {
        setError('No subjects found. Check your Supabase data.')
        return
      }
      const s = subjects[0]
      setSubject(s)
      const chs = await getChapters(s.slug)
      setChapters(chs || [])
    } catch (err) {
      console.error('[HomePage] load error:', err)
      setError(err?.message || 'Failed to load chapters. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadData() }, [loadData])

  const mkState = useCallback((ch) => ({
    chapterTitle: ch.title,
    chapterType:  ch.content_type,
  }), [])

  const goLearn    = useCallback((ch) =>
    navigate(`/learn/${ch.slug}`,    { state: mkState(ch) }), [navigate, mkState])

  const goPractice = useCallback((ch) =>
    navigate(`/practice/${ch.slug}`, { state: mkState(ch) }), [navigate, mkState])

  return (
    <PageShell>
      {/* Header */}
      <div className="mb-1">
        <p className="font-mono uppercase tracking-[0.12em] text-[11px] text-ink-3">
          {deriveDateLabel()}
        </p>
        <h1 className="font-serif text-2xl font-semibold text-ink mt-1">
          {deriveGreeting(user.name)}
        </h1>
        {subject && (
          <p className="text-sm text-ink-3 mt-0.5">
            {subject.name} · {user.boardLabel}
          </p>
        )}
      </div>

      {/* Hero grid skeleton */}
      {loading && (
        <div className="grid grid-cols-1 min-[900px]:grid-cols-[1.5fr_1fr] gap-4 mt-5 mb-5">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {/* Hero grid */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-1 min-[900px]:grid-cols-[1.5fr_1fr] gap-4 mt-5 mb-5"
        >
          <ContinueCard
            chapter={continueChapter}
            onLearn={goLearn}
            onPractice={goPractice}
          />
          <GoalCard progress={progress} />
        </motion.div>
      )}

      {/* Spaced review */}
      {!loading && !error && reviewCards.length > 0 && (
        <div className="mb-5">
          <SpacedReviewRow cards={reviewCards} />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div role="alert" className="bg-warn-soft border border-warn rounded-md px-5 py-4 mb-5">
          <p className="text-sm font-semibold text-warn mb-0.5">Could not load chapters</p>
          <p className="text-sm text-ink-2">{error}</p>
          <button
            onClick={loadData}
            className="mt-3 text-sm font-semibold text-accent underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Chapter list header */}
      <div className="flex items-center justify-between mb-3">
        <Eyebrow>{loading ? 'Loading…' : `${chapters.length} chapters`}</Eyebrow>
        {!loading && chapters.length > 0 && (
          <button
            onClick={() => navigate('/courses')}
            aria-label="Browse all chapters"
            className="text-[11px] font-semibold text-accent hover:text-accent-ink transition-colors"
          >
            Browse all →
          </button>
        )}
      </div>

      {/* Chapter rows */}
      {loading ? (
        <div className="space-y-2.5">
          {[1, 2, 3, 4, 5].map((i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div role="list" aria-label="Chapter list" className="space-y-2">
          <AnimatePresence>
            {chapters.map((ch, i) => (
              <div key={ch.id} role="listitem">
                <ChapterRow
                  chapter={ch}
                  index={i}
                  onLearn={goLearn}
                  onPractice={goPractice}
                />
              </div>
            ))}
          </AnimatePresence>

          {chapters.length === 0 && !error && (
            <p className="text-center text-sm text-ink-3 py-12">
              No chapters found.{' '}
              <button
                onClick={loadData}
                className="text-accent underline hover:no-underline"
              >
                Refresh
              </button>
            </p>
          )}
        </div>
      )}
    </PageShell>
  )
}
