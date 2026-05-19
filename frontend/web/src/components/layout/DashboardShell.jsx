import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, Search, Bell, LayoutGrid, BookOpen, TrendingUp, Activity, Award } from 'lucide-react'
import DashboardSidebar from './DashboardSidebar'

const BOTTOM_TABS = [
  { id: 'dashboard',   label: 'Home',     icon: LayoutGrid, to: '/'            },
  { id: 'courses',     label: 'Courses',  icon: BookOpen,   to: '/plus1'       },
  { id: 'progress',    label: 'Progress', icon: TrendingUp, to: '/progress'    },
  { id: 'activity',    label: 'Activity', icon: Activity,   to: '/activity'    },
  { id: 'certificate', label: 'Certs',    icon: Award,      to: '/certificate' },
]

export default function DashboardShell({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  function isTabActive(to) {
    if (to === '/') return pathname === '/'
    return pathname.startsWith(to)
  }

  return (
    <div
      style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f8', fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Desktop sidebar — hidden below 900px via Tailwind */}
      <div className="hidden min-[900px]:flex" style={{ flexShrink: 0 }}>
        <DashboardSidebar />
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex' }}
        >
          <div
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }}
            onClick={() => setDrawerOpen(false)}
          />
          <div style={{ position: 'relative', zIndex: 1, width: 200 }}>
            <DashboardSidebar onClose={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/* Right side: header + content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Header */}
        <header style={{
          height: 58,
          background: 'white',
          borderBottom: '1px solid #eef0f7',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          gap: 12,
          position: 'sticky',
          top: 0,
          zIndex: 30,
          flexShrink: 0,
        }}>
          <button
            onClick={() => setDrawerOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8, display: 'flex', alignItems: 'center' }}
          >
            <Menu size={20} color="#374151" />
          </button>

          <p style={{ fontSize: 14, color: '#374151', flex: 1, margin: 0 }}>
            Welcome back, <strong style={{ color: '#2ec4b6' }}>Student!</strong>
          </p>

          {/* Search — hidden on mobile */}
          <div className="hidden min-[640px]:flex" style={{
            alignItems: 'center', gap: 8,
            background: '#f5f6fa', borderRadius: 10, padding: '7px 12px',
            fontSize: 13, color: '#9ca3af',
          }}>
            <Search size={14} color="#9ca3af" />
            <span>Search...</span>
          </div>

          {/* Bell */}
          <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8, display: 'flex', alignItems: 'center' }}>
            <Bell size={20} color="#374151" />
            <span style={{
              position: 'absolute', top: 5, right: 5,
              width: 7, height: 7, borderRadius: '50%',
              background: '#ff6b6b', border: '1.5px solid white',
            }} />
          </button>

          {/* Avatar */}
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'linear-gradient(135deg, #2ec4b6, #9b72f0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: 13,
            cursor: 'pointer', flexShrink: 0,
          }}>S</div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
          {children}
        </main>

        {/* Mobile bottom tab bar — hidden on desktop */}
        <nav
          className="min-[900px]:hidden"
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            height: 64,
            background: 'white',
            borderTop: '1px solid #eef0f7',
            display: 'flex',
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
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: active ? '#2ec4b6' : '#9ca3af',
                  fontSize: 10,
                  fontWeight: active ? 600 : 500,
                  transition: 'color 0.15s ease',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <tab.icon size={20} strokeWidth={active ? 2.2 : 1.6} />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
