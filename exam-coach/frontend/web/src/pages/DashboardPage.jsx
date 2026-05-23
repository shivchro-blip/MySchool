import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { SYLLABUS } from '../data/syllabus'
import { getCachedProfile } from '../api/users'
import PageHeader from '../components/ui/PageHeader'
import Eyebrow from '../components/ui/Eyebrow'

const TEAL = '#2A7B6F'

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

  useEffect(() => {
    getCachedProfile().then(p => { setProfile(p); setProfileLoaded(true) })
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
    <div style={{ padding: '16px 20px 96px' }}>

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
          <p className="text-sm text-text-muted">
            We couldn't find your class. Please update your settings.
          </p>
        ) : (
          <div style={{
            border: '1px solid var(--line)',
            borderRadius: 14,
            overflow: 'hidden',
            background: 'var(--surface-alt)',
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
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-alt)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {/* Year badge */}
                    <div style={{
                      width: 46, height: 46,
                      borderRadius: 10,
                      flexShrink: 0,
                      background: `${TEAL}18`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: 17, fontWeight: 800, color: TEAL }}>
                        {info.label}
                      </span>
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>
                        {info.title}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--ink-4)' }}>
                        {counts.subjects} subject{counts.subjects !== 1 ? 's' : ''}
                        &nbsp;·&nbsp;
                        {counts.lessons} lesson{counts.lessons !== 1 ? 's' : ''}
                      </div>
                    </div>

                    <ChevronRight size={16} style={{ color: 'var(--ink-4)', flexShrink: 0 }} />
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

    </div>
  )
}
