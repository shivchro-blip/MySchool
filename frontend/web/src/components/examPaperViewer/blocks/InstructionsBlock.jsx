export default function InstructionsBlock({ block }) {
  return (
    <p className="text-[14px] italic text-ink-2 pl-[14px] border-l-[3px] border-[#e0e0e0] my-3 leading-[1.8] whitespace-pre-line">
      {block.content}
    </p>
  )
}
