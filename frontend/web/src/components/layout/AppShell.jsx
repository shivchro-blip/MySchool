/**
 * AppShell — 2-column layout for all syllabus pages.
 *
 * Desktop: fixed sidebar (220px) + scrollable main content
 * Mobile:  hidden sidebar (drawer) + full-width content + hamburger button
 */

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Sidebar, MobileSidebar } from '../nav'

export default function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-bg flex">

      {/* Desktop sidebar */}
      <aside className="
        hidden lg:flex lg:flex-col
        w-[var(--rail-sidebar)] shrink-0
        bg-bg-2 border-r border-line-soft
        sticky top-0 h-screen overflow-hidden
      ">
        <Sidebar />
      </aside>

      {/* Mobile sidebar */}
      <MobileSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Mobile top bar */}
        <header className="
          lg:hidden
          sticky top-0 z-20
          bg-bg-2/90 backdrop-blur-md
          border-b border-line-soft
          h-14 flex items-center px-4 gap-3
        ">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 flex items-center justify-center
                       rounded-full hover:bg-bg-sunk text-ink-2
                       transition-colors"
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
          <p className="text-sm font-semibold text-ink truncate">
            AI Exam Coach
          </p>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-6 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
