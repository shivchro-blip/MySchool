export default function ParagraphTextBlock({ block }) {
  return (
    <p className="text-[16px] text-ink leading-[1.85] my-3 text-justify whitespace-pre-line">
      {block.content}
    </p>
  )
}
