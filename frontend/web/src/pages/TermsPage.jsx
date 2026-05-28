import Markdown from 'react-markdown'
import PublicLayout from '../components/layout/PublicLayout'
import { LEGAL_LAST_UPDATED } from '../lib/legal-constants'
import termsMd from '../legal/terms-of-service.md?raw'

export default function TermsPage() {
  return (
    <PublicLayout
      title="Terms of Service"
      description="The terms and conditions for using Yadhum."
    >
      <div style={{ color: 'var(--ink)', lineHeight: 1.7 }} className="prose-legal">
        <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 24 }}>
          Last updated: {LEGAL_LAST_UPDATED}
        </p>
        <Markdown>{termsMd}</Markdown>
      </div>
    </PublicLayout>
  )
}
