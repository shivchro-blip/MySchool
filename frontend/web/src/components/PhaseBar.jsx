export default function PhaseBar({ chapterId, current, dark = false }) {
  const phases = [
    { key: 'learn',    label: 'Learn',    href: `/learn/${chapterId}`,    num: 1 },
    { key: 'practice', label: 'Practice', href: `/practice/${chapterId}`, num: 2 },
  ]

  return (
    <div className="mb-5">
      <a
        href="/"
        className={`text-xs mb-3 inline-block transition-all duration-200 ${
          dark
            ? 'text-ec-text-muted hover:text-ec-blue-text'
            : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        ← All Chapters
      </a>
      <div className="flex items-center gap-2">
        {phases.map((p, i) => {
          const isActive = current === p.key
          return (
            <div key={p.key} className="flex items-center gap-2">
              {i > 0 && (
                <div className={`w-5 border-t border-dashed ${
                  dark ? 'border-ec-border-sub' : 'border-gray-200'
                }`} />
              )}
              <a
                href={p.href}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium border transition-all duration-200 ${
                  dark ? 'rounded-pill' : 'rounded-full'
                } ${
                  isActive
                    ? dark
                      ? 'bg-ec-blue text-white border-ec-blue pointer-events-none'
                      : 'bg-brand-600 text-white border-brand-600 shadow-sm pointer-events-none'
                    : dark
                      ? 'bg-transparent text-ec-text-muted border-ec-border hover:border-ec-blue hover:text-ec-blue-text'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-brand-300 hover:text-brand-600'
                }`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : dark
                      ? 'bg-ec-bg-card text-ec-text-muted'
                      : 'bg-gray-100 text-gray-500'
                }`}>
                  {p.num}
                </span>
                {p.label}
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
