/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['Geist', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        mono:  ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      transitionDuration: {
        fast: '120ms',
        base: '200ms',
        slow: '300ms',
        ring: '600ms',
      },
      transitionTimingFunction: {
        'soft-out':    'cubic-bezier(0.0, 0.0, 0.2, 1)',
        'soft-in-out': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      colors: {
        /* ── PAPER theme tokens ─────────────────────────────── */
        bg: {
          DEFAULT: 'var(--bg)',
          canvas:  'var(--bg-canvas)',
          surface: 'var(--bg-surface)',
        },
        'bg-2':      'var(--bg-2)',
        'bg-sunk':   'var(--bg-sunk)',
        ink:         'var(--ink)',
        'ink-2':     'var(--ink-2)',
        'ink-3':     'var(--ink-3)',
        'ink-4':     'var(--ink-4)',
        accent: {
          DEFAULT:  'var(--accent)',
          navy:     'var(--accent-navy)',
        },
        'accent-soft': 'var(--accent-soft)',
        'accent-ink':  'var(--accent-ink)',
        good:        'var(--good)',
        'good-soft': 'var(--good-soft)',
        'good-ink':  'var(--good-ink)',
        warn:        'var(--warn)',
        'warn-soft': 'var(--warn-soft)',
        pos:         'var(--pos)',
        'pos-soft':  'var(--pos-soft)',
        danger:      'var(--danger)',
        line:        'var(--line)',
        'line-soft': 'var(--line-soft)',
        highlight:   'var(--highlight)',
        ai:          'var(--ai)',
        'ai-soft':   'var(--ai-soft)',
        brand: {
          teal:              'var(--brand-teal)',
          'teal-soft':       'var(--brand-teal-soft)',
          'teal-soft-hover': 'var(--brand-teal-soft-hover)',
          'teal-hover':      'var(--brand-teal-hover)',
        },
        /* ── design-token foundation (pass 1) ─────────────── */
        border: {
          soft:   'var(--border-soft)',
          strong: 'var(--border-strong)',
        },
        text: {
          primary: 'var(--text-primary)',
          muted:   'var(--text-muted)',
          faint:   'var(--text-faint)',
        },
      },
      borderRadius: {
        'pill':   '100px',
        xs:       '6px',
        sm:       '10px',
        md:       '14px',
        lg:       '20px',
        xl:       '28px',
        card:     '16px',
        button:   '12px',
      },
      boxShadow: {
        card:         '0 0 0 1px rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.05)',
        'card-md':    '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)',
        'card-hover': 'var(--shadow-card-hover)',
      },
      animation: {
        'fade-in':  'fadeIn 0.2s ease',
        'slide-up': 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
