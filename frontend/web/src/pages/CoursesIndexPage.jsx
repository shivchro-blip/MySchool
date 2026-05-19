import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { SYLLABUS } from '../data/syllabus'

const YEAR_CONFIG = {
  plus1: { label: '+1', subtitle: 'Class XI — Higher Secondary First Year',  color: '#2ec4b6' },
  plus2: { label: '+2', subtitle: 'Class XII — Higher Secondary Second Year', color: '#9b72f0' },
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

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, color: '#1a1d27', marginBottom: 4 }}>My Courses</h1>
      <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 24 }}>Select a year to browse subjects</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {Object.entries(SYLLABUS).map(([yearKey, yearData]) => {
          const cfg      = YEAR_CONFIG[yearKey]
          if (!cfg) return null
          const subjects = Object.keys(yearData.subjects || {}).length
          const lessons  = countLessons(yearData)

          return (
            <button
              key={yearKey}
              onClick={() => navigate(`/${yearKey}`)}
              style={{
                background: 'white',
                border: `1.5px solid ${cfg.color}33`,
                borderRadius: 14,
                padding: '18px 20px',
                display: 'flex', alignItems: 'center', gap: 16,
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                textAlign: 'left',
                width: '100%',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = cfg.color
                e.currentTarget.style.background   = `${cfg.color}08`
                e.currentTarget.style.transform    = 'translateY(-1px)'
                e.currentTarget.style.boxShadow    = `0 6px 20px ${cfg.color}22`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${cfg.color}33`
                e.currentTarget.style.background   = 'white'
                e.currentTarget.style.transform    = 'translateY(0)'
                e.currentTarget.style.boxShadow    = '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              {/* Year badge */}
              <div style={{
                width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                background: `${cfg.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 20, fontWeight: 800, color: cfg.color }}>{cfg.label}</span>
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1d27', marginBottom: 4 }}>
                  {cfg.subtitle}
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: cfg.color }}>
                    {subjects} subject{subjects !== 1 ? 's' : ''}
                  </span>
                  <span style={{ fontSize: 11, color: '#9ca3af' }}>·</span>
                  <span style={{ fontSize: 11, color: '#9ca3af' }}>
                    {lessons} lesson{lessons !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <ChevronRight size={18} color="#9ca3af" style={{ flexShrink: 0 }} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
