import { Card } from '../../../components/ui'

const SAMPLE_WORDS = [
  { word: 'Dilemma',     meaning: 'A situation requiring a choice between two difficult options' },
  { word: 'Protagonist', meaning: 'The main character in a story'                               },
  { word: 'Narrative',   meaning: 'A spoken or written account of connected events'              },
  { word: 'Pathos',      meaning: 'A quality that evokes pity or sadness'                        },
  { word: 'Irony',       meaning: 'A situation where the outcome is opposite to what was expected'},
]

export default function GlossarySection() {
  return (
    <div className="space-y-2">
      {SAMPLE_WORDS.map((item, i) => (
        <Card key={i} padding="md">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-teal-soft flex items-center
                            justify-center text-xs font-bold text-brand-teal shrink-0">
              {item.word[0]}
            </div>
            <div>
              <p className="text-sm font-bold text-ink">{item.word}</p>
              <p className="text-sm text-ink-3 mt-0.5 leading-snug">
                {item.meaning}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
