import { useNavigate } from 'react-router-dom'
import { BookOpen, FileText, ChevronRight, ClipboardList } from 'lucide-react'
import { SYLLABUS } from '../data/syllabus'

function getAllowedYear() {
  const c = localStorage.getItem('exam_coach_class')
  if (c === '+1') return 'plus1'
  if (c === '+2') return 'plus2'
  return null
}

// ── Computed counts ──────────────────────────────────────────
function computeCounts() {
  let lessons = 0
  let subjects = 0
  Object.values(SYLLABUS).forEach(year => {
    const subs = Object.values(year.subjects || {})
    subjects += subs.length
    subs.forEach(sub => {
      if (sub.units) {
        sub.units.forEach(u => { lessons += u.lessons.length })
      }
    })
  })
  return { lessons, subjects }
}

const { lessons: LESSON_COUNT, subjects: SUBJECT_COUNT } = computeCounts()

// ── Sample data ──────────────────────────────────────────────
const ASSIGNMENTS = [
  { title: 'The Portrait of a Lady',  date: 'Due May 10',  color: '#9b72f0' },
  { title: 'Forgetting',              date: 'Due May 12',  color: '#2ec4b6' },
  { title: 'Tight Corners',           date: 'Due May 15',  color: '#ff6b6b' },
]

const BAR_DATA = [
  { day: 'Mon', value: 60 },
  { day: 'Tue', value: 85 },
  { day: 'Wed', value: 45 },
  { day: 'Thu', value: 90 },
  { day: 'Fri', value: 70 },
]

// ── Sub-components ───────────────────────────────────────────
function StatCard({ color, label, value, icon: Icon }) {
  return (
    <div
      style={{
        background: color,
        borderRadius: 14,
        padding: '18px 20px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 4px 16px ${color}44`,
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        cursor: 'default',
        flex: 1,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = `0 12px 28px ${color}66`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = `0 4px 16px ${color}44`
      }}
    >
      {/* Decorative circles */}
      <div style={{
        position: 'absolute', top: -30, right: -30,
        width: 110, height: 110, borderRadius: '50%',
        background: 'rgba(255,255,255,0.12)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -20, right: 30,
        width: 70, height: 70, borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)', pointerEvents: 'none',
      }} />

      <div style={{
        width: 36, height: 36,
        background: 'rgba(255,255,255,0.22)',
        borderRadius: 9,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 14,
      }}>
        <Icon size={18} color="white" strokeWidth={2} />
      </div>

      <div style={{ color: 'white', fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{value}</div>
      <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: 500, marginTop: 4 }}>{label}</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 12, color: 'rgba(255,255,255,0.9)', fontSize: 11 }}>
        <span>View Details</span>
        <ChevronRight size={12} />
      </div>
    </div>
  )
}

function YearCard({ year, label, subtitle, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'white',
        border: `1.5px solid ${color}33`,
        borderRadius: 12,
        padding: '16px 18px',
        display: 'flex', alignItems: 'center', gap: 12,
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        textAlign: 'left',
        width: '100%',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = color
        e.currentTarget.style.background = `${color}0a`
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${color}33`
        e.currentTarget.style.background = 'white'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 10,
        background: `${color}18`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 18, fontWeight: 800, color }}>{label}</span>
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1d27' }}>{label} — {subtitle}</div>
        <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>Tamil Nadu State Board</div>
      </div>
      <ChevronRight size={16} color="#9ca3af" style={{ marginLeft: 'auto', flexShrink: 0 }} />
    </button>
  )
}

function AssignmentRow({ item }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '11px 10px',
        borderRadius: 10,
        border: '1px solid #f3f4f6',
        transition: 'all 0.15s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${item.color}55`
        e.currentTarget.style.background = `${item.color}0a`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#f3f4f6'
        e.currentTarget.style.background = 'transparent'
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 9, flexShrink: 0,
        background: `${item.color}20`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <ClipboardList size={16} color={item.color} strokeWidth={2} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1d27', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {item.title}
        </div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{item.date}</div>
      </div>
      <ChevronRight size={14} color="#d1d5db" />
    </div>
  )
}

function DonutChart({ pct = 65 }) {
  const r = 65
  const sw = 10
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct / 100)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <div style={{ position: 'relative', width: 160, height: 160 }}>
        <svg width={160} height={160} style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle cx={80} cy={80} r={r} fill="none" stroke="#eef0f7" strokeWidth={sw} />
          {/* Fill */}
          <circle
            cx={80} cy={80} r={r}
            fill="none"
            stroke="#2ec4b6"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 24, fontWeight: 700, color: '#1a1d27' }}>{pct}%</span>
          <span style={{ fontSize: 11, color: '#9ca3af' }}>Progress</span>
        </div>
      </div>
      <p style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center', margin: 0 }}>
        Overall course completion
      </p>
    </div>
  )
}

