export default function Input({ className = '', ...props }) {
  return (
    <input
      className={`
        w-full border border-line rounded-md px-3.5 py-2.5 text-sm
        bg-surface-alt text-text-primary placeholder:text-text-tertiary
        focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:border-transparent
        transition-shadow duration-[var(--duration-fast)]
        ${className}
      `}
      {...props}
    />
  )
}
