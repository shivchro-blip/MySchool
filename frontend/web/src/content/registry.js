// Lazy content registry — each chapter is loaded only when first visited.
// Call registry.has(slug) to check existence, registry.load(slug) to fetch.
const LOADERS = {
  'the-portrait-of-a-lady':          () => import('./Class_11/English/chapters/the-portrait-of-a-lady'),
  'after-twenty-years':              () => import('./Class_11/English/chapters/after-twenty-years'),
  'the-queen-of-boxing':             () => import('./Class_11/English/chapters/the-queen-of-boxing'),
  'confessions-of-a-born-spectator': () => import('./Class_11/English/chapters/confessions-of-a-born-spectator'),
  'a-shot-in-the-dark':              () => import('./Class_11/English/chapters/a-shot-in-the-dark'),
  'once-upon-a-time':                () => import('./Class_11/English/chapters/once-upon-a-time'),
  'forgetting':                      () => import('./Class_11/English/chapters/forgetting'),
  'lines-written-in-early-spring':   () => import('./Class_11/English/chapters/lines-written-in-early-spring'),
  'the-first-patient':               () => import('./Class_11/English/chapters/the-first-patient'),
  'tight-corners':                   () => import('./Class_11/English/chapters/tight-corners'),
  'macavity-the-mystery-cat':        () => import('./Class_11/English/chapters/macavity-the-mystery-cat'),
  'with-the-photographer':           () => import('./Class_11/English/chapters/with-the-photographer'),
  'everest-is-not-the-only-peak':    () => import('./Class_11/English/chapters/everest-is-not-the-only-peak'),
  'the-convocation-address':         () => import('./Class_11/English/chapters/the-convocation-address'),
  'the-singing-lesson':              () => import('./Class_11/English/chapters/the-singing-lesson'),
  'the-accidental-tourist':          () => import('./Class_11/English/chapters/the-accidental-tourist'),
  'the-hollow-crown':                () => import('./Class_11/English/chapters/the-hollow-crown'),
  'the-never-never-nest':            () => import('./Class_11/English/chapters/the-never-never-nest'),
  'two-gentlemen-of-verona':         () => import('./Class_12/English/chapters/two-gentlemen-of-verona'),
  'the-castle':                      () => import('./Class_12/English/chapters/the-castle'),
  'god-sees-the-truth-but-waits':    () => import('./Class_12/English/chapters/god-sees-the-truth-but-waits'),
  'a-nice-cup-of-tea':               () => import('./Class_12/English/chapters/a-nice-cup-of-tea'),
  'our-casuarina-tree':              () => import('./Class_12/English/chapters/our-casuarina-tree'),
  'life-of-pi':                      () => import('./Class_12/English/chapters/life-of-pi'),
  'in-celebration-of-being-alive':   () => import('./Class_12/English/chapters/in-celebration-of-being-alive'),
  'all-the-worlds-a-stage':          () => import('./Class_12/English/chapters/all-the-worlds-a-stage'),
  'the-hour-of-truth':               () => import('./Class_12/English/chapters/the-hour-of-truth'),
  'the-summit':                      () => import('./Class_12/English/chapters/the-summit'),
  'ulysses':                         () => import('./Class_12/English/chapters/ulysses'),
  'the-midnight-visitor':            () => import('./Class_12/English/chapters/the-midnight-visitor'),
  'the-chair':                       () => import('./Class_12/English/chapters/the-chair'),
  'a-father-to-his-son':             () => import('./Class_12/English/chapters/a-father-to-his-son'),
  'all-summer-in-a-day':             () => import('./Class_12/English/chapters/all-summer-in-a-day'),
  'on-the-rule-of-the-road':         () => import('./Class_12/English/chapters/on-the-rule-of-the-road'),
  'incident-of-the-french-camp':     () => import('./Class_12/English/chapters/incident-of-the-french-camp'),
  'remember-caesar':                 () => import('./Class_12/English/chapters/remember-caesar'),
  'chapter-01-multimedia':           () => import('./Class_12/ComputerApplications/chapters/chapter-01-multimedia'),
  'chapter-02-pagemaker':            () => import('./Class_12/ComputerApplications/chapters/chapter-02-pagemaker'),
  'chapter-03-dbms':                 () => import('./Class_12/ComputerApplications/chapters/chapter-03-dbms'),
  'chapter-04-php-intro':            () => import('./Class_12/ComputerApplications/chapters/chapter-04-php-intro'),
  'chapter-05-php-functions-arrays': () => import('./Class_12/ComputerApplications/chapters/chapter-05-php-functions-arrays'),
  'chapter-06-php-conditionals':      () => import('./Class_12/ComputerApplications/chapters/chapter-06-php-conditionals'),
  'chapter-07-php-loops':             () => import('./Class_12/ComputerApplications/chapters/chapter-07-php-loops'),
  'chapter-08-forms-files':           () => import('./Class_12/ComputerApplications/chapters/chapter-08-forms-files'),
  'chapter-09-php-mysql':             () => import('./Class_12/ComputerApplications/chapters/chapter-09-php-mysql'),
  'chapter-10-networks-intro':        () => import('./Class_12/ComputerApplications/chapters/chapter-10-networks-intro'),
  'chapter-11-network-protocols':     () => import('./Class_12/ComputerApplications/chapters/chapter-11-network-protocols'),
  'chapter-12-dns':                   () => import('./Class_12/ComputerApplications/chapters/chapter-12-dns'),
  'chapter-13-network-cabling':       () => import('./Class_12/ComputerApplications/chapters/chapter-13-network-cabling'),
  'chapter-14-open-source':           () => import('./Class_12/ComputerApplications/chapters/chapter-14-open-source'),
  'chapter-15-ecommerce':             () => import('./Class_12/ComputerApplications/chapters/chapter-15-ecommerce'),
  'chapter-16-payment-systems':       () => import('./Class_12/ComputerApplications/chapters/chapter-16-payment-systems'),
  'chapter-17-ecommerce-security':    () => import('./Class_12/ComputerApplications/chapters/chapter-17-ecommerce-security'),
  'chapter-18-edi':                   () => import('./Class_12/ComputerApplications/chapters/chapter-18-edi'),
  'chapter-01-introduction-to-computers':                () => import('./Class_11/ComputerApplications/chapters/chapter-01-introduction-to-computers'),
  'chapter-02-number-systems':                           () => import('./Class_11/ComputerApplications/chapters/chapter-02-number-systems'),
  'chapter-03-computer-organisation':                    () => import('./Class_11/ComputerApplications/chapters/chapter-03-computer-organisation'),
  'chapter-04-theoretical-concepts-of-operating-system': () => import('./Class_11/ComputerApplications/chapters/chapter-04-theoretical-concepts-of-operating-system'),
}

