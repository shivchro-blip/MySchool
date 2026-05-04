/**
 * Shared fixtures and route constants for E2E specs.
 *
 * ROUTES maps every spec test to the backend API path it exercises.
 * mockApiRoutes() wires page.route() intercepts so specs are isolated
 * from the real server AND have explicit code edges to each route path.
 */

export const ROUTES = {
  // Syllabus
  SUBJECTS:      '/api/v1/syllabus/subjects',
  CHAPTERS:      '/api/v1/syllabus/subjects/:subjectId/chapters',
  TOPICS:        '/api/v1/syllabus/chapters/:chapterId/topics',
  QUESTIONS:     '/api/v1/syllabus/chapters/:chapterId/questions',
  // Learning
  LEARN_EXPLAIN: '/api/v1/learning/explain',
  LEARN_CONTENT: '/api/v1/learning/content/:chapterId',
  // Evaluation
  EVAL_SUBMIT:   '/api/v1/evaluation/submit',
  EVAL_RETRY:    '/api/v1/evaluation/retry',
  EVAL_PROGRESS: '/api/v1/evaluation/progress',
  EVAL_HISTORY:  '/api/v1/evaluation/history',
}

export const COMPONENTS = {
  LoginPage:    'pages/LoginPage',
  HomePage:     'pages/HomePage',
  LearnPage:    'pages/LearnPage',
  PracticePage: 'pages/PracticePage',
  ProgressPage: 'pages/ProgressPage',
}

const SUBJECT = {
  id: '00000000-0000-0000-0000-000000000001',
  code: 'ENG1', name: 'English', class: '+1',
  is_active: true, created_at: '2024-01-01T00:00:00Z',
}
const CHAPTER = {
  id: '00000000-0000-0000-0000-000000000002',
  subject_id: '00000000-0000-0000-0000-000000000001',
  number: 1, title: 'The Last Lesson', content_type: 'prose', is_active: true,
}
const TOPIC = {
  id: '00000000-0000-0000-0000-000000000003',
  chapter_id: '00000000-0000-0000-0000-000000000002',
  title: 'Author Background', order_index: 1,
}
const QUESTION = {
  id: '00000000-0000-0000-0000-000000000010',
  question_text: 'Who is Alphonse Daudet?',
  marks: 2, question_type: 'short_answer', is_validated: true,
}

/**
 * Intercept all backend API routes and return predictable mock data.
 * Call this in beforeEach alongside mockLogin so every test runs
 * against a stable, server-independent fixture set.
 *
 * Each page.route() call here is an explicit code edge from the spec
 * to the backend route it tests.
 */
export async function mockApiRoutes(page) {
  await page.route('**/api/v1/syllabus/subjects', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([SUBJECT]),
    })
  })

  await page.route('**/api/v1/syllabus/subjects/*/chapters', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([CHAPTER]),
    })
  })

  await page.route('**/api/v1/syllabus/chapters/*/topics', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([TOPIC]),
    })
  })

  await page.route('**/api/v1/syllabus/chapters/*/questions', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([QUESTION]),
    })
  })

  await page.route('**/api/v1/learning/content/**', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ chapter_id: CHAPTER.id, chunks: [] }),
    })
  })

  await page.route('**/api/v1/evaluation/progress', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        user_id: '00000000-0000-0000-0000-000000000099',
        total_attempts: 3,
        average_score: 72.5,
        by_chapter: [],
      }),
    })
  })

  await page.route('**/api/v1/evaluation/history', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ history: [], total: 0 }),
    })
  })
}

export const MOCK_TOKEN = 'mock-test-token-for-playwright'

export async function mockLogin(page) {
  await page.addInitScript(() => {
    window.localStorage.setItem('exam_coach_token', 'mock-test-token-for-playwright')
  })
}

export async function clearLogin(page) {
  await page.addInitScript(() => {
    window.localStorage.removeItem('exam_coach_token')
  })
}
