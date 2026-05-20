// Exports all web practice content as a single JSON asset for the Flutter app.
// Run: node scripts/export-practice-json.mjs (from frontend/web/)
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const CHAPTERS = [
  'the-portrait-of-a-lady',
  'after-twenty-years',
  'the-queen-of-boxing',
  'confessions-of-a-born-spectator',
  'a-shot-in-the-dark',
  'once-upon-a-time',
  'forgetting',
  'lines-written-in-early-spring',
  'the-first-patient',
  'tight-corners',
  'macavity-the-mystery-cat',
  'with-the-photographer',
  'everest-is-not-the-only-peak',
  'the-convocation-address',
  'the-singing-lesson',
  'the-accidental-tourist',
  'the-hollow-crown',
  'the-never-never-nest',
]

const out = {}

for (const slug of CHAPTERS) {
  try {
    const mod = await import(`../src/content/practice/${slug}.js`)
    out[slug] = mod.default
    console.log(`✓  ${slug}`)
  } catch (e) {
    console.warn(`✗  ${slug}: ${e.message}`)
  }
}

const outDir  = join(__dirname, '../../app/assets')
const outPath = join(outDir, 'practice_data.json')
mkdirSync(outDir, { recursive: true })
writeFileSync(outPath, JSON.stringify(out))
console.log(`\n✓  ${Object.keys(out).length} chapters → ${outPath}`)
