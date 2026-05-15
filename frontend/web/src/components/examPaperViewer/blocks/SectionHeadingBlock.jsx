export default function SectionHeadingBlock({ block }) {
  return (
    <p className="text-xs font-bold text-ink mt-4 mb-2 border-b border-ink-4/20 pb-1">
      {block.content}
    </p>
  )
}
