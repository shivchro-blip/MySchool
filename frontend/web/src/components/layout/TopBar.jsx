import PropTypes       from 'prop-types'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function TopBar({ title, backTo, action }) {
  const navigate = useNavigate()

  return (
    <header
      role="banner"
      className="sticky top-0 z-20 h-14
                 bg-bg/90 backdrop-blur-md border-b border-line-soft"
    >
      <div className="h-full px-4 lg:px-8 flex items-center justify-between
                      max-w-4xl mx-auto w-full">

        <div className="w-10 flex items-center">
          {backTo && (
            <button
              onClick={() => navigate(backTo)}
              aria-label="Go back"
              className="w-10 h-10 flex items-center justify-center
                         rounded-full hover:bg-bg-sunk text-ink-2
                         active:scale-95 transition-all duration-[var(--duration-fast)]"
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
          )}
        </div>

        {title && (
          <h1 className="text-base font-semibold text-ink text-center
                          flex-1 truncate px-2">
            {title}
          </h1>
        )}

        <div className="w-10 flex items-center justify-end">
          {action}
        </div>
      </div>
    </header>
  )
}

TopBar.propTypes = {
  title:  PropTypes.string,
  backTo: PropTypes.string,
  action: PropTypes.node,
}
