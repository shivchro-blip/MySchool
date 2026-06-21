import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutGrid, BookOpen, TrendingUp, Award, Sun, Moon, LogOut } from 'lucide-react'
import BrandLogo from '../ui/BrandLogo'
import DashboardSidebar from './DashboardSidebar'
import { useTheme } from '../../hooks/useTheme'
import { useSessionHeartbeat } from '../../hooks/useSessionHeartbeat'
import { logout } from '../../api/auth'

// Active nav teal — no token exists in web Tailwind config for this shade
const TEAL = '#2A7B6F'

const BOTTOM_TABS = [
  { id: 'dashboard',   label: 'Home',     icon: LayoutGrid, to: '/'            },
  { id: 'courses',     label: 'Courses',  icon: BookOpen,   to: '/courses'     },
  { id: 'progress',    label: 'Progress', icon: TrendingUp, to: '/progress'    },
  { id: 'certificate', label: 'Certs',    icon: Award,      to: '/certificate' },
]

export default function DashboardShell({ children }) {
  useSessionHeartbeat()  // single-session active eviction across SPA navigation
  const [dark, toggleTheme] = useTheme()
  const [acctMenuOpen, setAcctMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  function isTabActive(to) {
    if (to === '/') return pathname === '/'
    return pathname.startsWith(to)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Desktop sidebar — always visible at ≥900px */}
      <div
        className="hidden min-[900px]:flex"
        style={{ flexShrink: 0, position: 'sticky', top: 0, height: '100vh', alignSelf: 'flex-start' }}
      >
        <DashboardSidebar />
      </div>

      {/* Right side: header + content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* ── Header ──────────────────────────────────────────── */}
        <header style={{
          height: 58,
          background: 'var(--bg-2)',
          borderBottom: '1px solid var(--line-soft)',
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
          <div className="flex min-[900px]:hidden" style={{ alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <BrandLogo height={34} variant="compact" />
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
              Yadhum
            </span>
          </div>

          {/* Desktop: plain wordmark (sidebar already shows logo) */}
          <span className="hidden min-[900px]:block" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
            Yadhum
            <span style={{ fontWeight: 400, color: 'var(--ink-4)', marginLeft: 6, fontSize: 11 }}>TN Board</span>
          </span>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Theme toggle — neutral pill.
              Same style in both modes; only icon + label change. */}
          <button
            onClick={toggleTheme}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'var(--bg-sunk)',
              border: '1px solid var(--line)',
              borderRadius: 100,
              padding: '6px 12px',
              cursor: 'pointer',
              color: 'var(--ink-2)',
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
            className="flex min-[900px]:hidden"
            title="Log out"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 6, borderRadius: 8, alignItems: 'center',
              justifyContent: 'center', minWidth: 36, minHeight: 36,
            }}
          >
            <LogOut size={18} style={{ color: 'var(--ink-3)' }} />
          </button>

          {/* Avatar + account menu */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <button
              onClick={() => setAcctMenuOpen(o => !o)}
              aria-label="Account menu"
              style={{
                width: 32, height: 32, borderRadius: '50%',
                background: TEAL,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 700, fontSize: 13,
                cursor: 'pointer', border: 'none', padding: 0,
              }}
            >S</button>
            {acctMenuOpen && (
              <>
                {/* Click-outside overlay */}
                <div
                  onClick={() => setAcctMenuOpen(false)}
                  style={{ position: 'fixed', inset: 0, zIndex: 39 }}
                />
                <div style={{
                  position: 'absolute',
                  top: 40, right: 0,
                  background: 'var(--bg-2)',
                  border: '1px solid var(--line)',
                  borderRadius: 12,
                  padding: '4px 0',
                  zIndex: 40,
                  minWidth: 168,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                }}>
                  <button
                    onClick={() => { setAcctMenuOpen(false); handleLogout() }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      width: '100%', padding: '10px 14px', fontSize: 13,
                      color: 'var(--danger)', background: 'none',
                      border: 'none', cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <LogOut size={14} style={{ flexShrink: 0 }} />
                    Log out
                  </button>
                </div>
              </>
            )}
          </div>

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

        {/* Mobile bottom tab bar — hidden on desktop (≥900px).
            display must live in className, not inline style — inline overrides Tailwind. */}
        <nav
          className="flex min-[900px]:hidden"
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            height: 64,
            background: 'var(--bg-2)',
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
