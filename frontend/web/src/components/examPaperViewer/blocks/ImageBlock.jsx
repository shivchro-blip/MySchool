export default function ImageBlock({ block }) {
  return (
    <div className="my-3">
      <div className="border border-dashed border-ink-4/40 rounded bg-ink-4/5 flex flex-col items-center justify-center py-6 px-4 text-center">
        <p className="text-[10px] font-semibold text-ink-4 uppercase tracking-wide">
          [Figure — replace with real image]
        </p>
        {block.altText && (
          <p className="text-[10px] text-ink-2 mt-1">{block.altText}</p>
        )}
      </div>
      {block.caption && (
        <p className="text-[10px] text-ink-2 italic text-center mt-1">{block.caption}</p>
      )}
    </div>
  )
}
