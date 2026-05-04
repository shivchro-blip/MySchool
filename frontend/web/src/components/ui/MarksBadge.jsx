const MAP = {
  1:  'bg-gray-100 text-gray-700',
  2:  'bg-blue-50 text-blue-700',
  5:  'bg-brand-50 text-brand-700',
  10: 'bg-purple-50 text-purple-700',
}

export default function MarksBadge({ marks }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${MAP[marks] || MAP[1]}`}>
      {marks} Mark{marks !== 1 ? 's' : ''}
    </span>
  )
}
