import { useNavigate, useParams } from 'react-router-dom'
import { Pencil } from 'lucide-react'
import { Card, Button } from '../../../components/ui'
import practiceRegistry from '../../../content/practiceRegistry'
import PracticeRichPage from '../../PracticeRichPage'

const SAMPLE_QUESTIONS = [
  { marks: 2,  text: 'Who is the author of this lesson?'            },
  { marks: 2,  text: 'What is the central theme of the lesson?'     },
  { marks: 5,  text: 'Describe the main character in this lesson.'  },
  { marks: 5,  text: 'What are the themes explored in this lesson?' },
  { marks: 10, text: 'Write a detailed summary of this lesson.'     },
]

const MARK_COLORS = {
  2:  'bg-accent-soft text-accent-ink',
  5:  'bg-warn-soft text-warn',
  10: 'bg-pos-soft text-pos',
}

export default function PracticeSection({ lessonSlug }) {
  const { year, subject, category } = useParams()
  const navigate = useNavigate()

  const content = practiceRegistry[lessonSlug]

  if (content) {
    return <PracticeRichPage content={content} chapterSlug={lessonSlug} />
  }

  return (
    <div className="space-y-2.5">
      <p className="text-xs font-semibold text-ink-3 mb-3">
        Board exam questions for this lesson — sorted by marks
      </p>

      {SAMPLE_QUESTIONS.map((q, i) => (
        <Card key={i} padding="md">
          <div className="flex items-start gap-3">
            <span className={`
              inline-flex px-2 py-0.5 rounded-full text-xs font-bold shrink-0
              ${MARK_COLORS[q.marks] || 'bg-bg-sunk text-ink-2'}
            `}>
              {q.marks}m
            </span>
            <p className="flex-1 text-sm text-ink-2 leading-snug">
              {q.text}
            </p>
            <Button
              size="sm"
              onClick={() => navigate(`/${year}/${subject}/${category}`)}
            >
              <Pencil size={13} /> Answer
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
