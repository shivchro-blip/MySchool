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
  'chapter-05-working-with-windows-operating-system':    () => import('./Class_11/ComputerApplications/chapters/chapter-05-working-with-windows-operating-system'),
  'chapter-06-introduction-to-word-processor':           () => import('./Class_11/ComputerApplications/chapters/chapter-06-introduction-to-word-processor'),
  'chapter-07-working-with-openoffice-calc':             () => import('./Class_11/ComputerApplications/chapters/chapter-07-working-with-openoffice-calc'),
  'chapter-08-presentation-basics':                      () => import('./Class_11/ComputerApplications/chapters/chapter-08-presentation-basics'),
  'chapter-09-introduction-to-internet-and-email':       () => import('./Class_11/ComputerApplications/chapters/chapter-09-introduction-to-internet-and-email'),
  'chapter-10-html-structural-tags':                     () => import('./Class_11/ComputerApplications/chapters/chapter-10-html-structural-tags'),
  'chapter-11-html-formatting-tables-lists-links':       () => import('./Class_11/ComputerApplications/chapters/chapter-11-html-formatting-tables-lists-links'),
  'chapter-12-html-multimedia-elements-and-forms':       () => import('./Class_11/ComputerApplications/chapters/chapter-12-html-multimedia-elements-and-forms'),
  'chapter-13-css-cascading-style-sheets':               () => import('./Class_11/ComputerApplications/chapters/chapter-13-css-cascading-style-sheets'),
  'chapter-14-introduction-to-javascript':               () => import('./Class_11/ComputerApplications/chapters/chapter-14-introduction-to-javascript'),
  'chapter-15-control-structure-in-javascript':          () => import('./Class_11/ComputerApplications/chapters/chapter-15-control-structure-in-javascript'),
  'chapter-16-javascript-functions':                     () => import('./Class_11/ComputerApplications/chapters/chapter-16-javascript-functions'),
  'chapter-17-computer-ethics-and-cyber-security':       () => import('./Class_11/ComputerApplications/chapters/chapter-17-computer-ethics-and-cyber-security'),
  'chapter-18-tamil-computing':                          () => import('./Class_11/ComputerApplications/chapters/chapter-18-tamil-computing'),
  'cs-chapter-01-introduction-to-computers':                        () => import('./Class_11/ComputerScience/chapters/cs-chapter-01-introduction-to-computers'),
  'cs-chapter-02-number-systems':                                   () => import('./Class_11/ComputerScience/chapters/cs-chapter-02-number-systems'),
  'cs-chapter-03-computer-organization':                            () => import('./Class_11/ComputerScience/chapters/cs-chapter-03-computer-organization'),
  'cs-chapter-04-theoretical-concepts-of-operating-system':         () => import('./Class_11/ComputerScience/chapters/cs-chapter-04-theoretical-concepts-of-operating-system'),
  'cs-chapter-05-working-with-windows-operating-system':            () => import('./Class_11/ComputerScience/chapters/cs-chapter-05-working-with-windows-operating-system'),
  'cs-chapter-06-specification-and-abstraction':                    () => import('./Class_11/ComputerScience/chapters/cs-chapter-06-specification-and-abstraction'),
  'cs-chapter-07-composition-and-decomposition':                    () => import('./Class_11/ComputerScience/chapters/cs-chapter-07-composition-and-decomposition'),
  'cs-chapter-08-iteration-and-recursion':                          () => import('./Class_11/ComputerScience/chapters/cs-chapter-08-iteration-and-recursion'),
  'cs-chapter-09-introduction-to-cpp':                               () => import('./Class_11/ComputerScience/chapters/cs-chapter-09-introduction-to-cpp'),
  'cs-chapter-10-flow-of-control':                                   () => import('./Class_11/ComputerScience/chapters/cs-chapter-10-flow-of-control'),
  'cs-chapter-11-functions':                                         () => import('./Class_11/ComputerScience/chapters/cs-chapter-11-functions'),
  'cs-chapter-12-arrays-and-structures':                             () => import('./Class_11/ComputerScience/chapters/cs-chapter-12-arrays-and-structures'),
  'cs-chapter-13-introduction-to-oop-techniques':                    () => import('./Class_11/ComputerScience/chapters/cs-chapter-13-introduction-to-oop-techniques'),
  'cs-chapter-14-classes-and-objects':                                () => import('./Class_11/ComputerScience/chapters/cs-chapter-14-classes-and-objects'),
  'cs-chapter-15-polymorphism':                                       () => import('./Class_11/ComputerScience/chapters/cs-chapter-15-polymorphism'),
  'cs-chapter-16-inheritance':                                        () => import('./Class_11/ComputerScience/chapters/cs-chapter-16-inheritance'),
  'cs-chapter-17-computer-ethics-and-cyber-security':                 () => import('./Class_11/ComputerScience/chapters/cs-chapter-17-computer-ethics-and-cyber-security'),
  'cs-chapter-18-tamil-computing':                                    () => import('./Class_11/ComputerScience/chapters/cs-chapter-18-tamil-computing'),
  'chapter-01-functions':                        () => import('./Class_12/ComputerScience/chapters/chapter-01-functions'),
  'chapter-02-data-abstraction':                 () => import('./Class_12/ComputerScience/chapters/chapter-02-data-abstraction'),
  'chapter-03-scoping':                          () => import('./Class_12/ComputerScience/chapters/chapter-03-scoping'),
  'chapter-04-algorithmic-strategies':           () => import('./Class_12/ComputerScience/chapters/chapter-04-algorithmic-strategies'),
  'chapter-05-python-variables-operators':       () => import('./Class_12/ComputerScience/chapters/chapter-05-python-variables-operators'),
  'chapter-06-control-structures':               () => import('./Class_12/ComputerScience/chapters/chapter-06-control-structures'),
  'chapter-07-python-functions':                 () => import('./Class_12/ComputerScience/chapters/chapter-07-python-functions'),
  'chapter-08-strings-manipulation':             () => import('./Class_12/ComputerScience/chapters/chapter-08-strings-manipulation'),
  'chapter-09-lists-tuples-sets-dictionary':     () => import('./Class_12/ComputerScience/chapters/chapter-09-lists-tuples-sets-dictionary'),
  'chapter-10-python-classes-objects':           () => import('./Class_12/ComputerScience/chapters/chapter-10-python-classes-objects'),
  'chapter-11-database-concepts':                () => import('./Class_12/ComputerScience/chapters/chapter-11-database-concepts'),
  'chapter-12-sql':                              () => import('./Class_12/ComputerScience/chapters/chapter-12-sql'),
  'chapter-13-python-csv-files':                 () => import('./Class_12/ComputerScience/chapters/chapter-13-python-csv-files'),
  'chapter-14-importing-cpp-in-python':          () => import('./Class_12/ComputerScience/chapters/chapter-14-importing-cpp-in-python'),
  'chapter-15-data-manipulation-sql':            () => import('./Class_12/ComputerScience/chapters/chapter-15-data-manipulation-sql'),
  'chapter-16-data-visualization-pyplot':        () => import('./Class_12/ComputerScience/chapters/chapter-16-data-visualization-pyplot'),
  'ta-chapter-01-multimedia':  () => import('./Class_12/ComputerApplicationsTamil/chapters/ta-chapter-01-multimedia'),
  'ta-chapter-02-pagemaker':   () => import('./Class_12/ComputerApplicationsTamil/chapters/ta-chapter-02-pagemaker'),
  'ta-chapter-03-dbms':        () => import('./Class_12/ComputerApplicationsTamil/chapters/ta-chapter-03-dbms'),
  'ta-chapter-04-php-intro':   () => import('./Class_12/ComputerApplicationsTamil/chapters/ta-chapter-04-php-intro'),
  'ta-chapter-05-php-functions-arrays': () => import('./Class_12/ComputerApplicationsTamil/chapters/ta-chapter-05-php-functions-arrays'),
  'ta-chapter-06-php-conditionals':     () => import('./Class_12/ComputerApplicationsTamil/chapters/ta-chapter-06-php-conditionals'),
  'ta-chapter-07-php-loops':            () => import('./Class_12/ComputerApplicationsTamil/chapters/ta-chapter-07-php-loops'),
  'ta-chapter-08-forms-files':          () => import('./Class_12/ComputerApplicationsTamil/chapters/ta-chapter-08-forms-files'),
  'ta-chapter-09-php-mysql':             () => import('./Class_12/ComputerApplicationsTamil/chapters/ta-chapter-09-php-mysql'),
  'ta-chapter-10-networks-intro':        () => import('./Class_12/ComputerApplicationsTamil/chapters/ta-chapter-10-networks-intro'),
  'ta-chapter-11-network-protocols':     () => import('./Class_12/ComputerApplicationsTamil/chapters/ta-chapter-11-network-protocols'),
  'ta-chapter-12-dns':                   () => import('./Class_12/ComputerApplicationsTamil/chapters/ta-chapter-12-dns'),
  'ta-chapter-13-network-cabling':        () => import('./Class_12/ComputerApplicationsTamil/chapters/ta-chapter-13-network-cabling'),
  'ta-chapter-14-open-source':            () => import('./Class_12/ComputerApplicationsTamil/chapters/ta-chapter-14-open-source'),
  'ta-chapter-15-ecommerce':              () => import('./Class_12/ComputerApplicationsTamil/chapters/ta-chapter-15-ecommerce'),
  'ta-chapter-16-payment-systems':        () => import('./Class_12/ComputerApplicationsTamil/chapters/ta-chapter-16-payment-systems'),
  'ta-chapter-17-ecommerce-security':     () => import('./Class_12/ComputerApplicationsTamil/chapters/ta-chapter-17-ecommerce-security'),
  'ta-chapter-18-edi':                    () => import('./Class_12/ComputerApplicationsTamil/chapters/ta-chapter-18-edi'),
  'ta-chapter-01-functions':              () => import('./Class_12/ComputerScienceTamil/chapters/ta-chapter-01-functions'),
  'ta-chapter-02-data-abstraction':       () => import('./Class_12/ComputerScienceTamil/chapters/ta-chapter-02-data-abstraction'),
  'ta-chapter-03-scoping':                () => import('./Class_12/ComputerScienceTamil/chapters/ta-chapter-03-scoping'),
  'ta-chapter-04-algorithmic-strategies': () => import('./Class_12/ComputerScienceTamil/chapters/ta-chapter-04-algorithmic-strategies'),
  'ta-chapter-01-introduction-to-computers': () => import('./Class_11/ComputerApplicationsTamil/chapters/ta-chapter-01-introduction-to-computers'),
  'ta-chapter-02-number-systems':            () => import('./Class_11/ComputerApplicationsTamil/chapters/ta-chapter-02-number-systems'),
  'ta-chapter-03-computer-organization':     () => import('./Class_11/ComputerApplicationsTamil/chapters/ta-chapter-03-computer-organization'),
  'ta-chapter-04-operating-system-concepts': () => import('./Class_11/ComputerApplicationsTamil/chapters/ta-chapter-04-operating-system-concepts'),
  'ta-chapter-05-working-with-windows':      () => import('./Class_11/ComputerApplicationsTamil/chapters/ta-chapter-05-working-with-windows'),
  'ta-chapter-06-word-processor-basics':     () => import('./Class_11/ComputerApplicationsTamil/chapters/ta-chapter-06-word-processor-basics'),
  'ta-chapter-07-openoffice-calc-basics':    () => import('./Class_11/ComputerApplicationsTamil/chapters/ta-chapter-07-openoffice-calc-basics'),
  'ta-chapter-08-presentation-basics':       () => import('./Class_11/ComputerApplicationsTamil/chapters/ta-chapter-08-presentation-basics'),
  'ta-chapter-09-website-and-email-introduction': () => import('./Class_11/ComputerApplicationsTamil/chapters/ta-chapter-09-website-and-email-introduction'),
  'ta-chapter-10-html-structural-tags':      () => import('./Class_11/ComputerApplicationsTamil/chapters/ta-chapter-10-html-structural-tags'),
  'ta-chapter-11-html-text-tables-lists-links': () => import('./Class_11/ComputerApplicationsTamil/chapters/ta-chapter-11-html-text-tables-lists-links'),
  'ta-chapter-12-html-multimedia-forms':     () => import('./Class_11/ComputerApplicationsTamil/chapters/ta-chapter-12-html-multimedia-forms'),
  'ta-chapter-13-css-basics':                () => import('./Class_11/ComputerApplicationsTamil/chapters/ta-chapter-13-css-basics'),
  'ta-chapter-14-javascript-introduction':   () => import('./Class_11/ComputerApplicationsTamil/chapters/ta-chapter-14-javascript-introduction'),
  'ta-chapter-15-javascript-control-structures': () => import('./Class_11/ComputerApplicationsTamil/chapters/ta-chapter-15-javascript-control-structures'),
  'ta-chapter-16-javascript-functions':      () => import('./Class_11/ComputerApplicationsTamil/chapters/ta-chapter-16-javascript-functions'),
  'ta-chapter-17-computer-ethics-cyber-security': () => import('./Class_11/ComputerApplicationsTamil/chapters/ta-chapter-17-computer-ethics-cyber-security'),
  'ta-chapter-18-tamil-computing':           () => import('./Class_11/ComputerApplicationsTamil/chapters/ta-chapter-18-tamil-computing'),
  'ta-chapter-01-computer-science-basics':   () => import('./Class_11/ComputerScienceTamil/chapters/ta-chapter-01-computer-science-basics'),
  'ta-chapter-02-number-systems-cs':         () => import('./Class_11/ComputerScienceTamil/chapters/ta-chapter-02-number-systems-cs'),
  'ta-chapter-03-computer-architecture':     () => import('./Class_11/ComputerScienceTamil/chapters/ta-chapter-03-computer-architecture'),
  'ta-chapter-04-os-theory-cs':              () => import('./Class_11/ComputerScienceTamil/chapters/ta-chapter-04-os-theory-cs'),
  'ta-chapter-05-python-variables-operators': () => import('./Class_12/ComputerScienceTamil/chapters/ta-chapter-05-python-variables-operators'),
  'ta-chapter-06-control-structures':         () => import('./Class_12/ComputerScienceTamil/chapters/ta-chapter-06-control-structures'),
  'ta-chapter-07-python-functions':           () => import('./Class_12/ComputerScienceTamil/chapters/ta-chapter-07-python-functions'),
  'ta-chapter-08-strings-manipulation':       () => import('./Class_12/ComputerScienceTamil/chapters/ta-chapter-08-strings-manipulation'),
  'ta-chapter-09-lists-tuples-sets-dictionary': () => import('./Class_12/ComputerScienceTamil/chapters/ta-chapter-09-lists-tuples-sets-dictionary'),
  'ta-chapter-10-python-classes-objects':       () => import('./Class_12/ComputerScienceTamil/chapters/ta-chapter-10-python-classes-objects'),
  'ta-chapter-11-database-concepts':            () => import('./Class_12/ComputerScienceTamil/chapters/ta-chapter-11-database-concepts'),
  'ta-chapter-12-sql':                          () => import('./Class_12/ComputerScienceTamil/chapters/ta-chapter-12-sql'),
  'ta-chapter-13-python-csv-files':             () => import('./Class_12/ComputerScienceTamil/chapters/ta-chapter-13-python-csv-files'),
  'ta-chapter-14-importing-cpp-in-python':      () => import('./Class_12/ComputerScienceTamil/chapters/ta-chapter-14-importing-cpp-in-python'),
  'ta-chapter-15-data-manipulation-sql':        () => import('./Class_12/ComputerScienceTamil/chapters/ta-chapter-15-data-manipulation-sql'),
  'ta-chapter-16-data-visualization-pyplot':    () => import('./Class_12/ComputerScienceTamil/chapters/ta-chapter-16-data-visualization-pyplot'),
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
