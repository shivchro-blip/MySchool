import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { SYLLABUS } from '../data/syllabus'
import { getCachedProfile } from '../api/users'
import { getAllowedYearKey } from '../lib/userAccess'
import PageHeader from '../components/ui/PageHeader'

const YEAR_CONFIG = {
  plus1: { label: '+1', subtitle: 'Class XI — Higher Secondary First Year',  color: '#1B4B82' },
  plus2: { label: '+2', subtitle: 'Class XII — Higher Secondary Second Year', color: '#2A7B6F' },
}

function countLessons(yearData) {
  let total = 0
  Object.values(yearData.subjects || {}).forEach(sub => {
    if (sub.units) sub.units.forEach(u => { total += u.lessons.length })
  })
  return total
}

export default function CoursesIndexPage() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [profileLoaded, setProfileLoaded] = useState(false)

  useEffect(() => {
    getCachedProfile().then(p => { setProfile(p); setProfileLoaded(true) })
  }, [])

  const allowedKey = profileLoaded ? getAllowedYearKey(profile) : null
  const visibleEntries = Object.entries(SYLLABUS).filter(
    ([k]) => !allowedKey || k === allowedKey
  )

  return (
    <div>

      <PageHeader
        eyebrow="Tamil Nadu State Board"
        title="My Courses"
        subtitle="Select a year group to browse subjects and lessons."
      />

      {/* Course list — flat grouped */}
      <div style={{ border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
        {visibleEntries.map(([yearKey, yearData], idx, arr) => {
          const cfg      = YEAR_CONFIG[yearKey]
          if (!cfg) return null
          const subjects = Object.keys(yearData.subjects || {}).length
          const lessons  = countLessons(yearData)

          return (
            <div key={yearKey}>
              <button
                onClick={() => navigate(`/${yearKey}`)}
                style={{
                  width: '100%',
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '20px 24px',
                  background: 'var(--surface-alt)',
                  border: 'none', cursor: 'pointer', textAlign: 'left',
                  transition: 'background 150ms ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-alt)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--surface-alt)'}
              >
                {/* Year badge */}
                <div style={{
                  width: 48, height: 48, borderRadius: 10, flexShrink: 0,
                  background: `${cfg.color}14`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: cfg.color }}>
                    {cfg.label}
                  </span>
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>
                    {cfg.subtitle}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                    {subjects} subject{subjects !== 1 ? 's' : ''}
                    &nbsp;·&nbsp;
                    {lessons} lesson{lessons !== 1 ? 's' : ''}
                  </div>
                </div>

                <ChevronRight size={16} style={{ flexShrink: 0, color: 'var(--text-tertiary)' }} />
              </button>

              {idx < arr.length - 1 && (
                <div style={{ height: 1, background: 'var(--line)' }} />
              )}
            </div>
          )
        })}
      </div>

    </div>
  )
}
