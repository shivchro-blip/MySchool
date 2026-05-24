export default function Eyebrow({ children, className = '', style }) {
  return (
    <p
      className={`text-eyebrow ${className}`}
      style={{ color: 'var(--brand-strong)', margin: 0, ...style }}
    >
      {children}
    </p>
  )
}
