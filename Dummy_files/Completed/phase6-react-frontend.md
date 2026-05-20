# AI Exam Coach — Phase 6: React Web Frontend
> Open Claude Code inside C:\MyProjects\exam-coach and paste this entire file.

---

## Context

Read CLAUDE.md before doing anything.
This phase builds the complete React web frontend.
Mobile-first. Minimal UI. Fast. Tailwind CSS only.

Core student flow to implement:
  Login → Select Subject → Select Chapter → Learn OR Practice
  Learn:    Chapter → Topic → AI Explanation → Tamil toggle
  Practice: Chapter → Pick Question → Write Answer → Get Score → Retry

Backend must be running on http://localhost:8000 before testing.

---

## Step 1: Set up React project properly

```bash
cd frontend/web
npm install
npx tailwindcss init -p
```

---

## Step 2: Create all config files first

---

### FILE: frontend/web/vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
```

---

### FILE: frontend/web/tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          900: '#14532d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

---

### FILE: frontend/web/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="AI Exam Coach for Tamil Nadu +1 and +2 students" />
    <title>AI Exam Coach</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body class="bg-gray-50 text-gray-900 antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

### FILE: frontend/web/src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-sans;
  }
}

@layer components {
  .btn-primary {
    @apply bg-brand-600 text-white px-4 py-2 rounded-lg font-medium
           hover:bg-brand-700 active:bg-brand-900
           disabled:opacity-50 disabled:cursor-not-allowed
           transition-colors duration-150;
  }
  .btn-secondary {
    @apply bg-white text-gray-700 px-4 py-2 rounded-lg font-medium
           border border-gray-200 hover:bg-gray-50
           disabled:opacity-50 disabled:cursor-not-allowed
           transition-colors duration-150;
  }
  .card {
    @apply bg-white rounded-xl shadow-sm border border-gray-100 p-4;
  }
  .input {
    @apply w-full border border-gray-200 rounded-lg px-3 py-2
           focus:outline-none focus:ring-2 focus:ring-brand-500
           focus:border-transparent text-sm;
  }
  .badge {
    @apply inline-flex items-center px-2 py-0.5 rounded text-xs font-medium;
  }
}
```

---

## Step 3: Create the API client layer

---

### FILE: frontend/web/src/api/client.js

```js
// Central API client
// All fetch calls go through here
// Reads token from localStorage (set by auth flow)

const BASE_URL = '/api/v1'

function getToken() {
  return localStorage.getItem('exam_coach_token') || ''
}

async function request(method, path, body = null) {
  const headers = {
    'Content-Type': 'application/json',
  }
  const token = getToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const config = { method, headers }
  if (body) config.body = JSON.stringify(body)

  const res = await fetch(`${BASE_URL}${path}`, config)

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(err.error || err.detail || 'Request failed')
  }

  return res.json()
}

export const api = {
  get:    (path)        => request('GET', path),
  post:   (path, body)  => request('POST', path, body),
  put:    (path, body)  => request('PUT', path, body),
  delete: (path)        => request('DELETE', path),
}
```

---

### FILE: frontend/web/src/api/syllabus.js

```js
import { api } from './client'

export async function getSubjects() {
  return api.get('/syllabus/subjects')
}

export async function getChapters(subjectId) {
  return api.get(`/syllabus/subjects/${subjectId}/chapters`)
}

export async function getTopics(chapterId) {
  return api.get(`/syllabus/chapters/${chapterId}/topics`)
}

export async function getQuestions(chapterId, marks = null) {
  const query = marks ? `?marks=${marks}` : ''
  return api.get(`/syllabus/chapters/${chapterId}/questions${query}`)
}
```

---

### FILE: frontend/web/src/api/learning.js

```js
import { api } from './client'

export async function explainTopic({ chapterId, topicId, question, language }) {
  return api.post('/learning/explain', {
    chapter_id: chapterId,
    topic_id:   topicId || null,
    question:   question || '',
    language:   language || 'en',
  })
}

export async function getChapterContent(chapterId, chunkType = null) {
  const query = chunkType ? `?chunk_type=${chunkType}` : ''
  return api.get(`/learning/content/${chapterId}${query}`)
}
```

---

### FILE: frontend/web/src/api/evaluation.js

