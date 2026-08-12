import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { getPaperById } from '../data/examPapers/examPaperRegistry'
import { adaptExamPaper } from '../utils/examPaperAdapter'
import ChapterPracticeExam from './ChapterPracticeExam'

function adaptAllQuestions(practiceData) {
  if (!practiceData?.parts) return []
  let idx = 1
  const out = []
  for (const part of practiceData.parts) {
    if (part.type === 'mcq') {
      for (const sec of (part.sections ?? [])) {
        for (const q of sec.questions) {
          out.push({
            id: idx++,
            type: 'mcq',
            marks: part.marksPer ?? 1,
            section: sec.label,
            html: q.html,
            options: q.options.map(o => o.replace(/^[a-d]\)\s*/i, '')),
            correct: q.answer,
            acceptedAnswers: q.acceptedAnswers,
            hint: q.hint,
          })
        }
      }
    } else if (part.type === 'reference') {
      for (const q of (part.questions ?? [])) {
        out.push({
          id: idx++,
          type: 'reference',
          marks: part.marksPer ?? 2,
          verse: q.verse,
          subs: (q.subs ?? []).map(s => ({ q: s.q, modelAnswer: s.a })),
        })
      }
    } else if (part.type === 'short-essay' || part.type === 'long-essay') {
      for (const q of (part.questions ?? [])) {
        out.push({
          id: idx++,
          type: 'written',
          marks: part.marksPer ?? (part.type === 'short-essay' ? 3 : 5),
          html: q.q,
          modelAnswer: q.ans,
        })
      }
    }
  }
  return out
}

export default function ModelExamPracticePage({ classLevel = 'plus1', subjectSlug = 'english' }) {
  const { modelId } = useParams()

  const classNum = classLevel === 'plus2' ? '12' : '11'
  const paperId  = `class${classNum}-${subjectSlug}-${modelId}`

  const [paper, setPaper] = useState(undefined)
  useEffect(() => {
    let cancelled = false
    getPaperById(paperId).then(p => { if (!cancelled) setPaper(p ?? null) })
    return () => { cancelled = true }
  }, [paperId])

  if (paper === undefined) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <div style={{ fontSize: 13, color: 'var(--text-muted, #9CA3AF)' }}>Loading…</div>
    </div>
  )
  if (!paper) return <Navigate to={`/${classLevel}/${subjectSlug}`} replace />

  const practiceData = paper.practice ?? adaptExamPaper(paper)
  const questions = adaptAllQuestions(practiceData)

  const chapterMeta = {
    title: paper.title,
    meta: `${paper.classLabel} · ${paper.subject} · Model Exam`,
    subject: `${paper.duration} · ${paper.maximumMarks} marks`,
  }

  return (
    <ChapterPracticeExam
      questions={questions}
      chapterMeta={chapterMeta}
      chapterSlug={paperId}
    />
  )
}
