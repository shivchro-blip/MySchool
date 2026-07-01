import { useEffect } from 'react'
import { createPortal } from 'react-dom'

/**
 * On-brand confirmation dialog. Reusable across confirm-before-act flows
 * (e.g. logout). Uses PAPER tokens only — no hardcoded hex.
 *
 * Props:
 *   open         — boolean, controls visibility
 *   title        — heading text
 *   message      — body text
 *   confirmLabel — confirm button text (default "Confirm")
 *   cancelLabel  — cancel button text (default "Cancel")
 *   danger       — style the confirm button as destructive
 *   onConfirm    — called when confirm is pressed
 *   onCancel     — called on cancel / backdrop / Escape
 */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') onCancel?.()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null

  const confirmBg = danger ? 'var(--danger)' : 'var(--brand-teal)'

  // Portal to document.body so the overlay escapes the dashboard shell's
  // stacking/overflow context (sticky topbar + scrollable main clip it otherwise).
  // Shell chrome tops out at z-index 40 (mobile menu) — sit well above it.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onCancel}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(15, 23, 42, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 380,
          background: 'var(--bg-2)',
          border: '1px solid var(--line)',
          borderRadius: 16,
          boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
          padding: '24px 24px 20px',
        }}
      >
        <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px' }}>
          {title}
        </h2>
        {message && (
          <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6, margin: '0 0 20px' }}>
            {message}
          </p>
        )}

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            style={{
              fontSize: 14, fontWeight: 600,
              padding: '9px 16px', borderRadius: 8,
              background: 'var(--bg-sunk)',
              color: 'var(--ink-2)',
              border: '1px solid var(--line)',
              cursor: 'pointer',
              transition: 'opacity 0.15s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            style={{
              fontSize: 14, fontWeight: 600,
              padding: '9px 16px', borderRadius: 8,
              background: confirmBg,
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.15s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
