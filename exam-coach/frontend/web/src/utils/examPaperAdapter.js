const SKIP_TYPES = new Set([
  'paper_header', 'metadata_row', 'instructions', 'part_heading',
  'section_heading', 'footer_note', 'table', 'chart_image', 'image',
])

export function adaptExamPaper(paper) {
  const blocks = paper.pages.flatMap(p => p.blocks)
  const mcqQuestions = []
  const referenceQuestions = []
  const shortEssayByMarks = {}
  const longEssayQuestions = []
  let qIdx = 1

  for (const block of blocks) {
    if (SKIP_TYPES.has(block.type)) continue
    if (block.type === 'mcq_question') {
      mcqQuestions.push({ id: `eq${qIdx++}`, html: block.content, options: block.options, answer: null, hint: null })
    } else if (block.type === 'multi_subquestion') {
      referenceQuestions.push({ verse: block.content, subs: (block.subQuestions ?? []).map(sub => ({ q: sub.content, a: null })) })
    } else if (block.type === 'question') {
      if (block.marks >= 5) {
        longEssayQuestions.push({ q: block.content, ans: null })
      } else {
        const m = block.marks ?? 3
        if (!shortEssayByMarks[m]) shortEssayByMarks[m] = []
        shortEssayByMarks[m].push({ q: block.content, ans: null })
      }
    } else if (block.type === 'or_question') {
      longEssayQuestions.push({ q: `${block.optionA.content}\n\nOR\n\n${block.optionB.content}`, ans: null })
    }
  }

  const parts = []
  if (mcqQuestions.length > 0) {
    parts.push({ id: 'p1', type: 'mcq', marksPer: 1, sections: [{ label: '', questions: mcqQuestions }] })
  }
  if (referenceQuestions.length > 0) {
    parts.push({ id: 'p2', type: 'reference', marksPer: 2, questions: referenceQuestions })
  }
  for (const [m, qs] of Object.entries(shortEssayByMarks).sort((a, b) => Number(a[0]) - Number(b[0]))) {
    parts.push({ id: `p3_${m}m`, type: 'short-essay', marksPer: Number(m), questions: qs })
  }
  if (longEssayQuestions.length > 0) {
    parts.push({ id: 'p4', type: 'long-essay', marksPer: 5, questions: longEssayQuestions })
  }

  return {
    meta: { subject: paper.subject, unit: paper.title, time: paper.duration, totalMarks: paper.maximumMarks },
    parts,
  }
}

export function adaptAllQuestions(practiceData) {
  const questions = []
  let idx = 0

  for (const part of practiceData.parts ?? []) {
    if (part.type === 'mcq') {
      for (const section of part.sections ?? []) {
        for (const q of section.questions ?? []) {
          questions.push({ ...q, type: 'mcq', marks: part.marksPer, section: section.label || undefined })
        }
      }
    } else if (part.type === 'reference') {
      for (const q of part.questions ?? []) {
        questions.push({
          id: `ref_${idx++}`,
          type: 'reference',
          verse: q.verse,
          subs: (q.subs ?? []).map(s => ({ q: s.q, modelAnswer: s.a ?? '' })),
          marks: part.marksPer,
        })
      }
    } else {
      for (const q of part.questions ?? []) {
        questions.push({ id: `w_${idx++}`, type: 'written', html: q.q, marks: part.marksPer, modelAnswer: q.ans ?? '' })
      }
    }
  }

  return questions
}
