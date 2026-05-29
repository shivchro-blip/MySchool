import { useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'

export default function SettingsPage() {
  const navigate = useNavigate()

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: 'clamp(24px, 4vw, 40px) clamp(20px, 3vw, 32px) 96px' }}>
      <PageHeader
        title="Settings"
        subtitle="Manage your account and preferences."
      />

      {/* ── Delete Account ─────────────────────────────────────── */}
      <section style={{
        border: '1.5px solid var(--danger)',
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '20px 24px',
          background: 'var(--bg-2)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8, flexShrink: 0,
              background: '#FEE2E2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Trash2 size={17} style={{ color: 'var(--danger)' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 6px', color: 'var(--ink)' }}>
                Delete Account
              </h2>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: '0 0 16px', lineHeight: 1.6 }}>
                Permanently removes your name, email, learning progress, and all other personal
                data from our systems. This action cannot be undone. Deletion is completed
                within <strong>30 days</strong> of your request.
              </p>
              <button
                onClick={() => navigate('/delete-account')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  background: 'var(--danger)', color: '#fff',
                  fontWeight: 600, fontSize: 14,
                  padding: '9px 18px', borderRadius: 8,
                  border: 'none', cursor: 'pointer',
                  transition: 'opacity 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <Trash2 size={14} />
                Delete my account
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
