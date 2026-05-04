import { ChevronRight } from 'lucide-react'

const STEPS = ['Learn', 'Practice', 'Evaluate', 'Improve']

export default function LoopStepper({ current }) {
  const idx = STEPS.indexOf(current)
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center gap-1.5">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            i === idx ? 'bg-accent text-white' :
            i < idx   ? 'bg-accent-soft text-accent-ink' :
                        'bg-bg-sunk text-ink-4'
          }`}>
            {step}
          </span>
          {i < STEPS.length - 1 && (
            <ChevronRight size={10} className="text-line" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  )
}
