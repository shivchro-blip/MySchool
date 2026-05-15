export default function OrQuestionBlock({ block }) {
  return (
    <div className="my-4">
      <div className="flex justify-between items-start gap-3 mb-3">
        <span className="text-[13px] font-bold text-brand-teal shrink-0">
          {block.questionId?.toUpperCase()}
        </span>
        <span className="text-[11px] bg-[#F1F5F9] text-ink-2 px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
          {block.marks} {block.marks === 1 ? 'mark' : 'marks'}
        </span>
      </div>
      <p className="text-[16px] text-ink leading-[1.85] whitespace-pre-line">
        {block.optionA?.content}
      </p>
      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 border-t border-ink-4/30" />
        <span className="text-[11px] font-bold text-ink-4 tracking-widest">OR</span>
        <div className="flex-1 border-t border-ink-4/30" />
      </div>
      <p className="text-[16px] text-ink leading-[1.85] whitespace-pre-line">
        {block.optionB?.content}
      </p>
    </div>
  )
}
