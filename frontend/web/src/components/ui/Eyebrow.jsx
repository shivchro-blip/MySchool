export default function Eyebrow({ children, className = '', style }) {
  return (
    <p
      className={className}
      style={{
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  )
}
