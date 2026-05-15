export default function MetadataRowBlock({ block }) {
  const items = block.items ?? [
    ...(block.duration     ? [{ label: 'Time',          value: block.duration }]             : []),
    ...(block.maximumMarks ? [{ label: 'Maximum Marks', value: String(block.maximumMarks) }] : []),
    ...(block.totalPages   ? [{ label: 'Total Pages',   value: String(block.totalPages) }]   : []),
  ]
  return (
    <div className="border-t border-b border-[#E8E4DC] py-2.5 my-3">
      <div className="flex flex-wrap justify-center items-center text-[14px] text-ink-2">
        {items.flatMap((item, i) => [
          <span key={item.label}><span className="font-semibold">{item.label}:</span> {item.value}</span>,
          i < items.length - 1 ? <span key={`s${i}`} className="mx-3 text-ink-4 select-none">•</span> : null,
        ])}
      </div>
    </div>
  )
}
