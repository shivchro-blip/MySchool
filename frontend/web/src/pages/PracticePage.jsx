import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestions } from '../api/syllabus'
import { submitAnswer, retryAnswer } from '../api/evaluation'
import Layout from '../components/Layout'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import ScoreBadge from '../components/ScoreBadge'
import MarksBadge from '../components/MarksBadge'

export default function PracticePage() {
  const { chapterId }      = useParams()
  const [questions, setQ]  = useState([])
  const [filter,    setF]  = useState('all')
  const [current,   setC]  = useState(null)
  const [answer,    setA]  = useState('')
  const [result,    setR]  = useState(null)
  const [loading,   setL]  = useState(false)
  const [qLoading,  setQL] = useState(true)
  const [error,     setE]  = useState('')
  const [mode,      setM]  = useState('list') // list | write | result

  useEffect(() => {
    getQuestions(chapterId)
      .then(setQ)
      .catch(e => setE(e.message))
      .finally(() => setQL(false))
  }, [chapterId])

  const filtered = filter === 'all'
    ? questions
    : questions.filter(q => q.marks === parseInt(filter))

  function startQuestion(q) {
    setC(q); setA(''); setR(null); setE(''); setM('write')
  }

  async function handleSubmit() {
    if (answer.trim().length < 10) { setE('Please write at least 10 characters.'); return }
    setL(true); setE('')
    try {
      const data = await submitAnswer({
        questionId: current.id, studentAnswer: answer, attemptNumber: 1,
      })
      setR(data); setM('result')
    } catch (e) { setE(e.message) }
    finally { setL(false) }
  }

  async function handleRetry() {
    if (answer.trim().length < 10) { setE('Please write at least 10 characters.'); return }
    setL(true); setE('')
    try {
      const data = await retryAnswer({ responseId: result.response_id, newAnswer: answer })
      setR(data)
    } catch (e) { setE(e.message) }
    finally { setL(false) }
  }

  // ── List ──────────────────────────────────────────────────────────────────
  if (mode === 'list') return (
    <Layout title="Practice">
      <a href="/" className="text-sm text-gray-500 hover:text-gray-700 mb-4 block">
        ← Back to chapters
      </a>
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {['all', '1', '2', '5', '10'].map(v => (
          <button
            key={v}
            onClick={() => setF(v)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap
                        border transition-colors ${
              filter === v
                ? 'bg-brand-600 text-white border-brand-600'
                : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            {v === 'all' ? 'All' : `${v} Mark${v !== '1' ? 's' : ''}`}
          </button>
        ))}
      </div>
      {qLoading && <Spinner label="Loading questions..." />}
      {error    && <ErrorMessage message={error} />}
      <div className="space-y-3">
        {filtered.map(q => (
          <div key={q.id} className="card">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <MarksBadge marks={q.marks} />
                <p className="text-sm text-gray-800 mt-2 font-medium">{q.question_text}</p>
              </div>
              <button
                onClick={() => startQuestion(q)}
                className="btn-primary text-sm py-1.5 px-3 whitespace-nowrap"
              >
                Answer
              </button>
            </div>
          </div>
        ))}
        {!qLoading && filtered.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">
            No questions found for this filter.
          </p>
        )}
      </div>
    </Layout>
  )

  // ── Write ─────────────────────────────────────────────────────────────────
  if (mode === 'write') return (
    <Layout title="Write Your Answer">
      <button
        onClick={() => setM('list')}
        className="text-sm text-gray-500 hover:text-gray-700 mb-4 block"
      >
        ← Back to questions
      </button>
      <div className="card mb-4">
        <MarksBadge marks={current.marks} />
        <p className="text-gray-900 font-medium mt-2">{current.question_text}</p>
      </div>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium text-gray-700">Your Answer</label>
          <span className="text-xs text-gray-400">{answer.length} chars</span>
        </div>
        <textarea
          className="input min-h-40 resize-y"
          placeholder={
            current.marks <= 2
              ? 'Write 2–3 sentences...'
              : current.marks === 5
              ? 'Write a short paragraph with 3–4 points...'
              : 'Write a full essay with intro, main points, and conclusion...'
          }
          value={answer}
          onChange={e => setA(e.target.value)}
        />
        <p className="text-xs text-gray-400 mt-1">
          {current.marks <= 2
            ? 'Tip: 2-mark questions need a key term + brief explanation'
            : current.marks === 5
            ? 'Tip: Cover 3–4 points clearly'
            : 'Tip: Use intro + 4–5 points + conclusion structure'}
        </p>
      </div>
      {error && <ErrorMessage message={error} />}
      <button
        onClick={handleSubmit}
        disabled={loading || answer.trim().length < 10}
        className="btn-primary w-full"
      >
        {loading ? <Spinner size="sm" label="Evaluating..." /> : '🤖 Evaluate My Answer'}
      </button>
    </Layout>
  )

  // ── Result ────────────────────────────────────────────────────────────────
  return (
    <Layout title="Your Results">
      <div className="card mb-4 text-center">
        <ScoreBadge awarded={result.marks_awarded} total={result.marks_total} />
        <p className="text-gray-500 text-sm mt-2">
          {result.percentage >= 80
            ? '🎉 Excellent work!'
            : result.percentage >= 50
            ? '👍 Good effort — keep improving!'
            : '💪 Keep practising — you can do better!'}
        </p>
      </div>

      <div className="space-y-3 mb-4">
        {result.feedback.strengths?.length > 0 && (
          <div className="card">
            <p className="text-sm font-semibold text-green-700 mb-2">✅ Strengths</p>
            <ul className="space-y-1">
              {result.feedback.strengths.map((s, i) => (
                <li key={i} className="text-sm text-gray-700">• {s}</li>
              ))}
            </ul>
          </div>
        )}
        {result.feedback.weaknesses?.length > 0 && (
          <div className="card">
            <p className="text-sm font-semibold text-red-700 mb-2">⚠️ Needs Improvement</p>
            <ul className="space-y-1">
              {result.feedback.weaknesses.map((w, i) => (
                <li key={i} className="text-sm text-gray-700">• {w}</li>
              ))}
            </ul>
          </div>
        )}
        {result.feedback.missing_points?.length > 0 && (
          <div className="card">
            <p className="text-sm font-semibold text-amber-700 mb-2">📌 Missing Points</p>
            <ul className="space-y-1">
              {result.feedback.missing_points.map((m, i) => (
                <li key={i} className="text-sm text-gray-700">• {m}</li>
              ))}
            </ul>
          </div>
        )}
        {(result.feedback.structure_comment || result.feedback.grammar_comment) && (
          <div className="card text-sm text-gray-600 space-y-1">
            {result.feedback.structure_comment && (
              <p>📐 {result.feedback.structure_comment}</p>
            )}
            {result.feedback.grammar_comment && (
              <p>✏️ {result.feedback.grammar_comment}</p>
            )}
          </div>
        )}
        {result.improved_answer && (
          <div className="card border-brand-200 bg-brand-50">
            <p className="text-sm font-semibold text-brand-800 mb-2">
              ⭐ Model Answer (Full Marks)
            </p>
            <p className="text-sm text-brand-900 leading-relaxed">
              {result.improved_answer}
            </p>
          </div>
        )}
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Try to improve your answer:
        </p>
        <textarea
          className="input min-h-32 resize-y"
          placeholder="Rewrite your answer using the feedback above..."
          value={answer}
          onChange={e => setA(e.target.value)}
        />
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="flex gap-3">
        <button
          onClick={handleRetry}
          disabled={loading || answer.trim().length < 10}
          className="btn-primary flex-1"
        >
          {loading ? <Spinner size="sm" label="" /> : '🔁 Re-evaluate'}
        </button>
        <button onClick={() => setM('list')} className="btn-secondary flex-1">
          Try Another
        </button>
      </div>

      <p className="text-xs text-center text-gray-400 mt-3">
        Model: {result.model_used}{result.cached && ' · Cached'}
      </p>
    </Layout>
  )
}
