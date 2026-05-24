import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../api/client'
import practiceRegistry from '../content/practiceRegistry'
import { Breadcrumb } from '../components/nav'
import PageTitle from '../components/ui/PageTitle'
import Eyebrow from '../components/ui/Eyebrow'
import InfoCard, { InfoCardGrid } from '../components/ui/InfoCard'
import LessonTOC from '../components/ui/LessonTOC'
import ChapterPracticeExam from './ChapterPracticeExam'
import AttemptHistorySection from './syllabus/sections/AttemptHistorySection'
import { stripTabLabel } from '../utils/resolveTabIcon'
import { buildBreadcrumbs } from '../lib/nav'
import { SYLLABUS } from '../data/syllabus'

function adaptAllQuestions(practiceData) {
  if (!practiceData?.parts) return []
  let idx = 1
  const out = []
  for (const part of practiceData.parts) {
    if (part.type === 'mcq') {
      for (const sec of (part.sections ?? [])) {
        for (const q of sec.questions) {
          out.push({
            id:      idx++,
            type:    'mcq',
            marks:   part.marksPer ?? 1,
            section: sec.label,
            html:    q.html,
            options: q.options.map(o => o.replace(/^[a-d]\)\s*/i, '')),
            correct: q.answer,
            hint:    q.hint,
          })
        }
      }
    } else if (part.type === 'reference') {
      for (const q of (part.questions ?? [])) {
        out.push({
          id:    idx++,
          type:  'reference',
          marks: part.marksPer ?? 2,
          verse: q.verse,
          subs:  (q.subs ?? []).map(s => ({ q: s.q, modelAnswer: s.a })),
        })
      }
    } else if (part.type === 'short-essay' || part.type === 'long-essay') {
      for (const q of (part.questions ?? [])) {
        out.push({
          id:          idx++,
          type:        'written',
          marks:       part.marksPer ?? (part.type === 'short-essay' ? 3 : 5),
          html:        q.q,
          modelAnswer: q.ans,
        })
      }
    }
  }
  return out
}


function groupBlocks(blocks) {
  const out = []
  let i = 0
  while (i < blocks.length) {
    if (blocks[i].type === 'author-stat') {
      const group = []
      while (i < blocks.length && blocks[i].type === 'author-stat') group.push(blocks[i++])
      out.push(group.length === 1 ? group[0] : { type: 'author-stat-group', items: group })
    } else {
      out.push(blocks[i++])
    }
  }
  return out
}

