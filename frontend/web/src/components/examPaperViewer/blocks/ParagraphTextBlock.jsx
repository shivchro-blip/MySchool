export default function ParagraphTextBlock({ block }) {
  return (
    <p className="text-[11px] text-ink leading-relaxed my-3 whitespace-pre-line">
      {block.content}
    </p>
  )
}
