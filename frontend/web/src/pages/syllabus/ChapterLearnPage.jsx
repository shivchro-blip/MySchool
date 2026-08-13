import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getSubjectChapters, SYLLABUS } from '../../data/syllabus'
import { buildBreadcrumbs } from '../../lib/nav'
import contentRegistry from '../../content/registry'
import LearnRichPage from '../LearnRichPage'
import ContentComingSoon from './ContentComingSoon'
import NotFound from './NotFound'

export default function ChapterLearnPage() {
  const { year, subject, slug } = useParams()

  const chapters    = getSubjectChapters(year, subject)
  const chapterMeta = chapters.find(c => c.slug === slug) || null
  const crumbs      = buildBreadcrumbs(year, subject, 'chapters', slug, null, SYLLABUS)

  const [richContent, setRichContent] = useState(
    () => contentRegistry.has(slug) ? undefined : null
  )

  useEffect(() => {
    if (!contentRegistry.has(slug)) {
      setRichContent(null)
      return
    }
    setRichContent(undefined)
    let cancelled = false
    contentRegistry.load(slug).then(c => { if (!cancelled) setRichContent(c) })
    return () => { cancelled = true }
  }, [slug])

  if (!chapterMeta) return <NotFound message={`Chapter "${slug}" not found`} />

  if (richContent === undefined) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ fontSize: 13, color: 'var(--text-muted, #9CA3AF)' }}>Loading…</div>
      </div>
    )
  }

  if (richContent !== null) {
    return <LearnRichPage content={richContent} chapterSlug={slug} />
  }

  return <ContentComingSoon title={chapterMeta.title} crumbs={crumbs} />
}
