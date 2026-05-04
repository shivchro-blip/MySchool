export default function Button({
  children,
  variant = 'primary',
  size    = 'md',
  className = '',
  ...props
}) {
  const sizes = {
    sm: 'h-7 px-3 text-[11px] min-w-[44px]',
    md: 'h-9 px-4 text-sm',
    lg: 'h-11 px-5 text-sm min-h-[44px]',
  }
  const variants = {
    primary:   'bg-ink text-bg-2 hover:bg-ink-2',
    secondary: 'bg-bg border border-line text-ink hover:bg-bg-sunk',
    accent:    'bg-accent text-white hover:bg-accent-ink',
    ghost:     'text-ink-2 hover:bg-bg-sunk',
    soft:      'bg-accent-soft text-accent-ink hover:bg-accent-soft/80',
  }
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-1.5 rounded-full font-semibold
        transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)]
        disabled:opacity-40 disabled:cursor-not-allowed
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
        ${sizes[size]  || sizes.md}
        ${variants[variant] || variants.primary}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
