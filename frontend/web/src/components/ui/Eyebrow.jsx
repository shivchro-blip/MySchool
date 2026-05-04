export default function Eyebrow({ children, className = '' }) {
  return (
    <span className={`font-mono uppercase tracking-[0.12em] text-[11px] text-ink-3 ${className}`}>
      {children}
    </span>
  )
}
