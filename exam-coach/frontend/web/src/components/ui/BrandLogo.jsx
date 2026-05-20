import { GraduationCap } from 'lucide-react'

const TEAL = '#2A7B6F'

/**
 * BrandLogo — teal rounded-square icon badge.
 * Props:
 *   height    (number) — px size (square). Default varies by variant.
 *   variant   ('full' | 'compact') — preset sizes; overridden by explicit height.
 *   className (string) — extra Tailwind/CSS classes.
 *   style     (object) — inline style overrides.
 */
export default function BrandLogo({ height, variant = 'full', className = '', style = {} }) {
  const size   = height ?? (variant === 'compact' ? 36 : 48)
  const icon   = Math.round(size * 0.54)
  const radius = Math.round(size * 0.24)

  return (
    <div
      className={className}
      style={{
        width: size, height: size,
        background: TEAL,
        borderRadius: radius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        ...style,
      }}
    >
      <GraduationCap size={icon} color="#ffffff" strokeWidth={2} />
    </div>
  )
}
