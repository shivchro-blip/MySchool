import { useState, useEffect } from 'react'
import { AdminLayout } from '../components'
import { adminApi } from '../api/client'

export default function EvaluationsPage() {
  const [items,   setItems]  = useState([])
  const [loading, setL]      = useState(true)
  const [error,   setError]  = useState('')
  const [scores,  setScores] = useState({})
  const [notes,   setNotes]  = useState({})

  useEffect(() => {
    adminApi.get('/evaluations/pending')
      .then(d => setItems(d.pending))
      .catch(e => setError(e.message))
      .finally(() => setL(false))
  }, [])

  async function submitReview(id, maxScore) {
    const score = parseFloat(scores[id] ?? '')
    if (isNaN(score) || score < 0 || score > maxScore) {
      alert(`Score must be between 0 and ${maxScore}`)
      return
    }
    try {
      await adminApi.post(`/evaluations/${id}/review`, {
        human_score: score,
        human_notes: notes[id] || '',
      })
      setItems(prev => prev.filter(i => i.id !== id))
    } catch (e) {
      alert(e.message)
    }
  }

  function scoreColor(ai, max) {
    const pct = (ai / max) * 100
    return pct >= 80 ? 'text-green-700' :
           pct >= 50 ? 'text-yellow-700' : 'text-red-700'
  }

  return (
    <AdminLayout title="Evaluation Review">
      <p className="text-sm text-gray-500 mb-4">
        {items.length} evaluations pending human review
      </p>
      {error   && <p className="text-red-600 mb-4">{error}</p>}
      {loading && <p className="text-gray-400">Loading...</p>}

      <div className="space-y-4">
        {items.map(item => {
          const q   = item.questions || {}
          const max = item.max_score
          return (
            <div key={item.id} className="card">
              {/* Question */}
              <div className="mb-3">
                <span className="badge-gray text-xs mb-1 block">
                  {max} marks
                </span>
                <p className="font-medium text-sm">{q.question_text}</p>
              </div>

              {/* Student answer */}
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-xs font-semibold text-gray-500 mb-1">
                  STUDENT ANSWER
                </p>
                <p className="text-sm text-gray-700">{item.student_answer}</p>
              </div>

              {/* AI score */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm text-gray-500">AI Score:</span>
                <span className={`font-bold ${scoreColor(item.ai_score, max)}`}>
                  {item.ai_score}/{max}
                </span>
              </div>

              {/* AI feedback */}
              {item.ai_feedback && (
                <details className="mb-3">
                  <summary className="text-xs text-gray-400 cursor-pointer mb-1">
                    View AI feedback
                  </summary>
                  <div className="text-xs bg-gray-50 rounded p-2 space-y-1">
                    {item.ai_feedback.strengths?.map((s, i) => (
                      <p key={i} className="text-green-700">✓ {s}</p>
                    ))}
                    {item.ai_feedback.weaknesses?.map((w, i) => (
                      <p key={i} className="text-red-700">✗ {w}</p>
                    ))}
                  </div>
                </details>
              )}

              {/* Human review form */}
              <div className="border-t border-gray-100 pt-3">
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  YOUR REVIEW
                </p>
                <div className="flex gap-2 items-start">
                  <input
                    type="number"
                    min="0"
                    max={max}
                    step="0.5"
                    placeholder={`Score / ${max}`}
                    className="input w-28"
                    value={scores[item.id] ?? ''}
                    onChange={e => setScores(prev => ({
                      ...prev, [item.id]: e.target.value,
                    }))}
                  />
                  <input
                    type="text"
                    placeholder="Notes (optional)"
                    className="input flex-1"
                    value={notes[item.id] ?? ''}
                    onChange={e => setNotes(prev => ({
                      ...prev, [item.id]: e.target.value,
                    }))}
                  />
                  <button
                    onClick={() => submitReview(item.id, max)}
                    className="btn-success whitespace-nowrap"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          )
        })}
        {!loading && items.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">✅</p>
            <p>All evaluations reviewed.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
