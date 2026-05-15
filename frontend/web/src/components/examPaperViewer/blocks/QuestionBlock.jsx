export default function QuestionBlock({ block }) {
  return (
    <div className="my-3">
      <div className="flex justify-between items-start gap-2">
        <p className="text-[11px] font-semibold text-ink-2 uppercase tracking-wide shrink-0">
          {block.questionId?.toUpperCase()}
        </p>
        <span className="text-[10px] text-ink-4 font-medium shrink-0 mt-0.5">
          [{block.marks} {block.marks === 1 ? 'mark' : 'marks'}]
        </span>
      </div>
      <p className="text-[11px] text-ink leading-relaxed mt-1 whitespace-pre-line">
        {block.content}
      </p>
    </div>
  )
}
