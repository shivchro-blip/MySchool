const DRAFT_PREFIX = 'practice_draft_web_'
const DRAFT_VERSION = 1

function hasWindow() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
}

function normalizeSegment(value) {
  const trimmed = String(value ?? '').trim()
  if (!trimmed) return ''
  if (trimmed === '+1' || trimmed.toLowerCase() === 'plus1') return 'Class_11'
  if (trimmed === '+2' || trimmed.toLowerCase() === 'plus2') return 'Class_12'
  const compact = trimmed.replace(/\s+/g, '_')
  return compact.charAt(0).toUpperCase() + compact.slice(1)
}

export function buildPracticeDraftKey({ classLevel, subjectSlug, lessonSlug }) {
  const scope = [classLevel, subjectSlug]
    .map(normalizeSegment)
    .filter(Boolean)
    .join('_')
  return `${DRAFT_PREFIX}${scope}_${normalizeSegment(lessonSlug)}`
}

export function readPracticeDraft(key) {
  if (!hasWindow() || !key) return null

  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    if (parsed.version !== DRAFT_VERSION) return null
    if (typeof parsed.lessonSlug !== 'string' || !parsed.lessonSlug.trim()) return null
    if (!Number.isInteger(parsed.totalQuestions) || parsed.totalQuestions < 0) return null
    if (!Number.isInteger(parsed.currentQuestionIndex) || parsed.currentQuestionIndex < 0) return null
    return parsed
  } catch {
    return null
  }
}

export function writePracticeDraft(key, draft) {
  if (!hasWindow() || !key) return
  try {
    localStorage.setItem(key, JSON.stringify(draft))
  } catch {
    // Ignore quota and serialization failures.
  }
}

export function clearPracticeDraft(key) {
  if (!hasWindow() || !key) return
  try {
    localStorage.removeItem(key)
  } catch {
    // Ignore storage failures.
  }
}

export function clampIndex(index, total) {
  if (!Number.isInteger(index)) return 0
  if (!Number.isInteger(total) || total <= 0) return 0
  return Math.max(0, Math.min(total - 1, index))
}
