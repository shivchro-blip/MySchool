import { logout, isLoggedIn } from '../api/auth'

export default function Layout({ children, title = 'AI Exam Coach', wide = false, dark = false }) {
  const loggedIn = isLoggedIn()

  function handleLogout() {
    logout()
    window.location.href = '/login'
  }

  const maxW = wide ? 'max-w-6xl' : 'max-w-2xl'

  return (
    <div className={`min-h-screen ${dark ? 'text-ec-text-body' : ''}`} style={{ backgroundColor: 'var(--ec-bg-page)' }}>
      <nav className={`sticky top-0 z-10 border-b transition-colors duration-200 ${
        dark
          ? 'border-ec-border-sub'
          : 'bg-white border-gray-100 shadow-sm'
      }`} style={dark ? { backgroundColor: 'var(--ec-bg-page)' } : {}}>
        <div className={`${maxW} mx-auto px-4 h-14 flex items-center justify-between`}>
          <a href="/" className="flex items-center gap-2">
            <div className={`w-7 h-7 flex items-center justify-center ${
              dark ? 'bg-ec-blue rounded-[7px]' : 'bg-brand-600 rounded-lg'
            }`}>
              <span className="text-white text-xs font-bold">EC</span>
            </div>
            <span className={`font-bold text-sm tracking-tight ${
              dark ? 'text-ec-text-h' : 'text-gray-900'
            }`}>
              Exam Coach
            </span>
          </a>
          <div className="flex items-center gap-1">
            {loggedIn ? (
              <>
                <a
                  href="/progress"
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    dark
                      ? 'text-ec-text-muted hover:text-ec-text-primary hover:bg-ec-bg-card'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Progress
                </a>
                <button
                  onClick={handleLogout}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    dark
                      ? 'text-ec-text-muted hover:text-ec-text-primary hover:bg-ec-bg-card'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Logout
                </button>
              </>
            ) : (
              <a href="/login" className="btn-primary text-sm">Login</a>
            )}
          </div>
        </div>
      </nav>

      <main className={`${maxW} mx-auto px-4 py-6`}>
        {title && (
          <h1 className={`text-xl font-bold mb-4 ${dark ? 'text-ec-text-h' : 'text-gray-900'}`}>
            {title}
          </h1>
        )}
        {children}
      </main>
    </div>
  )
}