function Block({ block, switchTab, chapterSlug, navigate, practiceUrl }) {
  switch (block.type) {

    case 'teacher-voice':
      return (
        <div
          className="type-body mb-5 [&>p]:mb-5 [&>p:last-child]:mb-0 [&_strong]:font-semibold"
          style={{ fontSize: 'var(--reading-px, 18px)', color: 'var(--text-primary)' }}
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      )

    case 'section-head':
      return (
        <div className="mt-12 mb-4">
          <h2 className="type-heading-lg font-serif" style={{ color: 'var(--text-primary)', margin: '0 0 6px' }}>{block.text}</h2>
          <div className="h-[3px] w-8 rounded-full" style={{ background: 'var(--brand)' }} />
        </div>
      )

    case 'think-box':
      return (
        <InfoCard label={block.label} className="my-4">
          {block.text}
        </InfoCard>
      )

    case 'quote-block':
      return (
        <div className="my-6">
          <p
            className="font-serif italic text-[18px] leading-[1.5] pl-4 border-l-[3px] mb-3"
            style={{ borderLeftColor: 'var(--brand)', color: 'var(--text-primary)' }}
          >
            {block.quote}
          </p>
          <p className="text-[13px] text-text-secondary leading-[1.75]">{block.context}</p>
        </div>
      )

    case 'author-stat':
      return (
        <InfoCard label={block.label} className="mb-2.5">
          {block.value}
        </InfoCard>
      )

    case 'author-stat-group':
      return (
        <InfoCardGrid>
          {block.items.map((item, i) => (
            <InfoCard key={i} label={item.label}>
              {item.value}
            </InfoCard>
          ))}
        </InfoCardGrid>
      )

    case 'device-block':
      return (
        <div className="bg-surface-alt border border-line rounded-xl px-4 py-3.5 mb-3">
          <Eyebrow style={{ color: 'var(--text-tertiary)', marginBottom: 6 }}>{block.kind}</Eyebrow>
          <p
            className="text-[13px] italic mb-2 leading-relaxed"
            style={{ color: 'var(--brand)' }}
          >
            {block.line}
          </p>
          <p className="text-[13px] text-text-secondary leading-[1.75]">{block.exp}</p>
        </div>
      )

    case 'gloss-row':
      return (
        <div className="grid grid-cols-[140px_1fr] max-sm:grid-cols-1 max-sm:gap-1 border-b border-line-soft py-3 last:border-0 items-start">
          <span
            className="text-[13px] font-semibold"
            style={{ color: 'var(--brand)' }}
          >
            {block.word}
          </span>
          <div>
            <p className="text-[13px] text-text-secondary leading-relaxed">{block.def}</p>
            {block.eg && (
              <p className="text-[11px] text-text-tertiary mt-0.5 leading-relaxed">{block.eg}</p>
            )}
          </div>
        </div>
      )

    case 'nav':
      return (
        <div className="flex gap-2.5 mt-6 flex-wrap">
          {block.back && (
            <button
              onClick={() => switchTab(block.back)}
              className="px-4 py-2 rounded-pill text-sm font-semibold border border-line
                         text-text-secondary bg-surface-alt hover:bg-surface-alt transition-all duration-[var(--duration-fast)]"
            >
              ← Back
            </button>
          )}
          {block.practice && (
            <button
              onClick={() => switchTab('practice')}
              className="px-4 py-2 rounded-pill text-sm font-semibold text-white
                         transition-all duration-[var(--duration-fast)]"
              style={{ background: 'var(--brand)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-ink)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--brand)' }}
            >
              🔥 Practice
            </button>
          )}
          {block.next && (
            <button
              onClick={() => switchTab(block.next)}
              className="px-4 py-2 rounded-pill text-sm font-semibold text-white
                         transition-all duration-[var(--duration-fast)] hover:opacity-90"
              style={{ background: 'var(--brand)' }}
            >
              {block.nextLabel}
            </button>
          )}
        </div>
      )

    default:
      return null
  }
}


