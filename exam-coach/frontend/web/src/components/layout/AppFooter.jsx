import { Link } from 'react-router-dom'
import { PRODUCT_NAME } from '../../lib/legal-constants'

const YEAR = new Date().getFullYear()

export default function AppFooter() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--line-soft)',
        padding: '6px 20px 8px',
        fontSize: 10.5,
        color: 'var(--ink-4)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        marginTop: 'auto',
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 8px', alignItems: 'center', lineHeight: 1.25 }}>
        <span>&copy; {YEAR} {PRODUCT_NAME}</span>
        <span aria-hidden="true" style={{ color: 'var(--line)' }}>&middot;</span>
        <Link to="/privacy" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Privacy Policy</Link>
        <span aria-hidden="true" style={{ color: 'var(--line)' }}>&middot;</span>
        <Link to="/terms" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Terms of Service</Link>
        <span aria-hidden="true" style={{ color: 'var(--line)' }}>&middot;</span>
        <Link to="/contact" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Contact</Link>
      </div>
      <p
        className="app-footer-disclaimer"
      >
        {PRODUCT_NAME} is a free, independent educational website. It is not affiliated with the Government
        of Tamil Nadu, the Tamil Nadu State Board, SCERT, DGE, or any school.
      </p>
    </footer>
  )
}
