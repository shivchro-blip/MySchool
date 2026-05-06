import ChapterPracticeExam from './ChapterPracticeExam'

const CHAPTER_META = {
  title:   'The Portrait of a Lady',
  meta:    'UNIT 1 · PROSE',
  subject: 'English — Class XI',
}

const QUESTIONS = [
  {
    id: 1,
    type: 'mcq',
    marks: 1,
    html: "What does the grandfather's portrait suggest about his appearance?",
    options: [
      'He was clean-shaven and wore a military uniform',
      'He had a long white beard and looked at least a hundred years old',
      'He was a young man dressed in western clothes',
      'He was pictured on horseback in royal attire',
    ],
    correct: 1,
  },
  {
    id: 2,
    type: 'mcq',
    marks: 1,
    html: 'In the village, what did the grandmother do each morning while walking the narrator to school?',
    options: [
      'She carried his schoolbag and told him folk stories',
      'She chatted with neighbours and bought snacks',
      'She held his hand and moved her lips in silent prayer',
      'She sat under the school tree and waited for him',
    ],
    correct: 2,
  },
  {
    id: 3,
    type: 'mcq',
    marks: 1,
    html: "Why did the grandmother disapprove of the narrator's city school education?",
    options: [
      'She thought the school was too far away and unsafe',
      'She felt English and western science had no place for God or scripture',
      'She believed the teachers were too harsh and demanding',
      'She worried the narrator would forget his native language',
    ],
    correct: 1,
  },
  {
    id: 4,
    type: 'mcq',
    marks: 1,
    html: 'What did the grandmother do the evening the narrator returned after five years abroad?',
    options: [
      'She waited at the door, weeping quietly with relief',
      'She sat in her corner in silent prayer as usual',
      'She sang devotional songs and played the drum with neighbourhood women',
      'She cooked a grand feast to celebrate his homecoming',
    ],
    correct: 2,
  },
  {
    id: 5,
    type: 'mcq',
    marks: 1,
    html: "What did the sparrows do when the grandmother's body was carried away for cremation?",
    options: [
      'They flew away and did not return until the following day',
      'They sat scattered across the floor, silent, not touching the bread crumbs',
      'They chirped loudly in unison from the rooftop all afternoon',
      'They followed the procession out through the courtyard gate',
    ],
    correct: 1,
  },
]

export default function ChapterPracticeExamPage() {
  return (
    <ChapterPracticeExam
      questions={QUESTIONS}
      chapterMeta={CHAPTER_META}
      chapterSlug="the-portrait-of-a-lady"
    />
  )
}
