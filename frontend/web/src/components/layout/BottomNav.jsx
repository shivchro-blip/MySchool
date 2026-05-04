import { Home, BookOpen, PenLine, TrendingUp } from 'lucide-react'
import { useLocation, useNavigate }             from 'react-router-dom'

const TABS = [
  { to: '/',         icon: Home,       label: 'Home'     },
  { to: '/courses',  icon: BookOpen,   label: 'Courses'  },
  { to: '/practice', icon: PenLine,    label: 'Practice' },
  { to: '/progress', icon: TrendingUp, label: 'Progress' },
]

export default function BottomNav() {
  const { pathname } = useLocation()
  const navigate     = useNavigate()

  function isActive(to) {
    if (to === '/') return pathname === '/'
    return pathname.startsWith(to)
  }

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed bottom-0 inset-x-0 z-20 min-[900px]:hidden
                 bg-bg-2/90 backdrop-blur-md border-t border-line-soft
                 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex max-w-lg mx-auto min-h-[64px]">
        {TABS.map(({ to, icon: Icon, label }) => {
          const active = isActive(to)
          return (
            <button
              key={to}
              onClick={() => navigate(to)}
              aria-label={label}
              aria-current={active ? 'page' : undefined}
              className={`
                flex-1 flex flex-col items-center justify-center
                gap-0.5 py-2.5
                transition-colors duration-[var(--duration-fast)]
                ${active ? 'text-accent' : 'text-ink-3 hover:text-ink-2'}
              `}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.5} aria-hidden="true" />
              <span className="text-[10px] font-semibold tracking-wide">
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
