import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  getLesson, getSection, getCategory, SYLLABUS, LESSON_SECTIONS,
} from '../../data/syllabus'
import { buildBreadcrumbs } from '../../lib/nav'
import { Card } from '../../components/ui'
import { Breadcrumb } from '../../components/nav'
import NotFound from './NotFound'
import PageLoader from '../../components/ui/PageLoader'

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
  const { year, subject, category, lesson, section } = useParams()
  const lessonData   = getLesson(year, subject, category, lesson)
  const sectionData  = getSection(section)
  const categoryData = getCategory(year, subject, category)
  const crumbs       = buildBreadcrumbs(year, subject, category, lesson, section, SYLLABUS)

  const hasRichContent = lesson in contentRegistry
  const [richContent, setRichContent] = useState(null)

  useEffect(() => {
    if (!hasRichContent) return
    let cancelled = false
    contentRegistry[lesson]().then(mod => {
      if (!cancelled) setRichContent(mod.default ?? mod)
    })
    return () => { cancelled = true }
  }, [lesson, hasRichContent])

  if (!lessonData) return <NotFound message={`Lesson "${lesson}" not found`} />

  // Rich content check MUST come before sectionData check:
  // LearnRichPage tab IDs (e.g. "text-explained") are not LESSON_SECTIONS slugs,
  // so getSection() returns undefined for them — but we still want LearnRichPage.
  if (hasRichContent) {
    if (!richContent) return <PageLoader />
    return <LearnRichPage content={richContent} chapterSlug={lesson} />
  }

  if (!sectionData) return <NotFound message={`Section "${section}" not found`} />

  const SectionComponent = SECTION_COMPONENTS[section]

  return (
    <div>
      <Breadcrumb crumbs={crumbs} />

      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-brand-teal-soft rounded-xl flex items-center
                        justify-center text-xl">
          {sectionData.icon}
        </div>
        <div>
          <p className="text-xs font-semibold text-brand-teal uppercase tracking-wide">
            {lessonData.title}
          </p>
          <h1 className="text-xl font-bold text-ink">
            {sectionData.label}
          </h1>
        </div>
      </div>

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
    </div>
  )
}

function SectionTabs({ year, subject, category, lesson, activeSection }) {
  const navigate = useNavigate()
  return (
    <div className="scroll-strip -mx-1 px-1">
      {LESSON_SECTIONS.map(s => (
        <button
          key={s.slug}
          onClick={() =>
            navigate(`/${year}/${subject}/${category}/${lesson}/${s.slug}`)
          }
          className={`
            flex items-center gap-1.5 px-3.5 py-2 rounded-xl
            text-sm font-semibold whitespace-nowrap
            border transition-all duration-[var(--duration-fast)] shrink-0
            ${activeSection === s.slug
              ? 'bg-brand-teal text-white border-brand-teal'
              : 'bg-bg-2 text-ink-2 border-line hover:border-brand-teal'}
          `}
        >
          <span>{s.icon}</span>
          <span>{s.label}</span>
        </button>
      ))}
    </div>
  )
}

function PlaceholderContent({ section }) {
  return (
    <Card padding="lg">
      <div className="text-center py-8">
        <div className="text-4xl mb-3">{section.icon}</div>
        <p className="font-semibold text-ink">{section.label}</p>
        <p className="text-sm text-ink-4 mt-1">{section.description}</p>
        <div className="mt-6 space-y-2.5">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-3 bg-bg-sunk rounded-full animate-pulse
                                    mx-auto" style={{ width: `${75 - i * 10}%` }} />
          ))}
        </div>
      </div>
    </Card>
  )
}
