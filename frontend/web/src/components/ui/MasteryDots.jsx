export default function MasteryDots({ level = 0 }) {
  return (
    <div className="flex items-center gap-[3px]" aria-label={`Mastery level ${level} of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${i < level ? 'bg-good' : 'bg-line'}`}
        />
      ))}
    </div>
  )
}
