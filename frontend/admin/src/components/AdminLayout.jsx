const NAV = [
  { href: '/',            label: '📊 Dashboard'  },
  { href: '/content',     label: '📚 Content'     },
  { href: '/questions',   label: '❓ Questions'    },
  { href: '/evaluations', label: '🤖 Evaluations' },
  { href: '/pipeline',    label: '⚙️ Pipeline'    },
]

export default function AdminLayout({ children, title }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-52 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <p className="font-bold text-admin-700 text-sm">⚙️ Admin Panel</p>
          <p className="text-xs text-gray-400 mt-0.5">Exam Coach</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(n => (
            <a
              key={n.href}
              href={n.href}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors
                ${window.location.pathname === n.href
                  ? 'bg-admin-50 text-admin-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={() => {
              localStorage.removeItem('admin_token')
              window.location.href = '/login'
            }}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <h1 className="text-lg font-bold text-gray-900">{title}</h1>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
