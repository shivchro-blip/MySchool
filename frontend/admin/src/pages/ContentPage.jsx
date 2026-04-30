import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { adminApi } from '../api/client'

const CHUNK_COLORS = {
  summary:     'badge-green',
  theme:       'badge-purple',
  character:   'badge bg-blue-100 text-blue-800',
  glossary:    'badge-yellow',
  author_info: 'badge-gray',
  exam_tip:    'badge bg-orange-100 text-orange-800',
  key_points:  'badge bg-teal-100 text-teal-800',
  explanation: 'badge-gray',
  example:     'badge bg-pink-100 text-pink-800',
}

export default function ContentPage() {
  const [chunks,   setChunks]  = useState([])
  const [loading,  setLoading] = useState(true)
  const [error,    setError]   = useState('')
  const [editing,  setEditing] = useState(null)
  const [editText, setEditText]= useState('')

  useEffect(() => { loadPending() }, [])

  async function loadPending() {
    setLoading(true)
    try {
      const data = await adminApi.get('/content/pending')
      setChunks(data.pending)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function validate(id) {
    try {
      await adminApi.post(`/content/validate/${id}`)
      setChunks(prev => prev.filter(c => c.id !== id))
    } catch (e) {
      alert(e.message)
    }
  }

  async function deleteChunk(id) {
    if (!confirm('Delete this chunk permanently?')) return
    try {
      await adminApi.delete(`/content/${id}`)
      setChunks(prev => prev.filter(c => c.id !== id))
    } catch (e) {
      alert(e.message)
    }
  }

  async function saveEdit(id) {
    try {
      await adminApi.put(`/content/${id}`, { content: editText })
      setChunks(prev => prev.map(c =>
        c.id === id ? { ...c, content: editText } : c
      ))
      setEditing(null)
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <AdminLayout title="Content Validation">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {chunks.length} chunks pending validation
        </p>
        <button onClick={loadPending} className="btn-ghost text-sm">
          Refresh
        </button>
      </div>

      {error   && <p className="text-red-600 mb-4">{error}</p>}
      {loading && <p className="text-gray-400">Loading...</p>}

      <div className="space-y-3">
        {chunks.map(chunk => (
          <div key={chunk.id} className="card">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={CHUNK_COLORS[chunk.chunk_type] || 'badge-gray'}>
                  {chunk.chunk_type}
                </span>
                {chunk.chapters && (
                  <span className="text-xs text-gray-500">
                    Ch {chunk.chapters.number}. {chunk.chapters.title}
                  </span>
                )}
                {chunk.section_header && (
                  <span className="text-xs text-gray-400 italic">
                    — {chunk.section_header}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {chunk.language === 'ta' ? '🇮🇳 Tamil' : '🇬🇧 English'}
              </span>
            </div>

            {/* Content — editable */}
            {editing === chunk.id ? (
              <div className="mb-3">
                <textarea
                  className="input min-h-32 resize-y font-mono text-xs"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => saveEdit(chunk.id)}
                    className="btn-success text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="btn-ghost text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed mb-3 whitespace-pre-wrap">
                {chunk.content}
              </p>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => validate(chunk.id)}
                className="btn-success text-xs py-1.5"
              >
                ✓ Validate
              </button>
              <button
                onClick={() => {
                  setEditing(chunk.id)
                  setEditText(chunk.content)
                }}
                className="btn-ghost text-xs py-1.5"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => deleteChunk(chunk.id)}
                className="btn-danger text-xs py-1.5"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
        {!loading && chunks.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">✅</p>
            <p>All content is validated.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
