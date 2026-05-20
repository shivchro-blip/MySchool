const registry = {
  'class11-english-2025-annual':  () => import('./class11English2025Annual').then(m => m.class11English2025Annual),
  'class11-english-2024-annual':  () => import('./class11English2024Annual').then(m => m.class11English2024Annual),
  'class11-english-2023-annual':  () => import('./class11English2023Annual').then(m => m.class11English2023Annual),
  'class11-english-2022-annual':  () => import('./class11English2022Annual').then(m => m.class11English2022Annual),
  'class12-english-2025-annual':  () => import('./class12English2025Annual').then(m => m.class12English2025Annual),
  'class12-english-2024-annual':  () => import('./class12English2024Annual').then(m => m.class12English2024Annual),
  'class12-english-2023-annual':  () => import('./class12English2023Annual').then(m => m.class12English2023Annual),
  'class12-english-2022-annual':  () => import('./class12English2022Annual').then(m => m.class12English2022Annual),
  'class11-english-model-qa-1':   () => import('./class11EnglishModelQA1').then(m => m.class11EnglishModelQA1),
  'class11-english-model-qa-2':   () => import('./class11EnglishModelQA2').then(m => m.class11EnglishModelQA2),
  'class11-english-model-qa-3':   () => import('./class11EnglishModelQA3').then(m => m.class11EnglishModelQA3),
  'class11-english-model-qa-4':   () => import('./class11EnglishModelQA4').then(m => m.class11EnglishModelQA4),
  'class11-english-model-qa-5':   () => import('./class11EnglishModelQA5').then(m => m.class11EnglishModelQA5),
  'class12-english-model-qa-1':   () => import('./class12EnglishModelQA1').then(m => m.class12EnglishModelQA1),
  'class12-english-model-qa-2':   () => import('./class12EnglishModelQA2').then(m => m.class12EnglishModelQA2),
  'class12-english-model-qa-3':   () => import('./class12EnglishModelQA3').then(m => m.class12EnglishModelQA3),
  'class12-english-model-qa-4':   () => import('./class12EnglishModelQA4').then(m => m.class12EnglishModelQA4),
  'class12-english-model-qa-5':   () => import('./class12EnglishModelQA5').then(m => m.class12EnglishModelQA5),
}

export async function getPaperById(paperId) {
  const loader = registry[paperId]
  return loader ? loader() : null
}

export function getPracticeRoute(paperId) {
  const annualMatch = paperId?.match(/^class(\d+)-english-(\d{4})-annual$/)
  if (annualMatch) {
    const classLevel = annualMatch[1] === '11' ? 'plus1' : 'plus2'
    return `/${classLevel}/english/exam/${annualMatch[2]}`
  }
  const modelMatch = paperId?.match(/^class(\d+)-english-(model-qa-\d+)$/)
  if (modelMatch) {
    const classLevel = modelMatch[1] === '11' ? 'plus1' : 'plus2'
    return `/${classLevel}/english/model-exam/${modelMatch[2]}`
  }
  return null
}