```js
import { api } from './client'

export async function submitAnswer({ questionId, studentAnswer, attemptNumber }) {
  return api.post('/evaluation/submit', {
    question_id:    questionId,
    student_answer: studentAnswer,
    attempt_number: attemptNumber || 1,
  })
}

export async function retryAnswer({ responseId, newAnswer }) {
  return api.post('/evaluation/retry', {
    response_id: responseId,
    new_answer:  newAnswer,
  })
}

export async function getProgress() {
  return api.get('/evaluation/progress')
}

export async function getHistory(limit = 20) {
  return api.get(`/evaluation/history?limit=${limit}`)
}
```

---

### FILE: frontend/web/src/api/auth.js

```js
// Auth API
// Uses Supabase JS SDK for login/signup
// Token is stored in localStorage after login

const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY

export async function loginWithEmail(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON,
    },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error_description || 'Login failed')
  localStorage.setItem('exam_coach_token', data.access_token)
  return data
}

export async function signupWithEmail(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON,
    },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error_description || 'Signup failed')
  return data
}

export function logout() {
  localStorage.removeItem('exam_coach_token')
}

export function getToken() {
  return localStorage.getItem('exam_coach_token')
}

export function isLoggedIn() {
  return !!getToken()
}
```

---

## Step 4: Create shared components

---

### FILE: frontend/web/src/components/Spinner.jsx

```jsx
export default function Spinner({ size = 'md', label = 'Loading...' }) {
  const sizes = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-10 w-10' }
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`${sizes[size]} animate-spin rounded-full border-2
                    border-gray-200 border-t-brand-600`}
        aria-hidden="true"
      />
      {label && (
        <p className="text-sm text-gray-500">{label}</p>
      )}
    </div>
  )
}
```

---

### FILE: frontend/web/src/components/ErrorMessage.jsx

```jsx
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="rounded-lg bg-red-50 border border-red-200 p-4">
      <p className="text-sm text-red-700 font-medium">Something went wrong</p>
      <p className="text-sm text-red-600 mt-1">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 text-sm text-red-700 underline hover:no-underline"
        >
          Try again
        </button>
      )}
    </div>
  )
}
```

---

### FILE: frontend/web/src/components/ScoreBadge.jsx

```jsx
export default function ScoreBadge({ awarded, total }) {
  const pct = total > 0 ? (awarded / total) * 100 : 0
  const color =
    pct >= 80 ? 'bg-green-100 text-green-800' :
    pct >= 50 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
  return (
    <span className={`badge ${color} text-sm px-3 py-1`}>
      {awarded}/{total} marks ({Math.round(pct)}%)
    </span>
  )
}
```

---

### FILE: frontend/web/src/components/MarksBadge.jsx

```jsx
const colors = {
  1:  'bg-gray-100 text-gray-700',
  2:  'bg-blue-100 text-blue-700',
  5:  'bg-purple-100 text-purple-700',
  10: 'bg-orange-100 text-orange-700',
}

export default function MarksBadge({ marks }) {
  return (
    <span className={`badge ${colors[marks] || colors[2]}`}>
      {marks} {marks === 1 ? 'mark' : 'marks'}
    </span>
  )
}
```

---

### FILE: frontend/web/src/components/Layout.jsx

```jsx
import { useState } from 'react'
import { logout, isLoggedIn } from '../api/auth'

export default function Layout({ children, title = 'AI Exam Coach' }) {
  const loggedIn = isLoggedIn()

  function handleLogout() {
    logout()
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="font-bold text-brand-700 text-lg tracking-tight">
            📚 Exam Coach
          </a>
          <div className="flex items-center gap-3">
            {loggedIn ? (
              <>
                <a href="/progress"
                  className="text-sm text-gray-600 hover:text-gray-900">
                  Progress
                </a>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <a href="/login" className="btn-primary text-sm">
                Login
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {title && (
          <h1 className="text-xl font-bold text-gray-900 mb-4">{title}</h1>
        )}
        {children}
      </main>
    </div>
  )
}
```

---

## Step 5: Create all pages

---

### FILE: frontend/web/src/pages/LoginPage.jsx

