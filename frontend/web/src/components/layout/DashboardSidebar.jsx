import { Fragment, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutGrid, BookOpen, ClipboardList, TrendingUp,
  Activity, Award, MessageSquare, Settings, LogOut,
} from 'lucide-react'
import { SYLLABUS } from '../../data/syllabus'
import { getProfile } from '../../api/users'
import { logout } from '../../api/auth'

const TOP_NAV = [
  { id: 'dashboard',   label: 'Dashboard',   icon: LayoutGrid,    to: '/'            },
  { id: 'courses',     label: 'Courses',     icon: BookOpen,      to: '/courses'     },
  { id: 'assignments', label: 'Assignments', icon: ClipboardList, to: null           },
  { id: 'progress',    label: 'Progress',    icon: TrendingUp,    to: '/progress'    },
  { id: 'activity',    label: 'Activity',    icon: Activity,      to: '/activity'    },
  { id: 'certificate', label: 'Certificate', icon: Award,         to: '/certificate' },
  { id: 'messages',    label: 'Messages',    icon: MessageSquare, to: null           },
]

const BOTTOM_NAV = [
  { id: 'settings', label: 'Settings', icon: Settings, to: null     },
  { id: 'logout',   label: 'Log out',  icon: LogOut,   to: '/login' },
]

const YEARS = [
  { key: 'plus1', label: '+1' },
  { key: 'plus2', label: '+2' },
]

const BASE = {
  fontFamily: "'DM Sans', sans-serif",
}

function NavItem({ item, active, dim, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...BASE,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        padding: '9px 14px',
        borderRadius: 10,
        border: 'none',
        cursor: item.to ? 'pointer' : 'default',
        transition: 'all 0.18s ease',
        background: active ? 'rgba(46,196,182,0.14)' : 'transparent',
        color: active ? '#2ec4b6' : dim ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.55)',
        fontSize: 13.5,
        fontWeight: active ? 600 : 500,
        textAlign: 'left',
      }}
    >
      <item.icon size={17} strokeWidth={active ? 2.2 : 1.8} />
      <span>{item.label}</span>
    </button>
  )
}

function SubItem({ label, active, depth, onClick }) {
  const paddingLeft = depth === 1 ? 30 : 44
  return (
    <button
      onClick={onClick}
      style={{
        ...BASE,
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        width: '100%',
        paddingLeft,
        paddingRight: 14,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 8,
        border: 'none',
        cursor: 'pointer',
        background: active ? 'rgba(46,196,182,0.12)' : 'transparent',
        color: active ? '#2ec4b6' : 'rgba(255,255,255,0.40)',
        fontSize: depth === 1 ? 12.5 : 12,
        fontWeight: active ? 600 : 400,
        textAlign: 'left',
        transition: 'all 0.15s ease',
      }}
    >
      <span style={{
        width: 4, height: 4, borderRadius: '50%', flexShrink: 0,
        background: active ? '#2ec4b6' : 'rgba(255,255,255,0.22)',
        transition: 'background 0.15s ease',
      }} />
      {label}
    </button>
  )
}

export default function DashboardSidebar({ onClose }) {
  const navigate    = useNavigate()
  const { pathname } = useLocation()
  const [allowedYear, setAllowedYear] = useState(() => {
    const cached = localStorage.getItem('exam_coach_class')
    if (cached === '+1') return 'plus1'
    if (cached === '+2') return 'plus2'
    return null
  })

  useEffect(() => {
    getProfile().then(p => {
      if (p?.class === '+1') {
        localStorage.setItem('exam_coach_class', '+1')
        setAllowedYear('plus1')
      } else if (p?.class === '+2') {
        localStorage.setItem('exam_coach_class', '+2')
        setAllowedYear('plus2')
      }
    }).catch(() => {})
  }, [])

  // Derive course drill-down state purely from pathname
  // Matches /plus1, /plus1/english, /plus1/english/prose, etc.
  const courseMatch  = pathname.match(/^\/(plus1|plus2)(\/([^/]+))?/)
  const currentYear  = courseMatch?.[1] ?? null       // 'plus1' | 'plus2' | null
  const currentSubj  = courseMatch?.[3] ?? null       // 'english' | null
  const inCourses    = pathname.startsWith('/courses') || !!currentYear

  function isActive(item) {
    if (item.to === '/') return pathname === '/'
    if (item.id === 'courses') return inCourses
    if (item.to) return pathname.startsWith(item.to)
    return false
  }

  function go(to) {
    navigate(to)
    onClose?.()
  }

  return (
    <div style={{
      width: 200,
      minWidth: 200,
      height: '100%',
      minHeight: '100vh',
      background: '#1a1d27',
      display: 'flex',
      flexDirection: 'column',
      ...BASE,
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 34, height: 34,
          background: '#2ec4b6',
          borderRadius: 9,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <BookOpen size={18} color="white" strokeWidth={2} />
        </div>
        <span style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>EduFlow</span>
      </div>

      {/* Main nav */}
      <nav style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {TOP_NAV.map(item => (
          <Fragment key={item.id}>
            <NavItem
              item={item}
              active={isActive(item)}
              onClick={() => item.to && go(item.to)}
            />

            {/* Course drill-down sub-items */}
            {item.id === 'courses' && inCourses && (
              <div style={{ marginBottom: 4 }}>
                {YEARS.filter(yr => !allowedYear || yr.key === allowedYear).map(yr => {
                  const yearActive = currentYear === yr.key
                  const subjects   = Object.values(SYLLABUS[yr.key]?.subjects ?? {})

                  return (
                    <Fragment key={yr.key}>
                      <SubItem
                        label={yr.label}
                        active={yearActive && !pathname.startsWith('/courses')}
                        depth={1}
                        onClick={() => go(`/${yr.key}`)}
                      />

                      {/* Show subjects only for the active year */}
                      {yearActive && subjects.map(sub => (
                        <SubItem
                          key={sub.slug}
                          label={sub.label}
                          active={currentSubj === sub.slug}
                          depth={2}
                          onClick={() => go(`/${yr.key}/${sub.slug}`)}
                        />
                      ))}
                    </Fragment>
                  )
                })}
              </div>
            )}
          </Fragment>
        ))}
      </nav>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '0 16px' }} />

      {/* Bottom nav */}
      <div style={{ padding: '10px 10px 20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {BOTTOM_NAV.map(item => (
          <NavItem
            key={item.id}
            item={item}
            active={false}
            dim
            onClick={() => {
              if (item.id === 'logout') {
                logout()
                navigate('/login')
                onClose?.()
              } else if (item.to) {
                go(item.to)
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}
