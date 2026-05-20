# AI Exam Coach — Navigation System
> Open Claude Code inside C:\MyProjects\exam-coach and paste this entire file.

---

## Context

Read CLAUDE.md before doing anything.
This phase builds the complete hierarchical navigation system.
It replaces the flat chapter list from the UI design phase with
a real syllabus-aware navigation structure.

This is NOT a generic app — every route reflects actual Tamil Nadu
State Board syllabus structure.

Hierarchy:
  Login → Year → Subject → Category → Lesson → Section

URL pattern:
  /plus1/english/prose/portrait-of-a-lady/practice

Design: same design system from UI phase (Plus Jakarta Sans, tokens, components).
Do NOT install new packages. Use what is already installed.
Do NOT touch backend code.

---

## Step 1: Create the mock syllabus data

---

### FILE: frontend/web/src/data/syllabus.js

```js
/**
 * Mock syllabus data — Tamil Nadu State Board
 * Structure mirrors the real TNBSE +1 and +2 English syllabus.
 *
 * This file is the single source of truth for navigation.
 * When the backend is ready, replace this with API calls
 * from src/api/syllabus.js — the component interfaces stay the same.
 *
 * Slug rules:
 *   - lowercase
 *   - kebab-case
 *   - lesson name (not unit1 / chapter1)
 */

export const SYLLABUS = {
  plus1: {
    label: '+1',
    fullLabel: 'Class XI — Higher Secondary First Year',
    subjects: {
      english: {
        label: 'English',
        slug: 'english',
        categories: {
          prose: {
            label: 'Prose',
            slug: 'prose',
            icon: '📖',
            lessons: [
              { slug: 'a-dilemma',               title: 'A Dilemma'                        },
              { slug: 'the-last-lesson',          title: 'The Last Lesson'                  },
              { slug: 'the-portrait-of-a-lady',   title: 'The Portrait of a Lady'           },
              { slug: 'the-night-the-ghost-got-in',title: 'The Night the Ghost Got In'     },
              { slug: 'the-accidental-tourist',   title: 'The Accidental Tourist'           },
            ],
          },
          poetry: {
            label: 'Poetry',
            slug: 'poetry',
            icon: '🎵',
            lessons: [
              { slug: 'a-prayer-to-the-teacher',         title: 'A Prayer to the Teacher'          },
              { slug: 'confessions-of-a-born-spectator', title: 'Confessions of a Born Spectator'  },
              { slug: 'i-am-every-woman',                title: 'I Am Every Woman'                 },
            ],
          },
          supplementary: {
            label: 'Supplementary',
            slug: 'supplementary',
            icon: '📑',
            lessons: [
              { slug: 'the-model-millionaire', title: 'The Model Millionaire' },
              { slug: 'the-story-of-an-hour',  title: 'The Story of an Hour' },
            ],
          },
        },
      },
      maths: {
        label: 'Mathematics',
        slug: 'maths',
        categories: {
          algebra: {
            label: 'Algebra',
            slug: 'algebra',
            icon: '🔢',
            lessons: [
              { slug: 'sets-and-functions',       title: 'Sets and Functions'        },
              { slug: 'basic-algebra',            title: 'Basic Algebra'             },
              { slug: 'trigonometry',             title: 'Trigonometry'              },
            ],
          },
          calculus: {
            label: 'Calculus',
            slug: 'calculus',
            icon: '📐',
            lessons: [
              { slug: 'differential-calculus',    title: 'Differential Calculus'     },
              { slug: 'integral-calculus',        title: 'Integral Calculus'         },
            ],
          },
        },
      },
      science: {
        label: 'Science',
        slug: 'science',
        categories: {
          physics: {
            label: 'Physics',
            slug: 'physics',
            icon: '⚡',
            lessons: [
              { slug: 'nature-of-physical-world', title: 'Nature of Physical World'  },
              { slug: 'kinematics',               title: 'Kinematics'                },
              { slug: 'laws-of-motion',           title: 'Laws of Motion'            },
            ],
          },
          chemistry: {
            label: 'Chemistry',
            slug: 'chemistry',
            icon: '🧪',
            lessons: [
              { slug: 'basic-concepts',           title: 'Basic Concepts of Chemistry'},
              { slug: 'quantum-mechanical-model', title: 'Quantum Mechanical Model'  },
            ],
          },
        },
      },
    },
  },

  plus2: {
    label: '+2',
    fullLabel: 'Class XII — Higher Secondary Second Year',
    subjects: {
      english: {
        label: 'English',
        slug: 'english',
        categories: {
          prose: {
            label: 'Prose',
            slug: 'prose',
            icon: '📖',
            lessons: [
              { slug: 'the-tiger-king',        title: 'The Tiger King'           },
              { slug: 'journey-to-the-end-of-earth', title: 'Journey to the End of the Earth' },
              { slug: 'the-enemy',             title: 'The Enemy'                },
              { slug: 'on-the-face-of-it',     title: 'On the Face of It'        },
              { slug: 'evans-tries-an-o-level', title: "Evans Tries an O-Level"  },
            ],
          },
          poetry: {
            label: 'Poetry',
            slug: 'poetry',
            icon: '🎵',
            lessons: [
              { slug: 'my-mother-at-sixty-six', title: 'My Mother at Sixty-Six'  },
              { slug: 'keeping-quiet',          title: 'Keeping Quiet'           },
              { slug: 'a-thing-of-beauty',      title: 'A Thing of Beauty'       },
            ],
          },
          supplementary: {
            label: 'Supplementary',
            slug: 'supplementary',
            icon: '📑',
            lessons: [
              { slug: 'the-third-level',  title: 'The Third Level'  },
              { slug: 'the-tiger-king-supplementary', title: 'The Tiger King (Supplementary)' },
            ],
          },
        },
      },
      maths: {
        label: 'Mathematics',
        slug: 'maths',
        categories: {
          algebra: {
            label: 'Algebra',
            slug: 'algebra',
            icon: '🔢',
            lessons: [
              { slug: 'applications-of-matrices', title: 'Applications of Matrices' },
              { slug: 'complex-numbers',          title: 'Complex Numbers'          },
            ],
          },
        },
      },
    },
  },
}

// ── Helper functions ──────────────────────────────────────────────────────────

export function getYear(year) {
  return SYLLABUS[year] || null
}

export function getSubject(year, subject) {
  return SYLLABUS[year]?.subjects?.[subject] || null
}

export function getCategory(year, subject, category) {
  return SYLLABUS[year]?.subjects?.[subject]?.categories?.[category] || null
}

export function getLesson(year, subject, category, lessonSlug) {
  const cat = getCategory(year, subject, category)
  return cat?.lessons?.find(l => l.slug === lessonSlug) || null
}

export function getSubjectList(year) {
  const y = getYear(year)
  if (!y) return []
  return Object.entries(y.subjects).map(([slug, data]) => ({ slug, ...data }))
}

export function getCategoryList(year, subject) {
  const s = getSubject(year, subject)
  if (!s) return []
  return Object.entries(s.categories).map(([slug, data]) => ({ slug, ...data }))
}

export function getLessonList(year, subject, category) {
  const cat = getCategory(year, subject, category)
  return cat?.lessons || []
}

// Lesson sections — fixed for all lessons
export const LESSON_SECTIONS = [
  { slug: 'about-author',   label: 'About Author',   icon: '👤', description: 'Learn about the writer'         },
  { slug: 'text',           label: 'Text',            icon: '📄', description: 'Read the full lesson'           },
  { slug: 'glossary',       label: 'Glossary',        icon: '🔤', description: 'Key words and meanings'         },
  { slug: 'comprehension',  label: 'Comprehension',   icon: '💡', description: 'Check your understanding'       },
  { slug: 'practice',       label: 'Practice',        icon: '✍️', description: 'Answer exam questions'          },
  { slug: 'ask-ai',         label: 'Ask AI',          icon: '🤖', description: 'Get instant explanations'       },
]

export function getSection(sectionSlug) {
  return LESSON_SECTIONS.find(s => s.slug === sectionSlug) || null
}
```

