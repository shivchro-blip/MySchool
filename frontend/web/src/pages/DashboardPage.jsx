import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { SYLLABUS } from '../data/syllabus'
import { getCachedProfile } from '../api/users'
import PageHeader from '../components/ui/PageHeader'
import Eyebrow from '../components/ui/Eyebrow'

// ── Data helpers ──────────────────────────────────────────────
function computeCounts() {
  let lessons = 0
  let subjects = 0
  Object.values(SYLLABUS).forEach(year => {
    const subs = Object.values(year.subjects || {})
    subjects += subs.length
    subs.forEach(sub => {
      if (sub.units) sub.units.forEach(u => { lessons += u.lessons.length })
    })
  })
  return { lessons, subjects }
}

function countYear(yearData) {
  const subs = Object.values(yearData.subjects || {})
  let lessons = 0
  subs.forEach(sub => { if (sub.units) sub.units.forEach(u => { lessons += u.lessons.length }) })
  return { subjects: subs.length, lessons }
}

const { lessons: LESSON_COUNT, subjects: SUBJECT_COUNT } = computeCounts()

const YEAR_INFO = {
  plus1: { label: '+1', title: 'Class XI — First Year'  },
  plus2: { label: '+2', title: 'Class XII — Second Year' },
}


// ── Page ──────────────────────────────────────────────────────
export default function DashboardPage() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [profileLoaded, setProfileLoaded] = useState(false)
  const [stats, setStats] = useState({
    sessions: 0, questions: 0, bestScore: 0
  })
  const [draft, setDraft] = useState(null)

  useEffect(() => {
    getCachedProfile().then(p => { setProfile(p); setProfileLoaded(true) })
  }, [])

  useEffect(() => {
    let sessions = 0, questions = 0, bestScore = 0
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('exam_coach_sessions_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key))
          if (Array.isArray(data)) {
            sessions += data.length
            data.forEach(s => {
              questions += s.total ?? 0
              const scorePct = s.total > 0
                ? Math.round((s.score / s.total) * 100) : 0
              if (scorePct > bestScore) bestScore = scorePct
            })
          }
        } catch {}
      }
    }
    setStats({ sessions, questions, bestScore })
  }, [])

  useEffect(() => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('exam_coach_draft_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key))
          if (data && data.questionIdx >= 0) {
            const slug = key.replace('exam_coach_draft_', '')
            setDraft({ slug, questionIdx: data.questionIdx })
            break
          }
        } catch {}
      }
    }
  }, [])

  const allEntries = Object.entries(SYLLABUS)

  // Show nothing while loading to avoid flash of all classes
  const filteredEntries = !profileLoaded
    ? []
    : profile?.class_level
      ? allEntries.filter(([k]) => YEAR_INFO[k]?.label === profile.class_level)
      : allEntries

  // Safety net: picked a class that doesn't exist in SYLLABUS
  const classNotFound =
    profileLoaded && profile?.class_level && filteredEntries.length === 0

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'fixed',
        bottom: '4%',
        right: '4%',
        width: 280,
        height: 280,
        backgroundImage: 'url(/logo.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: 0.04,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          maxWidth: 1040,
          margin: '0 auto',
          padding: 'clamp(24px, 4vw, 40px) clamp(20px, 3vw, 32px) 96px',
        }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div style={{ marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid var(--line)' }}>
        <PageHeader
          eyebrow="Tamil Nadu State Board"
          title="Good morning, Student."
          subtitle={`${SUBJECT_COUNT} subjects and ${LESSON_COUNT} lessons. Pick up where you left off.`}
          className="mb-0"
        />
      </div>

      {/* ── My Courses ───────────────────────────────────────── */}
          <section>
            <Eyebrow style={{ marginBottom: 14 }}>My Courses</Eyebrow>

        {classNotFound ? (
          <p className="text-sm text-text-secondary">
            We couldn't find your class. Please update your settings.
          </p>
        ) : (
          <div style={{
            border: '1px solid var(--line)',
            borderRadius: 14,
            overflow: 'hidden',
            background: 'var(--bg-2)',
          }}>
            {filteredEntries.map(([yearKey, yearData], idx, arr) => {
              const info = YEAR_INFO[yearKey]
              if (!info) return null
              const counts = countYear(yearData)
              return (
                <div key={yearKey}>
                  <button
                    onClick={() => navigate(`/${yearKey}`)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: '18px 20px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 150ms ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-sunk)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {/* Year badge */}
                    <div style={{
                      width: 46, height: 46,
                      borderRadius: 10,
                      flexShrink: 0,
                      background: 'color-mix(in srgb, var(--brand) 9%, transparent)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--brand)' }}>
                        {info.label}
                      </span>
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 3 }}>
                        {info.title}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                        {counts.subjects} subject{counts.subjects !== 1 ? 's' : ''}
                        &nbsp;·&nbsp;
                        {counts.lessons} lesson{counts.lessons !== 1 ? 's' : ''}
                      </div>
                    </div>

                    <ChevronRight size={16} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
                  </button>

                  {idx < arr.length - 1 && (
                    <div style={{ height: 1, background: 'var(--line)' }} />
                  )}
                </div>
              )
            })}
          </div>
        )}
          </section>

          {stats.sessions > 0 && (
            <div style={{ marginTop: 32 }}>
              <p style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-tertiary)', marginBottom: 12 }}>
                Your Progress
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[
                  { label: 'Sessions', value: stats.sessions },
                  { label: 'Questions', value: stats.questions },
                  { label: 'Best Score', value: `${stats.bestScore}%` },
                ].map(stat => (
                  <div key={stat.label} style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 12, padding: '16px 20px' }}>
                    <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--brand)', lineHeight: 1 }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: 11, marginTop: 6, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {draft && (
            <div style={{
              marginTop: 16,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 12, padding: '16px 20px',
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', gap: 16 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                  Continue where you left off
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 3 }}>
                  {draft.slug} · Q{draft.questionIdx + 1}
                </div>
              </div>
              <button
                onClick={() => navigate(
                  `/${draft.slug.includes('plus2')
                    ? 'plus2' : 'plus1'}/english/practice`
                )}
                style={{ background: 'var(--brand)', color: 'white',
                  border: 'none', borderRadius: 8,
                  padding: '8px 16px', fontSize: 13,
                  fontWeight: 600, cursor: 'pointer',
                  whiteSpace: 'nowrap' }}>
                Continue →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
