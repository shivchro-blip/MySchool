import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  getLesson, getSection, getCategory, SYLLABUS, LESSON_SECTIONS,
} from '../../data/syllabus'
import { buildBreadcrumbs } from '../../lib/nav'
import { Card } from '../../components/ui'
import { Breadcrumb } from '../../components/nav'
import LessonTOC from '../../components/ui/LessonTOC'
import NotFound from './NotFound'

import contentRegistry from '../../content/registry'
import LearnRichPage   from '../LearnRichPage'

import AboutAuthorSection   from './sections/AboutAuthorSection'
import TextSection          from './sections/TextSection'
import GlossarySection      from './sections/GlossarySection'
import ComprehensionSection from './sections/ComprehensionSection'
import PracticeSection        from './sections/PracticeSection'
import AskAISection           from './sections/AskAISection'
import AttemptHistorySection  from './sections/AttemptHistorySection'

const SECTION_COMPONENTS = {
  'about-author':    AboutAuthorSection,
  'text':            TextSection,
  'glossary':        GlossarySection,
  'comprehension':   ComprehensionSection,
  'practice':        PracticeSection,
  'attempt-history': AttemptHistorySection,
  'ask-ai':          AskAISection,
}

export default function SectionPage() {
  const navigate = useNavigate()
  const { year, subject, category, lesson, section } = useParams()
  const lessonData   = getLesson(year, subject, category, lesson)
  const sectionData  = getSection(section)
  const categoryData = getCategory(year, subject, category)
  const crumbs       = buildBreadcrumbs(year, subject, category, lesson, section, SYLLABUS)

  // undefined = loading; null = no rich content; object = rich content loaded
  // Init synchronously: lessons without rich content skip the loading state entirely.
  const [richContent, setRichContent] = useState(
    () => contentRegistry.has(lesson) ? undefined : null
  )

  useEffect(() => {
    if (!contentRegistry.has(lesson)) {
      setRichContent(null)
      return
    }
    setRichContent(undefined)
    let cancelled = false
    contentRegistry.load(lesson).then(c => { if (!cancelled) setRichContent(c) })
    return () => { cancelled = true }
  }, [lesson])

  if (!lessonData) return <NotFound message={`Lesson "${lesson}" not found`} />

  // Rich content check MUST come before sectionData check:
  // LearnRichPage tab IDs (e.g. "text-explained") are not LESSON_SECTIONS slugs,
  // so getSection() returns undefined for them — but we still want LearnRichPage.
  if (richContent === undefined) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ fontSize: 13, color: 'var(--text-muted, #9CA3AF)' }}>Loading…</div>
      </div>
    )
  }
  if (richContent !== null) {
    return <LearnRichPage content={richContent} chapterSlug={lesson} />
  }

  if (!sectionData) return <NotFound message={`Section "${section}" not found`} />

  const SectionComponent = SECTION_COMPONENTS[section]

  function goToSection(slug) {
    navigate(`/${year}/${subject}/${category}/${lesson}/${slug}`)
  }

  const tocSections = LESSON_SECTIONS.map(s => ({ id: s.slug, label: s.label }))

  return (
    <div>
      <Breadcrumb crumbs={crumbs} />

      {/* Section header — full-width outside the two-column grid */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-brand-teal-soft rounded-xl flex items-center
                        justify-center text-xl">
          {sectionData.icon}
        </div>
        <div>
          <p className="text-xs font-semibold text-brand-teal uppercase tracking-wide">
            {lessonData.title}
          </p>
          <h1 className="text-xl font-bold text-text-primary">
            {sectionData.label}
          </h1>
        </div>
      </div>

      {/* Two-column layout: sticky TOC + content */}
      <div className="lesson-layout">
        <aside className="lesson-toc">
          <LessonTOC
            sections={tocSections}
            activeId={section}
            onSelect={goToSection}
          />
        </aside>
        <main className="lesson-content">
          <SectionTabs
            year={year}
            subject={subject}
            category={category}
            lesson={lesson}
            activeSection={section}
          />

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
        </main>
      </div>
    </div>
  )
}