---

## Step 2: Create navigation helpers

---

### FILE: frontend/web/src/lib/nav.js

```js
/**
 * Navigation helpers
 * Builds URLs and breadcrumbs from slug parameters.
 * Keeps URL logic in one place — not scattered across components.
 */

export function buildPath(year, subject, category, lesson, section) {
  const parts = [year, subject, category, lesson, section].filter(Boolean)
  return '/' + parts.join('/')
}

export function buildBreadcrumbs(year, subject, category, lesson, section, syllabus) {
  const crumbs = []

  if (year) {
    crumbs.push({
      label: syllabus[year]?.label || year,
      to:    `/${year}`,
    })
  }
  if (subject) {
    const s = syllabus[year]?.subjects?.[subject]
    crumbs.push({
      label: s?.label || subject,
      to:    `/${year}/${subject}`,
    })
  }
  if (category) {
    const c = syllabus[year]?.subjects?.[subject]?.categories?.[category]
    crumbs.push({
      label: c?.label || category,
      to:    `/${year}/${subject}/${category}`,
    })
  }
  if (lesson) {
    const lessons = syllabus[year]?.subjects?.[subject]?.categories?.[category]?.lessons || []
    const l = lessons.find(x => x.slug === lesson)
    crumbs.push({
      label: l?.title || lesson,
      to:    `/${year}/${subject}/${category}/${lesson}`,
    })
  }
  if (section) {
    crumbs.push({
      label: section.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      to:    null,
    })
  }

  return crumbs
}
```

---

## Step 3: Create the sidebar component

---

### FILE: frontend/web/src/components/nav/Sidebar.jsx

```jsx
import { useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { ChevronRight, ChevronDown, X, Menu } from 'lucide-react'
import { SYLLABUS, getSubjectList, getCategoryList } from '../../data/syllabus'

// ── Year pill ─────────────────────────────────────────────────────────────────
function YearPill({ year, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1.5 rounded-full text-sm font-semibold
        transition-all duration-150 border
        ${active
          ? 'bg-blue-600 text-white border-blue-600'
          : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}
      `}
    >
      {year === 'plus1' ? '+1' : '+2'}
    </button>
  )
}

// ── Subject row ───────────────────────────────────────────────────────────────
function SubjectRow({ subject, isOpen, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between
        px-3 py-2.5 rounded-xl text-sm font-semibold
        transition-all duration-150
        ${isActive
          ? 'bg-blue-50 text-blue-700'
          : 'text-gray-700 hover:bg-gray-100'}
      `}
    >
      <span>{subject.label}</span>
      {isOpen
        ? <ChevronDown size={15} className="text-gray-400" />
        : <ChevronRight size={15} className="text-gray-400" />}
    </button>
  )
}

// ── Category row ──────────────────────────────────────────────────────────────
function CategoryRow({ category, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-2.5
        pl-6 pr-3 py-2 rounded-lg text-sm
        transition-all duration-150
        ${isActive
          ? 'bg-blue-100 text-blue-700 font-semibold'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'}
      `}
    >
      <span>{category.icon}</span>
      <span>{category.label}</span>
    </button>
  )
}

