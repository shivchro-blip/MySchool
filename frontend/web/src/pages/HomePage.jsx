import { useState, useEffect } from 'react'
import { getSubjects, getChapters } from '../api/syllabus'
import Layout from '../components/Layout'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'

export default function HomePage() {
  const [subjects,  setSubjects]  = useState([])
  const [chapters,  setChapters]  = useState([])
  const [selected,  setSelected]  = useState(null)
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState('')

  useEffect(() => {
    getSubjects()
      .then(data => {
        setSubjects(data)
        if (data.length === 1) loadChapters(data[0])
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  async function loadChapters(subject) {
    setSelected(subject)
    setChapters([])
    setLoading(true)
    try {
      const data = await getChapters(subject.id)
      setChapters(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const contentTypeIcon = {
    prose:      '📖',
    poem:       '🎵',
    grammar:    '✏️',
    vocabulary: '🔤',
  }

  return (
    <Layout title="">
      <div className="bg-brand-600 rounded-xl p-5 mb-6 text-white">
        <h2 className="text-lg font-bold">Welcome back! 👋</h2>
        <p className="text-brand-100 text-sm mt-1">What do you want to study today?</p>
      </div>

      {loading && <Spinner label="Loading syllabus..." />}
      {error   && <ErrorMessage message={error} onRetry={() => window.location.reload()} />}

      {subjects.length > 1 && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {subjects.map(s => (
            <button
              key={s.id}
              onClick={() => loadChapters(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap
                          transition-colors ${
                selected?.id === s.id
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              {s.name} {s.class}
            </button>
          ))}
        </div>
      )}

      {chapters.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Chapters
          </h2>
          <div className="space-y-2">
            {chapters.map(ch => (
              <div key={ch.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {contentTypeIcon[ch.content_type] || '📄'}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        Ch {ch.number}. {ch.title}
                      </p>
                      <p className="text-xs text-gray-400 capitalize mt-0.5">
                        {ch.content_type}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`/learn/${ch.id}`}
                      className="btn-secondary text-xs py-1.5 px-3"
                    >
                      Learn
                    </a>
                    <a
                      href={`/practice/${ch.id}`}
                      className="btn-primary text-xs py-1.5 px-3"
                    >
                      Practice
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  )
}
