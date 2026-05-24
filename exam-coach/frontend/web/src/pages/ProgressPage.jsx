import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { getProgress } from '../api/evaluation'
import { Card, Button, PageHeader } from '../components/ui'

function scoreColor(pct) {
  if (pct >= 80) return { bar: 'bg-good',    text: 'text-good'    }
  if (pct >= 50) return { bar: 'bg-warn',    text: 'text-warn'    }
  return               { bar: 'bg-danger',   text: 'text-danger'  }
}

export default function ProgressPage() {
  const navigate                   = useNavigate()
  const [data,    setData]         = useState(null)
  const [loading, setLoading]      = useState(true)
  const [error,   setError]        = useState('')

  useEffect(() => {
    getProgress()
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* Back button */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full flex items-center justify-center
                     hover:bg-surface-alt text-text-secondary transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
      </div>
      <PageHeader title="My Progress" />

      {/* Loading */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-surface-alt rounded-2xl animate-pulse" />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <Card padding="md">
          <p className="text-sm text-danger">{error}</p>
        </Card>
      )}

      {data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3">
            <Card padding="md" className="text-center py-5">
              <p className="text-3xl font-bold text-brand-teal">{data.total_attempts}</p>
              <p className="text-xs text-text-secondary mt-1.5 font-medium">Total Attempts</p>
            </Card>
            <Card padding="md" className="text-center py-5">
              <p className={`text-3xl font-bold ${scoreColor(data.average_score).text}`}>
                {data.average_score}%
              </p>
              <p className="text-xs text-text-secondary mt-1.5 font-medium">Avg Score</p>
            </Card>
          </div>

          {/* Overall progress bar */}
          {data.total_attempts > 0 && (
            <Card padding="md">
              <div className="flex justify-between text-sm mb-2.5">
                <span className="font-medium text-text-secondary">Overall Score</span>
                <span className={`font-semibold ${scoreColor(data.average_score).text}`}>
                  {data.average_score}%
                </span>
              </div>
              <div className="h-2.5 bg-surface-alt rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${data.average_score}%` }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className={`h-full rounded-full ${scoreColor(data.average_score).bar}`}
                />
              </div>
            </Card>
          )}

          {/* By chapter */}
          {data.by_chapter?.length > 0 && (
            <Card padding="md">
              <p className="text-xs font-bold text-text-tertiary uppercase tracking-wide mb-4">
                By Chapter
              </p>
              <div className="space-y-4">
                {data.by_chapter.map((ch, i) => {
                  const colors = scoreColor(ch.average_score)
                  return (
                    <div key={i}>
                      <div className="flex justify-between text-xs text-text-secondary mb-1.5">
                        <span className="font-medium text-text-secondary">Chapter {i + 1}</span>
                        <span>
                          {ch.attempts} attempt{ch.attempts !== 1 ? 's' : ''} ·{' '}
                          <span className={`${colors.text} font-semibold`}>
                            {ch.average_score}%
                          </span>
                        </span>
                      </div>
                      <div className="h-2 bg-surface-alt rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${ch.average_score}%` }}
                          transition={{ duration: 0.5, delay: i * 0.07 }}
                          className={`h-full rounded-full ${colors.bar}`}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          )}

          {/* Empty state */}
          {data.total_attempts === 0 && (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">📝</p>
              <p className="text-base font-bold text-text-primary mb-1">No attempts yet</p>
              <p className="text-sm text-text-secondary mb-6">
                Practice questions to track your progress
              </p>
              <Button onClick={() => navigate('/plus1')}>
                Start Practising
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
