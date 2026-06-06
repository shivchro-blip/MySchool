// Lazy exam paper registry — each paper file is loaded only on demand.
// getPaperById is async; callers must await it.
const LOADERS = {
  'class11-english-2022-annual': () => import('./class11English2022Annual'),
  'class11-english-2023-annual': () => import('./class11English2023Annual'),
  'class11-english-2024-annual': () => import('./class11English2024Annual'),
  'class11-english-2025-annual': () => import('./class11English2025Annual'),
  'class12-english-2022-annual': () => import('./class12English2022Annual'),
  'class12-english-2023-annual': () => import('./class12English2023Annual'),
  'class12-english-2024-annual': () => import('./class12English2024Annual'),
  'class12-english-2025-annual': () => import('./class12English2025Annual'),
  'class11-english-model-qa-1':  () => import('./class11EnglishModelQA1'),
  'class11-english-model-qa-2':  () => import('./class11EnglishModelQA2'),
  'class11-english-model-qa-3':  () => import('./class11EnglishModelQA3'),
  'class11-english-model-qa-4':  () => import('./class11EnglishModelQA4'),
  'class11-english-model-qa-5':  () => import('./class11EnglishModelQA5'),
  'class12-english-model-qa-1':  () => import('./class12EnglishModelQA1'),
  'class12-english-model-qa-2':  () => import('./class12EnglishModelQA2'),
  'class12-english-model-qa-3':  () => import('./class12EnglishModelQA3'),
  'class12-english-model-qa-4':  () => import('./class12EnglishModelQA4'),
  'class12-english-model-qa-5':  () => import('./class12EnglishModelQA5'),
  'eng11-annual-2025':           () => import('./eng11English2025Annual'),
}

export async function getPaperById(paperId) {
  const loader = LOADERS[paperId]
  if (!loader) return null
  const mod = await loader()
  return mod.default ?? Object.values(mod)[0] ?? null
}
