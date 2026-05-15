export default function MetadataRowBlock({ block }) {
  return (
    <div className="border-t border-b border-ink-4/20 py-2 my-2">
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
        {(block.items ?? []).map((item, i) => (
          <span key={i} className="text-xs text-ink-2">
            <span className="font-semibold">{item.label}:</span> {item.value}
          </span>
        ))}
      </div>
    </div>
  )
}
