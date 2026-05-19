export default function PartHeadingBlock({ block }) {
  return (
    <div className="my-6">
      <div className="border-t border-ink-4/30 mb-3" />
      <p className="text-center text-[15px] font-bold uppercase tracking-[0.1em] text-ink">
        {block.content}
      </p>
      {block.marks != null && (
        <p className="text-center text-[13px] text-ink-2 mt-0.5">
          [{block.marks} marks]
        </p>
      )}
      <div className="border-b border-ink-4/30 mt-3" />
    </div>
  )
}
