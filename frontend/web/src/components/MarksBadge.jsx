const colors = {
  1:  'bg-gray-100 text-gray-700',
  2:  'bg-blue-100 text-blue-700',
  5:  'bg-purple-100 text-purple-700',
  10: 'bg-orange-100 text-orange-700',
}

export default function MarksBadge({ marks }) {
  return (
    <span className={`badge ${colors[marks] || colors[2]}`}>
      {marks} {marks === 1 ? 'mark' : 'marks'}
    </span>
  )
}
