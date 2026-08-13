import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import practiceRegistry from '../../content/practiceRegistry'
import ChapterPracticeExam from '../ChapterPracticeExam'
import { getSubjectChapters, SYLLABUS } from '../../data/syllabus'
import { buildBreadcrumbs } from '../../lib/nav'
import NotFound from './NotFound'

// Map the nested { meta, parts } practice file format into the flat
// questions array that ChapterPracticeExam expects.
function flattenPracticeData(data) {
  const PART_TYPE_MAP = {
    mcq:          'mcq',
    short_answer: 'written',
    brief_answer: 'written',
    long_essay:   'written',
  }

  const questions = []
  for (const part of data.parts) {
    const type   = PART_TYPE_MAP[part.type] || 'written'
    const marks  = part.marksPer ?? 1
    for (const section of part.sections) {
      for (const q of section.questions) {
        questions.push({
          id:             q.id,
          type,
          marks,
          html:           q.html,
          // MCQ fields
          options:        q.options  ?? undefined,
          correct:        q.answer   ?? undefined,   // rename answer → correct
          hint:           q.hint     ?? undefined,
          // Written fields
          modelAnswer:    q.answer   ?? undefined,
          acceptedAnswers: q.answer  ? [q.answer] : undefined,
          section:        section.label ?? undefined,
        })
      }
    }
  }
  return questions
}

export default function ChapterPracticeExamPage() {
  const { year, subject, slug } = useParams()
  const navigate = useNavigate()
  const [questions, setQuestions] = useState(null)
  const [loading, setLoading]     = useState(true)
  const [notFound, setNotFound]   = useState(false)

  const chapters    = getSubjectChapters(year, subject)
  const chapterMeta = chapters.find(c => c.slug === slug) || null

  useEffect(() => {
    if (!practiceRegistry[slug]) {
      setNotFound(true)
      setLoading(false)
      return
    }
    practiceRegistry[slug]()
      .then(mod => {
        setQuestions(flattenPracticeData(mod.default))
        setLoading(false)
      })
      .catch(() => {
        setNotFound(true)
        setLoading(false)
      })
  }, [slug])

  if (loading) return (
    <div className="flex items-center justify-center py-24 text-text-muted text-sm">
      Loading practice exam…
    </div>
  )

  if (notFound || !chapterMeta) {
    return <NotFound message={`Practice not found for "${slug}"`} />
  }

  return (
    <ChapterPracticeExam
      questions={questions}
      chapterMeta={chapterMeta}
      chapterSlug={slug}
    />
  )
}
