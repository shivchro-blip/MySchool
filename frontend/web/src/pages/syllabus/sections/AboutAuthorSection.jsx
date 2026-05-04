import { Card } from '../../../components/ui'

export default function AboutAuthorSection({ lessonTitle }) {
  return (
    <Card padding="lg">
      <p className="text-xs font-bold text-ink-4 uppercase tracking-wide mb-3">
        About the Author
      </p>
      <div className="space-y-3">
        <p className="text-sm text-ink-2 leading-relaxed">
          This section will show detailed information about the author of{' '}
          <strong className="text-ink">{lessonTitle}</strong> — including their biography,
          literary works, writing style, and their contribution to literature.
        </p>
        <div className="bg-accent-soft rounded-xl p-3 text-sm text-accent-ink">
          💡 <strong>Exam tip:</strong> 2-mark questions often ask for the author's
          name and one fact about them. Always remember both.
        </div>
      </div>
    </Card>
  )
}
