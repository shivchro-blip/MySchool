import { Card } from '../../../components/ui'
import InfoCard from '../../../components/ui/InfoCard'

export default function AboutAuthorSection({ lessonTitle }) {
  return (
    <Card padding="lg">
      <p className="text-xs font-bold text-text-tertiary uppercase tracking-wide mb-3">
        About the Author
      </p>
      <div className="space-y-3">
        <p className="text-sm text-text-secondary leading-relaxed">
          This section will show detailed information about the author of{' '}
          <strong className="text-text-primary">{lessonTitle}</strong> — including their biography,
          literary works, writing style, and their contribution to literature.
        </p>
        <InfoCard label="Exam tip" icon="💡" isTip={true}>
          2-mark questions often ask for the author's name and one fact about them.
          Always remember both.
        </InfoCard>
      </div>
    </Card>
  )
}
