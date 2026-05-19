const OPTION_LABELS = ['A', 'B', 'C', 'D']

export default function McqQuestionBlock({ block }) {
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
      <p className="text-[16px] text-ink leading-[1.85] mt-2">{block.content}</p>
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
        {(block.options ?? []).map((opt, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="w-7 h-7 rounded-full bg-[#F1F5F9] text-brand-teal font-semibold text-[13px] flex items-center justify-center shrink-0">
              {OPTION_LABELS[i] ?? i + 1}
            </span>
            <span className="text-[15px] text-ink leading-[1.8] pt-0.5">{opt}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
