import { Clock } from 'lucide-react'
import { Breadcrumb } from '../../components/nav'

/**
 * Honest empty-state for any lesson with no registered content module.
 * Calm and intentional — no fake loading skeletons. Shown for chapters/lessons
 * that exist in the syllabus but have no rich content yet (e.g. Maths, Science).
 */
export default function ContentComingSoon({ title, crumbs }) {
  return (
    <div>
      {crumbs && <Breadcrumb crumbs={crumbs} />}

      <div
        style={{
          marginTop: crumbs ? 16 : 0,
          background: 'var(--bg-2)',
          border: '1px solid var(--line-soft)',
          borderRadius: 16,
          padding: 'clamp(32px, 6vw, 56px) 24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 56, height: 56, borderRadius: 14,
            background: 'var(--bg-sunk)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 18,
          }}
        >
          <Clock size={26} style={{ color: 'var(--ink-3)' }} strokeWidth={1.8} />
        </div>

        {title && (
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-3)', margin: '0 0 6px' }}>
            {title}
          </p>
        )}
        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px' }}>
          Content coming soon
        </h1>
        <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: 360, margin: '0 auto' }}>
          We're still preparing this lesson. Check back soon — it'll appear here
          once it's ready.
        </p>
      </div>
    </div>
  )
}
