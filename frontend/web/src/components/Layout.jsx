import { logout, isLoggedIn } from '../api/auth'

export default function Layout({ children, title = 'AI Exam Coach' }) {
  const loggedIn = isLoggedIn()

  function handleLogout() {
    logout()
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="font-bold text-brand-700 text-lg tracking-tight">
            📚 Exam Coach
          </a>
          <div className="flex items-center gap-3">
            {loggedIn ? (
              <>
                <a href="/progress" className="text-sm text-gray-600 hover:text-gray-900">
                  Progress
                </a>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-gray-700"
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

      <main className="max-w-2xl mx-auto px-4 py-6">
        {title && (
          <h1 className="text-xl font-bold text-gray-900 mb-4">{title}</h1>
        )}
        {children}
      </main>
    </div>
  )
}
