export default function TableBlock({ block }) {
  return (
    <div className="my-3 overflow-x-auto">
      <table className="w-full text-[11px] border border-ink-4/30 border-collapse">
        {(block.headers ?? []).length > 0 && (
          <thead>
            <tr className="bg-ink-4/10">
              {block.headers.map((h, i) => (
                <th key={i} className="border border-ink-4/30 px-2 py-1 text-left font-semibold text-ink">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {(block.rows ?? []).map((row, ri) => (
            <tr key={ri} className={ri % 2 === 1 ? 'bg-ink-4/5' : ''}>
              {row.map((cell, ci) => (
                <td key={ci} className="border border-ink-4/30 px-2 py-1 text-ink">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
