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
}

const registry = {
  has:  (slug) => slug in LOADERS,
  load: async (slug) => {
    const loader = LOADERS[slug]
    if (!loader) return null
    const mod = await loader()
    return mod.default
  },
}

export default registry
