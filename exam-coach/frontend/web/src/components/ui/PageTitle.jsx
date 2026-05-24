export default function PageTitle({ children, className = '', style }) {
  return (
    <h1
      className={`text-[28px] sm:text-display-xl font-serif font-medium text-text-primary ${className}`}
      style={{ letterSpacing: '-0.02em', ...style }}
    >
      {children}
    </h1>
  )
}
