import { Fragment, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutGrid, BookOpen, ClipboardList, TrendingUp,
  Activity, Award, MessageSquare, Settings, LogOut,
} from 'lucide-react'
import BrandLogo from '../ui/BrandLogo'
import { SYLLABUS } from '../../data/syllabus'
import { logout } from '../../api/auth'
import { getCachedProfile } from '../../api/users'
import { getAllowedYearKey, isSubjectAllowed } from '../../lib/userAccess'
import { Link } from 'react-router-dom'

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

const SIDEBAR_LEGAL_LINKS = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Contact', to: '/contact' },
]

const YEARS = [
  { key: 'plus1', label: '+1' },
  { key: 'plus2', label: '+2' },
]

function NavItem({ item, active, dim, danger, onClick, collapsed }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={collapsed ? item.label : undefined}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : undefined,
        gap: collapsed ? 0 : 10,
        width: '100%',
        padding: collapsed ? '8px 0' : '8px 14px',
        borderRadius: 8,
        border: danger ? `1.5px solid ${hovered ? 'var(--danger-hover)' : 'var(--danger)'}` : 'none',
        cursor: (item.to || danger) ? 'pointer' : 'default',
        transition: 'all 0.18s ease',
        background: active
          ? 'var(--chrome-bg-active)'
          : (danger && hovered)
          ? 'var(--danger-bg)'
          : (!danger && hovered)
          ? 'var(--chrome-hover)'
          : 'transparent',
        color: active
          ? 'var(--chrome-ink)'
          : danger
          ? (hovered ? 'var(--danger-hover)' : 'var(--danger)')
          : dim ? 'var(--chrome-ink-faint)' : 'var(--chrome-ink-dim)',
        fontSize: 13.5,
        fontWeight: active ? 600 : 500,
        textAlign: 'left',
      }}
    >
      {!danger && (
        <span style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: active ? 'var(--chrome-ink)' : 'transparent',
          transition: 'background 0.18s ease',
        }} />
      )}
      <item.icon size={danger ? 16 : 17} strokeWidth={active ? 2.2 : 1.8} />
      {!collapsed && <span>{item.label}</span>}
    </button>
  )
}

function SubItem({ label, active, depth, onClick }) {
  const paddingLeft = depth === 1 ? 30 : 44
  return (
    <button
      onClick={onClick}
      style={{
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
        background: active ? 'var(--chrome-bg-active)' : 'transparent',
        color: active ? 'var(--chrome-ink)' : 'var(--chrome-ink-faint)',
        fontSize: depth === 1 ? 12.5 : 12,
        fontWeight: active ? 600 : 400,
        textAlign: 'left',
        transition: 'all 0.15s ease',
      }}
    >
      <span style={{
        width: 4, height: 4, borderRadius: '50%', flexShrink: 0,
        background: active ? 'var(--chrome-ink)' : 'var(--chrome-line)',
        transition: 'background 0.15s ease',
      }} />
      {label}
    </button>
  )
}

export default function DashboardSidebar({ onClose, collapsed = false }) {
  const navigate    = useNavigate()
  const { pathname } = useLocation()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    getCachedProfile().then(setProfile)
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

  function handleBottomNavClick(item) {
    if (item.id === 'logout') {
      logout()
      navigate('/login')
      onClose?.()
      return
    }
    if (item.to) go(item.to)
  }

  return (
    <div style={{
      width: collapsed ? 52 : 200,
      minWidth: collapsed ? 52 : 200,
      height: '100%',
      background: 'var(--chrome-bg)',
      borderRight: '1px solid var(--chrome-line)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 200ms ease, min-width 200ms ease',
    }}>

      {/* Scrollable section: logo + main nav.
          min-height: 0 is required — without it, a flex child cannot shrink below
          its content size, which would push the bottom nav off screen. */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Logo */}
        <div style={{ padding: '16px 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <BrandLogo height={36} variant="compact" />
        </div>

        {/* Main nav */}
        <nav style={{ flex: 1, minHeight: 0, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
          {TOP_NAV.map(item => (
            <Fragment key={item.id}>
              <NavItem
                item={item}
                active={isActive(item)}
                onClick={() => item.to && go(item.to)}
                collapsed={collapsed}
              />

              {/* Course drill-down sub-items */}
              {item.id === 'courses' && inCourses && !collapsed && (
                <div style={{ marginBottom: 4 }}>
                  {YEARS.filter(yr => {
                    const allowed = getAllowedYearKey(profile)
                    return !allowed || yr.key === allowed
                  }).map(yr => {
                    const yearActive = currentYear === yr.key
                    const subjects   = Object.values(SYLLABUS[yr.key]?.subjects ?? {})
                      .filter(sub => isSubjectAllowed(profile, sub.slug))

                    return (
                      <Fragment key={yr.key}>
                        <SubItem
                          label={yr.label}
                          active={yearActive && !pathname.startsWith('/courses')}
                          depth={1}
                          onClick={() => go(`/${yr.key}`)}
                        />

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

      </div>

      {/* Bottom nav — pinned to the bottom of the sidebar at all viewport heights */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ height: 1, background: 'var(--chrome-line)', margin: '0 16px' }} />
        <div style={{ padding: '8px 10px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {BOTTOM_NAV.map(item => (
            <NavItem
              key={item.id}
              item={item}
              active={false}
              dim={item.id !== 'logout'}
              danger={item.id === 'logout'}
              onClick={() => handleBottomNavClick(item)}
              collapsed={collapsed}
            />
          ))}
        </div>
        {!collapsed && (
          <div style={{
            padding: '0 14px 12px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px 8px',
            alignItems: 'center',
            fontSize: 10,
            lineHeight: 1.3,
            color: 'var(--chrome-ink-faint)',
          }}>
            {SIDEBAR_LEGAL_LINKS.map((item, index) => (
              <Fragment key={item.to}>
                <Link
                  to={item.to}
                  style={{
                    color: 'var(--chrome-ink-faint)',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </Link>
                {index < SIDEBAR_LEGAL_LINKS.length - 1 && (
                  <span aria-hidden="true" style={{ color: 'var(--line)' }}>&middot;</span>
                )}
              </Fragment>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
