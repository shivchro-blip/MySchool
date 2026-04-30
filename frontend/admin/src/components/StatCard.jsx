export default function StatCard({ label, value, sub, color = 'purple' }) {
  const colors = {
    purple: 'text-admin-600',
    green:  'text-green-600',
    yellow: 'text-yellow-600',
    red:    'text-red-600',
    blue:   'text-blue-600',
  }
  return (
    <div className="card text-center">
      <p className={`text-3xl font-bold ${colors[color]}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  )
}
