export default function PageTitle({ children, className = '', style }) {
  return (
    <h1
      className={className}
      style={{
        fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
        fontWeight: 700,
        color: 'var(--ink)',
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        ...style,
      }}
    >
      {children}
    </h1>
  )
}
