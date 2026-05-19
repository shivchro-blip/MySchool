export default function PaperHeaderBlock({ block }) {
  return (
    <div className="text-center py-4 border-b border-[#E8E4DC] mb-3">
      <p className="text-[22px] font-bold text-ink tracking-wide">{block.content}</p>
      {block.subContent && (
        <p className="text-[15px] font-medium text-ink-2 mt-1.5">{block.subContent}</p>
      )}
    </div>
  )
}
