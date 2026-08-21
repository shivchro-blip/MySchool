/**
 * Strips a leading emoji character (and trailing space) from a tab label.
 * Matches any sequence of non-ASCII codepoints at the start of the string.
 */
export function stripTabLabel(label) {
  // Matches actual emoji glyphs only (Extended_Pictographic + variation
  // selector/ZWJ) — NOT "any non-ASCII", which used to also swallow
  // non-Latin-script labels (e.g. Tamil) that have no emoji prefix at all.
  const m = String(label).match(/^([\p{Extended_Pictographic}\u{FE0F}\u{200D}]+)\s*(.*)/u)
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
// Exact-match icons for Tamil-medium Computer Applications tab labels.
// Regex keyword-matching (as used below for English literature tabs) isn't
// safe here — Tamil words share short substrings (e.g. "வடிவ" vs "வடம்")
// that would collide. Keyed on the same stripped+lowercased text the rest
// of this function uses, so ASCII portions of mixed labels are lowercased.
const TAMIL_TAB_ICONS = {
  'அறிமுகம்': '📝',
  'கூறுகள்': '🧩',
  'கோப்பு வடிவங்கள்': '📁',
  'உருவாக்கம்': '🛠️',
  'பயன்பாடுகள்': '🎯',
  'dtp & பேஜ்மேக்கர்': '🖨️',
  'கருவிப்பெட்டி': '🧰',
  'உரை பதிப்பித்தல்': '✍️',
  'திரிக்கப்பட்ட உரை & சட்டகங்கள்': '🖼️',
  'வடிவமைப்பு & வரைதல்': '🎨',
  'மாஸ்டர் பக்கங்கள் & அச்சிடல்': '🖨️',
  'dbms அடிப்படைகள்': '📘',
  'தரவுதள மாதிரிகள்': '🗂️',
  'er மாதிரி': '🔗',
  'mysql': '🗄️',
  'sql கட்டளைகள்': '⌨️',
  'கட்டளை அமைப்பு & மாறிகள்': '⌨️',
  'echo & செயற்குறிகள்': '⚙️',
  'php & html இணைப்பு': '🔗',
  'செயற்கூறுகள்': '⚙️',
  'அணிகள்': '📊',
  'if கூற்று': '🔀',
  'if...else': '🔀',
  'switch கூற்று': '🔀',
  'for & while': '🔁',
  'do...while & foreach': '🔁',
  'html படிவங்கள்': '📋',
  'சரிபார்ப்பு & கோப்புகள்': '✅',
  'mysqli செயற்கூறுகள்': '⚙️',
  'முழுமையான எடுத்துக்காட்டு': '💻',
  'அடிப்படைகள் & பரிணாம வளர்ச்சி': '📘',
  'இணையம் / அக / புற இணையம்': '🌐',
  'நெறிமுறைகள் & osi மாதிரி': '📡',
  'ip முகவரி & url': '🔗',
  'dns கூறுகள்': '🧩',
  'வடங்களின் வகைகள்': '🔌',
  'ஈத்தர்நெட் வடமிடல்': '🔌',
  'திறந்த மூல மென்பொருள்': '🌐',
  'ns2 & opennms': '📡',
  'அறிமுகம் & பரிணாம வளர்ச்சி': '📝',
  'வணிக மாதிரிகள்': '💼',
  'நன்மைகள் & குறைபாடுகள்': '⚖️',
  'செலுத்தல் முறை வகைகள்': '💳',
  'ecs, neft, rtgs & மொபைல் வங்கி': '🏦',
  'அச்சுறுத்தல்கள் & பரிமாணங்கள்': '⚠️',
  'பாதுகாப்புத் தொழில்நுட்பங்கள்': '🔒',
  'edi அறிமுகம்': '📝',
  'வகைகள் & தரநிலைகள்': '🗃️',
}

export function resolveTabIcon(label, contentType = '') {
  try {
    const text = stripTabLabel(label).toLowerCase()

    if (TAMIL_TAB_ICONS[text]) return TAMIL_TAB_ICONS[text]

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
