import PublicLayout from '../components/layout/PublicLayout'
import { Link } from 'react-router-dom'

export default function DeleteAccountPage() {
  const subject = encodeURIComponent('Delete My Account')
  const body = encodeURIComponent(
    'Hi,\n\nI would like to permanently delete my Yadhum account and all associated data.\n\nEmail address on my account: \n\nThank you.'
  )
  const mailtoHref = `mailto:yadhumedu@gmail.com?subject=${subject}&body=${body}`

  return (
    <PublicLayout
      title="Delete Your Account"
      description="How to permanently delete your Yadhum account and data."
    >
      <div style={{ color: 'var(--ink)', lineHeight: 1.7, maxWidth: 600 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Delete Your Account</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>
          You can permanently delete your Yadhum account at any time. This removes your name,
          email address, learning progress, and all other personal data from our systems.
        </p>

        <div style={{
          background: 'var(--bg-2)',
          border: '1px solid var(--line-soft)',
          borderRadius: 12,
          padding: '24px 28px',
          marginBottom: 32,
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, marginTop: 0 }}>
            How to delete your account
          </h2>
          <ol style={{ paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <li>
              Send an email to{' '}
              <a href={mailtoHref} style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>
                yadhumedu@gmail.com
              </a>{' '}
              with the subject <strong>"Delete My Account"</strong>.
            </li>
            <li>
              Include the email address associated with your Yadhum account in the message body.
            </li>
            <li>
              We will permanently delete your account and all associated data within{' '}
              <strong>30 days</strong> and send you a confirmation email.
            </li>
          </ol>
        </div>

        <a
          href={mailtoHref}
          style={{
            display: 'inline-block',
            background: 'var(--brand-primary)',
            color: '#fff',
            fontWeight: 600,
            fontSize: 15,
            padding: '12px 24px',
            borderRadius: 8,
            textDecoration: 'none',
            marginBottom: 32,
          }}
        >
          Send deletion request
        </a>

        <div style={{
          background: '#fff8ed',
          border: '1px solid #f5c97a',
          borderRadius: 10,
          padding: '16px 20px',
          marginBottom: 32,
          fontSize: 14,
        }}>
          <strong>What gets deleted:</strong>
          <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
            <li>Your name and email address</li>
            <li>Your learning progress and completed lessons</li>
            <li>Your account preferences</li>
          </ul>
        </div>

        <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
          Questions? See our{' '}
          <Link to="/privacy" style={{ color: 'var(--brand-primary)' }}>Privacy Policy</Link>{' '}
          or email{' '}
          <a href="mailto:yadhumedu@gmail.com" style={{ color: 'var(--brand-primary)' }}>
            yadhumedu@gmail.com
          </a>.
        </p>
      </div>
    </PublicLayout>
  )
}
