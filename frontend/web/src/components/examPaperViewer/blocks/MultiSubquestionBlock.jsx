export default function MultiSubquestionBlock({ block }) {
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
      {block.content && (
        <p className="text-[16px] text-ink leading-[1.85] mt-2 whitespace-pre-line">{block.content}</p>
      )}
      <div className="mt-3 pl-4 space-y-3">
        {(block.subQuestions ?? []).map((sq) => (
          <div key={sq.id} className="flex items-start gap-2">
            <span className="text-[13px] font-bold text-brand-teal shrink-0">{sq.label}</span>
            <p className="text-[16px] text-ink leading-[1.85] whitespace-pre-line">{sq.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
