import PropTypes                               from 'prop-types'
import { useLocation, useNavigate }            from 'react-router-dom'
import { Home, BookOpen, PenLine, TrendingUp, LogOut } from 'lucide-react'
import { logout }                              from '../../api/auth'

const NAV_ITEMS = [
  { to: '/',         icon: Home,       label: 'Home'     },
  { to: '/courses',  icon: BookOpen,   label: 'Courses'  },
  { to: '/practice', icon: PenLine,    label: 'Practice' },
  { to: '/progress', icon: TrendingUp, label: 'Progress' },
]

function NavItem({ to, icon: Icon, label, collapsed = false }) {
  const { pathname } = useLocation()
  const navigate     = useNavigate()

  function isActive() {
    if (to === '/') return pathname === '/'
    return pathname.startsWith(to)
  }

  const active = isActive()

  return (
    <button
      onClick={() => navigate(to)}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      title={collapsed ? label : undefined}
      className={`
        flex items-center gap-3 rounded-full transition-all duration-[var(--duration-fast)]
        ${collapsed ? 'w-10 h-10 justify-center' : 'px-3 py-2.5 w-full'}
        ${active
          ? 'bg-bg-sunk text-ink font-semibold'
          : 'text-ink-2 hover:bg-bg-sunk hover:text-ink'}
      `}
    >
      <Icon
        size={18}
        strokeWidth={active ? 2 : 1.5}
        className="shrink-0"
        aria-hidden="true"
      />
      {!collapsed && (
        <span className="text-sm truncate">
          {label}
        </span>
      )}
    </button>
  )
}

NavItem.propTypes = {
  to:        PropTypes.string.isRequired,
  icon:      PropTypes.elementType.isRequired,
  label:     PropTypes.string.isRequired,
  collapsed: PropTypes.bool,
}

export default function Sidebar({ collapsed = false }) {
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <aside
      aria-label="Main navigation"
      className={`
        flex flex-col bg-bg-2 border-r border-line-soft
        sticky top-0 h-screen py-4 shrink-0
        ${collapsed ? 'w-[var(--rail-sidebar-collapsed)] items-center px-0' : 'w-[var(--rail-sidebar)] px-3'}
      `}
    >
      {/* Logo */}
      <div className={`
        flex items-center gap-2.5 mb-6 shrink-0
        ${collapsed ? 'justify-center' : 'px-1'}
      `}>
        <div className="w-8 h-8 bg-accent rounded-[5px] flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-bold" aria-hidden="true">EC</span>
        </div>
        {!collapsed && (
          <span className="font-serif text-sm font-semibold text-ink truncate">
            Exam Coach
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 flex-1 w-full">
        {NAV_ITEMS.map(item => (
          <NavItem key={item.to} {...item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Divider */}
      <div className="w-full border-t border-line-soft my-3" />

      {/* Logout */}
      <button
        onClick={handleLogout}
        aria-label="Log out"
        title={collapsed ? 'Log out' : undefined}
        className={`
          flex items-center gap-3 rounded-full text-ink-2
          hover:bg-bg-sunk hover:text-danger transition-all duration-[var(--duration-fast)]
          ${collapsed ? 'w-10 h-10 justify-center' : 'w-full px-3 py-2.5'}
        `}
      >
        <LogOut size={18} strokeWidth={1.5} className="shrink-0" aria-hidden="true" />
        {!collapsed && (
          <span className="text-sm">Logout</span>
        )}
      </button>
    </aside>
  )
}

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
}
