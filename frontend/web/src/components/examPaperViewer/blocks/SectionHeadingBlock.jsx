export default function SectionHeadingBlock({ block }) {
  return (
    <p className="text-[15px] font-semibold text-ink text-left mt-4 mb-2">
      {block.content}
    </p>
  )
}
