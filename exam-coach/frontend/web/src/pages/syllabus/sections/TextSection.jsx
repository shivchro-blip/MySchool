import { useState, useEffect } from 'react'
import { Card } from '../../../components/ui'
import contentRegistry from '../../../content/registry'
import LearnRichPage from '../../LearnRichPage'

export default function TextSection({ lessonSlug, lessonTitle }) {
  const hasContent = lessonSlug in contentRegistry
  const [content, setContent] = useState(null)

  useEffect(() => {
    if (!hasContent) return
    let cancelled = false
    contentRegistry[lessonSlug]().then(mod => {
      if (!cancelled) setContent(mod.default ?? mod)
    })
    return () => { cancelled = true }
  }, [lessonSlug, hasContent])

  if (hasContent) {
    if (!content) return (
      <div className="flex items-center justify-center py-24">
        <div className="w-7 h-7 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
    return <LearnRichPage content={content} chapterSlug={lessonSlug} />
  }

  return (
    <Card padding="lg">
      <p className="text-xs font-bold text-ink-4 uppercase tracking-wide mb-3">
        Full Text
      </p>
      <p className="text-sm text-ink-3 italic mb-4">
        The complete text of "{lessonTitle}" will appear here.
      </p>
      <div className="space-y-2">
        {[80, 95, 70, 88, 60].map((w, i) => (
          <div
            key={i}
            className="h-3.5 bg-bg-sunk rounded-full animate-pulse"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
    </Card>
  )
}
