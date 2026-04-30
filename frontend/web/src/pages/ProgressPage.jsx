import { useState, useEffect } from 'react'
import { getProgress } from '../api/evaluation'
import Layout from '../components/Layout'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'

export default function ProgressPage() {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')

  useEffect(() => {
    getProgress()
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Layout title="My Progress">
      {loading && <Spinner label="Loading progress..." />}
      {error   && <ErrorMessage message={error} />}

      {data && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="card text-center">
              <p className="text-3xl font-bold text-brand-600">{data.total_attempts}</p>
              <p className="text-xs text-gray-500 mt-1">Total Attempts</p>
            </div>
            <div className="card text-center">
              <p className="text-3xl font-bold text-brand-600">{data.average_score}%</p>
              <p className="text-xs text-gray-500 mt-1">Average Score</p>
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-gray-700">Overall Score</span>
              <span className="text-gray-500">{data.average_score}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-500 rounded-full transition-all"
                style={{ width: `${data.average_score}%` }}
              />
            </div>
          </div>

          {data.by_chapter?.length > 0 && (
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">By Chapter</h3>
              <div className="space-y-3">
                {data.by_chapter.map((ch, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Chapter {i + 1}</span>
                      <span>
                        {ch.attempts} attempt{ch.attempts !== 1 ? 's' : ''} · {ch.average_score}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          ch.average_score >= 80
                            ? 'bg-green-500'
                            : ch.average_score >= 50
                            ? 'bg-yellow-500'
                            : 'bg-red-400'
                        }`}
                        style={{ width: `${ch.average_score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.total_attempts === 0 && (
            <div className="text-center py-10 text-gray-400">
              <p className="text-4xl mb-3">📝</p>
              <p className="text-sm">No attempts yet.</p>
              <a href="/" className="btn-primary inline-block mt-3 text-sm">
                Start Practising
              </a>
            </div>
          )}
        </div>
      )}
    </Layout>
  )
}
