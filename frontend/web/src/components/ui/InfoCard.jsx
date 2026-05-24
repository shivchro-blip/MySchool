export default function InfoCard({ label, icon = null, isTip = false, children, className = '' }) {
  const containerStyle = isTip ? {
    background: 'var(--tip-bg)',
    border: '1px solid var(--tip-border)',
    borderRadius: 12,
    padding: '14px 16px',
  } : {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 12,
    padding: '14px 15px',
  }
  const iconColor   = isTip ? 'var(--tip-text)' : 'var(--brand)'
  const labelClass  = isTip ? 'text-eyebrow' : 'text-label'
  const labelStyle  = { color: isTip ? 'var(--tip-text)' : 'var(--text-primary)', margin: 0 }
  const bodyClass   = isTip ? 'text-body-sm text-text-primary' : 'text-caption text-text-secondary'
  return (
    <div style={containerStyle} className={className}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: isTip ? 6 : 7 }}>
        {icon != null && <span style={{ fontSize: 16, color: iconColor, lineHeight: 1 }}>{icon}</span>}
        <p className={labelClass} style={labelStyle}>{label}</p>
      </div>
      <div className={bodyClass} style={{ lineHeight: isTip ? 1.65 : 1.6 }}>
        {children}
      </div>
    </div>
  )
}

export function InfoCardGrid({ children }) {
  return (
    <div className="grid gap-[10px]" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(248px, 1fr))' }}>
      {children}
    </div>
  )
}
