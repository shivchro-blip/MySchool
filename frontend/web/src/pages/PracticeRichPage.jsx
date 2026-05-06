import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

/* ─── MCQ Part ─────────────────────────────────────────────────────────── */
function McqPart({ part, done, score, onAnswer }) {
  const totalDone = Object.keys(done).length

  return (
    <div>
      {/* Score bar */}
      <div className="bg-bg-2 border border-line rounded-xl px-4 py-3 mb-5 flex justify-between items-center flex-wrap gap-2">
        <span className="text-[13px] text-ink-2">
          Score:{' '}
          <span className="font-bold text-accent">{score}</span>
          {' '}/ {part.scoreMax}
        </span>
        <span className="text-[11px] font-medium px-3 py-0.5 rounded-full bg-accent-soft text-accent-ink">
          {totalDone} answered
        </span>
      </div>

      {part.sections.map((sec, si) => (
        <div key={si}>
          <p
            className={`text-[10px] font-bold tracking-[0.1em] uppercase mb-3
                        ${si === 0 ? '' : 'mt-7'}`}
            style={{
              background: 'rgba(46,196,182,0.10)',
              borderLeft: '3px solid #2ec4b6',
              color: '#0b6b65',
              padding: '10px 14px',
              borderRadius: '0 8px 8px 0',
            }}
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
                className="bg-bg-2 rounded-xl px-4 py-4 mb-3 border"
                style={{ borderColor: answered && chosen === correct ? 'var(--good)' : 'var(--line)' }}
              >
                <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-ink-4 mb-2">
                  {q.id.toUpperCase()}
                </p>

                <div
                  className="text-[14px] text-ink leading-[1.7] mb-3"
                  dangerouslySetInnerHTML={{ __html: q.html }}
                />

                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-2 mb-3">
                  {q.options.map((opt, i) => {
                    let bg = 'var(--bg-sunk)', borderColor = 'var(--line)', color = 'var(--ink-2)', weight = 400
                    if (answered) {
                      if (i === correct) {
                        bg = 'var(--good-soft)'; borderColor = 'var(--good)'; color = 'var(--good-ink)'; weight = 600
                      } else if (i === chosen) {
                        bg = 'rgba(176,58,48,0.08)'; borderColor = 'rgba(176,58,48,0.5)'; color = 'var(--danger)'
                      }
                    }
                    return (
                      <button
                        key={i}
                        disabled={answered}
                        onClick={() => onAnswer(q.id, i, q.answer)}
                        className="text-left text-[13px] rounded-lg px-3 py-2 border transition-all duration-[var(--duration-fast)] hover:opacity-90"
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
                  <p className="text-[12px] text-ink-3 leading-[1.6] pt-2.5 border-t border-line-soft">
                    <strong style={{ color: chosen === correct ? 'var(--good-ink)' : 'var(--danger)' }}>
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
function ReferencePart({ part, cur, onNav, revealed, onToggle, answers, onAnswer }) {
  const q     = part.questions[cur]
  const total = part.questions.length

  return (
    <div>
      <p
        className="text-[12px] italic mb-4 leading-relaxed"
        style={{
          background: 'rgba(46,196,182,0.08)',
          borderLeft: '3px solid #2ec4b6',
          color: '#0b6b65',
          padding: '10px 14px',
          borderRadius: '0 8px 8px 0',
        }}
      >{part.instruction}</p>

      <div
        className="bg-bg-2 rounded-xl px-5 py-5 border"
        style={{ borderColor: revealed[cur] ? 'var(--good)' : 'var(--line)' }}
      >
        <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-ink-4 mb-3">
          Q{cur + 1} of {total} · {part.marksPer} marks
        </p>

        {/* Verse */}
        <div
          className="px-4 py-3 rounded-r-xl text-[14px] italic text-ink leading-[1.8] mb-4 border-l-2"
          style={{ background: 'var(--bg-sunk)', borderLeftColor: 'var(--accent)' }}
        >
          {q.verse}
        </div>

        {/* Sub-questions */}
        {q.subs.map((s, i) => (
          <div key={i} className="mb-4">
            <p className="text-[13px] text-ink leading-[1.6] mb-2">{s.q}</p>
            <textarea
              rows={3}
              placeholder="Write your answer here…"
              value={answers[cur][i]}
              onChange={e => onAnswer(cur, i, e.target.value)}
              className="w-full border border-line rounded-lg px-3 py-2 text-[13px] text-ink-2
                         bg-bg-sunk leading-relaxed resize-y block outline-none font-[inherit]
                         focus:border-accent transition-colors"
              style={{ minHeight: '70px' }}
            />
          </div>
        ))}

        <button
          onClick={() => onToggle(cur)}
          className="px-3.5 py-1.5 rounded-lg text-[12px] font-semibold border border-line
                     text-ink-2 bg-bg-2 hover:bg-bg-sunk transition-all"
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
              style={{ color: 'var(--good-ink)' }}
            >
              Model answers
            </p>
            {q.subs.map((s, i) => (
              <p
                key={i}
                className="text-ink leading-[1.7]"
                style={{ marginBottom: i < q.subs.length - 1 ? '10px' : 0 }}
              >
                <strong className="text-ink-2">{s.q.substring(0, 3)}</strong> {s.a}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Prev / Next */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-line-soft">
        <button
          disabled={cur === 0}
          onClick={() => onNav(-1)}
          className="px-4 py-2 rounded-xl text-[13px] font-semibold border border-line
                     text-ink-2 bg-bg-2 hover:bg-bg-sunk transition-all disabled:opacity-40"
        >
          ← Previous
        </button>
        <span className="text-[12px] text-ink-4">Question {cur + 1} of {total}</span>
        <button
          disabled={cur === total - 1}
          onClick={() => onNav(1)}
          className="px-4 py-2 rounded-xl text-[13px] font-semibold border border-line
                     text-ink-2 bg-bg-2 hover:bg-bg-sunk transition-all disabled:opacity-40"
        >
          Next →
        </button>
      </div>
    </div>
  )
}

/* ─── Essay Part (short + long) ────────────────────────────────────────── */
function EssayPart({ part, answers, onAnswer, revealed, onToggle }) {
  const isLong   = part.type === 'long-essay'
  const wordHint = isLong ? '100–150 words' : '30–40 words'

  return (
    <div>
      <p
        className="text-[12px] italic mb-4 leading-relaxed"
        style={{
          background: 'rgba(46,196,182,0.08)',
          borderLeft: '3px solid #2ec4b6',
          color: '#0b6b65',
          padding: '10px 14px',
          borderRadius: '0 8px 8px 0',
        }}
      >{part.instruction}</p>

      {part.questions.map((q, i) => (
        <div
          key={i}
          className="bg-bg-2 rounded-xl px-5 py-5 mb-3 border"
          style={{ borderColor: revealed[i] ? 'var(--good)' : 'var(--line)' }}
        >
          <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-ink-4 mb-2">
            Q{i + 1} · {part.marksPer} marks · {wordHint}
          </p>
          <p className="text-[14px] text-ink leading-[1.7] mb-3">{q.q}</p>

          <textarea
            rows={isLong ? 7 : 4}
            placeholder={`Write your answer here (${wordHint})…`}
            value={answers[i]}
            onChange={e => onAnswer(i, e.target.value)}
            className="w-full border border-line rounded-lg px-3 py-2 text-[13px] text-ink-2
                       bg-bg-sunk leading-relaxed resize-y block outline-none font-[inherit]
                       mb-2.5 focus:border-accent transition-colors"
          />

          <button
            onClick={() => onToggle(i)}
            className="px-3.5 py-1.5 rounded-lg text-[12px] font-semibold border border-line
                       text-ink-2 bg-bg-2 hover:bg-bg-sunk transition-all"
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
                style={{ color: 'var(--good-ink)' }}
              >
                Model answer
              </p>
              <p className="text-[13px] text-ink leading-[1.8] whitespace-pre-line">{q.ans}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── PracticeRichPage ──────────────────────────────────────────────────── */
export default function PracticeRichPage({ content, chapterSlug }) {
  const { lesson } = useParams()
  const sessionKey = (lesson || chapterSlug) ? `exam_coach_sessions_${lesson || chapterSlug}` : null

  const mcqPart   = content.parts.find(p => p.type === 'mcq')
  const refPart   = content.parts.find(p => p.type === 'reference')
  const shortPart = content.parts.find(p => p.type === 'short-essay')
  const longPart  = content.parts.find(p => p.type === 'long-essay')

  const [activePartId, setActivePartId] = useState(content.parts[0].id)

  const [mcqDone,  setMcqDone]  = useState({})
  const [mcqScore, setMcqScore] = useState(0)

  const [refCur,      setRefCur]      = useState(0)
  const [refRevealed, setRefRevealed] = useState(() => new Array(refPart?.questions.length ?? 0).fill(false))
  const [refAnswers,  setRefAnswers]  = useState(() => refPart?.questions.map(q => q.subs.map(() => '')) ?? [])

  const [shortAnswers,  setShortAnswers]  = useState(() => new Array(shortPart?.questions.length ?? 0).fill(''))
  const [shortRevealed, setShortRevealed] = useState(() => new Array(shortPart?.questions.length ?? 0).fill(false))

  const [longAnswers,  setLongAnswers]  = useState(() => new Array(longPart?.questions.length ?? 0).fill(''))
  const [longRevealed, setLongRevealed] = useState(() => new Array(longPart?.questions.length ?? 0).fill(false))

  const sessionSavedRef = useRef(false)
  const totalMcqQs = mcqPart
    ? mcqPart.sections.reduce((sum, sec) => sum + sec.questions.length, 0)
    : 0

  useEffect(() => {
    if (!sessionKey || !mcqPart || sessionSavedRef.current) return
    if (Object.keys(mcqDone).length < totalMcqQs) return
    sessionSavedRef.current = true
    const record = { date: new Date().toISOString(), score: mcqScore, total: mcqPart.scoreMax }
    const prev = JSON.parse(localStorage.getItem(sessionKey) ?? '[]')
    localStorage.setItem(sessionKey, JSON.stringify([...prev, record]))
  }, [mcqDone, mcqScore, sessionKey, mcqPart, totalMcqQs])

  function switchPart(id) { setActivePartId(id); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  function handleMcqAnswer(qId, chosen, correct) {
    if (mcqDone[qId] !== undefined) return
    setMcqDone(prev => ({ ...prev, [qId]: chosen }))
    if (chosen === correct) setMcqScore(s => s + 1)
  }
  function handleRefAnswer(qIdx, subIdx, val) {
    setRefAnswers(prev => prev.map((row, ri) =>
      ri === qIdx ? row.map((v, si) => si === subIdx ? val : v) : row
    ))
  }
  function handleShortAnswer(idx, val) { setShortAnswers(prev => prev.map((v, i) => i === idx ? val : v)) }
  function handleLongAnswer(idx, val)  { setLongAnswers(prev => prev.map((v, i) => i === idx ? val : v)) }
  function toggleRef(idx)   { setRefRevealed(prev => prev.map((v, i) => i === idx ? !v : v)) }
  function toggleShort(idx) { setShortRevealed(prev => prev.map((v, i) => i === idx ? !v : v)) }
  function toggleLong(idx)  { setLongRevealed(prev => prev.map((v, i) => i === idx ? !v : v)) }

  function renderActivePart() {
    switch (activePartId) {
      case mcqPart?.id:
        return <McqPart part={mcqPart} done={mcqDone} score={mcqScore} onAnswer={handleMcqAnswer} />
      case refPart?.id:
        return (
          <ReferencePart
            part={refPart}
            cur={refCur}
            onNav={d => setRefCur(c => Math.max(0, Math.min(refPart.questions.length - 1, c + d)))}
            revealed={refRevealed}
            onToggle={toggleRef}
            answers={refAnswers}
            onAnswer={handleRefAnswer}
          />
        )
      case shortPart?.id:
        return <EssayPart part={shortPart} answers={shortAnswers} onAnswer={handleShortAnswer} revealed={shortRevealed} onToggle={toggleShort} />
      case longPart?.id:
        return <EssayPart part={longPart} answers={longAnswers} onAnswer={handleLongAnswer} revealed={longRevealed} onToggle={toggleLong} />
      default:
        return null
    }
  }

  return (
    <div>
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
                ? 'border-accent text-accent font-semibold'
                : 'border-transparent text-ink-3 hover:text-ink'}
            `}
          >
            {part.navLabel}
          </button>
        ))}
      </div>

      {/* Active part */}
      <div className="max-w-[660px]">
        {renderActivePart()}
      </div>
    </div>
  )
}
