export default function PaperHeaderBlock({ block }) {
  return (
    <div className="text-center py-4 border-b border-ink-4/20 mb-2">
      <p className="text-base font-bold text-ink tracking-wide">{block.content}</p>
      {block.subContent && (
        <p className="text-xs text-ink-2 mt-1">{block.subContent}</p>
      )}
    </div>
  )
}
