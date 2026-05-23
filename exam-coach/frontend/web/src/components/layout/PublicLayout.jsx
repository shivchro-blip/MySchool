import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import BrandLogo from '../ui/BrandLogo'
import AppFooter from './AppFooter'

export default function PublicLayout({ children, title, description }) {
  useEffect(() => {
    const base = 'TN Exam Coach'
    document.title = title ? `${title} · ${base}` : base
    if (description) {
      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', 'description')
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', description)
    }
  }, [title, description])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--page-bg)' }}>
      <header style={{
        height: 58,
        background: 'var(--surface-alt)',
        borderBottom: '1px solid var(--line-soft)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: 10,
        position: 'sticky',
        top: 0,
        zIndex: 30,
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <BrandLogo height={34} variant="compact" />
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            Exam Coach
          </span>
        </Link>
      </header>
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 720,
        margin: '0 auto',
        width: '100%',
        padding: '32px 20px 0',
      }}>
        <div style={{ flex: 1, minHeight: 0 }}>
          {children}
        </div>
      </main>
      <AppFooter />
    </div>
  )
}