function BarChart() {
  const maxVal = Math.max(...BAR_DATA.map(d => d.value))

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 80, marginTop: 16 }}>
      {BAR_DATA.map(d => (
        <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div
            style={{
              width: '100%',
              height: `${(d.value / maxVal) * 80}px`,
              background: 'rgba(155,114,240,0.35)',
              borderRadius: '4px 4px 0 0',
              transition: 'background 0.2s ease',
              cursor: 'default',
              position: 'relative',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#9b72f0'
              const tip = e.currentTarget.querySelector('.bar-tip')
              if (tip) tip.style.opacity = '1'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(155,114,240,0.35)'
              const tip = e.currentTarget.querySelector('.bar-tip')
              if (tip) tip.style.opacity = '0'
            }}
          >
            <div className="bar-tip" style={{
              position: 'absolute', bottom: '105%', left: '50%', transform: 'translateX(-50%)',
              background: '#1a1d27', color: 'white', fontSize: 10, padding: '3px 6px', borderRadius: 4,
              whiteSpace: 'nowrap', opacity: 0, transition: 'opacity 0.15s ease', pointerEvents: 'none',
            }}>
              {d.value}m
            </div>
          </div>
          <span style={{ fontSize: 10, color: '#9ca3af' }}>{d.day}</span>
        </div>
      ))}
    </div>
  )
}

function ActivityCard() {
  return (
    <div style={{ background: 'white', borderRadius: 14, padding: 18, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
      {/* User */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid #eef0f7' }}>
        <div style={{
          width: 58, height: 58, borderRadius: '50%',
          background: 'linear-gradient(135deg, #2ec4b6, #9b72f0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: 22,
          boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
          border: '3px solid white',
          marginBottom: 10,
        }}>S</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1d27' }}>Student</div>
        <div style={{ fontSize: 11, color: '#9ca3af' }}>Class XI · TN Board</div>
      </div>

      {/* Hours activity */}
      <div style={{ marginTop: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Hours Activity</span>
          <span style={{ fontSize: 10, color: '#10b981', fontWeight: 600 }}>+5% this week</span>
        </div>
        <BarChart />
      </div>
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────
const ALL_YEAR_CARDS = [
  { year: 'plus1', label: '+1', subtitle: 'Class XI',  color: '#2ec4b6' },
  { year: 'plus2', label: '+2', subtitle: 'Class XII', color: '#9b72f0' },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const allowedYear = getAllowedYear()
  const yearCards = allowedYear
    ? ALL_YEAR_CARDS.filter(c => c.year === allowedYear)
    : ALL_YEAR_CARDS

  return (
    <div style={{ padding: 20, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>

          {/* Stat cards */}
          <div style={{ display: 'flex', gap: 20 }}>
            <StatCard
              color="#2ec4b6"
              label="Enrolled Courses"
              value={SUBJECT_COUNT}
              icon={BookOpen}
            />
            <StatCard
              color="#9b72f0"
              label="Lessons"
              value={LESSON_COUNT}
              icon={FileText}
            />
          </div>

          {/* Courses section — +1 / +2 */}
          <div style={{ background: 'white', borderRadius: 14, padding: 18, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#1a1d27' }}>My Courses</h2>
              <button
                onClick={() => navigate('/plus1')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2ec4b6', fontSize: 12, fontWeight: 600, padding: 0 }}
              >
                View All
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {yearCards.map(c => (
                <YearCard
                  key={c.year}
                  year={c.year}
                  label={c.label}
                  subtitle={c.subtitle}
                  color={c.color}
                  onClick={() => navigate(`/${c.year}`)}
                />
              ))}
            </div>
          </div>

          {/* Assignments + Donut row */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'stretch' }}>

            {/* Assignments */}
            <div style={{ flex: 1, background: 'white', borderRadius: 14, padding: 18, boxShadow: '0 2px 12px rgba(0,0,0,0.05)', minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#1a1d27' }}>Assignments</h2>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2ec4b6', fontSize: 12, fontWeight: 600, padding: 0 }}>
                  View All
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {ASSIGNMENTS.map((a, i) => (
                  <AssignmentRow key={i} item={a} />
                ))}
              </div>
            </div>

            {/* Progress donut */}
            <div style={{ width: 220, flexShrink: 0, background: 'white', borderRadius: 14, padding: 18, boxShadow: '0 2px 12px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DonutChart pct={65} />
            </div>
          </div>

          {/* Activity card — mobile/tablet only (desktop shows in right column) */}
          <div className="min-[900px]:hidden">
            <ActivityCard />
          </div>
        </div>

        {/* Right column — desktop only */}
        <div className="hidden min-[900px]:block" style={{ width: 248, flexShrink: 0 }}>
          <ActivityCard />
        </div>
      </div>
    </div>
  )
}
