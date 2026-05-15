export default function OrQuestionBlock({ block }) {
  return (
    <div className="my-3">
      <div className="flex justify-between items-start gap-2 mb-2">
        <p className="text-[11px] font-semibold text-ink-2 uppercase tracking-wide shrink-0">
          {block.questionId?.toUpperCase()}
        </p>
        <span className="text-[10px] text-ink-4 font-medium shrink-0">
          [{block.marks} marks]
        </span>
      </div>
      <p className="text-[11px] text-ink leading-relaxed whitespace-pre-line">
        {block.optionA?.content}
      </p>
      <div className="flex items-center gap-2 my-3">
        <div className="flex-1 border-t border-ink-4/30" />
        <span className="text-[10px] font-bold text-ink-4 tracking-widest">OR</span>
        <div className="flex-1 border-t border-ink-4/30" />
      </div>
      <p className="text-[11px] text-ink leading-relaxed whitespace-pre-line">
        {block.optionB?.content}
      </p>
    </div>
  )
}
