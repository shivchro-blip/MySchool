/**
 * Strips a leading emoji character (and trailing space) from a tab label.
 * Matches any sequence of non-ASCII codepoints at the start of the string.
 */
export function stripTabLabel(label) {
  const m = String(label).match(/^([^\x00-\x7F]+)\s*(.*)/u)
  return m ? m[2].trim() : String(label).trim()
}

/**
 * Returns the most contextually appropriate emoji icon for a tab.
 *
 * Decision rules (in priority order):
 *   1. Person / author tabs          → 👤
 *   2. Pre-reading / preparation     → 💭
 *   3. Written introduction          → 📝
 *   4. Main content — by label       → 📖 / 📜 / 🎙️ / 🎭
 *   5. Important quoted lines        → 🔑
 *   6. Vocabulary / glossary         → 📚
 *   7. Literary analysis             → 🔍
 *   8. Deeper insight / meaning      → 💡
 *   9. Questions / Q&A               → ❓
 *  10. Written activities            → ✏️
 *  11. Exam practice                 → 🔥
 *  12. AI assistant                  → 🤖
 *  13. Location-based phase labels   → derived from the place name
 *  14. Ambiguous                     → null (render tab with no icon)
 *
 * @param {string} label       - Raw tab label; may include a leading emoji.
 * @param {string} [contentType] - Chapter type hint: 'prose'|'poem'|'drama'|''
 * @returns {string|null}
 */
export function resolveTabIcon(label, contentType = '') {
  try {
    const text = stripTabLabel(label).toLowerCase()

    // ── Person / author ───────────────────────────────────────────────────
    if (/^(author|poet|about the author|about the poet)/.test(text)) return '👤'

    // ── Pre-reading / warm-up ────────────────────────────────────────────
    if (/^before we read/.test(text)) return '💭'

    // ── Written introduction ──────────────────────────────────────────────
    if (/^introduction/.test(text)) return '📝'

    // ── Main content — resolved from label, not contentType ───────────────
    if (/^text explained/.test(text))            return '📖'
    if (/^stanza by stanza|^stanzas$/.test(text)) return '📜'
    if (/^lines explained/.test(text))           return '📜'
    if (/^speech explained/.test(text))          return '🎙️'
    if (/^play explained/.test(text))            return '🎭'

    // ── Key quoted lines ──────────────────────────────────────────────────
    if (/^key lines?$/.test(text)) return '🔑'

    // ── Vocabulary ────────────────────────────────────────────────────────
    if (/^glossary/.test(text)) return '📚'

    // ── Literary analysis ─────────────────────────────────────────────────
    // "Themes & Devices" — analytical investigation
    if (/^themes/.test(text) || /themes.*devices|literary devices/.test(text)) return '🔍'

    // ── Deeper insight ────────────────────────────────────────────────────
    // "Deeper meaning", "Deeper significance", "Symbolism"
    if (/deeper|meaning|significance|symbolism/.test(text)) return '💡'

    // ── Questions / Q&A ───────────────────────────────────────────────────
    if (/q&?a|questions? and answers?|^textbook/.test(text)) return '❓'

    // ── Written / creative activities ─────────────────────────────────────
    if (/^activities/.test(text)) return '✏️'

    // ── Exam practice ─────────────────────────────────────────────────────
    if (/^practice/.test(text)) return '🔥'

    // ── Attempt history ───────────────────────────────────────────────────
    if (/^attempt history/.test(text)) return '🕐'

    // ── AI assistant ──────────────────────────────────────────────────────
    if (/^ask ai/.test(text) || /^ai\b/.test(text)) return '🤖'

    // ── Location-based phase labels ───────────────────────────────────────
    // "Phase 1 — Village", "Phase 2 — City", "Act 2 — School", etc.
    if (/phase|act\s+\d/.test(text)) {
      // Extract the descriptor after the number/dash
      const after = text
        .replace(/^(phase|act)\s*\d*\s*[—\-–]?\s*/, '')
        .trim()

      if (!after) return null  // bare "Phase" with no location clue

      if (/village|rural|home|town/.test(after))             return '🏘️'
      if (/city|urban|metro/.test(after))                     return '🏙️'
      if (/farewell|goodbye|depart|leave|end/.test(after))    return '👋'
      if (/school|college|university|campus/.test(after))     return '🏫'
      if (/abroad|foreign|overseas|travel|journey/.test(after)) return '✈️'
      if (/forest|nature|outdoor|field/.test(after))          return '🌳'
      if (/hospital|doctor|clinic|health/.test(after))        return '🏥'

      // Phase with an unrecognised location — no icon rather than a wrong one
      return null
    }

    // ── Genuinely ambiguous — return null, render tab with no icon ────────
    return null
  } catch {
    return null
  }
}
