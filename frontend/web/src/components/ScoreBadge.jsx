export default function ScoreBadge({ awarded, total }) {
  const pct = total > 0 ? (awarded / total) * 100 : 0
  const color =
    pct >= 80 ? 'bg-green-100 text-green-800' :
    pct >= 50 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
  return (
    <span className={`badge ${color} text-sm px-3 py-1`}>
      {awarded}/{total} marks ({Math.round(pct)}%)
    </span>
  )
}
