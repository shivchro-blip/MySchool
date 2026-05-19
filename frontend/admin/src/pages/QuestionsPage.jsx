import { useState, useEffect, useRef } from 'react'
import { AdminLayout } from '../components'
import { adminApi } from '../api/client'

export default function QuestionsPage() {
  const [questions, setQ]     = useState([])
  const [loading,   setL]     = useState(true)
  const [filter,    setFilter]= useState('all')
  const [error,     setError] = useState('')

  // ── Import state ────────────────────────────────────────────────────────────
  const [showImport,  setShowImport]  = useState(false)
  const [importSlug,  setImportSlug]  = useState('')
  const [importFile,  setImportFile]  = useState(null)
  const [importing,   setImporting]   = useState(false)
  const [importResult,setImportResult]= useState(null)
  const [importError, setImportError] = useState('')
  const fileRef = useRef(null)

  useEffect(() => { load() }, [])

  async function load() {
    setL(true)
    try {
      const data = await adminApi.get('/questions')
      setQ(data.questions)
    } catch (e) {
      setError(e.message)
    } finally {
      setL(false)
    }
  }

  async function toggleValidate(q) {
    try {
      await adminApi.put(`/questions/${q.id}`, {
        is_validated: !q.is_validated,
      })
      setQ(prev => prev.map(item =>
        item.id === q.id
          ? { ...item, is_validated: !item.is_validated }
          : item
      ))
    } catch (e) {
      alert(e.message)
    }
  }

  async function handleImport() {
    if (!importSlug.trim()) { setImportError('Enter chapter slug.'); return }
    if (!importFile)        { setImportError('Choose an HTML file.'); return }
    setImporting(true)
    setImportError('')
    setImportResult(null)
    try {
      const fd = new FormData()
      fd.append('chapter_slug', importSlug.trim())
      fd.append('file', importFile)
      const data = await adminApi.postForm('/questions/import-html', fd)
      setImportResult(data)
      setImportFile(null)
      if (fileRef.current) fileRef.current.value = ''
      load()
    } catch (e) {
      setImportError(e.message)
    } finally {
      setImporting(false)
    }
  }

  async function deactivate(id) {
    if (!confirm('Deactivate this question?')) return
    try {
      await adminApi.delete(`/questions/${id}`)
      setQ(prev => prev.map(q =>
        q.id === id ? { ...q, is_active: false } : q
      ))
    } catch (e) {
      alert(e.message)
    }
  }

  const filtered = questions.filter(q => {
    if (filter === 'pending')   return !q.is_validated
    if (filter === 'validated') return q.is_validated
    if (filter === 'inactive')  return !q.is_active
    return true
  })

  const MARK_COLORS = {
    1: 'badge-gray', 2: 'badge bg-blue-100 text-blue-800',
    5: 'badge-purple', 10: 'badge bg-orange-100 text-orange-800',
  }

  return (
    <AdminLayout title="Question Management">

      {/* ── Import from HTML ──────────────────────────────────────────────── */}
      <div className="card mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-900 text-sm">Import from HTML</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Upload a TN Board practice HTML file — extracts 2-mark, 3-mark, and 5-mark questions automatically.
            </p>
          </div>
          <button
            onClick={() => { setShowImport(v => !v); setImportError(''); setImportResult(null) }}
            className="text-sm text-admin-600 hover:underline whitespace-nowrap"
          >
            {showImport ? 'Hide' : 'Show'}
          </button>
        </div>

        {showImport && (
          <div className="mt-4 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chapter Slug
              </label>
              <input
                className="input font-mono text-sm"
                placeholder="the-portrait-of-a-lady"
                value={importSlug}
                onChange={e => setImportSlug(e.target.value)}
              />
              <p className="text-xs text-gray-400 mt-1">
                Must match the chapter slug in Supabase (same as the Learn page URL segment).
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Practice HTML File
              </label>
              <input
                ref={fileRef}
                type="file"
                accept=".html"
                className="block w-full text-sm text-gray-700 file:mr-3 file:py-1.5 file:px-3
                           file:rounded file:border-0 file:text-sm file:font-medium
                           file:bg-admin-50 file:text-admin-700 hover:file:bg-admin-100 cursor-pointer"
                onChange={e => setImportFile(e.target.files[0] || null)}
              />
            </div>

            {importError && (
              <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{importError}</p>
            )}
            {importResult && (
              <p className="text-sm text-green-700 bg-green-50 p-2 rounded">
                ✓ {importResult.inserted} questions imported for <strong>{importResult.chapter_slug}</strong>.
                Go to Pending to validate them.
              </p>
            )}

            <button
              onClick={handleImport}
              disabled={importing}
              className="btn-primary"
            >
              {importing ? 'Importing...' : '↑ Import Questions'}
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-2 mb-4">
        {['all', 'pending', 'validated', 'inactive'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`text-sm px-3 py-1.5 rounded-lg border transition-colors
              ${filter === f
                ? 'bg-admin-600 text-white border-admin-600'
                : 'bg-white text-gray-700 border-gray-200'}`}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <span className="ml-auto text-sm text-gray-400 self-center">
          {filtered.length} questions
        </span>
      </div>

      {error   && <p className="text-red-600 mb-4">{error}</p>}
      {loading && <p className="text-gray-400">Loading...</p>}

      <div className="space-y-2">
        {filtered.map(q => (
          <div key={q.id}
            className={`card ${!q.is_active ? 'opacity-50' : ''}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={MARK_COLORS[q.marks] || 'badge-gray'}>
                    {q.marks}m
                  </span>
                  {q.is_validated
                    ? <span className="badge-green">Validated</span>
                    : <span className="badge-yellow">Pending</span>}
                  {!q.is_active && (
                    <span className="badge-red">Inactive</span>
                  )}
                  {q.chapters && (
                    <span className="text-xs text-gray-400">
                      Ch {q.chapters.number}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-800">{q.question_text}</p>
                {q.answer_key && (
                  <details className="mt-2">
                    <summary className="text-xs text-gray-400 cursor-pointer">
                      View answer key
                    </summary>
                    <pre className="text-xs bg-gray-50 p-2 rounded mt-1 overflow-x-auto">
                      {JSON.stringify(q.answer_key, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => toggleValidate(q)}
                  className={q.is_validated ? 'btn-ghost text-xs py-1' : 'btn-success text-xs py-1'}
                >
                  {q.is_validated ? 'Unvalidate' : '✓ Validate'}
                </button>
                {q.is_active && (
                  <button
                    onClick={() => deactivate(q.id)}
                    className="btn-danger text-xs py-1"
                  >
                    Deactivate
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
