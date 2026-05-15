export default function InstructionsBlock({ block }) {
  return (
    <p className="text-xs italic text-ink-2 pl-3 border-l-2 border-ink-4/30 my-3 whitespace-pre-line">
      {block.content}
    </p>
  )
}
