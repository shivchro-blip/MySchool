import { useEffect, useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { isLoggedIn } from './api/auth'
import { getCachedProfile, getStoredProfile } from './api/users'

// Eager: LoginPage and the dashboard shell are on the critical path for the
// first paint of every session, so they stay in the entry chunk. Every other
// route is code-split via React.lazy — this keeps framer-motion and the heavy
// syllabus/exam pages OUT of the Login bundle (they load on first visit only).
import LoginPage        from './pages/LoginPage'
import DashboardShell from './components/layout/DashboardShell'

const AuthCallbackPage = lazy(() => import('./pages/AuthCallbackPage'))
const OnboardingPage   = lazy(() => import('./pages/OnboardingPage'))
const ProgressPage     = lazy(() => import('./pages/ProgressPage'))
const DashboardPage    = lazy(() => import('./pages/DashboardPage'))
const CoursesIndexPage = lazy(() => import('./pages/CoursesIndexPage'))
const ActivityPage     = lazy(() => import('./pages/ActivityPage'))
const CertificatePage  = lazy(() => import('./pages/CertificatePage'))
const AssignmentsPage  = lazy(() => import('./pages/AssignmentsPage'))
const MessagesPage     = lazy(() => import('./pages/MessagesPage'))
const PrivacyPage        = lazy(() => import('./pages/PrivacyPage'))
const TermsPage          = lazy(() => import('./pages/TermsPage'))
const ContactPage        = lazy(() => import('./pages/ContactPage'))
const DeleteAccountPage  = lazy(() => import('./pages/DeleteAccountPage'))
const SettingsPage       = lazy(() => import('./pages/SettingsPage'))

const YearPage         = lazy(() => import('./pages/syllabus/YearPage'))
const SubjectPage      = lazy(() => import('./pages/syllabus/SubjectPage'))
const LessonListPage   = lazy(() => import('./pages/syllabus/LessonListPage'))
const LessonDetailPage         = lazy(() => import('./pages/syllabus/LessonDetailPage'))
const SectionPage              = lazy(() => import('./pages/syllabus/SectionPage'))
const NotFound                 = lazy(() => import('./pages/syllabus/NotFound'))
const ChapterPracticeExamPage  = lazy(() => import('./pages/ChapterPracticeExamPage'))
const FinalExamPrepPage        = lazy(() => import('./pages/syllabus/FinalExamPrepPage'))
const ExamPaperViewerPage      = lazy(() => import('./pages/ExamPaperViewerPage'))
const ExamPaperPracticePage    = lazy(() => import('./pages/ExamPaperPracticePage'))
const ModelExamPracticePage    = lazy(() => import('./pages/ModelExamPracticePage'))

// Prefetch profile immediately on module load if token already exists.
// By the time Guard's useEffect fires, the in-flight promise is already resolving.
if (isLoggedIn()) getCachedProfile()

function Guard({ children }) {
  const location = useLocation()
  const loggedIn = isLoggedIn()
  // Paint immediately from the persisted profile when available (returning
  // sessions); the effect below always revalidates against /users/me and
  // reconciles — a changed onboarding flag still redirects correctly.
  const [state, setState] = useState(() => {
    const stored = loggedIn ? getStoredProfile() : null
    return stored
      ? { loading: false, profile: stored }
      : { loading: true,  profile: null }
  })

  useEffect(() => {
    if (!loggedIn) return
    getCachedProfile()
      // getCachedProfile resolves null on any error; keep the last good
      // profile so a failed revalidation can't bounce an already painted
      // dashboard to /onboarding.
      .then(profile => setState(s => ({ loading: false, profile: profile ?? s.profile })))
      // getCachedProfile never rejects today; this catch guards against
      // future refactors that remove its internal catch.
      .catch(() => setState(s => ({ loading: false, profile: s.profile })))
  }, [loggedIn])

  if (!loggedIn) {
    return <Navigate to="/login" replace />
  }

  if (state.loading) {
    return (
      <div className="min-h-screen bg-bg-canvas flex items-center justify-center">
        <div className="text-text-muted text-sm">Loading…</div>
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
      <Suspense fallback={
        <div className="min-h-screen bg-bg-canvas flex items-center justify-center">
          <div className="text-text-muted text-sm">Loading…</div>
        </div>
      }>
      <Routes key={authKey}>

        <Route path="/login"          element={<LoginPage />} />
        <Route path="/auth/callback"  element={<AuthCallbackPage />} />
        <Route path="/privacy"        element={<PrivacyPage />} />
        <Route path="/terms"          element={<TermsPage />} />
        <Route path="/contact"        element={<ContactPage />} />
        <Route path="/delete-account" element={<DeleteAccountPage />} />
        <Route path="/settings" element={
          <DashShell><SettingsPage /></DashShell>
        } />

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
        <Route path="/plus2/computer-applications/final-exam-prep" element={
          <DashShell>
            <CourseContent><FinalExamPrepPage classLevel="plus2" subjectSlug="computer-applications" /></CourseContent>
          </DashShell>
        } />
        <Route path="/plus2/computer-applications/final-exam-prep/paper/:paperId" element={
          <DashShell><ExamPaperViewerPage backPath="/plus2/computer-applications/final-exam-prep" /></DashShell>
        } />
        <Route path="/plus2/computer-applications/model-exam/:modelId" element={
          <DashShell>
            <CourseContent><ModelExamPracticePage classLevel="plus2" subjectSlug="computer-applications" /></CourseContent>
          </DashShell>
        } />
        <Route path="/plus1/computer-applications/final-exam-prep" element={
          <DashShell>
            <CourseContent><FinalExamPrepPage classLevel="plus1" subjectSlug="computer-applications" /></CourseContent>
          </DashShell>
        } />
        <Route path="/plus1/computer-applications/final-exam-prep/paper/:paperId" element={
          <DashShell><ExamPaperViewerPage backPath="/plus1/computer-applications/final-exam-prep" /></DashShell>
        } />
        <Route path="/plus1/computer-applications/model-exam/:modelId" element={
          <DashShell>
            <CourseContent><ModelExamPracticePage classLevel="plus1" subjectSlug="computer-applications" /></CourseContent>
          </DashShell>
        } />
        <Route path="/plus1/computer-science/final-exam-prep" element={
          <DashShell>
            <CourseContent><FinalExamPrepPage classLevel="plus1" subjectSlug="computer-science" /></CourseContent>
          </DashShell>
        } />
        <Route path="/plus1/computer-science/final-exam-prep/paper/:paperId" element={
          <DashShell><ExamPaperViewerPage backPath="/plus1/computer-science/final-exam-prep" /></DashShell>
        } />
        <Route path="/plus2/computer-applications-tamil/final-exam-prep" element={
          <DashShell>
            <CourseContent><FinalExamPrepPage classLevel="plus2" subjectSlug="computer-applications-tamil" /></CourseContent>
          </DashShell>
        } />
        <Route path="/plus2/computer-applications-tamil/final-exam-prep/paper/:paperId" element={
          <DashShell><ExamPaperViewerPage backPath="/plus2/computer-applications-tamil/final-exam-prep" /></DashShell>
        } />
        <Route path="/plus2/computer-applications-tamil/model-exam/:modelId" element={
          <DashShell>
            <CourseContent><ModelExamPracticePage classLevel="plus2" subjectSlug="computer-applications-tamil" /></CourseContent>
          </DashShell>
        } />
        <Route path="/plus1/computer-science/model-exam/:modelId" element={
          <DashShell>
            <CourseContent><ModelExamPracticePage classLevel="plus1" subjectSlug="computer-science" /></CourseContent>
          </DashShell>
        } />
        <Route path="/plus2/computer-science/final-exam-prep" element={
          <DashShell>
            <CourseContent><FinalExamPrepPage classLevel="plus2" subjectSlug="computer-science" /></CourseContent>
          </DashShell>
        } />
        <Route path="/plus2/computer-science/final-exam-prep/paper/:paperId" element={
          <DashShell><ExamPaperViewerPage backPath="/plus2/computer-science/final-exam-prep" /></DashShell>
        } />
        <Route path="/plus2/computer-science/model-exam/:modelId" element={
          <DashShell>
            <CourseContent><ModelExamPracticePage classLevel="plus2" subjectSlug="computer-science" /></CourseContent>
          </DashShell>
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
