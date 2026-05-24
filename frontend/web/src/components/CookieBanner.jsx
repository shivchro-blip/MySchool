import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'tnec_cookie_consent'

const btnPrimary = {
  background: '#2A7B6F',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  padding: '8px 18px',
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
  flexShrink: 0,
}

const btnSecondary = {
  background: 'var(--surface-alt)',
  color: 'var(--text-secondary)',
  border: '1px solid var(--line)',
  borderRadius: 8,
  padding: '8px 18px',
  fontSize: 13,
  fontWeight: 500,
  cursor: 'pointer',
  flexShrink: 0,
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  function essentialOnly() {
    localStorage.setItem(STORAGE_KEY, 'essential_only')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 200,
      background: 'var(--bg-2)',
      borderTop: '1px solid var(--line)',
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      boxShadow: '0 -4px 16px rgba(0,0,0,0.08)',
    }}>
      <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
        TN Exam Coach uses a few small files (cookies and similar storage) to keep you signed in
        and to understand which lessons are most helpful, so we can improve them. We do not use
        advertising cookies.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <button onClick={accept} style={btnPrimary}>Accept</button>
        <button onClick={essentialOnly} style={btnSecondary}>Continue with essential cookies only</button>
        <Link to="/privacy" style={{ fontSize: 13, color: 'var(--text-secondary)', marginLeft: 4 }}>
          Learn more →
        </Link>
      </div>
    </div>
  )
}
