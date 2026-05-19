#!/usr/bin/env node
/**
 * Convert a teacher-style lesson HTML file to a JS content data file.
 *
 * Usage:
 *   node scripts/html-to-content.js <path-to-html> <chapter-slug>
 *
 * Example:
 *   node scripts/html-to-content.js ../../Dummy_files/learn_portrait_teacher_style.html the-portrait-of-a-lady
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { load } from 'cheerio'

const [, , htmlFile, slug] = process.argv

if (!htmlFile || !slug) {
  console.error('Usage: node scripts/html-to-content.js <html-file> <chapter-slug>')
  process.exit(1)
}

const html = readFileSync(htmlFile, 'utf-8')
const $ = load(html)

// ── Hero ──────────────────────────────────────────────────────────────────────
const eyebrow = $('.hero-eyebrow').text().trim()
const title   = $('.hero-title').text().trim()
const author  = $('.hero-author').text().trim()
const pills   = $('.pill').map((_, el) => $(el).text().trim()).get()

// ── Tabs + Panels ─────────────────────────────────────────────────────────────
const tabs = []

$('.tabs .tab').each((_, el) => {
  const onclick = $(el).attr('onclick') || ''
  const idMatch = onclick.match(/sw\('([^']+)'/)
  if (!idMatch) return

  const id    = idMatch[1]
  const label = $(el).text().trim()
  const panel = $(`#p-${id}`)

  tabs.push({ id, label, blocks: extractBlocks(panel) })
})

function extractBlocks(container) {
  const blocks = []

  container.children().each((_, el) => {
    const $el = $(el)
    const cls = ($el.attr('class') || '').split(/\s+/)

    if (cls.includes('teacher-voice')) {
      const inner = ($el.html() || '')
        .replace(/class="highlight"/g, 'class="rich-highlight"')
        .trim()
      blocks.push({ type: 'teacher-voice', html: inner })

    } else if (cls.includes('section-head')) {
      blocks.push({ type: 'section-head', text: $el.text().trim() })

    } else if (cls.includes('think-box')) {
      blocks.push({
        type:  'think-box',
        label: $el.find('.think-label').text().trim(),
        text:  $el.find('.think-text').text().trim(),
      })

    } else if (cls.includes('quote-block')) {
      blocks.push({
        type:    'quote-block',
        quote:   $el.find('.quote-text').text().trim(),
        explain: $el.find('.quote-explain').text().trim(),
      })

    } else if (cls.includes('author-stat')) {
      blocks.push({
        type:  'author-stat',
        label: $el.find('.author-stat-label').text().trim(),
        value: $el.find('.author-stat-val').text().trim(),
      })

    } else if (cls.includes('device-block')) {
      blocks.push({
        type: 'device-block',
        kind: $el.find('.device-type').text().trim(),
        line: $el.find('.device-line').text().trim(),
        exp:  $el.find('.device-exp').text().trim(),
      })

    } else if (cls.includes('gloss-row')) {
      const eg = $el.find('.gloss-eg').text().trim()
      blocks.push({
        type: 'gloss-row',
        word: $el.find('.gloss-word').text().trim(),
        def:  $el.find('.gloss-def').text().trim(),
        ...(eg ? { eg } : {}),
      })

    } else if (cls.includes('btn-row')) {
      const nav = { type: 'nav' }

      $el.find('button, a').each((_, btn) => {
        const $btn    = $(btn)
        const onclick = $btn.attr('onclick') || ''
        const text    = $btn.text().trim()
        const btnCls  = ($btn.attr('class') || '').split(/\s+/)
        const isPrimary = btnCls.includes('primary')
        const swMatch = onclick.match(/sw\('([^']+)'/)

        if (onclick.includes('sendPrompt')) {
          if (onclick.toLowerCase().includes('practice')) {
            nav.practice = true
          }
          // other sendPrompt buttons (next lesson etc.) are dropped for now
        } else if (swMatch) {
          if (isPrimary) {
            nav.next      = swMatch[1]
            nav.nextLabel = text
          } else {
            nav.back = swMatch[1]
          }
        }
      })

      blocks.push(nav)
    }
    // unknown elements are silently skipped
  })

  return blocks
}

// ── Write content file ────────────────────────────────────────────────────────
const content = { eyebrow, title, author, pills, tabs }
mkdirSync('src/content/chapters', { recursive: true })
const outFile = `src/content/chapters/${slug}.js`
writeFileSync(outFile, `export default ${JSON.stringify(content, null, 2)}\n`)
console.log(`✓ ${outFile}`)

// ── Update registry ───────────────────────────────────────────────────────────
const registryFile = 'src/content/registry.js'
let registry = readFileSync(registryFile, 'utf-8')

// camelCase variable name from slug
const varName = slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())

const importLine = `import ${varName} from './chapters/${slug}'`
const entryLine  = `  '${slug}': ${varName},`

// check by path so existing imports with different var names aren't duplicated
if (!registry.includes(`'./chapters/${slug}'`)) {
  // insert after the last existing import line
  registry = registry.replace(/(import [^\n]+\n)(?!import)/, `$1${importLine}\n`)
}

if (!registry.includes(`'${slug}':`)) {
  // insert before the closing }
  registry = registry.replace(/^}$/m, `${entryLine}\n}`)
}

writeFileSync(registryFile, registry)
console.log(`✓ src/content/registry.js updated`)
console.log(`\nDone. Verify with: npm run build`)
