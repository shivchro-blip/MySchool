import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Search, LayoutGrid, BookOpen, TrendingUp, MessageSquare, Sun, Moon, LogOut } from 'lucide-react'
import BrandLogo from '../ui/BrandLogo'
import DashboardSidebar from './DashboardSidebar'
import { useTheme } from '../../hooks/useTheme'
import { logout } from '../../api/auth'
import { getCachedProfile } from '../../api/users'

// Active nav teal — no token exists in web Tailwind config for this shade
const TEAL = 'var(--brand)'
const FONT_SIZES = [14, 16, 18]

const BOTTOM_TABS = [
  { id: 'dashboard', label: 'Home',     icon: LayoutGrid,    to: '/'         },
  { id: 'courses',   label: 'Courses',  icon: BookOpen,      to: '/courses'  },
  { id: 'progress',  label: 'Progress', icon: TrendingUp,    to: '/progress' },
  { id: 'messages',  label: 'Messages', icon: MessageSquare, to: '/messages' },
]

export default function DashboardShell({ children }) {
  const [dark, toggleTheme] = useTheme()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [initial, setInitial] = useState('?')
  const [fontIdx, setFontIdx] = useState(() => {
    const stored = localStorage.getItem('ec-reading-font')
    const idx = FONT_SIZES.indexOf(Number(stored))
    return idx >= 0 ? idx : 1
  })

  const isLessonPage = pathname.split('/').filter(Boolean).length >= 4

  function adjustFont(delta) {
    setFontIdx(prev => {
      const next = Math.max(0, Math.min(FONT_SIZES.length - 1, prev + delta))
      localStorage.setItem('ec-reading-font', FONT_SIZES[next])
      return next
    })
  }

  useEffect(() => {
    getCachedProfile().then(p => {
      const letter = p?.full_name?.trim()?.[0]?.toUpperCase()
      if (letter) setInitial(letter)
    })
  }, [])

  function handleLogout() {
    logout()
    navigate('/login')
  }

  function isTabActive(to) {
    if (to === '/') return pathname === '/'
    return pathname.startsWith(to)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--page-bg)' }}>

      {/* Desktop sidebar — always visible at ≥768px */}
      <div
        className="hidden min-[768px]:flex"
        style={{ flexShrink: 0, position: 'sticky', top: 0, height: '100vh', alignSelf: 'flex-start', overflow: 'hidden' }}
      >
        <DashboardSidebar collapsed={isLessonPage} />
      </div>

      {/* Right side: header + content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, '--reading-px': `${FONT_SIZES[fontIdx]}px` }}>

        {/* ── Header ──────────────────────────────────────────── */}
        <header style={{
          height: 58,
          background: 'var(--chrome-bg)',
          borderBottom: '0.5px solid var(--chrome-line)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 10,
          position: 'sticky',
          top: 0,
          zIndex: 30,
          flexShrink: 0,
        }}>

          {/* Mobile: brand icon + name */}
          <div className="flex min-[768px]:hidden" style={{ alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <BrandLogo height={34} variant="compact" />
            <span className="text-label font-bold" style={{ color: 'var(--chrome-ink)', letterSpacing: '-0.01em' }}>
              Exam Coach
            </span>
          </div>

          {/* Desktop: plain wordmark (sidebar already shows logo) */}
          <span className="hidden min-[768px]:block text-label font-bold" style={{ color: 'var(--chrome-ink)', letterSpacing: '-0.01em' }}>
            Exam Coach
            <span className="text-caption font-normal" style={{ color: 'var(--chrome-ink-faint)', marginLeft: 6 }}>TN Board</span>
          </span>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Search — hidden on mobile */}
          <div className="hidden min-[640px]:flex" style={{
            alignItems: 'center', gap: 8,
            background: 'var(--chrome-hover)', borderRadius: 10, padding: '7px 12px',
            fontSize: 13, color: 'var(--chrome-ink-faint)',
          }}>
            <Search size={14} style={{ color: 'var(--chrome-ink-faint)' }} />
            <span>Search...</span>
          </div>

          {/* A−/A+ font size toggles — shown only on lesson pages */}
          {isLessonPage && (
            <>
              <button
                onClick={() => adjustFont(-1)}
                disabled={fontIdx === 0}
                title="Decrease font size"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--chrome-hover)', border: '1px solid var(--chrome-line)',
                  borderRadius: 8, padding: '5px 9px', cursor: fontIdx === 0 ? 'not-allowed' : 'pointer',
                  color: fontIdx === 0 ? 'var(--chrome-ink-faint)' : 'var(--chrome-ink-dim)',
                  fontSize: 12, fontWeight: 600, opacity: fontIdx === 0 ? 0.5 : 1, flexShrink: 0,
                }}
              >A−</button>
              <button
                onClick={() => adjustFont(1)}
                disabled={fontIdx === FONT_SIZES.length - 1}
                title="Increase font size"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--chrome-hover)', border: '1px solid var(--chrome-line)',
                  borderRadius: 8, padding: '5px 9px',
                  cursor: fontIdx === FONT_SIZES.length - 1 ? 'not-allowed' : 'pointer',
                  color: fontIdx === FONT_SIZES.length - 1 ? 'var(--chrome-ink-faint)' : 'var(--chrome-ink-dim)',
                  fontSize: 12, fontWeight: 600, opacity: fontIdx === FONT_SIZES.length - 1 ? 0.5 : 1, flexShrink: 0,
                }}
              >A+</button>
            </>
          )}

          {/* Theme toggle — neutral pill.
              Same style in both modes; only icon + label change. */}
          <button
            onClick={toggleTheme}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'var(--chrome-hover)',
              border: '1px solid var(--chrome-line)',
              borderRadius: 100,
              padding: '6px 12px',
              cursor: 'pointer',
              color: 'var(--chrome-ink-dim)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'background 150ms ease',
            }}
          >
            {dark
              ? <Sun  size={13} style={{ flexShrink: 0 }} />
              : <Moon size={13} style={{ flexShrink: 0 }} />
            }
            {/* Full label on tablet+ */}
            <span className="hidden min-[640px]:inline" style={{ fontSize: 12, fontWeight: 600 }}>
              {dark ? 'Light mode' : 'Dark mode'}
            </span>
            {/* Short label on mobile */}
            <span className="inline min-[640px]:hidden" style={{ fontSize: 11, fontWeight: 600 }}>
              {dark ? 'Light' : 'Dark'}
            </span>
          </button>

          {/* Logout — mobile only; desktop uses sidebar */}
          <button
            onClick={handleLogout}
            className="flex min-[768px]:hidden"
            title="Log out"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 6, borderRadius: 8, alignItems: 'center',
              justifyContent: 'center', minWidth: 36, minHeight: 36,
            }}
          >
            <LogOut size={18} style={{ color: 'var(--chrome-ink-dim)' }} />
          </button>

          {/* Avatar */}
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: TEAL,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: 13,
            cursor: 'pointer', flexShrink: 0,
          }}>{initial}</div>

        </header>

        {/* Page content */}
        <main style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}>
          <div style={{ flex: 1, minHeight: 0 }}>
            {children}
          </div>
        </main>

        {/* Mobile bottom tab bar — hidden on desktop (≥768px).
            display must live in className, not inline style — inline overrides Tailwind. */}
        <nav
          className="flex min-[768px]:hidden"
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            height: 64,
            background: 'var(--surface-alt)',
            borderTop: '0.5px solid var(--line)',
            zIndex: 30,
          }}
        >
          {BOTTOM_TABS.map(tab => {
            const active = isTabActive(tab.to)
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.to)}
                style={{
                  flex: 1,
                  minWidth: 56,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: active ? TEAL : '#9CA3AF',
                  fontSize: 10,
                  fontWeight: active ? 600 : 500,
                  transition: 'color 0.15s ease',
                }}
              >
                <tab.icon size={22} strokeWidth={active ? 2.2 : 1.6} />
                {tab.label}
              </button>
            )
          })}
        </nav>

      </div>
    </div>
  )
}
