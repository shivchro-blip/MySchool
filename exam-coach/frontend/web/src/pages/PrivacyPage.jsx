import Markdown from 'react-markdown'
import PublicLayout from '../components/layout/PublicLayout'
import { LEGAL_LAST_UPDATED } from '../lib/legal-constants'
import privacyMd from '../legal/privacy-policy.md?raw'

export default function PrivacyPage() {
  return (
    <PublicLayout
      title="Privacy Policy"
      description="How TN Exam Coach collects, uses, and protects your personal information."
    >
      <div style={{ color: 'var(--text-primary)', lineHeight: 1.7 }} className="prose-legal">
        <p style={{ fontSize: 12, color: 'var(--ink-4)', marginBottom: 24 }}>
          Last updated: {LEGAL_LAST_UPDATED}
        </p>
        <Markdown>{privacyMd}</Markdown>
      </div>
    </PublicLayout>
  )
}
