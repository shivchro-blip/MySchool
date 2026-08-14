import practiceRegistry from '../content/practiceRegistry'

// Chapters that pre-declare practice/askai tabs use them as-is.
// All others get them injected here so no data file needs editing.
// Shared by LearnRichPage (in-page tab bar) and LessonDetailPage (tile grid)
// so both reflect the same set of real, navigable section ids.
export function buildAllTabs(content, chapterSlug) {
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
}
