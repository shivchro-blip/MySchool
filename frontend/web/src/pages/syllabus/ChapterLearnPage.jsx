import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getSubjectChapters, SYLLABUS } from '../../data/syllabus'
import { buildBreadcrumbs } from '../../lib/nav'
import contentRegistry from '../../content/registry'
import LearnRichPage from '../LearnRichPage'
import ContentComingSoon from './ContentComingSoon'
import NotFound from './NotFound'

function mdToHtml(md) {
  if (!md) return ''
  const boldify = s => s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
  let html = ''
  let listBuf = []
  let paraBuf = []
  const flushList = () => {
    if (listBuf.length) html += `<ul>${listBuf.map(l => `<li>${boldify(l)}</li>`).join('')}</ul>`
    listBuf = []
  }
  const flushPara = () => {
    if (paraBuf.length) html += `<p>${boldify(paraBuf.join(' '))}</p>`
    paraBuf = []
  }
  for (const raw of md.split('\n')) {
    const line = raw.trim()
    if (!line) { flushList(); flushPara(); continue }
    if (line.startsWith('- ')) { flushPara(); listBuf.push(line.slice(2)); continue }
    flushList()
    paraBuf.push(line)
  }
  flushList()
  flushPara()
  return html
}

// Class 11 CA chapter files predate the { eyebrow, title, author, pills, tabs }
// shape LearnRichPage requires — they use { chapterNumber, subject, classLabel,
// curriculum, sections: [{ id, title, content: markdownString }] } instead.
// Adapt here so content authoring stays untouched and Class 12 (already in
// the tabs shape) passes through unchanged.
function adaptChapterContent(raw) {
  if (raw?.tabs) return raw

  return {
    eyebrow: [raw.classLabel, raw.subject].filter(Boolean).join(' · '),
    title:   raw.title,
    author:  raw.curriculum ?? '',
    pills:   [raw.classLabel, raw.curriculum].filter(Boolean),
    tabs: (raw.sections ?? []).map(sec => ({
      id:    sec.id,
      label: sec.title,
      blocks: [
        { type: 'section-head', text: sec.title },
        { type: 'teacher-voice', html: mdToHtml(sec.content) },
      ],
    })),
  }
}

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
    return <LearnRichPage content={adaptChapterContent(richContent)} chapterSlug={slug} />
  }

  return <ContentComingSoon title={chapterMeta.title} crumbs={crumbs} />
}
