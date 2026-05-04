export default function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`
        w-full border border-line rounded-md px-3.5 py-2.5 text-sm
        bg-bg-2 text-ink placeholder:text-ink-4
        focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:border-transparent
        transition-shadow duration-[var(--duration-fast)] resize-y
        ${className}
      `}
      {...props}
    />
  )
}
