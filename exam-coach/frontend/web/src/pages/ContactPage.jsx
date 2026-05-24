import { useState } from 'react'
import PublicLayout from '../components/layout/PublicLayout'
import { PRODUCT_NAME, CONTACT_EMAIL } from '../lib/legal-constants'
import PageHeader from '../components/ui/PageHeader'

export default function ContactPage() {
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    navigator.clipboard.writeText(CONTACT_EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <PublicLayout
      title="Contact"
      description={`Get in touch with ${PRODUCT_NAME} for support or questions.`}
    >
      <PageHeader title="Contact" />
      <p style={{ color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.6 }}>
        {PRODUCT_NAME} is run by a single operator. For support, privacy requests,
        or data deletion requests, email us at:
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'var(--surface-alt)',
        border: '1px solid var(--line-soft)',
        borderRadius: 12,
        padding: '14px 18px',
        marginBottom: 32,
      }}>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', flex: 1 }}
        >
          {CONTACT_EMAIL}
        </a>
        <button
          onClick={copyEmail}
          style={{
            background: copied ? '#2A7B6F' : 'var(--surface-alt)',
            color: copied ? 'white' : 'var(--text-secondary)',
            border: '1px solid var(--line)',
            borderRadius: 8,
            padding: '6px 14px',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 150ms',
            flexShrink: 0,
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
        Data deletion requests
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>
        To request deletion of your account and data, email the address above with the subject
        line <strong>"Data deletion request"</strong> and include the email address associated
        with your account. We aim to respond within 30 days.
      </p>

      <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
        Response time
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
        We aim to respond to all emails within 5 business days.
      </p>
    </PublicLayout>
  )
}
