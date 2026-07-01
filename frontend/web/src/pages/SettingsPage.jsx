import { useNavigate } from 'react-router-dom'
import { Trash2, Monitor, Sun, Moon } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import { useTheme } from '../hooks/useTheme'

const THEME_OPTIONS = [
  { value: 'system', label: 'System Default', Icon: Monitor },
  { value: 'light',  label: 'Light',          Icon: Sun     },
  { value: 'dark',   label: 'Dark',           Icon: Moon    },
]

function ThemeOption({ option, selected, onSelect }) {
  const { Icon, label, value } = option
  return (
    <button
      onClick={() => onSelect(value)}
      aria-pressed={selected}
      style={{
        flex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        padding: '16px 10px',
        borderRadius: 10,
        cursor: 'pointer',
        background: selected ? 'var(--accent-soft)' : 'var(--bg-2)',
        border: `1.5px solid ${selected ? 'var(--accent)' : 'var(--line)'}`,
        color: selected ? 'var(--accent-ink)' : 'var(--ink-2)',
        transition: 'background 0.15s ease, border-color 0.15s ease, color 0.15s ease',
      }}
    >
      <Icon size={20} strokeWidth={selected ? 2.2 : 1.8} />
      <span style={{ fontSize: 12.5, fontWeight: selected ? 600 : 500 }}>{label}</span>
    </button>
  )
}

export default function SettingsPage() {
  const navigate = useNavigate()
  const [, , theme, setTheme] = useTheme()

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: 'clamp(24px, 4vw, 40px) clamp(20px, 3vw, 32px) 96px' }}>
      <PageHeader
        title="Settings"
        subtitle="Manage your account and preferences."
      />

      {/* ── Appearance ─────────────────────────────────────────── */}
      <section style={{
        border: '1px solid var(--line-soft)',
        borderRadius: 12,
        background: 'var(--bg-2)',
        padding: '20px 24px',
        marginBottom: 20,
      }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 4px', color: 'var(--ink)' }}>
          Appearance
        </h2>
        <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: '0 0 16px', lineHeight: 1.6 }}>
          Choose how Yadhum looks. System Default follows your device setting.
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          {THEME_OPTIONS.map(option => (
            <ThemeOption
              key={option.value}
              option={option}
              selected={theme === option.value}
              onSelect={setTheme}
            />
          ))}
        </div>
      </section>

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

      {/* ── App version ────────────────────────────────────────── */}
      <p style={{ fontSize: 12, color: 'var(--ink-3)', textAlign: 'center', marginTop: 28 }}>
        Yadhum · Version {__APP_VERSION__}
      </p>
    </div>
  )
}
