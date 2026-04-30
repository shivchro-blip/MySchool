import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import StatCard    from '../components/StatCard'
import { adminApi } from '../api/client'

export default function DashboardPage() {
  const [stats,   setStats]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')

  useEffect(() => {
    adminApi.get('/stats')
      .then(setStats)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <AdminLayout title="Dashboard">
      <p className="text-gray-400">Loading stats...</p>
    </AdminLayout>
  )

  if (error) return (
    <AdminLayout title="Dashboard">
      <p className="text-red-600">{error}</p>
    </AdminLayout>
  )

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Users"    value={stats.users.total}
                  color="purple" />
        <StatCard label="Content Chunks" value={stats.content.total_chunks}
                  sub={`${stats.content.pending_chunks} pending`}
                  color="yellow" />
        <StatCard label="Questions"      value={stats.questions.total}
                  sub={`${stats.questions.pending} pending`}
                  color="blue" />
        <StatCard label="Avg Score"
                  value={`${stats.evaluations.average_score_pct}%`}
                  sub={`${stats.evaluations.total} attempts`}
                  color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Cache stats */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-3">Cache Performance</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Cache Hit Rate</span>
              <span className="font-medium text-green-700">
                {stats.cache.cache_hit_rate}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total AI Calls</span>
              <span className="font-medium">{stats.ai_calls.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cached Calls</span>
              <span className="font-medium">{stats.cache.cached_calls}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cache Entries</span>
              <span className="font-medium">{stats.cache.total_entries}</span>
            </div>
          </div>
        </div>

        {/* Calls by model */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-3">AI Calls by Model</h2>
          <div className="space-y-2 text-sm">
            {Object.entries(stats.ai_calls.by_model).map(([model, count]) => (
              <div key={model} className="flex justify-between">
                <span className="text-gray-600 font-mono text-xs">{model}</span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending actions */}
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-3">Pending Actions</h2>
          <div className="space-y-2">
            <a href="/content"
              className="flex items-center justify-between p-2 rounded-lg
                         hover:bg-yellow-50 transition-colors">
              <span className="text-sm text-gray-700">
                Content chunks to validate
              </span>
              <span className="badge-yellow">
                {stats.content.pending_chunks}
              </span>
            </a>
            <a href="/questions"
              className="flex items-center justify-between p-2 rounded-lg
                         hover:bg-blue-50 transition-colors">
              <span className="text-sm text-gray-700">
                Questions to validate
              </span>
              <span className="badge bg-blue-100 text-blue-800">
                {stats.questions.pending}
              </span>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
