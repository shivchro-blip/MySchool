export default function PartHeadingBlock({ block }) {
  return (
    <div className="my-5">
      <div className="border-t border-ink-4/30 mb-3" />
      <p className="text-center text-xs font-bold uppercase tracking-widest text-ink">
        {block.content}
      </p>
      {block.marks != null && (
        <p className="text-center text-[10px] text-ink-2 mt-0.5">
          [{block.marks} marks]
        </p>
      )}
    </div>
  )
}
