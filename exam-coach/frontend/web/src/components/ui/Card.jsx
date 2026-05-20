export default function Card({ children, interactive, padding = 'md', className = '', onClick }) {
  const padMap = { none: '', sm: 'p-3', md: 'p-4', lg: 'p-6', xl: 'p-8' }
  return (
    <div
      onClick={onClick}
      className={`
        bg-bg-2 rounded-md border border-line-soft
        ${padMap[padding]}
        ${interactive
          ? 'cursor-pointer hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-[var(--duration-fast)]'
          : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
