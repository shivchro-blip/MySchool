import { useId }                   from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown }             from 'lucide-react'

/**
 * AccordionCard — accessible, full-header-clickable accordion.
 *
 * The entire header row (stripe + content + chevron) is a single <button>,
 * so there are no nested interactive elements and no duplicate click events.
 *
 * Props:
 *   open        {bool}    controlled open state
 *   onToggle    {fn}      called when header is activated
 *   stripeColor {string}  left accent stripe colour
 *   header      {node}    content rendered inside the button (badge, title, etc.)
 *   footer      {node?}   always-visible content rendered below the header button
 *   children    {node?}   animated collapsible region
 *   borderColor {string?} card border colour
 *   boxShadow   {string?} card box-shadow
 *   label       {string?} accessible label for the header button
 *   className   {string?} extra classes on the outer card container
 */
export function AccordionCard({
  open,
  onToggle,
  stripeColor,
  header,
  footer,
  children,
  borderColor,
  boxShadow,
  label,
  className = '',
}) {
  const contentId = useId()

  return (
    <div
      className={`bg-white rounded-2xl border overflow-hidden transition-shadow duration-200 ${className}`}
      style={{ borderColor, boxShadow }}
    >
      {/* Single interactive element — entire header is the toggle target */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={contentId}
        aria-label={label}
        className="flex items-stretch w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-inset"
      >
        <div className="w-1.5 shrink-0" style={{ background: stripeColor }} />
        <div className="flex-1 flex items-center gap-3.5 px-4 py-4 hover:bg-indigo-50/30 transition-colors duration-200">
          {header}
          <ChevronDown
            size={18}
            aria-hidden="true"
            className="shrink-0 ml-auto"
            style={{
              color:      open ? '#4f46e5' : '#d1d5db',
              transform:  open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          />
        </div>
      </button>

      {footer}

      <AnimatePresence>
        {open && (
          <motion.div
            id={contentId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
