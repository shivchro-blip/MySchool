import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getTopics } from '../api/syllabus'
import { explainTopic } from '../api/learning'
import Layout from '../components/Layout'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'

export default function LearnPage() {
  const { chapterId }     = useParams()
  const [topics,          setTopics]     = useState([])
  const [selectedTopic,   setTopic]      = useState(null)
  const [question,        setQuestion]   = useState('')
  const [language,        setLanguage]   = useState('en')
  const [result,          setResult]     = useState(null)
  const [loading,         setLoading]    = useState(false)
  const [topicsLoading,   setTLoading]   = useState(true)
  const [error,           setError]      = useState('')

  useEffect(() => {
    getTopics(chapterId)
      .then(setTopics)
      .catch(e => setError(e.message))
      .finally(() => setTLoading(false))
  }, [chapterId])

  async function handleExplain() {
    if (!selectedTopic && !question.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const data = await explainTopic({
        chapterId,
        topicId:  selectedTopic?.id || null,
        question: question.trim(),
        language,
      })
      setResult(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout title="Learn">
      <a href="/" className="text-sm text-gray-500 hover:text-gray-700 mb-4 block">
        ← Back to chapters
      </a>

      {topicsLoading && <Spinner label="Loading topics..." />}

      {topics.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Select a topic</p>
          <div className="flex flex-wrap gap-2">
            {topics.map(t => (
              <button
                key={t.id}
                onClick={() => setTopic(selectedTopic?.id === t.id ? null : t)}
                className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                  selectedTopic?.id === t.id
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-brand-400'
                }`}
              >
                {t.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Or ask a question</p>
        <input
          type="text"
          className="input"
          placeholder="e.g. What is the theme of this lesson?"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleExplain()}
        />
      </div>

      <div className="flex items-center gap-3 mb-5">
        <span className="text-sm text-gray-600">Explain in:</span>
        <div className="flex rounded-lg bg-gray-100 p-1">
          {[['en', 'English'], ['ta', 'Tamil']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setLanguage(val)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                language === val
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleExplain}
        disabled={loading || (!selectedTopic && !question.trim())}
        className="btn-primary w-full mb-6"
      >
        {loading ? <Spinner size="sm" label="" /> : '✨ Explain'}
      </button>

      {error && <ErrorMessage message={error} />}

      {result && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-2">Explanation</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{result.explanation}</p>
          </div>

          {result.key_points?.length > 0 && (
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-2">Key Points for Exam</h3>
              <ul className="space-y-2">
                {result.key_points.map((pt, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-brand-600 font-bold mt-0.5">✓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.exam_tip && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-amber-800 mb-1">💡 Exam Tip</p>
              <p className="text-sm text-amber-700">{result.exam_tip}</p>
            </div>
          )}

          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>Model: {result.model_used}</span>
            {result.cached && (
              <span className="badge bg-gray-100 text-gray-500">Cached</span>
            )}
            <span>{result.source_chunks} content chunks used</span>
          </div>
        </div>
      )}
    </Layout>
  )
}
