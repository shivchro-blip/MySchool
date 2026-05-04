import { useState } from 'react'
import { AdminLayout } from '../components'
import { adminApi } from '../api/client'

export default function PipelinePage() {
  const [subjectId, setSub]    = useState('')
  const [chapterId, setCh]     = useState('')
  const [jsonPath,  setPath]   = useState('')
  const [loading,   setL]      = useState(false)
  const [result,    setResult] = useState(null)
  const [error,     setError]  = useState('')

  async function trigger() {
    if (!subjectId || !chapterId || !jsonPath) {
      setError('All fields are required.')
      return
    }
    setL(true)
    setError('')
    setResult(null)
    try {
      const data = await adminApi.post('/pipeline/trigger', {
        subject_id: subjectId,
        chapter_id: chapterId,
        json_path:  jsonPath,
      })
      setResult(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setL(false)
    }
  }

  return (
    <AdminLayout title="Content Pipeline">
      <div className="max-w-xl">
        <div className="card mb-6">
          <h2 className="font-semibold text-gray-900 mb-1">
            How the pipeline works
          </h2>
          <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
            <li>Drop your PDF in <code className="bg-gray-100 px-1 rounded">content/raw/</code></li>
            <li>Run <code className="bg-gray-100 px-1 rounded">python scripts/pdf_extract.py</code> to generate JSON</li>
            <li>Get subject and chapter UUIDs from Supabase Table Editor</li>
            <li>Fill the form below and click Trigger Pipeline</li>
            <li>Go to Content page and validate the chunks</li>
          </ol>
        </div>

        <div className="card space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject UUID
            </label>
            <input className="input" placeholder="Paste from Supabase subjects table"
              value={subjectId} onChange={e => setSub(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chapter UUID
            </label>
            <input className="input" placeholder="Paste from Supabase chapters table"
              value={chapterId} onChange={e => setCh(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              JSON File Path
            </label>
            <input className="input font-mono text-sm"
              placeholder="content/structured/english_plus1_ch3.json"
              value={jsonPath} onChange={e => setPath(e.target.value)} />
            <p className="text-xs text-gray-400 mt-1">
              Relative to the project root. Must exist before triggering.
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <button onClick={trigger} disabled={loading} className="btn-primary w-full">
            {loading ? 'Running pipeline...' : '⚙️ Trigger Pipeline'}
          </button>
        </div>

        {result && (
          <div className="card mt-4 bg-green-50 border-green-200">
            <p className="font-semibold text-green-800 mb-2">
              ✅ Pipeline complete
            </p>
            <div className="text-sm text-green-700 space-y-1">
              <p>Chunks embedded: {result.chunks_embedded}</p>
              <p>Chunks inserted into Supabase: {result.chunks_inserted}</p>
              <p>JSON file: {result.json_path}</p>
            </div>
            <p className="text-sm text-green-600 mt-2">
              Go to the Content page to validate the chunks.
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
