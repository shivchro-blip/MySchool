export default function McqQuestionBlock({ block }) {
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
      <p className="text-[11px] text-ink leading-relaxed mt-1">{block.content}</p>
      <ul className="mt-2 space-y-1">
        {(block.options ?? []).map((opt, i) => (
          <li key={i} className="text-[11px] text-ink pl-3">{opt}</li>
        ))}
      </ul>
    </div>
  )
}
