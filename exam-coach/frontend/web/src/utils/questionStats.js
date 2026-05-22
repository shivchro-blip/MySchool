/**
 * Type-agnostic question stats. Counts a question as answered based on its type:
 * - mcq: any selection present
 * - reference: at least one sub-answer has text
 * - written/other: non-empty trimmed string
 */
export function getAnsweredCount(questions, answers) {
  let count = 0
  for (const q of questions) {
    if (q.type === 'mcq') {
      if (answers[q.id] !== undefined) count++
    } else if (q.type === 'reference') {
      if (q.subs?.some((_, i) => answers[q.id]?.[i]?.trim())) count++
    } else {
      if (typeof answers[q.id] === 'string' && answers[q.id].trim()) count++
    }
  }
  return count
}

export function getQuestionStats(questions, answers) {
  const total    = questions.length
  const answered = getAnsweredCount(questions, answers)
  return { total, answered, isComplete: answered === total }
}