function AskAIPanel({ chapterSlug }) {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: "Hello! I'm your AI Tutor for The Portrait of a Lady. Ask me anything about the story — themes, characters, literary devices, or exam questions. I'm here to help!",
    },
  ])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [chapterId, setChapterId] = useState(null)
  const listRef = useRef(null)

  useEffect(() => {
    api.get(`/learning/content/${chapterSlug}`)
      .then(d => setChapterId(d.chapter_id))
      .catch(() => {})
  }, [chapterSlug])

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, busy])

  async function send() {
    if (busy || !input.trim()) return
    const q = input.trim()
    setInput('')
    setBusy(true)
    setMessages(m => [...m, { role: 'user', text: q }])
    try {
      if (!chapterId) throw new Error('Backend unavailable. Make sure the server is running.')
      // DISABLED (free-tier): re-enable after launch
      setMessages(m => [...m, { role: 'ai', error: 'AI explanations coming soon. This feature will be enabled after launch.' }])
      // const data = await api.post('/learning/explain', {
      //   chapter_id: chapterId,
      //   question: q,
      //   language: 'en',
      // })
      // setMessages(m => [...m, {
      //   role: 'ai',
      //   explanation: data.explanation,
      //   keyPoints: data.key_points,
      //   examTip: data.exam_tip,
      // }])
    } catch (err) {
      setMessages(m => [...m, { role: 'ai', error: err.message }])
    }
    setBusy(false)
  }

  return (
    <div>
      <div className="bg-surface-alt border border-line rounded-2xl p-4">
        <div
          ref={listRef}
          className="chat-msg-list flex flex-col gap-3 overflow-y-auto pb-1"
          style={{ maxHeight: 280, scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              {msg.role === 'ai' && (
                <Eyebrow style={{ color: 'var(--brand)', marginBottom: 4 }}>AI TUTOR</Eyebrow>
              )}
              <div
                className="max-w-[82%] text-[13px] leading-relaxed px-3.5 py-2.5"
                style={{
                  background: msg.role === 'user' ? 'var(--brand)' : 'var(--page-bg)',
                  color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
                  borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  border: msg.role === 'ai' ? '1px solid var(--line)' : 'none',
                }}
              >
                {msg.error ? (
                  <span style={{ color: '#C0392B' }}>{msg.error}</span>
                ) : msg.text ? (
                  msg.text
                ) : (
                  <>
                    {msg.explanation}
                    {msg.keyPoints?.length > 0 && (
                      <ul
                        className="mt-2 pt-2 text-[12px] space-y-0.5"
                        style={{ borderTop: '1px solid var(--line-soft)' }}
                      >
                        {msg.keyPoints.map((p, j) => (
                          <li key={j} className="ml-3 list-disc">{p}</li>
                        ))}
                      </ul>
                    )}
                    {msg.examTip && (
                      <InfoCard label="Exam tip" icon="💡" isTip={true} className="mt-2">
                        {msg.examTip}
                      </InfoCard>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}

          {busy && (
            <div className="flex items-start">
              <div
                className="px-3.5 py-2.5 flex gap-1.5 items-center"
                style={{
                  background: 'var(--page-bg)',
                  border: '1px solid var(--line)',
                  borderRadius: '14px 14px 14px 4px',
                }}
              >
                {[0, 1, 2].map(i => (
                  <span
                    key={i}
                    className="block w-1.5 h-1.5 rounded-full ec-dot-pulse"
                    style={{ background: 'var(--text-tertiary)', animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder="Ask about the story…"
            disabled={busy}
            className="flex-1 border border-line rounded-pill px-4 py-2 text-[13px] text-text-primary bg-surface-alt focus:outline-none focus:border-brand transition-colors"
          />
          <button
            onClick={send}
            disabled={busy || !input.trim()}
            className="px-4 py-2 rounded-pill text-[13px] font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
            style={{ background: 'var(--brand)' }}
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  )
}

export default function LearnRichPage({ content, chapterSlug }) {
  const navigate = useNavigate()
  const { year, subject, category, lesson, section } = useParams()
  const practiceUrl = (year && subject && category && lesson)
    ? `/${year}/${subject}/${category}/${lesson}/practice`
    : `/${chapterSlug}/practice`

  const contentType = /\bPoem\b/i.test(content.eyebrow) ? 'poem'
    : /\bPlay\b|\bDrama\b/i.test(content.eyebrow) ? 'drama'
    : 'prose'

  // Chapters that pre-declare practice/askai tabs use them as-is.
  // All others get them injected here so no data file needs editing.
  const allTabs = (() => {
    const tabs = content.tabs
    const hasPractice = tabs.some(t => t.type === 'practice')
    const hasAskAI    = tabs.some(t => t.type === 'askai')
    const extra = []
    if (!hasPractice && practiceRegistry[chapterSlug]) {
      extra.push({ id: 'practice', label: 'Practice', type: 'practice', blocks: [] })
    }
    if (practiceRegistry[chapterSlug] && !tabs.some(t => t.type === 'attempt-history')) {
      extra.push({ id: 'attempt-history', label: 'Attempt History', type: 'attempt-history', blocks: [] })
    }
    if (!hasAskAI) {
      extra.push({ id: 'askai', label: 'Ask AI', type: 'askai', blocks: [] })
    }
    return extra.length ? [...tabs, ...extra] : tabs
  })()

  // Load practice data asynchronously (practiceRegistry values are lazy loaders since ebb1e34)
  const [practiceContent, setPracticeContent] = useState(null)
  useEffect(() => {
    const loader = practiceRegistry[chapterSlug]
    if (!loader) return
    let cancelled = false
    loader().then(mod => {
      if (!cancelled) setPracticeContent(mod.default ?? mod)
    })
    return () => { cancelled = true }
  }, [chapterSlug])

  // Initialize from URL section param; fall back to first tab
  const [activeTab, setActiveTab] = useState(
    () => allTabs.find(t => t.id === section)?.id ?? allTabs[0].id
  )

  // Sync when section param changes (browser back/forward, direct URL load)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setActiveTab(allTabs.find(t => t.id === section)?.id ?? allTabs[0].id)
  }, [section])

  const activeTabRef = useRef(null)
  useEffect(() => {
    activeTabRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [activeTab])

  const menuRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    if (!menuOpen) return
    function handle(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [menuOpen])

  function switchTab(id) {
    if (year && subject && category && lesson) {
      navigate(`/${year}/${subject}/${category}/${lesson}/${id}`)
    } else {
      setActiveTab(id)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const visibleTabs = allTabs.filter(t => !t.hidden)
  const panel = allTabs.find(t => t.id === activeTab)

  // Full breadcrumb chain from route params; fall back to 2-segment for standalone use
  const crumbs = (year && subject)
    ? buildBreadcrumbs(year, subject, category, lesson, null, SYLLABUS)
    : [
        { label: 'Courses', to: '/courses' },
        { label: content.eyebrow, to: null },
      ]

  const activeTabIdx      = visibleTabs.findIndex(t => t.id === activeTab)
  const nextTab           = visibleTabs[activeTabIdx + 1]
  const tabIsLast         = activeTabIdx === visibleTabs.length - 1
  const tabProgress       = ((activeTabIdx + 1) / visibleTabs.length) * 100
  const nextTabLabel      = nextTab ? stripTabLabel(nextTab.label) : ''
  const nextTabLabelShort = nextTabLabel.length > 12 ? nextTabLabel.slice(0, 12) + '…' : nextTabLabel

  return (
    <div>
      {/* Chapter header — white card, full-width outside the two-column grid */}
      <div className="bg-surface-alt border border-line rounded-2xl px-6 pt-5 pb-5 mb-5">
        <Breadcrumb crumbs={crumbs} />
        <PageTitle className="mb-1.5">{content.title}</PageTitle>
        <p className="text-sm font-semibold mb-4" style={{ color: 'var(--text-secondary)' }}>
          {content.author}
        </p>
        <div className="flex gap-1.5 flex-wrap">
          {content.pills.map(p => (
            <span
              key={p}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-full"
              style={{ background: 'var(--surface-alt)', color: 'var(--text-secondary)' }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Two-column layout: sticky TOC + content */}
      <div className="lesson-layout">
        <aside className="lesson-toc">
          <LessonTOC
            sections={visibleTabs}
            activeId={activeTab}
            onSelect={switchTab}
          />
        </aside>
        <main className="lesson-content">

      {/* Three-zone sub-nav */}
      <div className="flex items-center gap-2 mb-3 bg-surface border border-border rounded-sm px-3 py-2.5">
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
              {visibleTabs.map((tab, i) => {
                const cleanLabel = stripTabLabel(tab.label)
                const isActive   = tab.id === activeTab
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setMenuOpen(false); switchTab(tab.id) }}
                    className={`w-full text-left flex items-center gap-2 px-3 py-2 text-caption transition-colors
                      ${isActive
                        ? 'text-brand-strong font-semibold bg-surface-alt'
                        : 'text-text-secondary hover:bg-surface-alt hover:text-text-primary'
                      }`}
                  >
                    <span className="flex-1">{cleanLabel}</span>
                    <span className="text-[10px] text-text-tertiary">{i + 1}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-border shrink-0" />

        {/* Center — current tab + progress */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="text-label text-text-primary truncate">
              {stripTabLabel(visibleTabs[activeTabIdx]?.label ?? '')}
            </span>
            <span className="text-caption text-text-tertiary shrink-0 ml-2">
              {activeTabIdx + 1} / {visibleTabs.length}
            </span>
          </div>
          <div className="h-1 rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full bg-brand-strong transition-all duration-slow"
              style={{ width: `${tabProgress}%` }}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-border shrink-0" />

        {/* Right — Next or Complete */}
        {tabIsLast ? (
          <span className="shrink-0 text-label text-text-tertiary opacity-60 select-none">
            Complete ✓
          </span>
        ) : (
          <button
            onClick={() => switchTab(nextTab.id)}
            className="shrink-0 text-label text-brand-strong hover:opacity-75 transition-opacity"
          >
            <span className="sm:hidden">{nextTabLabelShort} →</span>
            <span className="hidden sm:inline">Next: {nextTabLabel} →</span>
          </button>
        )}
      </div>

      {/* Panel content */}
      {panel?.type === 'practice' ? (
        <ChapterPracticeExam
          questions={adaptAllQuestions(practiceContent)}
          chapterMeta={{ title: content.title, meta: content.eyebrow, subject: content.author }}
          chapterSlug={chapterSlug}
        />
      ) : panel?.type === 'attempt-history' ? (
        <div>
          <AttemptHistorySection lessonSlug={lesson || chapterSlug} />
        </div>
      ) : panel?.type === 'askai' ? (
        <AskAIPanel chapterSlug={chapterSlug} />
      ) : (
        <div className="reading-column">
          {groupBlocks(panel?.blocks ?? []).map((block, i) => (
            <Block
              key={i}
              block={block}
              switchTab={switchTab}
              chapterSlug={chapterSlug}
              navigate={navigate}
              practiceUrl={practiceUrl}
            />
          ))}
        </div>
      )}

        </main>
      </div>
    </div>
  )
}
