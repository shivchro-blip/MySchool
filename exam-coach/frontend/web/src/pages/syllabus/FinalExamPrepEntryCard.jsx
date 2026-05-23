import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Award } from 'lucide-react'

function ClipboardSVG() {
  return (
    <svg width="52" height="60" viewBox="0 0 52 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="10" width="44" height="46" rx="7"
        fill="var(--brand)" fillOpacity={0.11}
        stroke="var(--brand)" strokeOpacity={0.28} strokeWidth="1.5"/>
      <rect x="17" y="4" width="18" height="11" rx="4"
        fill="var(--surface-alt)"
        stroke="var(--brand)" strokeOpacity={0.42} strokeWidth="1.5"/>
      <circle cx="26" cy="9.5" r="2.2"
        fill="var(--brand)" fillOpacity={0.38}/>
      <rect x="11" y="27" width="30" height="2" rx="1"
        fill="var(--brand)" fillOpacity={0.28}/>
      <rect x="11" y="33" width="22" height="2" rx="1"
        fill="var(--brand)" fillOpacity={0.2}/>
      <rect x="11" y="39" width="26" height="2" rx="1"
        fill="var(--brand)" fillOpacity={0.16}/>
      <rect x="11" y="45" width="8" height="8" rx="2"
        fill="none"
        stroke="var(--brand)" strokeOpacity={0.38} strokeWidth="1.5"/>
      <path d="M13 49 L15.5 51.5 L19 47.5"
        stroke="var(--brand)" strokeOpacity={0.55} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M34 48 L40 45.5 L46 48 L40 50.5 Z"
        fill="var(--brand)" fillOpacity={0.45}/>
      <rect x="37.5" y="50.5" width="5" height="2.5" rx="1"
        fill="var(--brand)" fillOpacity={0.35}/>
      <line x1="45" y1="48" x2="45" y2="52.5"
        stroke="var(--brand)" strokeOpacity={0.42} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export default function FinalExamPrepEntryCard({
  dest = '/plus1/english/final-exam-prep',
  classLabel = 'Class 11',
}) {
  const navigate = useNavigate()
  const [hov, setHov] = useState(false)

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(dest)}
      onKeyDown={e => e.key === 'Enter' && navigate(dest)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex items-center gap-4 sm:gap-6 px-5 py-4 sm:px-6 sm:py-5 mb-3 cursor-pointer"
      style={{
        borderRadius: 18,
        background: 'var(--final-card-bg)',
        border: `1.5px solid color-mix(in srgb, var(--final-card-ink) ${hov ? '25%' : '15%'}, transparent)`,
        boxShadow: hov ? '0 6px 24px var(--final-card-glow)' : '0 2px 8px var(--final-card-glow)',
        transform: hov ? 'translateY(-1px)' : 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.18s',
      }}
    >
      <div className="shrink-0 hidden sm:block">
        <ClipboardSVG />
      </div>

      <div className="flex-1 min-w-0">
        <span
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold mb-2"
          style={{
            border: `1.5px solid color-mix(in srgb, var(--final-card-ink) 40%, transparent)`,
            color: 'var(--final-card-ink)',
            background: `color-mix(in srgb, var(--final-card-ink) 10%, transparent)`,
          }}
        >
          Final Exam Prep
        </span>

        <p className="text-base font-bold leading-snug mb-1" style={{ color: 'var(--final-card-ink)' }}>
          Prepare for your Final Exams
        </p>

        <p className="text-xs leading-relaxed mb-3 max-w-[440px]" style={{ color: 'var(--final-card-body)' }}>
          Access past annual exam papers, important question patterns, high-priority topics and smart revision plans for {classLabel} English.
        </p>

        <button
          onClick={e => { e.stopPropagation(); navigate(dest) }}
          className="px-4 py-1.5 rounded-[14px] text-sm font-semibold"
          style={{
            background: 'var(--final-card-btn-bg)',
            color: 'var(--final-card-btn-ink)',
            opacity: hov ? 1 : 0.9,
            transition: 'opacity 0.15s',
          }}
        >
          Open Final Exam Prep →
        </button>
      </div>

      <div
        className="shrink-0 w-11 h-11 rounded-full items-center justify-center hidden sm:flex"
        style={{
          background: `color-mix(in srgb, var(--final-card-ink) 10%, transparent)`,
          border: `1.5px solid color-mix(in srgb, var(--final-card-ink) 20%, transparent)`,
        }}
      >
        <Award size={20} strokeWidth={1.8} style={{ color: 'var(--final-card-ink)' }} />
      </div>
    </div>
  )
}
