import { Card } from '../../../components/ui'

const SAMPLE_QUESTIONS = [
  'What is the central idea of the lesson?',
  'How does the author develop the main theme?',
  'Describe the relationship between the two main characters.',
  'What does the title signify in the context of the lesson?',
]

export default function ComprehensionSection() {
  return (
    <div className="space-y-2.5">
      <p className="text-xs font-semibold text-ink-3 mb-3">
        Check your understanding — answer these questions in your notebook.
      </p>
      {SAMPLE_QUESTIONS.map((q, i) => (
        <Card key={i} padding="md">
          <div className="flex gap-3">
            <span className="text-sm font-bold text-accent shrink-0">
              Q{i + 1}.
            </span>
            <p className="text-sm text-ink-2">{q}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
