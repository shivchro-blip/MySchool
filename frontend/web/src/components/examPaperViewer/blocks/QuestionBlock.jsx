export default function QuestionBlock({ block }) {
  if (block.marks === 0) {
    return (
      <p className="text-[14px] italic text-ink-2 my-3 leading-[1.8] whitespace-pre-line">
        {block.content}
      </p>
    )
  }
  return (
    <div className="my-4">
      <div className="flex justify-between items-start gap-3">
        <span className="text-[13px] font-bold text-brand-teal shrink-0">
          {block.questionId?.toUpperCase()}
        </span>
        <span className="text-[11px] bg-[#F1F5F9] text-ink-2 px-2 py-0.5 rounded-full shrink-0 mt-0.5 whitespace-nowrap">
          {block.marks} {block.marks === 1 ? 'mark' : 'marks'}
        </span>
      </div>
      <p className="text-[16px] text-ink leading-[1.85] mt-2 whitespace-pre-line">
        {block.content}
      </p>
    </div>
  )
}
