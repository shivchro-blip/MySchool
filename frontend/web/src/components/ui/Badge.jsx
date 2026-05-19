const toneMap = {
  neutral: 'bg-bg-sunk text-ink-2',
  accent:  'bg-accent-soft text-accent-ink',
  good:    'bg-good-soft text-good-ink',
  warn:    'bg-warn-soft text-warn',
  pos:     'bg-pos-soft text-pos',
}

export default function Badge({ children, tone = 'neutral', className = '' }) {
  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold
      ${toneMap[tone] || toneMap.neutral}
      ${className}
    `}>
      {children}
    </span>
  )
}
