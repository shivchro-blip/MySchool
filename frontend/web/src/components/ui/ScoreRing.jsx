export default function ScoreRing({ awarded = 0, total = 1, size = 96, caption = '' }) {
  const pct  = total > 0 ? Math.round((awarded / total) * 100) : 0
  const r    = (size / 2) - 8
  const circ = 2 * Math.PI * r
  const dash = circ * (1 - pct / 100)

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} aria-hidden="true">
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="var(--line)" strokeWidth="7"
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="var(--accent)" strokeWidth="7"
          strokeDasharray={circ} strokeDashoffset={dash}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            transition: 'stroke-dashoffset var(--duration-ring) var(--ease-out)',
          }}
          className="[@media(prefers-reduced-motion:reduce)]:transition-none"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="font-serif text-[26px] font-semibold text-ink">{awarded}</span>
        <span className="font-mono text-[10.5px] uppercase tracking-widest text-ink-3 mt-0.5">
          {caption || `/${total}`}
        </span>
      </div>
    </div>
  )
}
