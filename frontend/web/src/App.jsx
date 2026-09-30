import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { isLoggedIn } from './api/auth'
import { loadProfile, peekCachedProfile } from './api/users'

// Only the auth entry points ship in the initial bundle. Everything behind the
// Guard is code-split so /login renders without downloading course content,
// exam papers, framer-motion, etc. (lib/prefetch.js warms these on idle).
import LoginPage        from './pages/LoginPage'
import AuthCallbackPage from './pages/AuthCallbackPage'
import CookieBanner     from './components/CookieBanner'

const OnboardingPage   = lazy(() => import('./pages/OnboardingPage'))
const ProgressPage     = lazy(() => import('./pages/ProgressPage'))
const DashboardPage    = lazy(() => import('./pages/DashboardPage'))
const CoursesIndexPage = lazy(() => import('./pages/CoursesIndexPage'))
const ActivityPage     = lazy(() => import('./pages/ActivityPage'))
const CertificatePage  = lazy(() => import('./pages/CertificatePage'))
const AssignmentsPage  = lazy(() => import('./pages/AssignmentsPage'))
const MessagesPage     = lazy(() => import('./pages/MessagesPage'))
const PrivacyPage      = lazy(() => import('./pages/PrivacyPage'))
const TermsPage        = lazy(() => import('./pages/TermsPage'))
const ContactPage      = lazy(() => import('./pages/ContactPage'))

const DashboardShell = lazy(() => import('./components/layout/DashboardShell'))

const YearPage                = lazy(() => import('./pages/syllabus/YearPage'))
const SubjectPage             = lazy(() => import('./pages/syllabus/SubjectPage'))
const LessonListPage          = lazy(() => import('./pages/syllabus/LessonListPage'))
const LessonDetailPage        = lazy(() => import('./pages/syllabus/LessonDetailPage'))
const SectionPage             = lazy(() => import('./pages/syllabus/SectionPage'))
const NotFound                = lazy(() => import('./pages/syllabus/NotFound'))
const ChapterPracticeExamPage = lazy(() => import('./pages/ChapterPracticeExamPage'))
const FinalExamPrepPage       = lazy(() => import('./pages/syllabus/FinalExamPrepPage'))
const ExamPaperViewerPage     = lazy(() => import('./pages/ExamPaperViewerPage'))
const ExamPaperPracticePage   = lazy(() => import('./pages/ExamPaperPracticePage'))
const ModelExamPracticePage   = lazy(() => import('./pages/ModelExamPracticePage'))

function FullPageLoading() {
  return (
    <div className="min-h-screen bg-bg-canvas flex items-center justify-center">
      <div className="text-text-muted text-sm">Loading…</div>
    </div>
  )
}