function SectionTabs({ year, subject, category, lesson, activeSection }) {
  const navigate  = useNavigate()
  const menuRef   = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const activeIdx = LESSON_SECTIONS.findIndex(s => s.slug === activeSection)
  const current   = LESSON_SECTIONS[Math.max(0, activeIdx)]
  const total     = LESSON_SECTIONS.length
  const nextSec   = LESSON_SECTIONS[activeIdx + 1]
  const isLast    = activeIdx === total - 1
  const progress  = ((activeIdx + 1) / total) * 100

  useEffect(() => {
    if (!menuOpen) return
    function handle(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [menuOpen])

  function goTo(slug) {
    setMenuOpen(false)
    navigate(`/${year}/${subject}/${category}/${lesson}/${slug}`)
  }

  return (
    <div className="flex items-center gap-2 mb-4 bg-surface border border-border rounded-sm px-3 py-2.5">
      {/* Left — Contents dropdown */}
      <div className="relative shrink-0" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="flex items-center gap-1 text-label text-text-secondary hover:text-text-primary transition-colors"
        >
          <span className="text-base leading-none">≡</span>
          <span className="hidden sm:inline ml-0.5">Contents</span>
          <span className="text-[9px] ml-0.5">{menuOpen ? '▴' : '▾'}</span>
        </button>
        {menuOpen && (
          <div className="absolute left-0 top-full mt-1.5 z-50 bg-surface border border-border rounded-sm shadow-card-md min-w-[180px]">
            {LESSON_SECTIONS.map((s, i) => (
              <button
                key={s.slug}
                onClick={() => goTo(s.slug)}
                className={`w-full text-left flex items-center gap-2 px-3 py-2 text-caption transition-colors
                  ${s.slug === activeSection
                    ? 'text-brand-strong font-semibold bg-surface-alt'
                    : 'text-text-secondary hover:bg-surface-alt hover:text-text-primary'
                  }`}
              >
                <span>{s.icon}</span>
                <span className="flex-1">{s.label}</span>
                <span className="text-[10px] text-text-tertiary">{i + 1}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-px h-5 bg-border shrink-0" />

      {/* Center — current section + progress */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="text-label text-text-primary truncate">{current.icon} {current.label}</span>
          <span className="text-caption text-text-tertiary shrink-0 ml-2">{activeIdx + 1} / {total}</span>
        </div>
        <div className="h-1 rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full bg-brand-strong transition-all duration-slow"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-5 bg-border shrink-0" />

      {/* Right — Next or Complete */}
      {isLast ? (
        <span className="shrink-0 text-label text-text-tertiary opacity-60 select-none">
          Complete ✓
        </span>
      ) : (
        <button
          onClick={() => goTo(nextSec.slug)}
          className="shrink-0 text-label text-brand-strong hover:opacity-75 transition-opacity"
        >
          <span className="sm:hidden">
            {nextSec.label.length > 12 ? nextSec.label.slice(0, 12) + '…' : nextSec.label} →
          </span>
          <span className="hidden sm:inline">Next: {nextSec.label} →</span>
        </button>
      )}
    </div>
  )
}

function PlaceholderContent({ section }) {
  return (
    <Card padding="lg">
      <div className="text-center py-8">
        <div className="text-4xl mb-3">{section.icon}</div>
        <p className="font-semibold text-text-primary">{section.label}</p>
        <p className="text-sm text-text-tertiary mt-1">{section.description}</p>
        <div className="mt-6 space-y-2.5">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-3 bg-surface-alt rounded-full animate-pulse
                                    mx-auto" style={{ width: `${75 - i * 10}%` }} />
          ))}
        </div>
      </div>
    </Card>
  )
}
