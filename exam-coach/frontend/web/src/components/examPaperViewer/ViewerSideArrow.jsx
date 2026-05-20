import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function ViewerSideArrow({ direction, onClick, disabled }) {
  const [hovered, setHovered] = useState(false)
  const isLeft = direction === 'left'

  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 z-20 flex items-center gap-2 ${isLeft ? 'left-4' : 'right-4'}`}
      style={{ pointerEvents: disabled ? 'none' : 'auto' }}
    >
      {/* Tooltip — left side shows on right, right side shows on left */}
      {hovered && !disabled && (
        <span
          className={`text-xs font-medium text-white bg-black/60 rounded-pill px-3 py-1 whitespace-nowrap select-none ${isLeft ? 'order-2' : 'order-1'}`}
        >
          {isLeft ? 'Previous Page' : 'Next Page'}
        </span>
      )}

      <button
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-fast
          ${isLeft ? 'order-1' : 'order-2'}
          ${disabled
            ? 'opacity-20 cursor-not-allowed'
            : 'opacity-80 hover:opacity-100 cursor-pointer'
          }`}
        style={{
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.18)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
        }}
        aria-label={isLeft ? 'Previous page' : 'Next page'}
      >
        {isLeft
          ? <ChevronLeft size={22} className="text-white" />
          : <ChevronRight size={22} className="text-white" />
        }
      </button>
    </div>
  )
}
