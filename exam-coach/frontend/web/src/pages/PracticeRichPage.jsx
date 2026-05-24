import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { validateStudentAnswer } from '../utils/answerValidation'
import {
  buildPracticeDraftKey,
  clearPracticeDraft,
  clampIndex,
  readPracticeDraft,
  writePracticeDraft,
} from '../utils/practiceDraftStorage'
import { AlertCircle, CheckCircle } from 'lucide-react'

/* ─── MCQ Part ─────────────────────────────────────────────────────────── */
function McqPart({ part, done, score, onAnswer }) {
  const totalDone = Object.keys(done).length

  return (
    <div>
      {/* Score bar */}
      <div className="bg-surface-alt border border-line rounded-xl px-4 py-3 mb-5 flex justify-between items-center flex-wrap gap-2">
        <span className="text-[13px] text-text-secondary">
          Score:{' '}
          <span className="font-bold text-brand-teal">{score}</span>
          {' '}/ {part.scoreMax}
        </span>
        <span className="text-[11px] font-medium px-3 py-0.5 rounded-full bg-brand-teal-soft text-brand-teal">
          {totalDone} answered
        </span>
      </div>

      {part.sections.map((sec, si) => (
        <div key={si}>
          <p
            className={`text-[10px] font-bold tracking-[0.1em] uppercase mb-3
                        bg-brand-subtle/30 text-brand-strong rounded-lg px-4 py-2.5
                        ${si === 0 ? '' : 'mt-7'}`}
          >
            {sec.label}
          </p>

          {sec.questions.map(q => {
            const answered = done[q.id] !== undefined
            const chosen   = done[q.id]
            const correct  = q.answer

            return (
              <div
                key={q.id}
                className="bg-surface-alt rounded-xl px-4 py-4 mb-3 border"
                style={{ borderColor: answered && chosen === correct ? 'var(--good)' : 'var(--line)' }}
              >
                <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-text-tertiary mb-2">
                  {q.id.toUpperCase()}
                </p>

                <div
                  className="text-[14px] text-text-primary leading-[1.7] mb-3"
                  dangerouslySetInnerHTML={{ __html: q.html }}
                />

                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-2 mb-3">
                  {q.options.map((opt, i) => {
                    let bg = 'var(--surface-alt)', borderColor = 'var(--line)', color = 'var(--text-secondary)', weight = 400
                    if (answered) {
                      if (i === correct) {
                        bg = 'var(--good-soft)'; borderColor = 'var(--good)'; color = 'var(--text-primary)'; weight = 600
                      } else if (i === chosen) {
                        bg = 'rgba(176,58,48,0.08)'; borderColor = 'rgba(176,58,48,0.5)'; color = 'var(--danger)'
                      }
                    }
                    return (
                      <button
                        key={i}
                        disabled={answered}
                        onClick={() => onAnswer(q.id, i, q.answer)}
                        className="text-left text-[13px] rounded-button px-3 py-2 border-[1.5px] transition-all duration-[var(--duration-fast)] hover:opacity-90"
                        style={{
                          background: bg,
                          borderColor,
                          color,
                          fontWeight: weight,
                          cursor: answered ? 'default' : 'pointer',
                          lineHeight: 1.4,
                        }}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>

                {answered && (
                  <p className="text-[12px] text-text-secondary leading-[1.6] pt-2.5 border-t border-line-soft">
                    <strong style={{ color: chosen === correct ? 'var(--text-primary)' : 'var(--danger)' }}>
                      {chosen === correct ? '✓ Correct.' : '✗ Incorrect.'}
                    </strong>{' '}
                    {q.hint}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

/* ─── Reference to Context ─────────────────────────────────────────────── */
function ReferencePart({ part, cur, onNav, revealed, onToggle, answers, onAnswer, onBlur, validationErrors, navBlockMsg }) {
  const q     = part.questions[cur]
  const total = part.questions.length

  return (
    <div>
      <p className="text-[12px] italic mb-4 leading-relaxed bg-brand-subtle/30 text-brand-strong rounded-lg px-4 py-2.5">
        {part.instruction}
      </p>

      <div
        className="bg-surface-alt rounded-xl px-5 py-5 border"
        style={{ borderColor: revealed[cur] ? 'var(--good)' : 'var(--line)' }}
      >
        <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-text-tertiary mb-3">
          Q{cur + 1} of {total} · {part.marksPer} marks
        </p>

        {/* Verse */}
        <div
          className="px-4 py-3 rounded-xl text-[14px] italic text-text-primary leading-[1.8] mb-4"
          style={{ background: 'var(--surface-alt)' }}
        >
          {q.verse}
        </div>

        {/* Sub-questions */}
        {q.subs.map((s, i) => {
          const errKey = `${cur}_${i}`
          const error  = validationErrors?.[errKey]
          return (
            <div key={i} className="mb-4">
              <p className="text-[13px] text-text-primary leading-[1.6] mb-2">{s.q}</p>
              <textarea
                rows={3}
                placeholder="Write your answer here…"
                value={answers[cur][i]}
                onChange={e => onAnswer(cur, i, e.target.value)}
                onBlur={e => onBlur?.(cur, i, e.target.value)}
                className="w-full border border-line rounded-lg px-3 py-2 text-[13px] text-text-secondary
                           bg-surface-alt leading-relaxed resize-y block outline-none font-[inherit]
                           focus:border-brand transition-colors"
                style={{ minHeight: '70px', borderColor: error ? 'var(--danger)' : undefined }}
              />
              {error && (
                <p className="flex items-center gap-1.5 mt-1 text-[11px] text-danger">
                  <AlertCircle size={11} className="shrink-0" />
                  {error}
                </p>
              )}
            </div>
          )
        })}

        <button
          onClick={() => onToggle(cur)}
          className="px-3.5 py-1.5 rounded-lg text-[12px] font-semibold border border-line
                     text-text-secondary bg-surface-alt hover:bg-surface-alt transition-all"
        >
          {revealed[cur] ? 'Hide model answers' : 'Show model answers'}
        </button>

        {revealed[cur] && (
          <div
            className="mt-3 px-4 py-3 rounded-xl border text-[13px] leading-[1.7]"
            style={{ background: 'var(--good-soft)', borderColor: 'var(--good)' }}
          >
            <p
              className="text-[10px] font-bold tracking-[0.1em] uppercase mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Model answers
            </p>
            {q.subs.map((s, i) => (
              <p
                key={i}
                className="text-text-primary leading-[1.7]"
                style={{ marginBottom: i < q.subs.length - 1 ? '10px' : 0 }}
              >
                <strong className="text-text-secondary">{s.q.substring(0, 3)}</strong> {s.a}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Nav blocked banner */}
      {navBlockMsg && (
        <p className="flex items-center gap-1.5 mt-3 text-[12px] text-danger bg-danger/5 border border-danger/20 rounded-lg px-3 py-2">
          <AlertCircle size={13} className="shrink-0" />
          {navBlockMsg}
        </p>
      )}

      {/* Prev / Next */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-line-soft">
        <button
          disabled={cur === 0}
          onClick={() => onNav(-1)}
          className="px-4 py-2 rounded-xl text-[13px] font-semibold border border-line
                     text-text-secondary bg-surface-alt hover:bg-surface-alt transition-all disabled:opacity-40"
        >
          ← Previous
        </button>
        <span className="text-[12px] text-text-tertiary">Question {cur + 1} of {total}</span>
        <button
          disabled={cur === total - 1}
          onClick={() => onNav(1)}
          className="px-4 py-2 rounded-xl text-[13px] font-semibold border border-line
                     text-text-secondary bg-surface-alt hover:bg-surface-alt transition-all disabled:opacity-40"
        >
          Next →
        </button>
      </div>
    </div>
  )
}

/* ─── Essay Part (short + long) ────────────────────────────────────────── */
function EssayPart({ part, answers, onAnswer, revealed, onToggle, onBlur, validationErrors }) {
  const isLong   = part.type === 'long-essay'
  const wordHint = isLong ? '100–150 words' : '30–40 words'

  return (
    <div>
      <p className="text-[12px] italic mb-4 leading-relaxed bg-brand-subtle/30 text-brand-strong rounded-lg px-4 py-2.5">
        {part.instruction}
      </p>

      {part.questions.map((q, i) => {
        const error = validationErrors?.[i]
        return (
        <div
          key={i}
          className="bg-surface-alt rounded-xl px-5 py-5 mb-3 border"
          style={{ borderColor: revealed[i] ? 'var(--good)' : 'var(--line)' }}
        >
          <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-text-tertiary mb-2">
            Q{i + 1} · {part.marksPer} marks · {wordHint}
          </p>
          <p className="text-[14px] text-text-primary leading-[1.7] mb-3">{q.q}</p>

          <textarea
            rows={isLong ? 7 : 4}
            placeholder={`Write your answer here (${wordHint})…`}
            value={answers[i]}
            onChange={e => onAnswer(i, e.target.value)}
            onBlur={e => onBlur?.(i, e.target.value)}
            className="w-full border border-line rounded-lg px-3 py-2 text-[13px] text-text-secondary
                       bg-surface-alt leading-relaxed resize-y block outline-none font-[inherit]
                       mb-2.5 focus:border-brand transition-colors"
            style={{ borderColor: error ? 'var(--danger)' : undefined }}
          />
          {error && (
            <p className="flex items-center gap-1.5 mb-2 text-[11px] text-danger">
              <AlertCircle size={11} className="shrink-0" />
              {error}
            </p>
          )}

          <button
            onClick={() => onToggle(i)}
            className="px-3.5 py-1.5 rounded-lg text-[12px] font-semibold border border-line
                       text-text-secondary bg-surface-alt hover:bg-surface-alt transition-all"
          >
            {revealed[i] ? 'Hide model answer' : 'Show model answer'}
          </button>

          {revealed[i] && (
            <div
              className="mt-3 px-4 py-3 rounded-xl border"
              style={{ background: 'var(--good-soft)', borderColor: 'var(--good)' }}
            >
              <p
                className="text-[10px] font-bold tracking-[0.1em] uppercase mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Model answer
              </p>
              <p className="text-[13px] text-text-primary leading-[1.8] whitespace-pre-line">{q.ans}</p>
            </div>
          )}
        </div>
        )
      })}
    </div>
  )
}

function createBlankPracticeState(content) {
  const mcqPart   = content.parts.find(p => p.type === 'mcq')
  const refPart   = content.parts.find(p => p.type === 'reference')
  const shortPart = content.parts.find(p => p.type === 'short-essay')
  const longPart  = content.parts.find(p => p.type === 'long-essay')

  return {
    activePartId: content.parts[0]?.id ?? null,
    submitted: false,
    mcqDone: {},
    mcqScore: 0,
    refCur: 0,
    refRevealed: new Array(refPart?.questions.length ?? 0).fill(false),
    refAnswers: refPart?.questions.map(q => q.subs.map(() => '')) ?? [],
    shortAnswers: new Array(shortPart?.questions.length ?? 0).fill(''),
    shortRevealed: new Array(shortPart?.questions.length ?? 0).fill(false),
    longAnswers: new Array(longPart?.questions.length ?? 0).fill(''),
    longRevealed: new Array(longPart?.questions.length ?? 0).fill(false),
    refValidationErrors: {},
    shortValidationErrors: {},
    longValidationErrors: {},
    refNavBlockMsg: null,
    submitBlockMsg: null,
  }
}

function toStringArray(value, length) {
  const source = Array.isArray(value) ? value : []
  return Array.from({ length }, (_, i) => (typeof source[i] === 'string' ? source[i] : ''))
}

function toReferenceAnswers(value, questions) {
  const source = Array.isArray(value) ? value : []
  return questions.map((q, qi) => {
    const row = Array.isArray(source[qi]) ? source[qi] : []
    return q.subs.map((_, si) => (typeof row[si] === 'string' ? row[si] : ''))
  })
}

function recomputeMcqScore(mcqPart, mcqDone) {
  if (!mcqPart) return 0
  const questions = mcqPart.sections.flatMap(sec => sec.questions)
  return questions.reduce((score, q) => {
    const chosen = mcqDone[q.id]
    return chosen === q.answer ? score + 1 : score
  }, 0)
}

function hasMeaningfulDraft(state, firstPartId) {
  if (state.submitted) return false
  const hasMcq = Object.keys(state.mcqDone).length > 0
  const hasRef = state.refAnswers.some(row => row.some(v => v.trim()))
  const hasShort = state.shortAnswers.some(v => v.trim())
  const hasLong = state.longAnswers.some(v => v.trim())
  return hasMcq || hasRef || hasShort || hasLong || state.activePartId !== firstPartId || state.refCur > 0
}

function buildDraftPayload({
  lessonSlug,
  totalQuestions,
  activePartId,
  refCur,
  mcqDone,
  refAnswers,
  shortAnswers,
  longAnswers,
}) {
  return {
    lessonSlug,
    currentQuestionIndex: refCur,
    activePartId,
    selectedAnswers: mcqDone,
    writtenAnswers: {
      reference: refAnswers,
      short: shortAnswers,
      long: longAnswers,
    },
    updatedAt: new Date().toISOString(),
    totalQuestions,
    version: 1,
  }
}

function restorePracticeState(content, draft, lessonSlug) {
  const blank = createBlankPracticeState(content)
  if (!draft || draft.version !== 1 || draft.lessonSlug !== lessonSlug) {
    return blank
  }

  const mcqPart = content.parts.find(p => p.type === 'mcq')
  const refPart = content.parts.find(p => p.type === 'reference')
  const shortPart = content.parts.find(p => p.type === 'short-essay')
  const longPart = content.parts.find(p => p.type === 'long-essay')

  const refQuestions = refPart?.questions ?? []
  const shortQuestions = shortPart?.questions ?? []
  const longQuestions = longPart?.questions ?? []

  const restored = {
    ...blank,
    activePartId: content.parts.some(part => part.id === draft.activePartId)
      ? draft.activePartId
      : blank.activePartId,
    refCur: refQuestions.length > 0 ? clampIndex(draft.currentQuestionIndex, refQuestions.length) : 0,
    mcqDone: typeof draft.selectedAnswers === 'object' && draft.selectedAnswers
      ? Object.fromEntries(
          Object.entries(draft.selectedAnswers)
            .map(([key, value]) => [key, Number.isInteger(value) ? value : Number(value)])
            .filter(([, value]) => Number.isInteger(value))
        )
      : {},
    refAnswers: toReferenceAnswers(draft.writtenAnswers?.reference, refQuestions),
    shortAnswers: toStringArray(draft.writtenAnswers?.short, shortQuestions.length),
    longAnswers: toStringArray(draft.writtenAnswers?.long, longQuestions.length),
    refRevealed: new Array(refQuestions.length).fill(false),
    shortRevealed: new Array(shortQuestions.length).fill(false),
    longRevealed: new Array(longQuestions.length).fill(false),
  }

  restored.mcqScore = recomputeMcqScore(mcqPart, restored.mcqDone)
  return restored
}

/* ─── PracticeRichPage ──────────────────────────────────────────────────── */
export default function PracticeRichPage({ content, chapterSlug }) {
  const { year, subject, lesson } = useParams()
  const lessonSlug = lesson || chapterSlug
  const sessionKey = lessonSlug ? `exam_coach_sessions_${lessonSlug}` : null
  const draftKey = lessonSlug
    ? buildPracticeDraftKey({ classLevel: year, subjectSlug: subject, lessonSlug })
    : null

  const mcqPart   = content.parts.find(p => p.type === 'mcq')
  const refPart   = content.parts.find(p => p.type === 'reference')
  const shortPart = content.parts.find(p => p.type === 'short-essay')
  const longPart  = content.parts.find(p => p.type === 'long-essay')
  const firstPartId = content.parts[0]?.id ?? null

  const [activePartId, setActivePartId] = useState(firstPartId)
  const [submitted, setSubmitted] = useState(false)

  const [mcqDone,  setMcqDone]  = useState({})
  const [mcqScore, setMcqScore] = useState(0)

  const [refCur,      setRefCur]      = useState(0)
  const [refRevealed, setRefRevealed] = useState(() => new Array(refPart?.questions.length ?? 0).fill(false))
  const [refAnswers,  setRefAnswers]  = useState(() => refPart?.questions.map(q => q.subs.map(() => '')) ?? [])

  const [shortAnswers,  setShortAnswers]  = useState(() => new Array(shortPart?.questions.length ?? 0).fill(''))
  const [shortRevealed, setShortRevealed] = useState(() => new Array(shortPart?.questions.length ?? 0).fill(false))

  const [longAnswers,  setLongAnswers]  = useState(() => new Array(longPart?.questions.length ?? 0).fill(''))
  const [longRevealed, setLongRevealed] = useState(() => new Array(longPart?.questions.length ?? 0).fill(false))

  const [refValidationErrors,   setRefValidationErrors]   = useState({})
  const [shortValidationErrors, setShortValidationErrors] = useState({})
  const [longValidationErrors,  setLongValidationErrors]  = useState({})

  const [refNavBlockMsg,   setRefNavBlockMsg]   = useState(null)
  const [submitBlockMsg,   setSubmitBlockMsg]   = useState(null)
  const [resumeNotice, setResumeNotice] = useState(false)

  const saveTimerRef = useRef(null)
  const hydratingRef = useRef(false)
  const resumeNoticeShownRef = useRef(false)
  const latestDraftRef = useRef(null)
  const sessionSavedRef = useRef(false)

  const totalMcqQs = mcqPart
    ? mcqPart.sections.reduce((sum, sec) => sum + sec.questions.length, 0)
    : 0
  const totalQuestions = content.parts.reduce((sum, part) => {
    if (part.type === 'mcq') {
      return sum + part.sections.reduce((acc, sec) => acc + sec.questions.length, 0)
    }
    return sum + (part.questions?.length ?? 0)
  }, 0)

  function saveDraftNow(nextState = {}) {
    if (!draftKey || submitted || hydratingRef.current) return
    const draft = buildDraftPayload({
      lessonSlug,
      totalQuestions,
      activePartId: nextState.activePartId ?? activePartId,
      refCur: nextState.refCur ?? refCur,
      mcqDone: nextState.mcqDone ?? mcqDone,
      refAnswers: nextState.refAnswers ?? refAnswers,
      shortAnswers: nextState.shortAnswers ?? shortAnswers,
      longAnswers: nextState.longAnswers ?? longAnswers,
    })
    writePracticeDraft(draftKey, draft)
    latestDraftRef.current = draft
  }

  useEffect(() => {
    if (!lessonSlug) return
    hydratingRef.current = true

    const draft = readPracticeDraft(draftKey)
    const restored = draft ? restorePracticeState(content, draft, lessonSlug) : createBlankPracticeState(content)

    setActivePartId(restored.activePartId)
    setSubmitted(false)
    setMcqDone(restored.mcqDone)
    setMcqScore(restored.mcqScore)
    setRefCur(restored.refCur)
    setRefRevealed(restored.refRevealed)
    setRefAnswers(restored.refAnswers)
    setShortAnswers(restored.shortAnswers)
    setShortRevealed(restored.shortRevealed)
    setLongAnswers(restored.longAnswers)
    setLongRevealed(restored.longRevealed)
    setRefValidationErrors({})
    setShortValidationErrors({})
    setLongValidationErrors({})
    setRefNavBlockMsg(null)
    setSubmitBlockMsg(null)
    sessionSavedRef.current = Boolean(draft && Object.keys(restored.mcqDone).length === totalMcqQs)
    latestDraftRef.current = null

    if (draft && hasMeaningfulDraft(restored, firstPartId) && !resumeNoticeShownRef.current) {
      resumeNoticeShownRef.current = true
      setResumeNotice(true)
    } else {
      setResumeNotice(false)
    }

    const timer = window.setTimeout(() => {
      hydratingRef.current = false
    }, 0)

    return () => window.clearTimeout(timer)
  }, [content, draftKey, firstPartId, lessonSlug, totalMcqQs])

  useEffect(() => {
    if (!sessionKey || !mcqPart || sessionSavedRef.current) return
    if (Object.keys(mcqDone).length < totalMcqQs) return
    sessionSavedRef.current = true
    const record = { date: new Date().toISOString(), score: mcqScore, total: mcqPart.scoreMax }
    const prev = JSON.parse(localStorage.getItem(sessionKey) ?? '[]')
    localStorage.setItem(sessionKey, JSON.stringify([...prev, record]))
  }, [mcqDone, mcqScore, sessionKey, mcqPart, totalMcqQs])

  useEffect(() => {
    if (!resumeNotice) return undefined
    const timer = window.setTimeout(() => setResumeNotice(false), 2500)
    return () => window.clearTimeout(timer)
  }, [resumeNotice])

  useEffect(() => {
    if (hydratingRef.current || !draftKey || submitted) return undefined

    const nextDraft = buildDraftPayload({
      lessonSlug,
      totalQuestions,
      activePartId,
      refCur,
      mcqDone,
      refAnswers,
      shortAnswers,
      longAnswers,
    })

    latestDraftRef.current = nextDraft

    if (!hasMeaningfulDraft({
      submitted,
      activePartId,
      refCur,
      mcqDone,
      refAnswers,
      shortAnswers,
      longAnswers,
    }, firstPartId)) {
      if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current)
      clearPracticeDraft(draftKey)
      return undefined
    }

    if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current)
    saveTimerRef.current = window.setTimeout(() => {
      if (latestDraftRef.current) writePracticeDraft(draftKey, latestDraftRef.current)
    }, 300)

    return () => {
      if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current)
    }
  }, [
    activePartId,
    draftKey,
    firstPartId,
    lessonSlug,
    longAnswers,
    mcqDone,
    refAnswers,
    refCur,
    shortAnswers,
    submitted,
    totalQuestions,
  ])

  useEffect(() => {
    const flushDraft = () => {
      if (hydratingRef.current || !draftKey || submitted) return
      if (latestDraftRef.current && hasMeaningfulDraft({
        submitted,
        activePartId,
        refCur,
        mcqDone,
        refAnswers,
        shortAnswers,
        longAnswers,
      }, firstPartId)) {
        writePracticeDraft(draftKey, latestDraftRef.current)
      }
    }

    window.addEventListener('beforeunload', flushDraft)
    window.addEventListener('pagehide', flushDraft)
    return () => {
      flushDraft()
      window.removeEventListener('beforeunload', flushDraft)
      window.removeEventListener('pagehide', flushDraft)
    }
  }, [
    activePartId,
    draftKey,
    firstPartId,
    longAnswers,
    mcqDone,
    refAnswers,
    refCur,
    shortAnswers,
    submitted,
  ])

  function switchPart(id) {
    setActivePartId(id)
    saveDraftNow({ activePartId: id })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleMcqAnswer(qId, chosen, correct) {
    if (mcqDone[qId] !== undefined) return
    const next = { ...mcqDone, [qId]: chosen }
    setMcqDone(next)
    saveDraftNow({ mcqDone: next })
    if (chosen === correct) setMcqScore(s => s + 1)
  }

  function handleRefAnswer(qIdx, subIdx, val) {
    const next = refAnswers.map((row, ri) =>
      ri === qIdx ? row.map((v, si) => si === subIdx ? val : v) : row
    )
    setRefAnswers(next)
    saveDraftNow({ refAnswers: next })
    const key = `${qIdx}_${subIdx}`
    const result = validateStudentAnswer(val)
    if (result.valid || !val.trim()) {
      setRefValidationErrors(prev => { const n = { ...prev }; delete n[key]; return n })
    }
  }

  function handleShortAnswer(idx, val) {
    const next = shortAnswers.map((v, i) => i === idx ? val : v)
    setShortAnswers(next)
    saveDraftNow({ shortAnswers: next })
    const result = validateStudentAnswer(val)
    if (result.valid || !val.trim()) {
      setShortValidationErrors(prev => { const n = { ...prev }; delete n[idx]; return n })
    }
  }

  function handleLongAnswer(idx, val) {
    const next = longAnswers.map((v, i) => i === idx ? val : v)
    setLongAnswers(next)
    saveDraftNow({ longAnswers: next })
    const result = validateStudentAnswer(val)
    if (result.valid || !val.trim()) {
      setLongValidationErrors(prev => { const n = { ...prev }; delete n[idx]; return n })
    }
  }

  function toggleRef(idx)   { setRefRevealed(prev => prev.map((v, i) => i === idx ? !v : v)) }
  function toggleShort(idx) { setShortRevealed(prev => prev.map((v, i) => i === idx ? !v : v)) }
  function toggleLong(idx)  { setLongRevealed(prev => prev.map((v, i) => i === idx ? !v : v)) }

  function handleRefBlur(qIdx, subIdx, val) {
    const key = `${qIdx}_${subIdx}`
    const result = validateStudentAnswer(val)
    setRefValidationErrors(prev => {
      const next = { ...prev }
      if (result.message) next[key] = result.message
      else delete next[key]
      return next
    })
  }

  function handleShortBlur(idx, val) {
    const result = validateStudentAnswer(val)
    setShortValidationErrors(prev => {
      const next = { ...prev }
      if (result.message) next[idx] = result.message
      else delete next[idx]
      return next
    })
  }

  function handleLongBlur(idx, val) {
    const result = validateStudentAnswer(val)
    setLongValidationErrors(prev => {
      const next = { ...prev }
      if (result.message) next[idx] = result.message
      else delete next[idx]
      return next
    })
  }

  // ── Reference Next validation ──────────────────────────────────────────
  function handleRefNav(d) {
    if (d > 0 && refPart) {
      const q = refPart.questions[refCur]
      const newErrors = {}
      let hasError = false
      q.subs.forEach((_, i) => {
        const val = refAnswers[refCur][i]
        if (!val.trim()) return
        const result = validateStudentAnswer(val)
        if (result.message) {
          newErrors[`${refCur}_${i}`] = result.message
          hasError = true
        }
      })
      if (hasError) {
        setRefValidationErrors(prev => ({ ...prev, ...newErrors }))
        setRefNavBlockMsg('Please correct the highlighted answers before continuing.')
        return
      }
    }
    setRefNavBlockMsg(null)
    setRefCur(c => Math.max(0, Math.min(refPart.questions.length - 1, c + d)))
    saveDraftNow({ refCur: Math.max(0, Math.min(refPart.questions.length - 1, refCur + d)) })
  }

  // ── Submit Practice: validate all written answers ──────────────────────
  function handleSubmit() {
    const refErrors   = {}
    const shortErrors = {}
    const longErrors  = {}
    let firstInvalidPart = null
    let firstInvalidRefQ = null

    if (refPart) {
      refAnswers.forEach((row, qIdx) => {
        row.forEach((val, subIdx) => {
          if (!val.trim()) return
          const result = validateStudentAnswer(val)
          if (result.message) {
            refErrors[`${qIdx}_${subIdx}`] = result.message
            if (firstInvalidPart === null) {
              firstInvalidPart = refPart.id
              firstInvalidRefQ = qIdx
            }
          }
        })
      })
    }
    if (shortPart) {
      shortAnswers.forEach((val, idx) => {
        if (!val.trim()) return
        const result = validateStudentAnswer(val)
        if (result.message) {
          shortErrors[idx] = result.message
          if (firstInvalidPart === null) firstInvalidPart = shortPart.id
        }
      })
    }
    if (longPart) {
      longAnswers.forEach((val, idx) => {
        if (!val.trim()) return
        const result = validateStudentAnswer(val)
        if (result.message) {
          longErrors[idx] = result.message
          if (firstInvalidPart === null) firstInvalidPart = longPart.id
        }
      })
    }

    const hasAnyError =
      Object.keys(refErrors).length > 0 ||
      Object.keys(shortErrors).length > 0 ||
      Object.keys(longErrors).length > 0

    if (hasAnyError) {
      setRefValidationErrors(prev => ({ ...prev, ...refErrors }))
      setShortValidationErrors(prev => ({ ...prev, ...shortErrors }))
      setLongValidationErrors(prev => ({ ...prev, ...longErrors }))
      setSubmitBlockMsg('Some answers need correction before submitting.')
      if (firstInvalidPart) {
        setActivePartId(firstInvalidPart)
        if (firstInvalidRefQ !== null) setRefCur(firstInvalidRefQ)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    clearPracticeDraft(draftKey)
    setSubmitBlockMsg(null)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleRetake() {
    hydratingRef.current = true
    if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current)
    clearPracticeDraft(draftKey)
    const restored = createBlankPracticeState(content)
    setRefAnswers(restored.refAnswers)
    setShortAnswers(restored.shortAnswers)
    setLongAnswers(restored.longAnswers)
    setRefValidationErrors({})
    setShortValidationErrors({})
    setLongValidationErrors({})
    setRefNavBlockMsg(null)
    setSubmitBlockMsg(null)
    setRefCur(0)
    setRefRevealed(restored.refRevealed)
    setShortRevealed(restored.shortRevealed)
    setLongRevealed(restored.longRevealed)
    setMcqDone({})
    setMcqScore(0)
    sessionSavedRef.current = false
    resumeNoticeShownRef.current = false
    setSubmitted(false)
    setActivePartId(restored.activePartId)
    setResumeNotice(false)
    latestDraftRef.current = null
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.setTimeout(() => {
      hydratingRef.current = false
    }, 0)
  }

  function renderActivePart() {
    switch (activePartId) {
      case mcqPart?.id:
        return <McqPart part={mcqPart} done={mcqDone} score={mcqScore} onAnswer={handleMcqAnswer} />
      case refPart?.id:
        return (
          <ReferencePart
            part={refPart}
            cur={refCur}
            onNav={handleRefNav}
            revealed={refRevealed}
            onToggle={toggleRef}
            answers={refAnswers}
            onAnswer={handleRefAnswer}
            onBlur={handleRefBlur}
            validationErrors={refValidationErrors}
            navBlockMsg={refNavBlockMsg}
          />
        )
      case shortPart?.id:
        return <EssayPart part={shortPart} answers={shortAnswers} onAnswer={handleShortAnswer} revealed={shortRevealed} onToggle={toggleShort} onBlur={handleShortBlur} validationErrors={shortValidationErrors} />
      case longPart?.id:
        return <EssayPart part={longPart} answers={longAnswers} onAnswer={handleLongAnswer} revealed={longRevealed} onToggle={toggleLong} onBlur={handleLongBlur} validationErrors={longValidationErrors} />
      default:
        return null
    }
  }

  if (submitted) {
    return (
      <div>
        <div
          className="flex items-start gap-3 rounded-xl px-5 py-4 mb-4 border"
          style={{ background: 'var(--good-soft)', borderColor: 'var(--good)' }}
        >
          <CheckCircle size={18} style={{ color: 'var(--text-primary)', marginTop: 1, flexShrink: 0 }} />
          <div>
            <p className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>
              Practice submitted!
            </p>
            <p className="text-[13px] mt-0.5" style={{ color: 'var(--text-primary)', opacity: 0.8 }}>
              Review model answers above, then retake when you're ready.
            </p>
          </div>
        </div>
        <button
          onClick={handleRetake}
          className="px-4 py-2 rounded-xl text-[13px] font-semibold border border-line
                     text-text-secondary bg-surface-alt hover:bg-surface-alt transition-all"
        >
          ↺ Retake Practice
        </button>
      </div>
    )
  }

  return (
    <div>
      {resumeNotice && (
        <div
          className="mb-4 rounded-xl border border-brand-subtle bg-brand-subtle/30 px-4 py-3 text-[12px] text-brand-strong"
          role="status"
          aria-live="polite"
        >
          Resumed your previous practice attempt.
        </div>
      )}

      {/* Part tabs */}
      <div
        className="scroll-strip -mx-1 px-1 mb-6"
        style={{ borderBottom: '1px solid var(--line-soft)' }}
      >
        {content.parts.map(part => (
          <button
            key={part.id}
            onClick={() => switchPart(part.id)}
            className={`
              px-3.5 py-2.5 text-[13px] font-medium whitespace-nowrap shrink-0
              border-b-2 -mb-px transition-all duration-[var(--duration-fast)]
              ${activePartId === part.id
                ? 'border-brand-teal text-brand-teal font-semibold'
                : 'border-transparent text-text-secondary hover:text-text-primary'}
            `}
          >
            {part.navLabel}
          </button>
        ))}
      </div>

      {/* Active part */}
      <div className="max-w-[660px]">
        {renderActivePart()}

        {/* Submit banner + button */}
        <div className="mt-8 pt-5 border-t border-line-soft">
          {submitBlockMsg && (
            <p className="flex items-center gap-1.5 mb-3 text-[12px] text-danger bg-danger/5 border border-danger/20 rounded-lg px-3 py-2">
              <AlertCircle size={13} className="shrink-0" />
              {submitBlockMsg}
            </p>
          )}
          <button
            onClick={handleSubmit}
            className="w-full py-2.5 rounded-xl text-[14px] font-semibold
                       bg-brand-teal text-white hover:opacity-90 transition-all"
          >
            Submit Answers
          </button>
        </div>
      </div>
    </div>
  )
}
