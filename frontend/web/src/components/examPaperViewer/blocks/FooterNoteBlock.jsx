export default function FooterNoteBlock({ block }) {
  return (
    <p className="text-[10px] text-ink-4 italic text-center mt-4 pt-2 border-t border-ink-4/20">
      {block.content}
    </p>
  )
}
