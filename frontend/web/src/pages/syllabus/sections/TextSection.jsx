import { Card } from '../../../components/ui'
import contentRegistry from '../../../content/registry'
import LearnRichPage from '../../LearnRichPage'

export default function TextSection({ lessonSlug, lessonTitle }) {
  const content = contentRegistry[lessonSlug]

  if (content) {
    return <LearnRichPage content={content} chapterSlug={lessonSlug} />
  }

  return (
    <Card padding="lg">
      <p className="text-xs font-bold text-ink-4 uppercase tracking-wide mb-3">
        Full Text
      </p>
      <p className="text-sm text-ink-3 italic mb-4">
        The complete text of "{lessonTitle}" will appear here.
      </p>
      <div className="space-y-2">
        {[80, 95, 70, 88, 60].map((w, i) => (
          <div
            key={i}
            className="h-3.5 bg-bg-sunk rounded-full animate-pulse"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
    </Card>
  )
}