// Older chapter files (Class 11 CA) predate the { eyebrow, title, author,
// pills, tabs } shape LearnRichPage renders — they use { chapterNumber,
// subject, classLabel, curriculum, sections: [{ id, title, content: mdString }] }.
// Normalize here, once, so every consumer of registry.load() (LessonDetailPage,
// SectionPage → LearnRichPage) always receives the tabs shape.
function mdToHtml(md) {
  if (!md) return ''
  const boldify = s => s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
  let html = ''
  let listBuf = []
  let paraBuf = []
  const flushList = () => {
    if (listBuf.length) html += `<ul>${listBuf.map(l => `<li>${boldify(l)}</li>`).join('')}</ul>`
    listBuf = []
  }
  const flushPara = () => {
    if (paraBuf.length) html += `<p>${boldify(paraBuf.join(' '))}</p>`
    paraBuf = []
  }
  for (const raw of md.split('\n')) {
    const line = raw.trim()
    if (!line) { flushList(); flushPara(); continue }
    if (line.startsWith('- ')) { flushPara(); listBuf.push(line.slice(2)); continue }
    flushList()
    paraBuf.push(line)
  }
  flushList()
  flushPara()
  return html
}

function normalizeContent(raw) {
  if (!raw || raw.tabs) return raw

  return {
    eyebrow: [raw.classLabel, raw.subject].filter(Boolean).join(' · '),
    title:   raw.title,
    author:  raw.curriculum ?? '',
    pills:   [raw.classLabel, raw.curriculum].filter(Boolean),
    tabs: (raw.sections ?? []).map(sec => ({
      id:    sec.id,
      label: sec.title,
      blocks: [
        { type: 'section-head', text: sec.title },
        { type: 'teacher-voice', html: mdToHtml(sec.content) },
        ...(sec.nav ? [{ type: 'nav', ...sec.nav }] : []),
      ],
    })),
  }
}

const registry = {
  has:  (slug) => slug in LOADERS,
  load: async (slug) => {
    const loader = LOADERS[slug]
    if (!loader) return null
    const mod = await loader()
    return normalizeContent(mod.default)
  },
}

export default registry