```jsx
import { useState } from 'react'
import { loginWithEmail, signupWithEmail } from '../api/auth'
import Spinner from '../components/Spinner'

export default function LoginPage() {
  const [mode, setMode]       = useState('login')
  const [email, setEmail]     = useState('')
  const [password, setPass]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await loginWithEmail(email, password)
      } else {
        await signupWithEmail(email, password)
        await loginWithEmail(email, password)
      }
      window.location.href = '/'
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">📚</div>
          <h1 className="text-2xl font-bold text-gray-900">AI Exam Coach</h1>
          <p className="text-gray-500 text-sm mt-1">
            Tamil Nadu +1 & +2 Board Exam Preparation
          </p>
        </div>

        <div className="card">
          <div className="flex rounded-lg bg-gray-100 p-1 mb-5">
            {['login', 'signup'].map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-1.5 rounded-md text-sm font-medium
                            transition-colors ${
                  mode === m
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {m === 'login' ? 'Login' : 'Sign Up'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={e => setPass(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded p-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? (
                <Spinner size="sm" label="" />
              ) : mode === 'login' ? 'Login' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
```

---

### FILE: frontend/web/src/pages/HomePage.jsx

```jsx
import { useState, useEffect } from 'react'
import { getSubjects, getChapters } from '../api/syllabus'
import Layout from '../components/Layout'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'

export default function HomePage() {
  const [subjects,  setSubjects]  = useState([])
  const [chapters,  setChapters]  = useState([])
  const [selected,  setSelected]  = useState(null)
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState('')

  useEffect(() => {
    getSubjects()
      .then(data => {
        setSubjects(data)
        if (data.length === 1) loadChapters(data[0])
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  async function loadChapters(subject) {
    setSelected(subject)
    setChapters([])
    setLoading(true)
    try {
      const data = await getChapters(subject.id)
      setChapters(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const contentTypeIcon = {
    prose:      '📖',
    poem:       '🎵',
    grammar:    '✏️',
    vocabulary: '🔤',
  }

  return (
    <Layout title="">
      {/* Hero */}
      <div className="bg-brand-600 rounded-xl p-5 mb-6 text-white">
        <h2 className="text-lg font-bold">Welcome back! 👋</h2>
        <p className="text-brand-100 text-sm mt-1">
          What do you want to study today?
        </p>
      </div>

      {loading && <Spinner label="Loading syllabus..." />}
      {error   && <ErrorMessage message={error} onRetry={() => window.location.reload()} />}

      {/* Subject tabs */}
      {subjects.length > 1 && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {subjects.map(s => (
            <button
              key={s.id}
              onClick={() => loadChapters(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap
                          transition-colors ${
                selected?.id === s.id
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              {s.name} {s.class}
            </button>
          ))}
        </div>
      )}

      {/* Chapter list */}
      {chapters.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase
                          tracking-wide mb-3">
            Chapters
          </h2>
          <div className="space-y-2">
            {chapters.map(ch => (
              <div key={ch.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {contentTypeIcon[ch.content_type] || '📄'}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        Ch {ch.number}. {ch.title}
                      </p>
                      <p className="text-xs text-gray-400 capitalize mt-0.5">
                        {ch.content_type}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`/learn/${ch.id}`}
                      className="btn-secondary text-xs py-1.5 px-3"
                    >
                      Learn
                    </a>
                    <a
                      href={`/practice/${ch.id}`}
                      className="btn-primary text-xs py-1.5 px-3"
                    >
                      Practice
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  )
}
```

---

### FILE: frontend/web/src/pages/LearnPage.jsx