function Guard({ children }) {
  const location = useLocation()
  const loggedIn = isLoggedIn()
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState(() => {
    const cached = peekCachedProfile()
    return cached
      ? { loading: false, profile: cached, failed: false }
      : { loading: true,  profile: null,   failed: false }
  })

  useEffect(() => {
    if (!loggedIn) return
    let active = true
    loadProfile()
      .then(profile => {
        if (active) setState({ loading: false, profile, failed: false })
      })
      .catch(err => {
        // 404 = no profile row → onboarding. Any other failure gets a retry
        // instead of silently sending an onboarded user back to onboarding.
        if (active) setState({ loading: false, profile: null, failed: err?.status !== 404 })
      })
    return () => { active = false }
  }, [loggedIn, attempt])

  if (!loggedIn) {
    return <Navigate to="/login" replace />
  }

  if (state.loading) {
    return <FullPageLoading />
  }

  if (state.failed) {
    return (
      <div className="min-h-screen bg-bg-canvas flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-text-muted text-sm mb-3">
            We couldn’t load your account. Check your connection and try again.
          </div>
          <button
            onClick={() => {
              setState({ loading: true, profile: null, failed: false })
              setAttempt(a => a + 1)
            }}
            className="text-sm text-brand underline hover:text-brand-strong"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const onboarded = state.profile?.onboarding_completed === true

  if (location.pathname === '/onboarding') {
    if (onboarded) return <Navigate to="/" replace />
    return children
  }

  if (!onboarded) {
    return <Navigate to="/onboarding" replace />
  }

  return children
}

function DashShell({ children }) {
  return (
    <Guard>
      <DashboardShell>{children}</DashboardShell>
    </Guard>
  )
}

function CourseContent({ children }) {
  return (
    <div style={{ padding: '16px 20px 96px' }}>
      {children}
    </div>
  )
}

export default function App() {
  const [authKey, setAuthKey] = useState(0)

  useEffect(() => {
    function onStorage(e) {
      if (e.key === 'exam_coach_token') setAuthKey(k => k + 1)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return (
    <BrowserRouter>
      <CookieBanner />
      <Suspense fallback={<FullPageLoading />}>
      <Routes key={authKey}>

        <Route path="/login"          element={<LoginPage />} />
        <Route path="/auth/callback"  element={<AuthCallbackPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms"   element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/onboarding" element={
          <Guard><OnboardingPage /></Guard>
        } />

        {/* ── Dashboard shell routes ─────────────────────────── */}
        <Route path="/" element={
          <DashShell><DashboardPage /></DashShell>
        } />

        <Route path="/courses" element={
          <DashShell>
            <CourseContent><CoursesIndexPage /></CourseContent>
          </DashShell>
        } />

        <Route path="/progress" element={
          <DashShell>
            <CourseContent><ProgressPage /></CourseContent>
          </DashShell>
        } />

        <Route path="/activity" element={
          <DashShell><ActivityPage /></DashShell>
        } />

        <Route path="/certificate" element={
          <DashShell><CertificatePage /></DashShell>
        } />

        <Route path="/assignments" element={
          <DashShell><AssignmentsPage /></DashShell>
        } />

        <Route path="/messages" element={
          <DashShell><MessagesPage /></DashShell>
        } />

        <Route path="/practice-exam" element={
          <DashShell>
            <CourseContent><ChapterPracticeExamPage /></CourseContent>
          </DashShell>
        } />

        {/* ── Syllabus drill-down — stays in DashboardShell ─── */}
        {/* Internal navigate() calls use /:year/... so these   */}
        {/* routes keep the user in the EduFlow shell throughout */}
        <Route path="/:year" element={
          <DashShell>
            <CourseContent><YearPage /></CourseContent>
          </DashShell>
        } />
        <Route path="/:year/:subject" element={
          <DashShell>
            <CourseContent><SubjectPage /></CourseContent>
          </DashShell>
        } />
        <Route path="/plus1/english/final-exam-prep" element={
          <DashShell>
            <CourseContent><FinalExamPrepPage /></CourseContent>
          </DashShell>
        } />
        <Route path="/plus1/english/final-exam-prep/paper/:paperId" element={
          <DashShell><ExamPaperViewerPage /></DashShell>
        } />
        <Route path="/plus2/english/final-exam-prep" element={
          <DashShell>
            <CourseContent><FinalExamPrepPage classLevel="plus2" subjectSlug="english" /></CourseContent>
          </DashShell>
        } />
        <Route path="/plus2/english/final-exam-prep/paper/:paperId" element={
          <DashShell><ExamPaperViewerPage backPath="/plus2/english/final-exam-prep" /></DashShell>
        } />
        <Route path="/plus1/english/exam/:examYear" element={
          <DashShell>
            <CourseContent><ExamPaperPracticePage classLevel="plus1" /></CourseContent>
          </DashShell>
        } />
        <Route path="/plus2/english/exam/:examYear" element={
          <DashShell>
            <CourseContent><ExamPaperPracticePage classLevel="plus2" /></CourseContent>
          </DashShell>
        } />
        <Route path="/plus1/english/model-exam/:modelId" element={
          <DashShell>
            <CourseContent><ModelExamPracticePage classLevel="plus1" /></CourseContent>
          </DashShell>
        } />
        <Route path="/plus2/english/model-exam/:modelId" element={
          <DashShell>
            <CourseContent><ModelExamPracticePage classLevel="plus2" /></CourseContent>
          </DashShell>
        } />
        <Route path="/:year/:subject/:category" element={
          <DashShell>
            <CourseContent><LessonListPage /></CourseContent>
          </DashShell>
        } />
        <Route path="/:year/:subject/:category/:lesson" element={
          <DashShell>
            <CourseContent><LessonDetailPage /></CourseContent>
          </DashShell>
        } />
        <Route path="/:year/:subject/:category/:lesson/:section" element={
          <DashShell>
            <CourseContent><SectionPage /></CourseContent>
          </DashShell>
        } />

        <Route path="*" element={
          <DashShell>
            <CourseContent><NotFound /></CourseContent>
          </DashShell>
        } />

      </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
