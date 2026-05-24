import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { validateStudentAnswer } from '../utils/answerValidation'
import {
  buildPracticeDraftKey,
  clearPracticeDraft,
  clampIndex,
  readPracticeDraft,
  writePracticeDraft,
} from '../utils/practiceDraftStorage'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft, ChevronRight, CheckCircle2, XCircle,
  History, RotateCcw, X, AlertCircle,
} from 'lucide-react'
import Badge   from '../components/ui/Badge'
import Button  from '../components/ui/Button'
import Eyebrow from '../components/ui/Eyebrow'

// ── Helpers ────────────────────────────────────────────────────────────────

function isMcqCorrect(q, answers) {
  const chosen = answers[q.id]
  if (chosen === undefined) return false
  if (q.acceptedAnswers) return q.acceptedAnswers.includes(chosen)
  return chosen === q.correct
}

function calcMcqScore(questions, answers) {
  return questions
    .filter(q => q.type === 'mcq')
    .filter(q => isMcqCorrect(q, answers))
    .length
}

function pct(score, total) {
  return total > 0 ? Math.round((score / total) * 100) : 0
}

function fmtDate(iso) {
  return new Date(iso).toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function createBlankAttempt() {
  return { id: 1, status: 'in_progress', answers: {}, score: null, submittedAt: null }
}

function buildDraftPayload({ chapterSlug, questionIdx, answers, questionCount }) {
  return {
    lessonSlug: chapterSlug,
    currentQuestionIndex: questionIdx,
    selectedAnswers: answers,
    writtenAnswers: {},
    updatedAt: new Date().toISOString(),
    totalQuestions: questionCount,
    version: 1,
  }
}

function restoreAnswersFromDraft(draft) {
  const answers = {}
  if (!draft) return answers

  if (draft.selectedAnswers && typeof draft.selectedAnswers === 'object') {
    for (const [key, value] of Object.entries(draft.selectedAnswers)) {
      const qId = Number(key)
      if (Number.isInteger(qId) && Number.isInteger(value)) {
        answers[qId] = value
      }
    }
  }

  if (draft.writtenAnswers && typeof draft.writtenAnswers === 'object') {
    for (const [key, value] of Object.entries(draft.writtenAnswers)) {
      const qId = Number(key)
      if (!Number.isInteger(qId)) continue
      if (typeof value === 'string') {
        answers[qId] = value
      } else if (value && typeof value === 'object') {
        const row = {}
        for (const [subKey, subValue] of Object.entries(value)) {
          const subIdx = Number(subKey)
          if (Number.isInteger(subIdx) && typeof subValue === 'string') {
            row[subIdx] = subValue
          }
        }
        answers[qId] = row
      }
    }
  }

  return answers
}

const fade = {
  initial:    { opacity: 0, y: 10 },
  animate:    { opacity: 1, y: 0  },
  exit:       { opacity: 0, y: -6 },
  transition: { duration: 0.18 },
}

// ── Question sub-renderers ─────────────────────────────────────────────────

function McqQuestion({ q, chosenIdx, onAnswer }) {
  return (
    <>
      {q.section && (
        <p className="text-[10px] font-semibold italic text-text-secondary mb-2">{q.section}</p>
      )}
      <p
        className="text-[15px] font-semibold text-text-primary leading-relaxed mb-5"
        dangerouslySetInnerHTML={{ __html: q.html }}
      />
      <div className="space-y-2.5">
        {q.options.map((opt, i) => {
          const chosen = chosenIdx === i
          return (
            <button
              key={i}
              onClick={() => onAnswer(q.id, i)}
              className={`w-full text-left flex items-center gap-3 px-4 py-[14px] min-h-[56px] rounded-button border-[1.5px] text-[13px] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(42,123,111,0.30)] focus-visible:ring-offset-2
                ${chosen
                  ? 'border-brand-teal bg-brand-teal-soft text-white'
                  : 'border-border-soft bg-surface text-text-primary hover:border-[rgba(42,123,111,0.50)]'
                }`}
            >
              <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full
                text-[13px] font-semibold shrink-0
                ${chosen ? 'bg-brand-teal text-white' : 'bg-page-bg text-text-secondary'}`}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt}</span>
            </button>
          )
        })}
      </div>
    </>
  )
}

function ReferenceQuestion({ q, subAnswers, onWritten, onBlur, validationErrors }) {
  return (
    <>
      <blockquote className="px-5 py-4 mb-5 bg-surface-alt rounded-xl">
        <p className="text-[14px] font-serif italic text-text-primary leading-relaxed">{q.verse}</p>
      </blockquote>
      <div className="space-y-4">
        {q.subs.map((sub, i) => {
          const errKey = `${q.id}_${i}`
          const error  = validationErrors?.[errKey]
          return (
            <div key={i}>
              <p className="text-[13px] font-semibold text-text-primary mb-2">{sub.q}</p>
              <textarea
                className="w-full min-h-[72px] px-3 py-2.5 rounded-xl border border-line bg-page-bg
                  text-[13px] text-text-primary resize-y outline-none focus:border-brand transition-colors"
                style={{ borderColor: error ? 'var(--danger)' : undefined }}
                placeholder="Write your answer here…"
                value={subAnswers?.[i] ?? ''}
                onChange={e => onWritten(q.id, i, e.target.value)}
                onBlur={e => onBlur?.(q.id, i, e.target.value)}
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
      </div>
    </>
  )
}

function WrittenQuestion({ q, value, onWritten, onBlur, validationErrors }) {
  const error = validationErrors?.[q.id]
  return (
    <>
      <p
        className="text-[15px] font-semibold text-text-primary leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: q.html }}
      />
      <textarea
        className="w-full px-3 py-2.5 rounded-xl border border-line bg-page-bg
          text-[13px] text-text-primary resize-y outline-none focus:border-brand transition-colors"
        style={{ minHeight: q.marks >= 5 ? '192px' : '120px', borderColor: error ? 'var(--danger)' : undefined }}
        placeholder="Write your answer here…"
        value={value ?? ''}
        onChange={e => onWritten(q.id, null, e.target.value)}
        onBlur={e => onBlur?.(q.id, null, e.target.value)}
      />
      {error && (
        <p className="flex items-center gap-1.5 mt-1 text-[11px] text-danger">
          <AlertCircle size={11} className="shrink-0" />
          {error}
        </p>
      )}
    </>
  )
}

// ── QuickNavDots ───────────────────────────────────────────────────────────

function QuickNavDots({ questions, questionIdx, answered, onGoto, validationErrors = {} }) {
  const groups = [
    { label: 'MCQ · 1 mark',         qs: questions.filter(q => q.type === 'mcq')                          },
    { label: 'Reference · 2 marks',  qs: questions.filter(q => q.type === 'reference')                    },
    { label: 'Short Answer · 3m',    qs: questions.filter(q => q.type === 'written' && q.marks <= 3)      },
    { label: 'Essay · 5 marks',      qs: questions.filter(q => q.type === 'written' && q.marks > 3)       },
  ].filter(g => g.qs.length > 0)

  return (
    <div className="bg-surface-alt border border-line rounded-xl px-4 py-3 space-y-2.5">
      {groups.map(({ label, qs }) => (
        <div key={label}>
          <p className="text-[9px] font-bold uppercase tracking-wider text-text-tertiary mb-1">{label}</p>
          <div className="flex gap-1 overflow-x-auto pb-0.5">
            {qs.map(q => {
              const gi       = questions.indexOf(q)
              const current  = gi === questionIdx
              const isMcq    = q.type === 'mcq'
              const isInvalid = !isMcq && (
                q.type === 'reference'
                  ? q.subs.some((_, i) => validationErrors[`${q.id}_${i}`])
                  : !!validationErrors[q.id]
              )
              const done    = isMcq
                ? answered[q.id] !== undefined
                : q.type === 'reference'
                  ? q.subs.some((_, i) => answered[q.id]?.[i]?.trim())
                  : answered[q.id]?.trim()
              return (
                <button
                  key={q.id}
                  onClick={() => onGoto(gi)}
                  className={`w-6 h-6 rounded-md text-[9px] font-semibold transition-all shrink-0
                    ${current
                      ? 'bg-brand text-white'
                      : isInvalid
                        ? 'bg-danger/10 text-danger border border-danger/30'
                        : isMcq
                          ? (done ? 'bg-good-soft text-good-ink' : 'bg-surface-alt text-text-secondary hover:bg-surface-alt')
                          : (done ? 'bg-brand-teal-soft text-brand-teal' : 'bg-surface-alt text-text-secondary border border-line hover:border-brand-teal')
                    }`}
                >
                  {gi + 1}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── ExamView ───────────────────────────────────────────────────────────────

function ExamView({ questions, chapterMeta, attempt, questionIdx, onPrevious, onNext, onGoto, onAnswer, onWritten, onBlur, onOpenModal, onOpenReview, onHistory, validationErrors }) {
  const q        = questions[questionIdx]
  const total    = questions.length
  const answers  = attempt.answers
  const mcqQs   = questions.filter(q => q.type === 'mcq')
  const mcqDone = mcqQs.filter(q => answers[q.id] !== undefined).length

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <Eyebrow style={{ marginBottom: 4 }}>{chapterMeta.meta}</Eyebrow>
          <h1 className="text-[20px] font-bold text-text-primary leading-tight">{chapterMeta.title}</h1>
          <p className="text-[12px] text-text-secondary mt-0.5">{chapterMeta.subject}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0 pt-0.5">
          <Badge tone="accent">In Progress</Badge>
          <button
            onClick={onHistory}
            className="p-1.5 rounded-lg hover:bg-surface-alt transition-colors text-text-secondary hover:text-text-secondary"
            title="Attempt History"
          >
            <History size={15} />
          </button>
        </div>
      </div>

      {/* MCQ progress bar */}
      {mcqQs.length > 0 && (
        <div className="bg-surface-alt border border-line rounded-xl px-4 py-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[12px] font-semibold text-text-secondary">Q{questionIdx + 1} of {total}</span>
            <span className="text-[11px] text-text-secondary">MCQ: {mcqDone}/{mcqQs.length} answered</span>
          </div>
          <div className="h-1.5 bg-surface-alt rounded-full overflow-hidden">
            <div
              className="h-full bg-brand rounded-full transition-all duration-300"
              style={{ width: `${(mcqDone / mcqQs.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={questionIdx}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0  }}
          exit=   {{ opacity: 0, x: -12 }}
          transition={{ duration: 0.16 }}
          className="bg-surface-alt border border-line rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <Eyebrow>Question {questionIdx + 1}</Eyebrow>
            <span className="text-[10px] font-semibold text-text-secondary bg-surface-alt px-2 py-0.5 rounded-full">
              {q.marks} mark{q.marks > 1 ? 's' : ''}
            </span>
          </div>

          {q.type === 'mcq' && (
            <McqQuestion q={q} chosenIdx={answers[q.id]} onAnswer={onAnswer} />
          )}
          {q.type === 'reference' && (
            <ReferenceQuestion q={q} subAnswers={answers[q.id]} onWritten={onWritten} onBlur={onBlur} validationErrors={validationErrors} />
          )}
          {q.type === 'written' && (
            <WrittenQuestion q={q} value={answers[q.id]} onWritten={onWritten} onBlur={onBlur} validationErrors={validationErrors} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          onClick={onPrevious}
          disabled={questionIdx === 0}
        >
          <ChevronLeft size={15} /> Previous
        </Button>
        <button
          onClick={onOpenModal}
          className="px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-all
                     bg-brand-teal-soft text-brand-teal
                     border border-[rgba(42,123,111,0.40)]
                     hover:border-brand-teal hover:bg-[rgba(42,123,111,0.18)]"
        >
          Review & Submit
        </button>
        <Button
          variant="secondary"
          onClick={onNext}
          disabled={questionIdx === total - 1}
        >
          Next <ChevronRight size={15} />
        </Button>
      </div>

    </div>
  )
}

// ── ReviewModal ────────────────────────────────────────────────────────────

function LegendDot({ bg, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-3 h-3 rounded-sm shrink-0 ${bg}`} />
      <span className="text-[10px] text-text-secondary">{label}</span>
    </div>
  )
}

function ReviewModal({ questions, questionIdx, answers, validationErrors, mode, onGoto, onCancel, onConfirm }) {
  let answered = 0, unanswered = 0, invalid = 0
  let firstInvalidIdx = -1

  for (const q of questions) {
    const qi = questions.indexOf(q)
    if (q.type === 'mcq') {
      if (answers[q.id] !== undefined) answered++
      else unanswered++
    } else if (q.type === 'reference') {
      const hasInvalid = q.subs.some((_, i) => validationErrors[`${q.id}_${i}`])
      const hasAny     = q.subs.some((_, i) => answers[q.id]?.[i]?.trim())
      if (hasInvalid) { invalid++; if (firstInvalidIdx === -1) firstInvalidIdx = qi }
      else if (hasAny) answered++
      else unanswered++
    } else {
      const val = answers[q.id] ?? ''
      if (validationErrors[q.id]) { invalid++; if (firstInvalidIdx === -1) firstInvalidIdx = qi }
      else if (typeof val === 'string' && val.trim()) answered++
      else unanswered++
    }
  }

  const total = questions.length

  function handleGoto(idx) {
    onCancel()
    onGoto(idx)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
        onClick={onCancel}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0  }}
        exit=   {{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative bg-surface-alt rounded-xl border border-line w-full max-w-lg shadow-card-md flex flex-col"
        style={{ maxHeight: '85vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-line shrink-0">
          <h2 className="text-[15px] font-bold text-text-primary">Review Your Answers</h2>
          <button onClick={onCancel} className="p-1 text-text-secondary hover:text-text-secondary transition-colors">
            <X size={15} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">

          {/* Summary — submit mode only */}
          {mode === 'submit' && (
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-surface-alt rounded-lg px-2 py-2.5 text-center">
                <p className="text-[17px] font-bold text-text-primary leading-none">{total}</p>
                <p className="text-[8px] font-bold uppercase tracking-wider text-text-tertiary mt-1">Total</p>
              </div>
              <div className="bg-good-soft rounded-lg px-2 py-2.5 text-center">
                <p className="text-[17px] font-bold text-good-ink leading-none">{answered}</p>
                <p className="text-[8px] font-bold uppercase tracking-wider text-good-ink mt-1">Answered</p>
              </div>
              <div className="bg-surface-alt rounded-lg px-2 py-2.5 text-center">
                <p className="text-[17px] font-bold text-text-secondary leading-none">{unanswered}</p>
                <p className="text-[8px] font-bold uppercase tracking-wider text-text-tertiary mt-1">Unanswered</p>
              </div>
              <div className={`rounded-lg px-2 py-2.5 text-center ${invalid > 0 ? 'bg-danger/10' : 'bg-surface-alt'}`}>
                <p className={`text-[17px] font-bold leading-none ${invalid > 0 ? 'text-danger' : 'text-text-secondary'}`}>{invalid}</p>
                <p className={`text-[8px] font-bold uppercase tracking-wider mt-1 ${invalid > 0 ? 'text-danger' : 'text-text-tertiary'}`}>
                  Needs Fix
                </p>
              </div>
            </div>
          )}

          {/* Navigator grid */}
          <QuickNavDots
            questions={questions}
            questionIdx={questionIdx}
            answered={answers}
            onGoto={handleGoto}
            validationErrors={validationErrors}
          />

          {/* Legend */}
          <div className="flex flex-wrap gap-x-3 gap-y-1.5">
            <LegendDot bg="bg-brand" label="Current" />
            <LegendDot bg="bg-good-soft" label="Answered" />
            <LegendDot bg="bg-surface-alt border border-line" label="Unanswered" />
            {mode === 'submit' && <LegendDot bg="bg-danger/10 border border-danger/30" label="Needs correction" />}
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 pb-5 pt-3 border-t border-line flex gap-3 shrink-0">
          <Button variant="secondary" className="flex-1" onClick={onCancel}>Cancel</Button>
          {mode === 'submit' && invalid > 0 && (
            <Button
              variant="secondary"
              className="flex-1"
              style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}
              onClick={() => { onCancel(); onGoto(firstInvalidIdx) }}
            >
              Review Corrections
            </Button>
          )}
          {mode === 'submit' && invalid === 0 && (
            <Button variant="accent" className="flex-1" onClick={onConfirm}>
              Submit
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// ── Results — MCQ review item ──────────────────────────────────────────────

function McqReviewItem({ q, qi, answered }) {
  const chosen    = answered[q.id]
  const isCorrect = isMcqCorrect(q, answered)
  return (
    <div className={`bg-surface-alt rounded-xl p-4 border ${isCorrect ? 'border-good-soft' : 'border-line'}`}>
      <div className="flex items-start gap-2 mb-3">
        {isCorrect
          ? <CheckCircle2 size={16} className="text-good shrink-0 mt-0.5" />
          : <XCircle      size={16} className="text-danger shrink-0 mt-0.5" />
        }
        <p
          className="text-[13px] font-semibold text-text-primary leading-snug"
          dangerouslySetInnerHTML={{ __html: `Q${qi + 1}. ${q.html}` }}
        />
      </div>
      <div className="space-y-1.5 ml-6">
        {q.options.map((opt, i) => {
          const isChosen = chosen === i
          const isAnswer = q.acceptedAnswers ? q.acceptedAnswers.includes(i) : q.correct === i
          return (
            <div key={i} className={`text-[12px] flex items-center gap-2 ${
              isAnswer              ? 'text-good-ink font-semibold'
              : isChosen && !isCorrect ? 'text-danger line-through'
              :                         'text-text-secondary'
            }`}>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center
                text-[9px] font-bold shrink-0
                ${isAnswer  ? 'bg-good-soft text-good-ink'
                : isChosen  ? 'bg-danger/10 text-danger'
                :              'bg-surface-alt text-text-tertiary'}`}
              >
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
              {isAnswer && <CheckCircle2 size={11} className="text-good ml-auto shrink-0" />}
            </div>
          )
        })}
      </div>
      {!isCorrect && q.hint && (
        <div className="mt-3 ml-6 px-3 py-2 bg-brand-subtle rounded-lg">
          <p className="text-[11px] text-brand-strong">
            <span className="font-semibold">Hint: </span>{q.hint}
          </p>
        </div>
      )}
    </div>
  )
}

// ── Results — written review item ──────────────────────────────────────────

function AnswerPair({ studentText, modelAnswer }) {
  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      <div>
        <p className="text-[9px] font-bold uppercase tracking-wider text-text-tertiary mb-1">Your answer</p>
        {studentText.trim()
          ? <p className="text-[12px] text-text-secondary bg-surface-alt rounded-lg px-3 py-2 min-h-[48px] whitespace-pre-wrap">{studentText}</p>
          : <p className="text-[12px] text-text-tertiary italic px-3 py-2">No answer written</p>
        }
      </div>
      <div>
        <p className="text-[9px] font-bold uppercase tracking-wider text-good mb-1">Expected answer</p>
        <p className="text-[12px] text-text-secondary bg-good-soft/30 border border-good-soft rounded-lg px-3 py-2 min-h-[48px] whitespace-pre-wrap">{modelAnswer}</p>
      </div>
    </div>
  )
}

function WrittenReviewItem({ q, qi, answered }) {
  return (
    <div className="bg-surface-alt rounded-xl p-4 border border-line">

      {/* Question header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        {q.type === 'reference' ? (
          <blockquote className="border-l-2 border-line pl-3 flex-1">
            <p className="text-[12px] font-serif italic text-text-secondary leading-relaxed">{q.verse}</p>
          </blockquote>
        ) : (
          <p
            className="text-[13px] font-semibold text-text-primary leading-snug flex-1"
            dangerouslySetInnerHTML={{ __html: `Q${qi + 1}. ${q.html}` }}
          />
        )}
        <span className="text-[10px] text-text-tertiary shrink-0 mt-0.5">{q.marks}m</span>
      </div>

      {q.type === 'reference' && (
        <div className="space-y-4 ml-2">
          {q.subs.map((sub, i) => (
            <div key={i}>
              <p className="text-[12px] font-semibold text-text-primary mb-1">{sub.q}</p>
              <AnswerPair
                studentText={answered[q.id]?.[i] ?? ''}
                modelAnswer={sub.modelAnswer}
              />
            </div>
          ))}
        </div>
      )}

      {q.type === 'written' && (
        <AnswerPair
          studentText={answered[q.id] ?? ''}
          modelAnswer={q.modelAnswer}
        />
      )}

    </div>
  )
}

// ── ResultsView ────────────────────────────────────────────────────────────

function ResultsView({ questions, chapterMeta, attempt, attemptNumber, onRetake, onHistory, onBackToLesson }) {
  const mcqQs     = questions.filter(q => q.type === 'mcq')
  const writtenQs = questions.filter(q => q.type !== 'mcq')
  const total     = mcqQs.length
  const score     = attempt.score ?? calcMcqScore(questions, attempt.answers)
  const percentage = pct(score, total)
  const scoreColor = percentage >= 70 ? 'bg-good' : percentage >= 40 ? 'bg-warn' : 'bg-danger'
  const scoreText  = percentage >= 70 ? 'text-good-ink' : percentage >= 40 ? 'text-warn' : 'text-danger'

  return (
    <div className="space-y-4">

      {/* Score header */}
      <div className="bg-surface-alt border border-line rounded-xl p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <Eyebrow style={{ marginBottom: 4 }}>{chapterMeta.meta}</Eyebrow>
            <h1 className="text-[18px] font-bold text-text-primary leading-tight">Exam Submitted</h1>
            <p className="text-[12px] text-text-secondary mt-0.5">{chapterMeta.title}</p>
          </div>
          <Badge tone="good">Submitted</Badge>
        </div>

        <Eyebrow style={{ marginBottom: 4 }}>MCQ Score</Eyebrow>
        <div className="flex items-baseline gap-2 flex-wrap mb-2">
          <span className="text-[32px] font-bold text-text-primary leading-none">{score}</span>
          <span className="text-[18px] text-text-secondary">/ {total}</span>
          <span className={`text-[20px] font-bold ${scoreText}`}>· {percentage}%</span>
        </div>
        <p className="text-[11px] text-text-secondary mb-3">
          Attempt {attemptNumber}
          {attempt.submittedAt ? ` · Submitted ${fmtDate(attempt.submittedAt)}` : ''}
        </p>
        <div className="h-2 bg-surface-alt rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${scoreColor}`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          />
        </div>
        {writtenQs.length > 0 && (
          <p className="text-[11px] text-text-secondary mt-2.5">
            {writtenQs.length} written question{writtenQs.length !== 1 ? 's' : ''} below — tap model answers to compare
          </p>
        )}
      </div>

      {/* MCQ review */}
      {mcqQs.length > 0 && (
        <>
          <Eyebrow>MCQ Review</Eyebrow>
          <div className="space-y-3">
            {mcqQs.map((q, i) => (
              <McqReviewItem key={q.id} q={q} qi={i} answered={attempt.answers} />
            ))}
          </div>
        </>
      )}

      {/* Written review */}
      {writtenQs.length > 0 && (
        <>
          <Eyebrow style={{ marginTop: 8 }}>Written Answers</Eyebrow>
          <div className="space-y-3">
            {writtenQs.map((q, i) => (
              <WrittenReviewItem key={q.id} q={q} qi={i} answered={attempt.answers} />
            ))}
          </div>
        </>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={onBackToLesson}>
          <ChevronLeft size={14} /> Back to Lesson
        </Button>
        <Button variant="secondary" className="flex-1" onClick={onHistory}>
          <History size={14} /> View Attempt History
        </Button>
        <Button variant="accent" className="flex-1" onClick={onRetake}>
          <RotateCcw size={14} /> Retake Practice Exam
        </Button>
      </div>

    </div>
  )
}

// ── Main export ────────────────────────────────────────────────────────────

export default function ChapterPracticeExam({ questions, chapterMeta, chapterSlug }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const parentPath = pathname.replace(/\/[^/]+$/, '')

  const draftKey = chapterSlug
    ? buildPracticeDraftKey({ classLevel: 'Class_11', subjectSlug: 'English', lessonSlug: chapterSlug })
    : null

  const [attempts,          setAttempts]          = useState([createBlankAttempt()])
  const [currentAttemptId,  setCurrentAttemptId]  = useState(1)
  const [view,              setView]              = useState('exam')
  const [viewingAttemptId,  setViewingAttemptId]  = useState(null)
  const [modalMode,         setModalMode]         = useState(null) // null | 'review' | 'submit'
  const [questionIdx,       setQuestionIdx]       = useState(0)
  const [validationErrors,  setValidationErrors]  = useState({})
  const [resumeNotice,      setResumeNotice]      = useState(false)
  const resumeShownRef = useRef(false)

  const currentAttempt = attempts.find(a => a.id === currentAttemptId)
  const viewingAttempt = viewingAttemptId ? attempts.find(a => a.id === viewingAttemptId) : null
  const resultsAttempt = viewingAttempt ?? (view === 'results' ? currentAttempt : null)

  function saveCurrentDraft(nextIdx = questionIdx, nextAnswers = currentAttempt?.answers ?? {}) {
    if (!draftKey) return
    if (view === 'results') return
    writePracticeDraft(
      draftKey,
      buildDraftPayload({
        chapterSlug,
        questionIdx: nextIdx,
        answers: nextAnswers,
        questionCount: questions.length,
      }),
    )
  }

  function handleGotoQuestion(index) {
    const nextIdx = clampIndex(index, questions.length)
    setQuestionIdx(nextIdx)
    saveCurrentDraft(nextIdx)
  }

  function handlePreviousQuestion() {
    const nextIdx = Math.max(0, questionIdx - 1)
    setQuestionIdx(nextIdx)
    saveCurrentDraft(nextIdx)
  }

  function handleNextQuestion() {
    const nextIdx = Math.min(questions.length - 1, questionIdx + 1)
    setQuestionIdx(nextIdx)
    saveCurrentDraft(nextIdx)
  }

  useEffect(() => {
    if (!draftKey) return
    const draft = readPracticeDraft(draftKey)
    if (!draft || draft.lessonSlug !== chapterSlug) return

    const restoredAnswers = restoreAnswersFromDraft(draft)
    const restoredIdx = clampIndex(draft.currentQuestionIndex, questions.length)
    setAttempts([{
      id: 1,
      status: 'in_progress',
      answers: restoredAnswers,
      score: null,
      submittedAt: null,
    }])
    setCurrentAttemptId(1)
    setView('exam')
    setViewingAttemptId(null)
    setModalMode(null)
    setQuestionIdx(restoredIdx)
    setValidationErrors({})
    if (!resumeShownRef.current && (Object.keys(restoredAnswers).length > 0 || restoredIdx > 0)) {
      resumeShownRef.current = true
      setResumeNotice(true)
    }
  }, [chapterSlug, draftKey, questions.length])

  useEffect(() => {
    if (!resumeNotice) return undefined
    const timer = window.setTimeout(() => setResumeNotice(false), 2200)
    return () => window.clearTimeout(timer)
  }, [resumeNotice])

  useEffect(() => {
    const flush = () => {
      if (!draftKey || view === 'results') return
      const answers = currentAttempt?.answers ?? {}
      const draft = buildDraftPayload({
        chapterSlug,
        questionIdx,
        answers,
        questionCount: questions.length,
      })
      if (Object.keys(answers).length === 0 && questionIdx === 0) {
        clearPracticeDraft(draftKey)
        return
      }
      writePracticeDraft(draftKey, draft)
    }

    window.addEventListener('beforeunload', flush)
    window.addEventListener('pagehide', flush)
    return () => {
      flush()
      window.removeEventListener('beforeunload', flush)
      window.removeEventListener('pagehide', flush)
    }
  }, [chapterSlug, currentAttempt?.answers, draftKey, questionIdx, questions.length, view])

  if (!questions?.length) {
    return (
      <div className="bg-surface-alt border border-line rounded-xl p-6 text-center">
        <p className="text-text-secondary text-[14px]">No practice questions available for this chapter yet.</p>
      </div>
    )
  }

  function handleAnswer(qId, optIdx) {
    setAttempts(prev => prev.map(a =>
      a.id === currentAttemptId
        ? { ...a, answers: { ...a.answers, [qId]: optIdx } }
        : a
    ))
    if (draftKey) {
      const nextAnswers = { ...currentAttempt.answers, [qId]: optIdx }
      writePracticeDraft(
        draftKey,
        buildDraftPayload({
          chapterSlug,
          questionIdx,
          answers: nextAnswers,
          questionCount: questions.length,
        }),
      )
    }
  }

  function handleWrittenAnswer(qId, subIdx, text) {
    setAttempts(prev => prev.map(a => {
      if (a.id !== currentAttemptId) return a
      if (subIdx !== null) {
        return { ...a, answers: { ...a.answers, [qId]: { ...(a.answers[qId] ?? {}), [subIdx]: text } } }
      }
      return { ...a, answers: { ...a.answers, [qId]: text } }
    }))
    if (draftKey) {
      const currentAnswers = currentAttempt.answers
      const nextAnswers = subIdx !== null
        ? { ...currentAnswers, [qId]: { ...(currentAnswers[qId] ?? {}), [subIdx]: text } }
        : { ...currentAnswers, [qId]: text }
      writePracticeDraft(
        draftKey,
        buildDraftPayload({
          chapterSlug,
          questionIdx,
          answers: nextAnswers,
          questionCount: questions.length,
        }),
      )
    }
  }

  function handleSubmit() {
    const score = calcMcqScore(questions, currentAttempt.answers)
    const submittedAt = new Date().toISOString()
    setAttempts(prev => prev.map(a =>
      a.id === currentAttemptId
        ? { ...a, status: 'submitted', score, submittedAt }
        : a
    ))
    if (draftKey) clearPracticeDraft(draftKey)
    if (chapterSlug) {
      const total = questions.filter(q => q.type === 'mcq').length
      const key = `exam_coach_sessions_${chapterSlug}`
      const prev = JSON.parse(localStorage.getItem(key) || '[]')
      localStorage.setItem(key, JSON.stringify([...prev, { score, total, date: submittedAt }]))
    }
    setModalMode(null)
    setViewingAttemptId(currentAttemptId)
    setView('results')
  }

  function handleBlurValidation(qId, subIdx, text) {
    const key = subIdx !== null ? `${qId}_${subIdx}` : qId
    const result = validateStudentAnswer(text ?? '')
    setValidationErrors(prev => {
      const next = { ...prev }
      if (result.message) next[key] = result.message
      else delete next[key]
      return next
    })
  }

  function handleOpenModal() {
    const errors = {}
    for (const q of questions) {
      if (q.type === 'mcq') continue
      if (q.type === 'reference') {
        for (let i = 0; i < (q.subs?.length ?? 0); i++) {
          const val = currentAttempt.answers[q.id]?.[i] ?? ''
          if (!val.trim()) continue
          const result = validateStudentAnswer(val)
          if (result.message) errors[`${q.id}_${i}`] = result.message
        }
      } else {
        const val = currentAttempt.answers[q.id] ?? ''
        if (!val.trim()) continue
        const result = validateStudentAnswer(val)
        if (result.message) errors[q.id] = result.message
      }
    }
    setValidationErrors(errors)
    setModalMode('submit')
  }

  function handleRetake() {
    const newId = Math.max(...attempts.map(a => a.id)) + 1
    setAttempts(prev => [...prev, { id: newId, status: 'in_progress', answers: {}, score: null, submittedAt: null }])
    setCurrentAttemptId(newId)
    setViewingAttemptId(null)
    setModalMode(null)
    setQuestionIdx(0)
    setValidationErrors({})
    setView('exam')
    if (draftKey) clearPracticeDraft(draftKey)
    resumeShownRef.current = false
    setResumeNotice(false)
  }

  const sharedProps = { questions, chapterMeta }

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">

        {view === 'exam' && (
          <motion.div key="exam" {...fade}>
            <ExamView
              {...sharedProps}
              attempt={currentAttempt}
              questionIdx={questionIdx}
              onPrevious={handlePreviousQuestion}
              onNext={handleNextQuestion}
              onGoto={handleGotoQuestion}
              onAnswer={handleAnswer}
              onWritten={handleWrittenAnswer}
              onBlur={handleBlurValidation}
              onOpenModal={handleOpenModal}
              onOpenReview={() => setModalMode('review')}
              onHistory={() => navigate(`${parentPath}/attempt-history`)}
              validationErrors={validationErrors}
            />
          </motion.div>
        )}

        {view === 'results' && resultsAttempt && (
          <motion.div key={`results-${resultsAttempt.id}`} {...fade}>
            <ResultsView
              {...sharedProps}
              attempt={resultsAttempt}
              attemptNumber={attempts.indexOf(resultsAttempt) + 1}
              onRetake={handleRetake}
              onHistory={() => navigate(`${parentPath}/attempt-history`)}
              onBackToLesson={() => navigate(parentPath)}
            />
          </motion.div>
        )}

      </AnimatePresence>

      <AnimatePresence>
        {modalMode && (
          <ReviewModal
            mode={modalMode}
            questions={questions}
            questionIdx={questionIdx}
            answers={currentAttempt.answers}
            validationErrors={validationErrors}
            onGoto={handleGotoQuestion}
            onCancel={() => setModalMode(null)}
            onConfirm={handleSubmit}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
