export function validateStudentAnswer(answer) {
  const trimmed = (answer ?? '').trim()
  if (!trimmed) return { valid: false, reason: 'empty', message: null }
  if (trimmed.length < 10) return { valid: false, reason: 'too_short', message: 'Please write a little more before submitting.' }

  const lower = trimmed.toLowerCase()
  const compact = lower.replace(/\s+/g, '')
  const letterOnly = lower.replace(/[^a-z]/g, '')
  const letterCount = letterOnly.length
  const compactLen = compact.length

  // Mostly non-alphabetic (symbols, numbers, random punctuation)
  if (compactLen > 5 && letterCount / compactLen < 0.4)
    return { valid: false, reason: 'gibberish', message: 'Please write a meaningful answer before submitting.' }

  // Single character dominance (e.g. "aaaaaaa", "zzzzzzz")
  if (letterCount > 5) {
    const freq = {}
    for (const c of letterOnly) freq[c] = (freq[c] || 0) + 1
    const maxFreq = Math.max(...Object.values(freq))
    if (maxFreq / letterCount > 0.6)
      return { valid: false, reason: 'gibberish', message: 'Please write a meaningful answer before submitting.' }
  }

  // Very few distinct letters for a long string (e.g. "asdfasdf…" uses only a,s,d,f)
  if (letterCount >= 15) {
    const uniqueLetters = new Set(letterOnly).size
    if (uniqueLetters <= 4)
      return { valid: false, reason: 'gibberish', message: 'Please write a meaningful answer before submitting.' }
  }

  // Repeating chunk pattern — scan all starting positions so "asdfasdf…" starting mid-string is caught
  if (compactLen >= 6) {
    const maxChunkLen = Math.min(8, Math.floor(compactLen / 2))
    for (let len = 2; len <= maxChunkLen; len++) {
      const seen = new Set()
      for (let start = 0; start <= compactLen - len; start++) {
        const chunk = compact.substring(start, start + len)
        if (!/[a-z]/.test(chunk) || seen.has(chunk)) continue
        seen.add(chunk)
        let count = 0, pos = 0
        while (pos <= compactLen - len) {
          if (compact.substring(pos, pos + len) === chunk) { count++; pos += len }
          else pos++
        }
        if (count >= 2 && count * len / compactLen > 0.5)
          return { valid: false, reason: 'gibberish', message: 'Please write a meaningful answer before submitting.' }
      }
    }
  }

  // Very low vowel ratio (e.g. "dfghjklkjhgf", "xcvbnm")
  if (letterCount >= 8) {
    const vowelCount = (letterOnly.match(/[aeiou]/g) || []).length
    if (vowelCount / letterCount < 0.05)
      return { valid: false, reason: 'gibberish', message: 'Please write a meaningful answer before submitting.' }
  }

  return { valid: true, reason: null, message: null }
}