// ── Main sidebar ──────────────────────────────────────────────────────────────
export default function Sidebar({ mobile = false, onClose }) {
  const navigate  = useNavigate()
  const { year = 'plus1', subject, category } = useParams()
  const [openSubject, setOpenSubject] = useState(subject || null)

  const subjects   = getSubjectList(year)

  function handleYear(y) {
    navigate(`/${y}`)
    if (mobile && onClose) onClose()
  }

  function handleSubject(y, s) {
    setOpenSubject(openSubject === s ? null : s)
    navigate(`/${y}/${s}`)
  }

  function handleCategory(y, s, c) {
    navigate(`/${y}/${s}/${c}`)
    if (mobile && onClose) onClose()
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <div>
          <p className="text-sm font-bold text-gray-900">Tamil Nadu Board</p>
          <p className="text-xs text-gray-400 mt-0.5">State Syllabus</p>
        </div>
        {mobile && (
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center
                       rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Year toggle */}
      <div className="flex gap-2 px-4 py-3 border-b border-gray-100">
        <YearPill year="plus1" active={year === 'plus1'} onClick={() => handleYear('plus1')} />
        <YearPill year="plus2" active={year === 'plus2'} onClick={() => handleYear('plus2')} />
      </div>

      {/* Subject + Category tree */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1 scrollbar-none">
        {subjects.map(s => {
          const isSubjectOpen   = openSubject === s.slug
          const isSubjectActive = subject === s.slug
          const categories      = getCategoryList(year, s.slug)

          return (
            <div key={s.slug}>
              <SubjectRow
                subject={s}
                isOpen={isSubjectOpen}
                isActive={isSubjectActive}
                onClick={() => handleSubject(year, s.slug)}
              />

              {/* Category drill-down */}
              {isSubjectOpen && (
                <div className="mt-1 mb-2 space-y-0.5">
                  {categories.map(c => (
                    <CategoryRow
                      key={c.slug}
                      category={c}
                      isActive={subject === s.slug && category === c.slug}
                      onClick={() => handleCategory(year, s.slug, c.slug)}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          TNBSE · {year === 'plus1' ? '+1' : '+2'} Syllabus
        </p>
      </div>
    </div>
  )
}
```

---

### FILE: frontend/web/src/components/nav/MobileSidebar.jsx

```jsx
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './Sidebar'

export default function MobileSidebar({ open, onClose }) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 bottom-0 z-40 w-72
                       bg-white shadow-float overflow-hidden"
          >
            <Sidebar mobile onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

---

### FILE: frontend/web/src/components/nav/Breadcrumb.jsx

```jsx
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumb({ crumbs = [] }) {
  if (crumbs.length <= 1) return null

  return (
    <nav className="flex items-center gap-1 flex-wrap mb-5">
      {crumbs.map((crumb, i) => (
        <div key={i} className="flex items-center gap-1">
          {i > 0 && (
            <ChevronRight size={13} className="text-gray-300 shrink-0" />
          )}
          {crumb.to ? (
            <Link
              to={crumb.to}
              className="text-xs font-medium text-blue-600 hover:text-blue-800
                         transition-colors truncate max-w-[120px]"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="text-xs font-medium text-gray-500 truncate max-w-[120px]">
              {crumb.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}
```

---

### FILE: frontend/web/src/components/nav/index.js

```js
export { default as Sidebar }       from './Sidebar'
export { default as MobileSidebar } from './MobileSidebar'
export { default as Breadcrumb }    from './Breadcrumb'
```

---

## Step 4: Create the 2-column app shell

---

### FILE: frontend/web/src/components/layout/AppShell.jsx

```jsx
/**
 * AppShell — 2-column layout for all syllabus pages.
 *
 * Desktop: fixed sidebar (256px) + scrollable main content
 * Mobile:  hidden sidebar (drawer) + full-width content + hamburger button
 */

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Sidebar, MobileSidebar } from '../nav'

export default function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-dvh bg-gray-50 flex">

      {/* ── Desktop sidebar (fixed) ── */}
      <aside className="
        hidden lg:flex lg:flex-col
        w-64 shrink-0
        bg-white border-r border-gray-100
        sticky top-0 h-screen
        overflow-hidden
      ">
        <Sidebar />
      </aside>

      {/* ── Mobile sidebar (drawer) ── */}
      <MobileSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Mobile top bar */}
        <header className="
          lg:hidden
          sticky top-0 z-20
          bg-white/90 backdrop-blur-md
          border-b border-gray-100
          h-14 flex items-center px-4 gap-3
        ">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 flex items-center justify-center
                       rounded-full hover:bg-gray-100 text-gray-600
                       transition-colors"
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
          <p className="text-sm font-semibold text-gray-900 truncate">
            AI Exam Coach
          </p>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-6 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
```

---

Update the layout index to export AppShell:

### FILE: frontend/web/src/components/layout/index.js

```js
export { default as TopBar }    from './TopBar'
export { default as BottomNav } from './BottomNav'
export { default as PageShell } from './PageShell'
export { default as AppShell }  from './AppShell'
```

---

## Step 5: Create all syllabus pages

---

### FILE: frontend/web/src/pages/syllabus/YearPage.jsx

```jsx
/**
 * /plus1 or /plus2
 * Shows all subjects for the selected year as cards.
 */

import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getYear, getSubjectList } from '../../data/syllabus'
import { buildBreadcrumbs } from '../../lib/nav'
import { SYLLABUS } from '../../data/syllabus'
import { Card, Badge } from '../../components/ui'
import { Breadcrumb } from '../../components/nav'
import { ChevronRight } from 'lucide-react'

export default function YearPage() {
  const { year }   = useParams()
  const navigate   = useNavigate()
  const yearData   = getYear(year)
  const subjects   = getSubjectList(year)
  const crumbs     = buildBreadcrumbs(year, null, null, null, null, SYLLABUS)

  if (!yearData) return <NotFound message={`Year "${year}" not found`} />

  return (
    <div>
      <Breadcrumb crumbs={crumbs} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {yearData.fullLabel}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Select a subject to begin
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {subjects.map((s, i) => (
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card
              interactive
              padding="md"
              onClick={() => navigate(`/${year}/${s.slug}`)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{s.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {Object.keys(s.categories).length} categories
                  </p>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
```

---

### FILE: frontend/web/src/pages/syllabus/SubjectPage.jsx

```jsx
/**
 * /plus1/english
 * Shows all categories (Prose, Poetry, Supplementary) as cards.
 */

import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getSubject, getCategoryList, SYLLABUS } from '../../data/syllabus'
import { buildBreadcrumbs } from '../../lib/nav'
import { Card } from '../../components/ui'
import { Breadcrumb } from '../../components/nav'
import { ChevronRight } from 'lucide-react'

export default function SubjectPage() {
  const { year, subject } = useParams()
  const navigate          = useNavigate()
  const subjectData       = getSubject(year, subject)
  const categories        = getCategoryList(year, subject)
  const crumbs            = buildBreadcrumbs(year, subject, null, null, null, SYLLABUS)

  if (!subjectData) return <NotFound message={`Subject "${subject}" not found`} />

  return (
    <div>
      <Breadcrumb crumbs={crumbs} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {subjectData.label}
        </h1>
        <p className="text-sm text-gray-500 mt-1">Choose a category</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {categories.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card
              interactive
              padding="lg"
              onClick={() => navigate(`/${year}/${subject}/${c.slug}`)}
            >
              <div className="text-3xl mb-3">{c.icon}</div>
              <p className="font-semibold text-gray-900">{c.label}</p>
              <p className="text-xs text-gray-400 mt-1">
                {c.lessons.length} lesson{c.lessons.length !== 1 ? 's' : ''}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
```

---

### FILE: frontend/web/src/pages/syllabus/LessonListPage.jsx

```jsx
/**
 * /plus1/english/prose
 * Shows list of lessons in the category.
 */

import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  getCategory, getLessonList, SYLLABUS, getSubject,
} from '../../data/syllabus'
import { buildBreadcrumbs } from '../../lib/nav'
import { Card, Badge } from '../../components/ui'
import { Breadcrumb } from '../../components/nav'
import { BookOpen, ChevronRight } from 'lucide-react'

export default function LessonListPage() {
  const { year, subject, category } = useParams()
  const navigate                    = useNavigate()
  const categoryData                = getCategory(year, subject, category)
  const lessons                     = getLessonList(year, subject, category)
  const subjectData                 = getSubject(year, subject)
  const crumbs                      = buildBreadcrumbs(year, subject, category, null, null, SYLLABUS)

  if (!categoryData) return <NotFound message={`Category "${category}" not found`} />

  return (
    <div>
      <Breadcrumb crumbs={crumbs} />

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center
                        justify-center text-xl">
          {categoryData.icon}
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {categoryData.label}
          </h1>
          <p className="text-sm text-gray-500">
            {subjectData?.label} · {lessons.length} lessons
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {lessons.map((lesson, i) => (
          <motion.div
            key={lesson.slug}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card
              interactive
              padding="md"
              onClick={() => navigate(`/${year}/${subject}/${category}/${lesson.slug}`)}
            >
              <div className="flex items-center gap-3">
                {/* Number */}
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center
                                justify-center text-xs font-bold text-gray-500
                                shrink-0">
                  {i + 1}
                </div>

                {/* Title */}
                <p className="flex-1 text-sm font-semibold text-gray-900
                               leading-snug">
                  {lesson.title}
                </p>

                <ChevronRight size={16} className="text-gray-300 shrink-0" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
```

---

### FILE: frontend/web/src/pages/syllabus/LessonDetailPage.jsx

```jsx
/**
 * /plus1/english/prose/portrait-of-a-lady
 * Shows the 6 section tabs for a lesson.
 */

import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  getLesson, getCategory, SYLLABUS, LESSON_SECTIONS,
} from '../../data/syllabus'
import { buildBreadcrumbs } from '../../lib/nav'
import { Card } from '../../components/ui'
import { Breadcrumb } from '../../components/nav'

export default function LessonDetailPage() {
  const { year, subject, category, lesson } = useParams()
  const navigate                            = useNavigate()
  const lessonData                          = getLesson(year, subject, category, lesson)
  const categoryData                        = getCategory(year, subject, category)
  const crumbs                              = buildBreadcrumbs(year, subject, category, lesson, null, SYLLABUS)

  if (!lessonData) return <NotFound message={`Lesson "${lesson}" not found`} />

  return (
    <div>
      <Breadcrumb crumbs={crumbs} />

      {/* Lesson header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{categoryData?.icon}</span>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            {categoryData?.label}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 leading-snug">
          {lessonData.title}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Choose a section to begin
        </p>
      </div>

      {/* Section grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {LESSON_SECTIONS.map((section, i) => (
          <motion.div
            key={section.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card
              interactive
              padding="md"
              onClick={() =>
                navigate(`/${year}/${subject}/${category}/${lesson}/${section.slug}`)
              }
              className="h-full"
            >
              <div className="text-2xl mb-2.5">{section.icon}</div>
              <p className="text-sm font-bold text-gray-900">{section.label}</p>
              <p className="text-xs text-gray-400 mt-1 leading-snug">
                {section.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
```

---

### FILE: frontend/web/src/pages/syllabus/SectionPage.jsx

```jsx
/**
 * /plus1/english/prose/portrait-of-a-lady/practice
 * Renders the content for a specific lesson section.
 * Practice and Ask AI connect to existing API flows.
 */

import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  getLesson, getSection, getCategory, SYLLABUS,
} from '../../data/syllabus'
import { buildBreadcrumbs } from '../../lib/nav'
import { Card, Badge } from '../../components/ui'
import { Breadcrumb } from '../../components/nav'

// Section-specific content renderers
import AboutAuthorSection    from './sections/AboutAuthorSection'
import TextSection           from './sections/TextSection'
import GlossarySection       from './sections/GlossarySection'
import ComprehensionSection  from './sections/ComprehensionSection'
import PracticeSection       from './sections/PracticeSection'
import AskAISection          from './sections/AskAISection'

const SECTION_COMPONENTS = {
  'about-author':  AboutAuthorSection,
  'text':          TextSection,
  'glossary':      GlossarySection,
  'comprehension': ComprehensionSection,
  'practice':      PracticeSection,
  'ask-ai':        AskAISection,
}

export default function SectionPage() {
  const { year, subject, category, lesson, section } = useParams()
  const lessonData    = getLesson(year, subject, category, lesson)
  const sectionData   = getSection(section)
  const categoryData  = getCategory(year, subject, category)
  const crumbs        = buildBreadcrumbs(year, subject, category, lesson, section, SYLLABUS)

  if (!lessonData)  return <NotFound message={`Lesson "${lesson}" not found`} />
  if (!sectionData) return <NotFound message={`Section "${section}" not found`} />

  const SectionComponent = SECTION_COMPONENTS[section]

  return (
    <div>
      <Breadcrumb crumbs={crumbs} />

      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center
                        justify-center text-xl">
          {sectionData.icon}
        </div>
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            {lessonData.title}
          </p>
          <h1 className="text-xl font-bold text-gray-900">
            {sectionData.label}
          </h1>
        </div>
      </div>

      {/* Section tabs (horizontal scroll) */}
      <SectionTabs
        year={year}
        subject={subject}
        category={category}
        lesson={lesson}
        activeSection={section}
      />

      {/* Section content */}
      <motion.div
        key={section}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-5"
      >
        {SectionComponent
          ? <SectionComponent lessonSlug={lesson} lessonTitle={lessonData.title} />
          : <PlaceholderContent section={sectionData} />}
      </motion.div>
    </div>
  )
}

// ── Section tab bar ───────────────────────────────────────────────────────────
import { useNavigate } from 'react-router-dom'
import { LESSON_SECTIONS } from '../../data/syllabus'

function SectionTabs({ year, subject, category, lesson, activeSection }) {
  const navigate = useNavigate()
  return (
    <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
      {LESSON_SECTIONS.map(s => (
        <button
          key={s.slug}
          onClick={() =>
            navigate(`/${year}/${subject}/${category}/${lesson}/${s.slug}`)
          }
          className={`
            flex items-center gap-1.5 px-3.5 py-2 rounded-xl
            text-sm font-semibold whitespace-nowrap
            border transition-all duration-150 shrink-0
            ${activeSection === s.slug
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}
          `}
        >
          <span>{s.icon}</span>
          <span>{s.label}</span>
        </button>
      ))}
    </div>
  )
}

// ── Placeholder content ───────────────────────────────────────────────────────
function PlaceholderContent({ section }) {
  return (
    <Card padding="lg">
      <div className="text-center py-8">
        <div className="text-4xl mb-3">{section.icon}</div>
        <p className="font-semibold text-gray-800">{section.label}</p>
        <p className="text-sm text-gray-400 mt-1">{section.description}</p>
        <div className="mt-6 space-y-2.5">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-3 bg-gray-100 rounded-full animate-pulse
                                    mx-auto" style={{ width: `${75 - i * 10}%` }} />
          ))}
        </div>
      </div>
    </Card>
  )
}
```

---

## Step 6: Create section content components

---

### FILE: frontend/web/src/pages/syllabus/sections/AboutAuthorSection.jsx

```jsx
import { Card } from '../../../components/ui'

export default function AboutAuthorSection({ lessonTitle }) {
  return (
    <Card padding="lg">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
        About the Author
      </p>
      <div className="space-y-3">
        <p className="text-sm text-gray-700 leading-relaxed">
          This section will show detailed information about the author of{' '}
          <strong>{lessonTitle}</strong> — including their biography, literary works,
          writing style, and their contribution to literature.
        </p>
        <div className="bg-blue-50 rounded-xl p-3 text-sm text-blue-800">
          💡 <strong>Exam tip:</strong> 2-mark questions often ask for the author's
          name and one fact about them. Always remember both.
        </div>
      </div>
    </Card>
  )
}
```

---

### FILE: frontend/web/src/pages/syllabus/sections/TextSection.jsx

```jsx
import { Card } from '../../../components/ui'

export default function TextSection({ lessonTitle }) {
  return (
    <Card padding="lg">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
        Full Text
      </p>
      <p className="text-sm text-gray-500 italic mb-4">
        The complete text of "{lessonTitle}" will appear here.
      </p>
      <div className="space-y-2">
        {[80, 95, 70, 88, 60].map((w, i) => (
          <div
            key={i}
            className="h-3.5 bg-gray-100 rounded-full animate-pulse"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
    </Card>
  )
}
```

---

### FILE: frontend/web/src/pages/syllabus/sections/GlossarySection.jsx

```jsx
import { Card } from '../../../components/ui'

const SAMPLE_WORDS = [
  { word: 'Dilemma',    meaning: 'A situation requiring a choice between two difficult options' },
  { word: 'Protagonist',meaning: 'The main character in a story'                               },
  { word: 'Narrative',  meaning: 'A spoken or written account of connected events'              },
  { word: 'Pathos',     meaning: 'A quality that evokes pity or sadness'                        },
  { word: 'Irony',      meaning: 'A situation where the outcome is opposite to what was expected'},
]

export default function GlossarySection() {
  return (
    <div className="space-y-2">
      {SAMPLE_WORDS.map((item, i) => (
        <Card key={i} padding="md">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center
                            justify-center text-xs font-bold text-blue-700 shrink-0">
              {item.word[0]}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{item.word}</p>
              <p className="text-sm text-gray-500 mt-0.5 leading-snug">
                {item.meaning}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
```

---

### FILE: frontend/web/src/pages/syllabus/sections/ComprehensionSection.jsx

```jsx
import { Card } from '../../../components/ui'

const SAMPLE_QUESTIONS = [
  'What is the central idea of the lesson?',
  'How does the author develop the main theme?',
  'Describe the relationship between the two main characters.',
  'What does the title signify in the context of the lesson?',
]

export default function ComprehensionSection() {
  return (
    <div className="space-y-2.5">
      <p className="text-xs font-semibold text-gray-500 mb-3">
        Check your understanding — answer these questions in your notebook.
      </p>
      {SAMPLE_QUESTIONS.map((q, i) => (
        <Card key={i} padding="md">
          <div className="flex gap-3">
            <span className="text-sm font-bold text-blue-600 shrink-0">
              Q{i + 1}.
            </span>
            <p className="text-sm text-gray-800">{q}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
```

---

### FILE: frontend/web/src/pages/syllabus/sections/PracticeSection.jsx

```jsx
/**
 * Practice section — connects to the existing evaluation API.
 * Reuses the PracticePage logic but scoped to this lesson's chapter.
 *
 * For now shows a placeholder with a link to the full practice page.
 * When chapter_id mapping is added to syllabus.js, this will load
 * real questions from the backend.
 */

import { useNavigate, useParams } from 'react-router-dom'
import { Card } from '../../../components/ui'
import { Button } from '../../../components/ui'
import { Pencil } from 'lucide-react'

const SAMPLE_QUESTIONS = [
  { marks: 2,  text: 'Who is the author of this lesson?'            },
  { marks: 2,  text: 'What is the central theme of the lesson?'     },
  { marks: 5,  text: 'Describe the main character in this lesson.'  },
  { marks: 5,  text: 'What are the themes explored in this lesson?' },
  { marks: 10, text: 'Write a detailed summary of this lesson.'     },
]

const MARK_COLORS = {
  2:  'bg-blue-100 text-blue-700',
  5:  'bg-purple-100 text-purple-700',
  10: 'bg-amber-100 text-amber-800',
}

export default function PracticeSection({ lessonTitle }) {
  const { year, subject, category, lesson } = useParams()
  const navigate = useNavigate()

  return (
    <div className="space-y-2.5">
      <p className="text-xs font-semibold text-gray-500 mb-3">
        Board exam questions for this lesson — sorted by marks
      </p>

      {SAMPLE_QUESTIONS.map((q, i) => (
        <Card key={i} padding="md">
          <div className="flex items-start gap-3">
            <span className={`
              inline-flex px-2 py-0.5 rounded-full text-xs font-bold shrink-0
              ${MARK_COLORS[q.marks] || 'bg-gray-100 text-gray-700'}
            `}>
              {q.marks}m
            </span>
            <p className="flex-1 text-sm text-gray-800 leading-snug">
              {q.text}
            </p>
            <Button
              size="sm"
              onClick={() => {
                // TODO: pass chapter_id from syllabus registry
                // For now navigate to the main practice page
                navigate(`/${year}/${subject}/${category}`)
              }}
              icon={<Pencil size={13} />}
            >
              Answer
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
```

---

### FILE: frontend/web/src/pages/syllabus/sections/AskAISection.jsx

```jsx
/**
 * Ask AI section — connects to /api/v1/learning/explain.
 * Reuses the learn API but with the lesson as context.
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { explainTopic } from '../../../api/learning'
import { Button, Input, Card, Badge } from '../../../components/ui'

const QUICK_QUESTIONS = [
  'What is the theme of this lesson?',
  'Who is the main character?',
  'What is the summary?',
  'What are the key points for exam?',
]

export default function AskAISection({ lessonTitle, chapterId }) {
  const [question, setQ]      = useState('')
  const [language, setLang]   = useState('en')
  const [result,   setResult] = useState(null)
  const [loading,  setLoading]= useState(false)
  const [error,    setError]  = useState('')

  async function handleAsk(q) {
    const prompt = q || question.trim()
    if (!prompt) return
    setLoading(true)
    setError('')
    setResult(null)

    try {
      // chapterId will be mapped from syllabus registry once backend UUIDs
      // are stored in syllabus.js — for now show a helpful message
      if (!chapterId) {
        await new Promise(r => setTimeout(r, 800)) // simulate
        setResult({
          explanation: `This is a simulated response for "${lessonTitle}". Once the content pipeline has processed this lesson and the chapter ID is mapped in the syllabus registry, this will return real AI explanations from your local Ollama model.`,
          key_points: [
            'Connect chapterId in syllabus.js to enable real AI responses',
            'Run the content pipeline for this chapter first',
            'Validate the content chunks in the admin panel',
          ],
          exam_tip: 'Tip: Questions about themes and characters are most common in board exams.',
          model_used: 'preview',
          source_chunks: 0,
          cached: false,
        })
        return
      }
      const data = await explainTopic({ chapterId, question: prompt, language })
      setResult(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Quick question chips */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-2.5">
          Quick questions
        </p>
        <div className="flex flex-wrap gap-2">
          {QUICK_QUESTIONS.map(q => (
            <button
              key={q}
              onClick={() => { setQ(q); handleAsk(q) }}
              className="px-3 py-1.5 bg-white border border-gray-200
                         rounded-full text-xs font-medium text-gray-700
                         hover:border-blue-300 hover:text-blue-700
                         transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Custom question */}
      <div className="flex gap-2">
        <Input
          placeholder="Ask anything about this lesson..."
          value={question}
          onChange={e => setQ(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAsk()}
          className="flex-1"
        />
        <Button
          onClick={() => handleAsk()}
          disabled={!question.trim()}
          loading={loading}
          icon={!loading && <Sparkles size={15} />}
        >
          Ask
        </Button>
      </div>

      {/* Language toggle */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">Respond in:</span>
        <div className="flex bg-gray-100 rounded-lg p-0.5 text-xs">
          {[['en', 'English'], ['ta', 'தமிழ்']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setLang(val)}
              className={`
                px-3 py-1 rounded-md font-semibold transition-all
                ${language === val ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <Card padding="lg">
              <p className="text-xs font-bold text-gray-400 uppercase
                            tracking-wide mb-2">Explanation</p>
              <p className="text-sm text-gray-800 leading-relaxed">
                {result.explanation}
              </p>
            </Card>

            {result.key_points?.length > 0 && (
              <Card padding="md">
                <p className="text-xs font-bold text-gray-400 uppercase
                              tracking-wide mb-2.5">Key Points</p>
                <div className="space-y-2">
                  {result.key_points.map((pt, i) => (
                    <div key={i} className="flex gap-2.5 items-start">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex
                                      items-center justify-center text-[10px]
                                      font-bold text-blue-700 shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-700">{pt}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {result.exam_tip && (
              <div className="flex gap-3 bg-amber-50 border border-amber-100
                              rounded-[14px] p-3.5">
                <span className="text-lg shrink-0">💡</span>
                <p className="text-sm text-amber-900">{result.exam_tip}</p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Badge variant="gray">{result.model_used}</Badge>
              {result.cached && <Badge variant="blue">Cached</Badge>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

---

### FILE: frontend/web/src/pages/syllabus/NotFound.jsx

```jsx
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui'

export default function NotFound({ message = 'Page not found' }) {
  const navigate = useNavigate()
  return (
    <div className="text-center py-16">
      <p className="text-5xl mb-4">📭</p>
      <p className="text-lg font-bold text-gray-900 mb-1">Not Found</p>
      <p className="text-sm text-gray-400 mb-6">{message}</p>
      <Button variant="secondary" onClick={() => navigate('/')}>
        Go home
      </Button>
    </div>
  )
}
```

---

## Step 7: Update the router

### FILE: frontend/web/src/App.jsx

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { isLoggedIn } from './api/auth'

// Auth
import LoginPage    from './pages/LoginPage'

// App shell (2-column layout for syllabus pages)
import AppShell from './components/layout/AppShell'

// Syllabus pages
import YearPage        from './pages/syllabus/YearPage'
import SubjectPage     from './pages/syllabus/SubjectPage'
import LessonListPage  from './pages/syllabus/LessonListPage'
import LessonDetailPage from './pages/syllabus/LessonDetailPage'
import SectionPage     from './pages/syllabus/SectionPage'
import NotFound        from './pages/syllabus/NotFound'

// Progress (uses PageShell, no sidebar)
import ProgressPage from './pages/ProgressPage'

function Guard({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />
}

function SyllabusShell({ children }) {
  return (
    <Guard>
      <AppShell>{children}</AppShell>
    </Guard>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />

        {/* Progress — no sidebar */}
        <Route path="/progress" element={
          <Guard><ProgressPage /></Guard>
        } />

        {/* Syllabus hierarchy — all wrapped in AppShell */}
        <Route path="/:year" element={
          <SyllabusShell><YearPage /></SyllabusShell>
        } />
        <Route path="/:year/:subject" element={
          <SyllabusShell><SubjectPage /></SyllabusShell>
        } />
        <Route path="/:year/:subject/:category" element={
          <SyllabusShell><LessonListPage /></SyllabusShell>
        } />
        <Route path="/:year/:subject/:category/:lesson" element={
          <SyllabusShell><LessonDetailPage /></SyllabusShell>
        } />
        <Route path="/:year/:subject/:category/:lesson/:section" element={
          <SyllabusShell><SectionPage /></SyllabusShell>
        } />

        {/* Default — send to +1 */}
        <Route path="/" element={<Navigate to="/plus1" replace />} />
        <Route path="*" element={<SyllabusShell><NotFound /></SyllabusShell>} />
      </Routes>
    </BrowserRouter>
  )
}
```

---

## Step 8: Update main.jsx

No change needed — already imports App.jsx and index.css.

---

## Step 9: Folder structure check

After this phase, src/ should look like:

```
src/
├── api/                      ← unchanged
├── components/
│   ├── layout/
│   │   ├── AppShell.jsx      ← NEW — 2-column layout
│   │   ├── BottomNav.jsx
│   │   ├── PageShell.jsx
│   │   ├── TopBar.jsx
│   │   └── index.js          ← updated
│   ├── nav/                  ← NEW
│   │   ├── Sidebar.jsx
│   │   ├── MobileSidebar.jsx
│   │   ├── Breadcrumb.jsx
│   │   └── index.js
│   └── ui/                   ← unchanged
├── data/
│   └── syllabus.js           ← NEW — mock data + helpers
├── design/                   ← unchanged
├── lib/
│   └── nav.js                ← NEW — URL helpers
├── pages/
│   ├── LoginPage.jsx
│   ├── ProgressPage.jsx
│   └── syllabus/             ← NEW
│       ├── YearPage.jsx
│       ├── SubjectPage.jsx
│       ├── LessonListPage.jsx
│       ├── LessonDetailPage.jsx
│       ├── SectionPage.jsx
│       ├── NotFound.jsx
│       └── sections/
│           ├── AboutAuthorSection.jsx
│           ├── TextSection.jsx
│           ├── GlossarySection.jsx
│           ├── ComprehensionSection.jsx
│           ├── PracticeSection.jsx
│           └── AskAISection.jsx
├── App.jsx                   ← updated
└── main.jsx
```

---

## Step 10: Commit and run

```bash
git add .
git commit -m "Navigation: hierarchical syllabus routing + 2-column layout

- data/syllabus.js: full TN board +1/+2 mock data with helpers
- lib/nav.js: URL builder + breadcrumb generator
- components/nav/: Sidebar, MobileSidebar, Breadcrumb
- components/layout/AppShell: fixed sidebar + mobile drawer
- pages/syllabus/: YearPage, SubjectPage, LessonListPage,
  LessonDetailPage, SectionPage, NotFound
- pages/syllabus/sections/: 6 section components
- App.jsx: full hierarchical routing
- Routes: /plus1/english/prose/portrait-of-a-lady/practice"

cd frontend/web && npm run dev
```

Open http://localhost:5173 — it redirects to /plus1.

---

## Step 11: Test these exact URLs

```
http://localhost:5173/plus1
http://localhost:5173/plus1/english
http://localhost:5173/plus1/english/prose
http://localhost:5173/plus1/english/prose/portrait-of-a-lady
http://localhost:5173/plus1/english/prose/portrait-of-a-lady/about-author
http://localhost:5173/plus1/english/prose/portrait-of-a-lady/practice
http://localhost:5173/plus1/english/prose/portrait-of-a-lady/ask-ai
http://localhost:5173/plus2/english/poetry/keeping-quiet/glossary
```

All should load without 404.
Sidebar should highlight the active subject and category.
Breadcrumbs should show the full path.
On mobile (<1024px), sidebar should collapse and hamburger should appear.

---

## Step 12: Print completion summary

```
── Data ─────────────────────────────────────────────────────
✓ src/data/syllabus.js         — +1/+2, 3 subjects, full lesson list
✓ src/lib/nav.js               — buildPath, buildBreadcrumbs

── Navigation components ─────────────────────────────────────
✓ src/components/nav/Sidebar.jsx        — year toggle, subject+category tree
✓ src/components/nav/MobileSidebar.jsx  — drawer with backdrop + lock scroll
✓ src/components/nav/Breadcrumb.jsx     — clickable path trail

── Layout ────────────────────────────────────────────────────
✓ src/components/layout/AppShell.jsx    — 2-col desktop, drawer mobile

── Pages ─────────────────────────────────────────────────────
✓ YearPage          /plus1
✓ SubjectPage       /plus1/english
✓ LessonListPage    /plus1/english/prose
✓ LessonDetailPage  /plus1/english/prose/portrait-of-a-lady
✓ SectionPage       /plus1/english/prose/portrait-of-a-lady/practice

── 6 Section components ──────────────────────────────────────
✓ AboutAuthorSection   — author info placeholder
✓ TextSection          — full text placeholder
✓ GlossarySection      — word cards with sample data
✓ ComprehensionSection — sample comprehension questions
✓ PracticeSection      — board exam questions by marks
✓ AskAISection         — calls /api/v1/learning/explain

── Routing ───────────────────────────────────────────────────
✓ 5-level dynamic routing: year/subject/category/lesson/section
✓ All routes wrapped in Guard + AppShell
✓ Default: / → /plus1
✓ 404: NotFound page within AppShell

Next: connect chapter UUIDs from Supabase into syllabus.js
so PracticeSection and AskAISection call real backend data.
```
