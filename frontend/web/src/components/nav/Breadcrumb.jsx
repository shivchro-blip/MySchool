import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumb({ crumbs = [] }) {
  if (crumbs.length <= 1) return null

  return (
    <nav className="flex items-center gap-1 flex-wrap mb-5">
      {crumbs.map((crumb, i) => (
        <div key={i} className="flex items-center gap-1">
          {i > 0 && (
            <ChevronRight size={13} className="text-ink-4 shrink-0" />
          )}
          {crumb.to ? (
            <Link
              to={crumb.to}
              className="text-xs font-medium text-accent hover:text-accent-ink
                         transition-colors truncate max-w-[120px]"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="text-xs font-medium text-ink-3 truncate max-w-[120px]">
              {crumb.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}
