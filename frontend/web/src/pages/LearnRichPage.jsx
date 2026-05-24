import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../api/client'
import practiceRegistry from '../content/practiceRegistry'
import { Breadcrumb } from '../components/nav'
import PageTitle from '../components/ui/PageTitle'
import Eyebrow from '../components/ui/Eyebrow'
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

const STAT_COLOR = {
  Education:       'var(--brand-teal)',
  Career:          '#EF9F27',
  Awards:          '#8B5CF6',
  'Notable works': '#085041',
}

function Block({ block, switchTab, chapterSlug, navigate, practiceUrl }) {
  switch (block.type) {

    case 'teacher-voice':
      return (
        <div
          className="
            text-[14px] text-ink-2 leading-[1.9] mb-5
            [&>p]:mb-3.5 [&>p:last-child]:mb-0
            [&_strong]:text-ink [&_strong]:font-semibold
          "
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      )

    case 'section-head':
      return (
        <div className="mt-7 mb-4">
          <h2 className="text-[15px] font-bold text-ink mb-2">{block.text}</h2>
          <div className="h-[2px] w-8 rounded-full" style={{ background: 'var(--accent)' }} />
        </div>
      )

    case 'think-box':
      return (
        <div
          className="px-4 py-3.5 my-4 rounded-xl"
          style={{ background: 'var(--accent-soft)' }}
        >
          <Eyebrow style={{ color: 'var(--accent)', marginBottom: 8 }}>{block.label}</Eyebrow>
          <p className="text-[13px] text-ink-2 leading-[1.85]">{block.text}</p>
        </div>
      )

    case 'quote-block':
      return (
        <div className="bg-bg-2 border border-line rounded-2xl px-5 py-4 my-4">
          <p
            className="text-[15px] italic leading-[1.7] mb-3 pl-3.5 border-l-2 text-ink"
            style={{ borderLeftColor: 'var(--accent)' }}
          >
            {block.quote}
          </p>
          <p className="text-[13px] text-text-secondary leading-[1.75]">{block.context}</p>
        </div>
      )

    case 'author-stat': {
      const color = STAT_COLOR[block.label] || 'var(--accent)'
      return (
        <div
          className="px-4 py-3 mb-2.5 rounded-xl"
          style={{ background: color + '1e' }}
        >
          <Eyebrow style={{ color, marginBottom: 6 }}>{block.label}</Eyebrow>
          <p className="text-[13px] text-ink-2 leading-[1.7]">{block.value}</p>
        </div>
      )
    }

    case 'device-block':
      return (
        <div className="bg-surface-alt border border-line rounded-xl px-4 py-3.5 mb-3">
          <Eyebrow style={{ color: 'var(--text-tertiary)', marginBottom: 6 }}>{block.kind}</Eyebrow>
          <p
            className="text-[13px] italic mb-2 leading-relaxed"
            style={{ color: 'var(--accent)' }}
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
            style={{ color: 'var(--accent)' }}
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
              style={{ background: 'var(--accent)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-ink)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)' }}
            >
              🔥 Practice
            </button>
          )}
          {block.next && (
            <button
              onClick={() => switchTab(block.next)}
              className="px-4 py-2 rounded-pill text-sm font-semibold text-white
                         transition-all duration-[var(--duration-fast)] hover:opacity-90"
              style={{ background: 'var(--accent)' }}
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
      const data = await api.post('/learning/explain', {
        chapter_id: chapterId,
        question: q,
        language: 'en',
      })
      setMessages(m => [...m, {
        role: 'ai',
        explanation: data.explanation,
        keyPoints: data.key_points,
        examTip: data.exam_tip,
      }])
    } catch (err) {
      setMessages(m => [...m, { role: 'ai', error: err.message }])
    }
    setBusy(false)
  }

  return (
    <div className="max-w-[680px] mx-auto">
      <div className="bg-surface-alt border border-line rounded-2xl p-4">
        <div
          ref={listRef}
          className="chat-msg-list flex flex-col gap-3 overflow-y-auto pb-1"
          style={{ maxHeight: 280, scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              {msg.role === 'ai' && (
                <Eyebrow style={{ color: 'var(--accent)', marginBottom: 4 }}>AI TUTOR</Eyebrow>
              )}
              <div
                className="max-w-[82%] text-[13px] leading-relaxed px-3.5 py-2.5"
                style={{
                  background: msg.role === 'user' ? 'var(--accent)' : 'var(--bg)',
                  color: msg.role === 'user' ? '#fff' : 'var(--ink)',
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
                      <p className="mt-2 text-[12px] italic" style={{ color: 'var(--accent)' }}>
                        💡 {msg.examTip}
                      </p>
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
                  background: 'var(--bg)',
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
            style={{ background: 'var(--accent)' }}
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

      {/* Tab row — scrollable */}
      <div className="scroll-strip mb-1">
        {visibleTabs.map(tab => {
          const isActive = activeTab === tab.id
          const cleanLabel = stripTabLabel(tab.label)
          return (
            <button
              key={tab.id}
              ref={isActive ? activeTabRef : null}
              onClick={() => switchTab(tab.id)}
              className={`shrink-0 whitespace-nowrap px-3 py-2 rounded-[8px] text-[14px] transition-colors duration-[120ms] outline-none focus-visible:ring-2 focus-visible:ring-[rgba(42,123,111,0.30)] focus-visible:ring-offset-1
                ${isActive
                  ? 'bg-brand-teal text-white font-semibold shadow-[0_2px_8px_rgba(42,123,111,0.22)]'
                  : 'bg-transparent text-text-muted font-medium hover:bg-brand-teal-soft hover:text-brand-teal'
                }`}
            >
              {cleanLabel}
            </button>
          )
        })}
      </div>

      {/* Panel content */}
      {panel?.type === 'practice' ? (
        <ChapterPracticeExam
          questions={adaptAllQuestions(practiceContent)}
          chapterMeta={{ title: content.title, meta: content.eyebrow, subject: content.author }}
          chapterSlug={chapterSlug}
        />
      ) : panel?.type === 'attempt-history' ? (
        <div className="max-w-[680px] mx-auto">
          <AttemptHistorySection lessonSlug={lesson || chapterSlug} />
        </div>
      ) : panel?.type === 'askai' ? (
        <AskAIPanel chapterSlug={chapterSlug} />
      ) : (
        <div className="max-w-[680px] mx-auto">
          {panel?.blocks?.map((block, i) => (
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
