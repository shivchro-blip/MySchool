export default function MultiSubquestionBlock({ block }) {
  return (
    <div className="my-3">
      <div className="flex justify-between items-start gap-2">
        <p className="text-[11px] font-semibold text-ink-2 uppercase tracking-wide shrink-0">
          {block.questionId?.toUpperCase()}
        </p>
        <span className="text-[10px] text-ink-4 font-medium shrink-0 mt-0.5">
          [{block.marks} marks]
        </span>
      </div>
      {block.content && (
        <p className="text-[11px] text-ink leading-relaxed mt-1">{block.content}</p>
      )}
      <div className="mt-2 pl-4 space-y-2">
        {(block.subQuestions ?? []).map((sq) => (
          <div key={sq.id} className="flex justify-between items-start gap-2">
            <p className="text-[11px] text-ink leading-relaxed">
              <span className="font-semibold">{sq.label}</span> {sq.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
