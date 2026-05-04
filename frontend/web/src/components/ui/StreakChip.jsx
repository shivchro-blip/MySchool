import { Flame } from 'lucide-react'

export default function StreakChip({ days = 0 }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-pos-soft text-pos text-[11px] font-semibold">
      <Flame size={12} strokeWidth={1.5} aria-hidden="true" />
      {days}-day streak
    </span>
  )
}
