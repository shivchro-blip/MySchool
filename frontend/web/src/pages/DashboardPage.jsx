import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { SYLLABUS } from '../data/syllabus'

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

// ── Micro-components ──────────────────────────────────────────
function SectionLabel({ children, style }) {
  return (
    <p style={{
      fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
      textTransform: 'uppercase', color: 'var(--ink-4)',
      margin: 0, ...style,
    }}>
      {children}
    </p>
  )
}

// ── Page ──────────────────────────────────────────────────────
export default function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div style={{
      maxWidth: 640,
      margin: '0 auto',
      padding: 'clamp(24px, 4vw, 40px) clamp(16px, 4vw, 24px) 96px',
    }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div style={{
        marginBottom: 32,
        paddingBottom: 32,
        borderBottom: '1px solid var(--line)',
      }}>
        <SectionLabel style={{ marginBottom: 12 }}>Tamil Nadu State Board</SectionLabel>
        <h1 style={{
          fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
          fontWeight: 700,
          color: 'var(--ink)',
          lineHeight: 1.2,
          margin: '0 0 10px',
          letterSpacing: '-0.02em',
        }}>
          Good morning, Student.
        </h1>
        <p style={{
          fontSize: 14,
          color: 'var(--ink-3)',
          lineHeight: 1.6,
          margin: 0,
        }}>
          {SUBJECT_COUNT} subjects and {LESSON_COUNT} lessons. Pick up where you left off.
        </p>
      </div>

      {/* ── My Courses ───────────────────────────────────────── */}
      <section>
        <SectionLabel style={{ marginBottom: 14 }}>My Courses</SectionLabel>

        <div style={{
          border: '1px solid var(--line)',
          borderRadius: 14,
          overflow: 'hidden',
          background: 'var(--bg-2)',
        }}>
          {Object.entries(SYLLABUS).map(([yearKey, yearData], idx, arr) => {
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
                    background: `${TEAL}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 17, fontWeight: 800, color: TEAL }}>
                      {info.label}
                    </span>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 3 }}>
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
      </section>

    </div>
  )
}
