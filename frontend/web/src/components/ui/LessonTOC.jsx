export default function LessonTOC({ sections, activeId, onSelect }) {
  return (
    <nav aria-label="Lesson contents">
      <div className="type-eyebrow" style={{ color: 'var(--brand-strong)', marginBottom: 12 }}>
        Contents
      </div>
      {sections.map((s, i) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          className={`type-body-sm ${activeId === s.id
            ? 'text-text-primary font-medium'
            : 'text-text-secondary'}`}
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'left',
            padding: '7px 10px',
            borderRadius: 6,
            background: activeId === s.id ? 'var(--surface-alt)' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            marginBottom: 2,
          }}
        >
          <span style={{ color: 'var(--text-tertiary)', marginRight: 8, fontSize: 12 }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          {s.label}
        </button>
      ))}
    </nav>
  )
}
