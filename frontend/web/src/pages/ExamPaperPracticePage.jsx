import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { getPaperById } from '../data/examPapers/examPaperRegistry'
import { adaptExamPaper, adaptAllQuestions } from '../utils/examPaperAdapter'
import ChapterPracticeExam from './ChapterPracticeExam'

export default function ExamPaperPracticePage({ classLevel = 'plus1' }) {
  const { examYear } = useParams()

  const classNum = classLevel === 'plus2' ? '12' : '11'
  const paperId  = `class${classNum}-english-${examYear}-annual`

  const [paper,        setPaper]        = useState(null)
  const [paperLoading, setPaperLoading] = useState(true)

  useEffect(() => {
    setPaperLoading(true)
    setPaper(null)
    getPaperById(paperId).then(p => {
      setPaper(p)
      setPaperLoading(false)
    })
  }, [paperId])

  if (paperLoading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-6 h-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  )
  if (!paper) return <Navigate to={`/${classLevel}/english`} replace />

  const practiceData = paper.practice ?? adaptExamPaper(paper)
  const questions    = adaptAllQuestions(practiceData)

  const chapterMeta = {
    title:   paper.title,
    meta:    `${paper.classLabel} · ${paper.subject} · Annual Exam`,
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