```jsx
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getTopics } from '../api/syllabus'
import { explainTopic } from '../api/learning'
import Layout from '../components/Layout'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'

export default function LearnPage() {
  const { chapterId }   = useParams()
  const [topics,        setTopics]     = useState([])
  const [selectedTopic, setTopic]      = useState(null)
  const [question,      setQuestion]   = useState('')
  const [language,      setLanguage]   = useState('en')
  const [result,        setResult]     = useState(null)
  const [loading,       setLoading]    = useState(false)
  const [topicsLoading, setTLoading]   = useState(true)
  const [error,         setError]      = useState('')

  useEffect(() => {
    getTopics(chapterId)
      .then(setTopics)
      .catch(e => setError(e.message))
      .finally(() => setTLoading(false))
  }, [chapterId])

  async function handleExplain() {
    if (!selectedTopic && !question.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const data = await explainTopic({
        chapterId,
        topicId:  selectedTopic?.id || null,
        question: question.trim(),
        language,
      })
      setResult(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout title="Learn">
      <a href="/" className="text-sm text-gray-500 hover:text-gray-700 mb-4 block">
        ← Back to chapters
      </a>

      {topicsLoading && <Spinner label="Loading topics..." />}

      {/* Topic selector */}
      {topics.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Select a topic</p>
          <div className="flex flex-wrap gap-2">
            {topics.map(t => (
              <button
                key={t.id}
                onClick={() => setTopic(selectedTopic?.id === t.id ? null : t)}
                className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                  selectedTopic?.id === t.id
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-brand-400'
                }`}
              >
                {t.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Question input */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Or ask a question
        </p>
        <input
          type="text"
          className="input"
          placeholder="e.g. What is the theme of this lesson?"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleExplain()}
        />
      </div>

      {/* Language toggle */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-sm text-gray-600">Explain in:</span>
        <div className="flex rounded-lg bg-gray-100 p-1">
          {[['en', 'English'], ['ta', 'Tamil']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setLanguage(val)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                language === val
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleExplain}
        disabled={loading || (!selectedTopic && !question.trim())}
        className="btn-primary w-full mb-6"
      >
        {loading ? <Spinner size="sm" label="" /> : '✨ Explain'}
      </button>

      {error && <ErrorMessage message={error} />}

      {/* Result */}
      {result && (
        <div className="space-y-4">
          {/* Explanation */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-2">Explanation</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {result.explanation}
            </p>
          </div>

          {/* Key points */}
          {result.key_points?.length > 0 && (
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-2">
                Key Points for Exam
              </h3>
              <ul className="space-y-2">
                {result.key_points.map((pt, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-brand-600 font-bold mt-0.5">✓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Exam tip */}
          {result.exam_tip && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-amber-800 mb-1">
                💡 Exam Tip
              </p>
              <p className="text-sm text-amber-700">{result.exam_tip}</p>
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>Model: {result.model_used}</span>
            {result.cached && (
              <span className="badge bg-gray-100 text-gray-500">Cached</span>
            )}
            <span>{result.source_chunks} content chunks used</span>
          </div>
        </div>
      )}
    </Layout>
  )
}
```

---

### FILE: frontend/web/src/pages/PracticePage.jsx

```jsx
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestions } from '../api/syllabus'
import { submitAnswer, retryAnswer } from '../api/evaluation'
import Layout from '../components/Layout'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import ScoreBadge from '../components/ScoreBadge'
import MarksBadge from '../components/MarksBadge'

export default function PracticePage() {
  const { chapterId }     = useParams()
  const [questions, setQ] = useState([])
  const [filter,    setF] = useState('all')
  const [current,   setC] = useState(null)
  const [answer,    setA] = useState('')
  const [result,    setR] = useState(null)
  const [loading,   setL] = useState(false)
  const [qLoading,  setQL]= useState(true)
  const [error,     setE] = useState('')
  const [mode,      setM] = useState('list') // list | write | result

  useEffect(() => {
    getQuestions(chapterId)
      .then(setQ)
      .catch(e => setE(e.message))
      .finally(() => setQL(false))
  }, [chapterId])

  const filtered = filter === 'all'
    ? questions
    : questions.filter(q => q.marks === parseInt(filter))

  function startQuestion(q) {
    setC(q)
    setA('')
    setR(null)
    setE('')
    setM('write')
  }

  async function handleSubmit() {
    if (answer.trim().length < 10) {
      setE('Please write at least 10 characters.')
      return
    }
    setL(true)
    setE('')
    try {
      const data = await submitAnswer({
        questionId:    current.id,
        studentAnswer: answer,
        attemptNumber: 1,
      })
      setR(data)
      setM('result')
    } catch (e) {
      setE(e.message)
    } finally {
      setL(false)
    }
  }

  async function handleRetry() {
    if (answer.trim().length < 10) {
      setE('Please write at least 10 characters.')
      return
    }
    setL(true)
    setE('')
    try {
      const data = await retryAnswer({
        responseId: result.response_id,
        newAnswer:  answer,
      })
      setR(data)
    } catch (e) {
      setE(e.message)
    } finally {
      setL(false)
    }
  }

  // ── List view ──────────────────────────────────────────────
  if (mode === 'list') return (
    <Layout title="Practice">
      <a href="/" className="text-sm text-gray-500 hover:text-gray-700 mb-4 block">
        ← Back to chapters
      </a>

      {/* Mark filter */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {['all', '1', '2', '5', '10'].map(v => (
          <button
            key={v}
            onClick={() => setF(v)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap
                        border transition-colors ${
              filter === v
                ? 'bg-brand-600 text-white border-brand-600'
                : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            {v === 'all' ? 'All' : `${v} Mark${v !== '1' ? 's' : ''}`}
          </button>
        ))}
      </div>

      {qLoading && <Spinner label="Loading questions..." />}
      {error    && <ErrorMessage message={error} />}

      <div className="space-y-3">
        {filtered.map(q => (
          <div key={q.id} className="card">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <MarksBadge marks={q.marks} />
                <p className="text-sm text-gray-800 mt-2 font-medium">
                  {q.question_text}
                </p>
              </div>
              <button
                onClick={() => startQuestion(q)}
                className="btn-primary text-sm py-1.5 px-3 whitespace-nowrap"
              >
                Answer
              </button>
            </div>
          </div>
        ))}
        {!qLoading && filtered.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">
            No questions found for this filter.
          </p>
        )}
      </div>
    </Layout>
  )

  // ── Write view ─────────────────────────────────────────────
  if (mode === 'write') return (
    <Layout title="Write Your Answer">
      <button
        onClick={() => setM('list')}
        className="text-sm text-gray-500 hover:text-gray-700 mb-4 block"
      >
        ← Back to questions
      </button>

      <div className="card mb-4">
        <MarksBadge marks={current.marks} />
        <p className="text-gray-900 font-medium mt-2">{current.question_text}</p>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium text-gray-700">
            Your Answer
          </label>
          <span className="text-xs text-gray-400">{answer.length} chars</span>
        </div>
        <textarea
          className="input min-h-40 resize-y"
          placeholder={
            current.marks <= 2
              ? 'Write 2–3 sentences...'
              : current.marks === 5
              ? 'Write a short paragraph with 3–4 points...'
              : 'Write a full essay with intro, main points, and conclusion...'
          }
          value={answer}
          onChange={e => setA(e.target.value)}
        />
        <p className="text-xs text-gray-400 mt-1">
          {current.marks <= 2
            ? 'Tip: 2-mark questions need a key term + brief explanation'
            : current.marks === 5
            ? 'Tip: Cover 3–4 points clearly'
            : 'Tip: Use intro + 4–5 points + conclusion structure'}
        </p>
      </div>

      {error && <ErrorMessage message={error} />}

      <button
        onClick={handleSubmit}
        disabled={loading || answer.trim().length < 10}
        className="btn-primary w-full"
      >
        {loading
          ? <Spinner size="sm" label="Evaluating..." />
          : '🤖 Evaluate My Answer'}
      </button>
    </Layout>
  )

  // ── Result view ────────────────────────────────────────────
  return (
    <Layout title="Your Results">
      {/* Score */}
      <div className="card mb-4 text-center">
        <ScoreBadge awarded={result.marks_awarded} total={result.marks_total} />
        <p className="text-gray-500 text-sm mt-2">
          {result.percentage >= 80
            ? '🎉 Excellent work!'
            : result.percentage >= 50
            ? '👍 Good effort — keep improving!'
            : '💪 Keep practising — you can do better!'}
        </p>
      </div>

      {/* Feedback */}
      <div className="space-y-3 mb-4">
        {result.feedback.strengths?.length > 0 && (
          <div className="card">
            <p className="text-sm font-semibold text-green-700 mb-2">
              ✅ Strengths
            </p>
            <ul className="space-y-1">
              {result.feedback.strengths.map((s, i) => (
                <li key={i} className="text-sm text-gray-700">• {s}</li>
              ))}
            </ul>
          </div>
        )}

        {result.feedback.weaknesses?.length > 0 && (
          <div className="card">
            <p className="text-sm font-semibold text-red-700 mb-2">
              ⚠️ Needs Improvement
            </p>
            <ul className="space-y-1">
              {result.feedback.weaknesses.map((w, i) => (
                <li key={i} className="text-sm text-gray-700">• {w}</li>
              ))}
            </ul>
          </div>
        )}

        {result.feedback.missing_points?.length > 0 && (
          <div className="card">
            <p className="text-sm font-semibold text-amber-700 mb-2">
              📌 Missing Points
            </p>
            <ul className="space-y-1">
              {result.feedback.missing_points.map((m, i) => (
                <li key={i} className="text-sm text-gray-700">• {m}</li>
              ))}
            </ul>
          </div>
        )}

        {(result.feedback.structure_comment ||
          result.feedback.grammar_comment) && (
          <div className="card text-sm text-gray-600 space-y-1">
            {result.feedback.structure_comment && (
              <p>📐 {result.feedback.structure_comment}</p>
            )}
            {result.feedback.grammar_comment && (
              <p>✏️ {result.feedback.grammar_comment}</p>
            )}
          </div>
        )}

        {/* Model answer */}
        {result.improved_answer && (
          <div className="card border-brand-200 bg-brand-50">
            <p className="text-sm font-semibold text-brand-800 mb-2">
              ⭐ Model Answer (Full Marks)
            </p>
            <p className="text-sm text-brand-900 leading-relaxed">
              {result.improved_answer}
            </p>
          </div>
        )}
      </div>

      {/* Retry */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Try to improve your answer:
        </p>
        <textarea
          className="input min-h-32 resize-y"
          placeholder="Rewrite your answer using the feedback above..."
          value={answer}
          onChange={e => setA(e.target.value)}
        />
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="flex gap-3">
        <button
          onClick={handleRetry}
          disabled={loading || answer.trim().length < 10}
          className="btn-primary flex-1"
        >
          {loading
            ? <Spinner size="sm" label="" />
            : '🔁 Re-evaluate'}
        </button>
        <button
          onClick={() => setM('list')}
          className="btn-secondary flex-1"
        >
          Try Another
        </button>
      </div>

      <p className="text-xs text-center text-gray-400 mt-3">
        Model: {result.model_used}
        {result.cached && ' · Cached'}
      </p>
    </Layout>
  )
}
```

---

### FILE: frontend/web/src/pages/ProgressPage.jsx

```jsx
import { useState, useEffect } from 'react'
import { getProgress } from '../api/evaluation'
import Layout from '../components/Layout'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'

export default function ProgressPage() {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')

  useEffect(() => {
    getProgress()
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Layout title="My Progress">
      {loading && <Spinner label="Loading progress..." />}
      {error   && <ErrorMessage message={error} />}

      {data && (
        <div className="space-y-4">
          {/* Summary cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="card text-center">
              <p className="text-3xl font-bold text-brand-600">
                {data.total_attempts}
              </p>
              <p className="text-xs text-gray-500 mt-1">Total Attempts</p>
            </div>
            <div className="card text-center">
              <p className="text-3xl font-bold text-brand-600">
                {data.average_score}%
              </p>
              <p className="text-xs text-gray-500 mt-1">Average Score</p>
            </div>
          </div>

          {/* Score bar */}
          <div className="card">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-gray-700">Overall Score</span>
              <span className="text-gray-500">{data.average_score}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-500 rounded-full transition-all"
                style={{ width: `${data.average_score}%` }}
              />
            </div>
          </div>

          {/* By chapter */}
          {data.by_chapter?.length > 0 && (
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                By Chapter
              </h3>
              <div className="space-y-3">
                {data.by_chapter.map((ch, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Chapter {i + 1}</span>
                      <span>
                        {ch.attempts} attempt{ch.attempts !== 1 ? 's' : ''} ·{' '}
                        {ch.average_score}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          ch.average_score >= 80
                            ? 'bg-green-500'
                            : ch.average_score >= 50
                            ? 'bg-yellow-500'
                            : 'bg-red-400'
                        }`}
                        style={{ width: `${ch.average_score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.total_attempts === 0 && (
            <div className="text-center py-10 text-gray-400">
              <p className="text-4xl mb-3">📝</p>
              <p className="text-sm">No attempts yet.</p>
              <a href="/" className="btn-primary inline-block mt-3 text-sm">
                Start Practising
              </a>
            </div>
          )}
        </div>
      )}
    </Layout>
  )
}
```

---

### FILE: frontend/web/src/pages/NotFoundPage.jsx

```jsx
import Layout from '../components/Layout'

export default function NotFoundPage() {
  return (
    <Layout title="">
      <div className="text-center py-16">
        <p className="text-6xl mb-4">📭</p>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-gray-500 text-sm mb-6">
          This page does not exist.
        </p>
        <a href="/" className="btn-primary inline-block">
          Go Home
        </a>
      </div>
    </Layout>
  )
}
```

---

## Step 6: Create router and main entry point

---

### FILE: frontend/web/src/App.jsx

```jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { isLoggedIn } from './api/auth'
import LoginPage    from './pages/LoginPage'
import HomePage     from './pages/HomePage'
import LearnPage    from './pages/LearnPage'
import PracticePage from './pages/PracticePage'
import ProgressPage from './pages/ProgressPage'
import NotFoundPage from './pages/NotFoundPage'

function PrivateRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <PrivateRoute><HomePage /></PrivateRoute>
        } />
        <Route path="/learn/:chapterId" element={
          <PrivateRoute><LearnPage /></PrivateRoute>
        } />
        <Route path="/practice/:chapterId" element={
          <PrivateRoute><PracticePage /></PrivateRoute>
        } />
        <Route path="/progress" element={
          <PrivateRoute><ProgressPage /></PrivateRoute>
        } />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
```

---

### FILE: frontend/web/src/main.jsx

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---

## Step 7: Create environment file

### FILE: frontend/web/.env.local

```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

Replace values with your real Supabase credentials from the dashboard.
This file is already in .gitignore so it will not be committed.

---

## Step 8: Update CLAUDE.md phase log

Open CLAUDE.md and replace the Phase Log section with:

```markdown
## Phase Log (Update This at the Start of Every Phase)
- Phase 0: Project scaffold ✓
- Phase 1: Database schema, RLS, seed data ✓
- Phase 2: Content pipeline — PDF → JSON → ChromaDB ✓
- Phase 3: Backend API skeleton — routes, models, auth, rate limiting ✓
- Phase 4: Learning module — Ollama, ChromaDB retrieval, explain endpoint ✓
- Phase 5: Evaluation module — rubric scoring, feedback, improved answer ✓
- Phase 6: React web frontend — learn, practice, evaluate, progress UI ← current
```

---

## Step 9: Commit to git

```bash
git add .
git commit -m "Phase 6: React frontend — login, home, learn, practice, evaluate, progress"
```

---

## Step 10: Start everything and test

Open three terminals:

```bash
# Terminal 1 — Ollama
ollama serve

# Terminal 2 — Backend
cd C:\MyProjects\exam-coach\backend
uvicorn main:app --reload --port 8000

# Terminal 3 — Frontend
cd C:\MyProjects\exam-coach\frontend\web
npm run dev
```

Open http://localhost:5173

Test this exact flow:
1. Sign up with a new email
2. See the chapter list on home page
3. Click Learn on any chapter → select a topic → click Explain
4. Go back → click Practice → pick a question → write an answer
5. Submit → see score, feedback, model answer
6. Rewrite answer → Re-evaluate → score should improve
7. Visit /progress → see your stats

---

## Step 11: Print completion summary

```
✓ frontend/web/vite.config.js              — Vite + API proxy
✓ frontend/web/tailwind.config.js          — Tailwind config
✓ frontend/web/index.html                  — HTML entry
✓ frontend/web/src/index.css               — Tailwind + component classes
✓ frontend/web/src/api/client.js           — base fetch wrapper
✓ frontend/web/src/api/auth.js             — Supabase login/signup
✓ frontend/web/src/api/syllabus.js         — syllabus API calls
✓ frontend/web/src/api/learning.js         — explain API calls
✓ frontend/web/src/api/evaluation.js       — submit/retry API calls
✓ frontend/web/src/components/Spinner.jsx
✓ frontend/web/src/components/ErrorMessage.jsx
✓ frontend/web/src/components/ScoreBadge.jsx
✓ frontend/web/src/components/MarksBadge.jsx
✓ frontend/web/src/components/Layout.jsx
✓ frontend/web/src/pages/LoginPage.jsx
✓ frontend/web/src/pages/HomePage.jsx
✓ frontend/web/src/pages/LearnPage.jsx
✓ frontend/web/src/pages/PracticePage.jsx
✓ frontend/web/src/pages/ProgressPage.jsx
✓ frontend/web/src/pages/NotFoundPage.jsx
✓ frontend/web/src/App.jsx                 — router
✓ frontend/web/src/main.jsx                — entry point
✓ frontend/web/.env.local                  — Supabase credentials
✓ CLAUDE.md updated
✓ Git committed

ACTION REQUIRED:
1. Edit frontend/web/.env.local with real Supabase credentials
2. Start Ollama, backend, and frontend (3 terminals)
3. Open http://localhost:5173
4. Complete full student flow: signup → learn → practice → evaluate → retry

Phase 6 complete.
Next: Phase 7 — Flutter mobile app (Android/iOS, same API)
```
