export default function FooterNoteBlock({ block }) {
  return (
    <p className="text-[13px] text-ink-4 italic text-center mt-10 pt-4 border-t border-[#E8E4DC]">
      {block.content}
    </p>
  )
}
