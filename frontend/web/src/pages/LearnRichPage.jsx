import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../api/client'
import practiceRegistry from '../content/practiceRegistry'
import PracticeRichPage from './PracticeRichPage'
import { resolveTabIcon, stripTabLabel } from '../utils/resolveTabIcon'

const STAT_COLOR = {
  Education:       '#0ea5e9',
  Career:          '#d97706',
  Awards:          '#7c3aed',
  'Notable works': '#059669',
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
          className="px-4 py-3.5 my-4 rounded-r-xl border-l-[3px]"
          style={{ background: 'var(--accent-soft)', borderLeftColor: 'var(--accent)' }}
        >
          <p
            className="text-[10px] font-bold tracking-[0.12em] uppercase mb-2"
            style={{ color: 'var(--accent)' }}
          >
            {block.label}
          </p>
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
          <p className="text-[13px] text-ink-3 leading-[1.75]">{block.explain}</p>
        </div>
      )

    case 'author-stat': {
      const color = STAT_COLOR[block.label] || 'var(--accent)'
      return (
        <div
          className="px-4 py-3 mb-2.5 rounded-r-xl"
          style={{ background: color + '12', borderLeft: `3px solid ${color}` }}
        >
          <p
            className="text-[10px] font-bold tracking-[0.1em] uppercase mb-1.5"
            style={{ color }}
          >
            {block.label}
          </p>
          <p className="text-[13px] text-ink-2 leading-[1.7]">{block.value}</p>
        </div>
      )
    }

    case 'device-block':
      return (
        <div className="bg-bg-2 border border-line rounded-xl px-4 py-3.5 mb-3">
          <p className="text-[10px] font-bold tracking-widest uppercase text-ink-4 mb-1.5">
            {block.kind}
          </p>
          <p
            className="text-[13px] italic mb-2 leading-relaxed"
            style={{ color: 'var(--accent)' }}
          >
            {block.line}
          </p>
          <p className="text-[13px] text-ink-2 leading-[1.75]">{block.exp}</p>
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
            <p className="text-[13px] text-ink-2 leading-relaxed">{block.def}</p>
            {block.eg && (
              <p className="text-[11px] text-ink-4 mt-0.5 leading-relaxed">{block.eg}</p>
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
                         text-ink-2 bg-bg-2 hover:bg-bg-sunk transition-all duration-[var(--duration-fast)]"
            >
              ← Back
            </button>
          )}
          {block.practice && (
            <button
              onClick={() => switchTab('practice')}
              className="px-4 py-2 rounded-pill text-sm font-semibold border border-line
                         text-ink-2 bg-bg-2 hover:bg-bg-sunk transition-all duration-[var(--duration-fast)]"
            >
              Practice questions
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
    <div className="max-w-[660px]">
      <div className="bg-bg-2 border border-line rounded-2xl p-4">
        <div
          ref={listRef}
          className="chat-msg-list flex flex-col gap-3 overflow-y-auto pb-1"
          style={{ maxHeight: 280, scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              {msg.role === 'ai' && (
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] mb-1" style={{ color: '#2A7B6F' }}>
                  AI TUTOR
                </p>
              )}
              <div
                className="max-w-[82%] text-[13px] leading-relaxed px-3.5 py-2.5"
                style={{
                  background: msg.role === 'user' ? '#1C2B4A' : 'var(--bg)',
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
                        style={{ borderTop: '1px solid rgba(0,0,0,.08)' }}
                      >
                        {msg.keyPoints.map((p, j) => (
                          <li key={j} className="ml-3 list-disc">{p}</li>
                        ))}
                      </ul>
                    )}
                    {msg.examTip && (
                      <p className="mt-2 text-[12px] italic" style={{ color: '#2A7B6F' }}>
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
                    className="block w-1.5 h-1.5 rounded-full animate-bounce"
                    style={{ background: 'var(--ink-4)', animationDelay: `${i * 0.2}s` }}
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
            className="flex-1 border border-line rounded-pill px-4 py-2 text-[13px] text-ink bg-white focus:outline-none focus:border-[#1C2B4A] transition-colors"
          />
          <button
            onClick={send}
            disabled={busy || !input.trim()}
            className="px-4 py-2 rounded-pill text-[13px] font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
            style={{ background: '#1C2B4A' }}
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  )
}

export default function LearnRichPage({ content, chapterSlug }) {
  const [activeTab, setActiveTab] = useState(content.tabs[0].id)
  const navigate = useNavigate()
  const { year, subject, category, lesson } = useParams()
  const practiceUrl = (year && subject && category && lesson)
    ? `/${year}/${subject}/${category}/${lesson}/practice`
    : `/${chapterSlug}/practice`

  // Derive content type from the eyebrow field (e.g. "Unit 1 · Prose · ...")
  const contentType = /\bPoem\b/i.test(content.eyebrow) ? 'poem'
    : /\bPlay\b|\bDrama\b/i.test(content.eyebrow) ? 'drama'
    : 'prose'

  // Ref on the active pill so it scrolls into view when the tab changes
  const activeTabRef = useRef(null)
  useEffect(() => {
    activeTabRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [activeTab])

  function switchTab(id) {
    setActiveTab(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
    if (!hasAskAI) {
      extra.push({ id: 'askai', label: 'Ask AI', type: 'askai', blocks: [] })
    }
    return extra.length ? [...tabs, ...extra] : tabs
  })()

  const visibleTabs = allTabs.filter(t => !t.hidden)
  const panel = allTabs.find(t => t.id === activeTab)

  return (
    <div>
      {/* Chapter header — white card */}
      <div className="bg-white border border-line rounded-2xl px-6 pt-5 pb-5 mb-5">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-2"
          style={{ color: '#2A7B6F' }}
        >
          {content.eyebrow}
        </p>
        <h1
          className="font-serif text-[26px] font-bold leading-tight mb-1.5"
          style={{ color: 'var(--ink)' }}
        >
          {content.title}
        </h1>
        <p className="text-sm font-semibold mb-4" style={{ color: '#2A7B6F' }}>
          {content.author}
        </p>
        <div className="flex gap-1.5 flex-wrap">
          {content.pills.map(p => (
            <span
              key={p}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-full"
              style={{ background: '#EAE5D8', color: '#5A5244' }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Tab row — pill style, scrollable */}
      <div className="scroll-strip mb-1">
        {visibleTabs.map(tab => {
          const isActive = activeTab === tab.id
          const cleanLabel = stripTabLabel(tab.label)
          const icon = resolveTabIcon(tab.label, contentType)
          return (
            <button
              key={tab.id}
              ref={isActive ? activeTabRef : null}
              onClick={() => switchTab(tab.id)}
              className="shrink-0 whitespace-nowrap text-[13px] font-medium rounded-pill transition-all duration-[120ms] outline-none"
              style={
                isActive
                  ? {
                      padding: '7px 16px',
                      background: '#1C2B4A',
                      color: '#fff',
                      border: 'none',
                      boxShadow: '0 2px 8px rgba(28,43,74,.22)',
                    }
                  : {
                      padding: '7px 16px',
                      background: 'var(--bg)',
                      color: 'var(--ink)',
                      border: '1.5px solid var(--line)',
                    }
              }
            >
              {icon && <span className="mr-1">{icon}</span>}{cleanLabel}
            </button>
          )
        })}
      </div>

      {/* Panel content */}
      {panel?.type === 'practice' ? (
        <PracticeRichPage content={practiceRegistry[chapterSlug]} chapterSlug={chapterSlug} />
      ) : panel?.type === 'askai' ? (
        <AskAIPanel chapterSlug={chapterSlug} />
      ) : (
        <div className="max-w-[660px]">
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
    </div>
  )
}
