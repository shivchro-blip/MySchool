export default function NoticeBoxBlock({ block }) {
  return (
    <div className="border border-ink rounded-sm px-5 py-4 my-4 text-center">
      {block.heading && (
        <p className="text-[15px] font-bold text-ink mb-1">{block.heading}</p>
      )}
      {block.subheading && (
        <p className="text-[13px] font-semibold text-ink mb-3">{block.subheading}</p>
      )}
      {block.body && (
        <p className="text-[12px] text-ink text-left my-2">{block.body}</p>
      )}
      {block.address && (
        <p className="text-[11px] text-ink-4 text-left mt-3 whitespace-pre-line">{block.address}</p>
      )}
    </div>
  )
}
